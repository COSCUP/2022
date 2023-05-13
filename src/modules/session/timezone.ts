import { utcToZonedTime, getTimezoneOffset } from 'date-fns-tz'

export function calculateTimezoneOffset (timeZone:string): number {
  const deviceIsoDate = new Date()
  const currentTimezoneDate = utcToZonedTime(deviceIsoDate, timeZone)// 當前時區轉為指定時區
  console.log('Asia/Tashkent時區', currentTimezoneDate)
  const utc0 = 0
  const offsetMilliseconds = getTimezoneOffset(timeZone, new Date())
  const result = utc0 - offsetMilliseconds / 60000
  console.log('result', result)
  return result
}

export function getDeviceTimezone (): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

export function setFlag () {
  localStorage.setItem('isTimezoneChanged', 'true')
  console.log('123412412412')
  return true
}