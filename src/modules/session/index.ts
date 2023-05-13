// Copyright (c) 2021 DevilTea
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { computed, InjectionKey, Ref, ref, watch, watchEffect } from 'vue'
import { createModuleHook, useSetupCtx } from '../utils'
import { ROOM_ORDER, generateScheduleList, generateScheduleTable, getScheduleDays, transformRawData } from './logic'
import { ScheduleElement, SessionsMap, RoomId, ScheduleTable, ScheduleList, Session, SessionId, RoomsMap, Room, RoomsStatusMap, RoomStatus } from './types'
import { fixedTimeZoneDate } from './utils'
import { useProgress } from '../progress'
import io, { Socket } from 'socket.io-client'
import { calculateTimezoneOffset, getDeviceTimezone } from './timezone'
interface UseSession {
  isLoaded: Ref<boolean>;
  currentDayIndex: Ref<number>;
  daysSchedule: Ref<{
    day: [number, number, number];
    table: ScheduleTable;
    list: ScheduleList;
  }[]>;
  roomsStatusMap: Ref<RoomsStatusMap | null>;
  getSessionById: (id: SessionId) => Session;
  getRoomById: (id: RoomId) => Room;
  getRoomStatusById: (id: RoomId) => RoomStatus;
  load: () => Promise<void>;
  TIMEZONE_OFFSET: Ref<number>;
}

const PROVIDE_KEY: InjectionKey<UseSession> = Symbol('session')

const _useSession = (): UseSession => {
  const { isClient } = useSetupCtx()
  const { start, done } = useProgress()

  let socket: typeof Socket | null = null
  const scheduleElements = ref<ScheduleElement[] | null>(null)
  const sessionsMap = ref<SessionsMap | null>(null)
  const roomsMap = ref<RoomsMap | null>(null)
  const isLoaded = ref<boolean>(false)

  // const TIMEZONE_OFFSET = ref<number>(-480)
  // 取得當前裝置時區
  const deviceTimezone = getDeviceTimezone()
  const TIMEZONE_OFFSET: Ref = ref(calculateTimezoneOffset(deviceTimezone))

  // transformRawData ??
  const load = async () => {
    if (isLoaded.value) return
    start()
    const { default: _rawData } = await import('@/assets/json/session.json')
    const { scheduleElements: _scheduleElements, sessionsMap: _sessionsMap, roomsMap: _roomsMap } =
      transformRawData(_rawData, TIMEZONE_OFFSET.value, ROOM_ORDER)
    scheduleElements.value = _scheduleElements
    console.log('scheduleElements.value', scheduleElements.value)
    sessionsMap.value = _sessionsMap
    console.log('sessionsMap.value', sessionsMap.value)
    roomsMap.value = _roomsMap
    console.log('roomsMap.value', roomsMap.value)
    isClient && await prepareRoomStatus()
    console.log('isClient && await prepareRoomStatus()', isClient && await prepareRoomStatus())
    isLoaded.value = true
    done()
    console.log('load done')
  }

  isClient && load()

  const currentDayIndex = ref(0)
  const daysSchedule = computed(() => {
    if (scheduleElements.value === null) return []
    return getScheduleDays(scheduleElements.value)
      .map((scheduleDay) => {
        console.log('scheduleDay', scheduleDay)
        const day = scheduleDay.day
        console.log('day', day)
        const table = generateScheduleTable(scheduleDay.elements)
        console.log('table', table)
        const list = generateScheduleList(scheduleDay.elements)
        return { day, table, list }
      })
  })
  console.log('確認daySchedule', daysSchedule)

  const getSessionById = (id: SessionId): Session => {
    const session = sessionsMap.value?.[id] ?? null
    if (session === null) throw new Error(`Can not find session: ${id} in sessions map`)
    return session
  }

  const getRoomById = (id: RoomId): Room => {
    const room = roomsMap.value?.[id] ?? null
    if (room === null) throw new Error(`Can not find room: ${id} in rooms map`)
    return room
  }

  const currentSessions = ref<Session[]>([])
  const roomsIsFull = ref<Record<RoomId, boolean>>({})
  const roomsStatusMap = computed<RoomsStatusMap | null>(() => {
    if (roomsMap.value === null) return null
    return Object.fromEntries(
      Object.keys(roomsMap.value)
        .map(roomId => {
          const isFull = roomsIsFull.value[roomId] ?? false
          const currentSession = currentSessions.value.find(s => s.room.id === roomId)?.id ?? null
          return [roomId, { isFull, currentSession } as RoomStatus]
        })
    )
  })
  const getRoomStatusById = (id: RoomId): RoomStatus => {
    const status = roomsStatusMap.value?.[id]
    if (!status) throw new Error(`Can not find room: ${id} in rooms' status map`)
    return status
  }

  isClient && setInterval(() => {
    if (sessionsMap.value === null) {
      currentSessions.value = []
      return
    }
    //FIXME: 確認
    const currentTime = fixedTimeZoneDate(new Date(), TIMEZONE_OFFSET.value).getTime() //毫秒
    // const currentTime = fixedTimeZoneDate(new Date('2020-08-01 13:00'), TIMEZONE_OFFSET).getTime()
    currentSessions.value = Object.values(sessionsMap.value)
      .filter(s => s.start.getTime() <= currentTime && currentTime <= s.end.getTime())
  }, 3000)

  async function prepareRoomStatus () {
    const apiEndPoint = import.meta.env.VITE_ROOM_STATUS_API
    if (!apiEndPoint || typeof apiEndPoint !== 'string') return
    if (!socket) {
      socket = io(apiEndPoint)
      socket.emit('data')
    }
    socket.on('data', (data: Record<RoomId, boolean>) => { roomsIsFull.value = data })
    socket.on('update', (diff: Record<RoomId, boolean>) => {
      Object.keys(diff).forEach((key) => {
        roomsIsFull.value[key] = diff[key]
      })
    })
  }

  watch(TIMEZONE_OFFSET, (oldVal, newVal) => {
    if (oldVal === newVal) return
    isLoaded.value = false
    load()
  })

  return {
    isLoaded,
    currentDayIndex,
    daysSchedule,
    roomsStatusMap,
    getSessionById,
    getRoomById,
    getRoomStatusById,
    load,
    TIMEZONE_OFFSET
  }
}

export const useSession = createModuleHook(PROVIDE_KEY, _useSession)
