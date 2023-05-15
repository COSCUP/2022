<!--
  Copyright (c) 2020 DevilTea

  This software is released under the MIT License.
  https://opensource.org/licenses/MIT
-->

<template>
  <main id="session" class="page-container">
    <ScheduleNavbar :currentTimeZone="currentTimeZone" />
    <div>
      <div class="timezone-wrapper">
        <div class="title-wrapper">
          <span>TimeZone:</span>
          <button
            v-show="isChangeTimeZone"
            class="side-title"
            type="button"
            @click="resetTimeZone"
          >Use event time zone</button>

        </div>
        <div class="time-zone-container">
          <p v-show="!isChangeTimeZone" class="time-zone-input">
            {{ currentTimeZone }} 帶入時區字串
          </p>
          <input
            v-show="isChangeTimeZone"
            placeholder=""
            v-model="inputTimeZone"
            class="time-zone-input"
          />
          <button
            v-show="!isChangeTimeZone"
            type="button"
            @click="showChangeTimeZone"
          >
            change
          </button>
          <button v-show="isChangeTimeZone" type="button" @click="saveTimeZone">
            Save
          </button>
        </div>
      </div>
    </div>
    <template v-for="(schedule, index) in daysSchedule">
      <ScheduleList
        v-if="xsOnly"
        v-show="currentDayIndex === index"
        :key="`list-${schedule.day.join('')}`"
        :list="schedule.list"
      />
      <ScheduleTable
        v-else
        v-show="currentDayIndex === index"
        :key="`table-${schedule.day.join('')}`"
        :table="schedule.table"
        :currentTimeZone="currentTimeZone"
      />
    </template>
  </main>
</template>

<script lang="ts">
import { defineComponent, watch, ref, onMounted } from 'vue'
import { useBreakpoints } from '@/modules/breakpoints'
import { useSession } from '@/modules/session'
import ScheduleNavbar from '@/components/Session/ScheduleNavbar.vue'
import ScheduleTable from '@/components/Session/ScheduleTable.vue'
import ScheduleList from '@/components/Session/ScheduleList.vue'

import '@/assets/scss/pages/session.scss'
import { usePopUp } from '@/modules/pop-up'
import { useRoute, useRouter } from 'vue-router'
import { generateSessionPopupData } from '@/modules/session/logic'
import { useI18n } from 'vue-i18n'
import { Locale } from '@/modules/i18n'
import { isClient } from '@vueuse/shared'
import communityData from '@/assets/json/community.json'
import { Session } from '@/modules/session/types'
import { calculateTimezoneOffset, deviceTimezone } from '@/modules/session/timezone'
export default defineComponent({
  name: 'Session',
  components: {
    ScheduleNavbar,
    ScheduleTable,
    ScheduleList
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const { load, daysSchedule, currentDayIndex, getSessionById, isLoaded, TIMEZONE_OFFSET } =
      useSession()
    const { openPopUp, removeAll } = usePopUp()
    const { xsOnly } = useBreakpoints()
    const { locale } = useI18n()

    const currentTimeZone = ref('')
    const inputTimeZone = ref('')
    const isChangeTimeZone = ref(false)
    //  取得當前時區
    const getCurrentTimeZone = async () => {
      try {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
        // 更新當前時區
        currentTimeZone.value = timeZone
      } catch (error) {
        console.error('取得當前時區:', error)
      }
    }

    function getCommunityFromSession (session: Session) {
      return communityData.communities.find(
        (c) => c.track === session.type['zh-TW'].name
      )
    }

    function tryToOpenSessionPopUp () {
      const [bool, sessionId] = [
        isLoaded.value,
        route.params.sessionId as string
      ]
      if (!bool) return
      if (typeof sessionId !== 'string') {
        removeAll((popUpData) => !popUpData.popupId?.startsWith('session-'))
        return
      }

      const onClose = () => {
        router.push({
          name: route.query.from === 'Room' ? 'Room' : 'Session'
        })
      }
      if (sessionId === 'template') {
        openPopUp({
          popupId: 'session-template',
          metaOptions: {
            title: '@{TEMPLATE_META_TITLE}',
            description: '@{TEMPLATE_META_DESCRIPTION}',
            ogUrl: '@{TEMPLATE_META_OG_URL}',
            ogImage: '@{TEMPLATE_META_OG_IMAGE}'
          },
          containerData: {
            type: 'default'
          },
          contentData: {
            type: 'html',
            html: '@{TEMPLATE_CONTENT_HTML}'
          },
          onClose
        })
      } else {
        openPopUp({
          ...generateSessionPopupData(
            getSessionById(sessionId),
            getCommunityFromSession(getSessionById(sessionId)),
            locale.value as Locale
          ),
          onClose
        })
      }
    }

    const showChangeTimeZone = () => {
      inputTimeZone.value = currentTimeZone.value
      isChangeTimeZone.value = true
    }

    const saveTimeZone = () => {
      console.log(calculateTimezoneOffset(inputTimeZone.value))
      console.log('saveTimeZone')
      TIMEZONE_OFFSET.value = calculateTimezoneOffset(inputTimeZone.value)
    }

    const resetTimeZone = () => {
      inputTimeZone.value = deviceTimezone
    }

    tryToOpenSessionPopUp()
    watch(
      () => [route.params.sessionId, isLoaded.value],
      () => {
        tryToOpenSessionPopUp()
      }
    )

    isClient &&
      watch(currentDayIndex, async () => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      })

    onMounted(getCurrentTimeZone)

    return {
      xsOnly,
      currentDayIndex,
      daysSchedule,
      load,
      tryToOpenSessionPopUp,
      route,
      currentTimeZone,
      getCurrentTimeZone,
      inputTimeZone,
      isChangeTimeZone,
      saveTimeZone,
      showChangeTimeZone,
      resetTimeZone,
      TIMEZONE_OFFSET
    }
  },
  async serverPrefetch () {
    await this.load()
    if (this.route.params.sessionId) {
      this.tryToOpenSessionPopUp()
    }
  }
})
</script>

<style scoped lang="scss">
.timezone-wrapper {
  width: 20rem;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 0.5rem;

  .title-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .side-title {
      font-size: 0.6rem;
      text-align: right;
      cursor: pointer;
      background-color: transparent;
      border: none;
      color: #3b9838;
    }
  }

  .time-zone-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    button {
      cursor: pointer;
      background-color: transparent;
      border: none;
      color: white;
      border: 1px solid white;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;

      &:hover {
        background-color: #80808033;
        color: #3b9838;
      }
    }
  }
}

.time-zone-input {
  font-size: 1rem;
  font-weight: 500;
}
</style>
