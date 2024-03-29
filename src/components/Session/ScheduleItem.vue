<!--
  Copyright (c) 2020 DevilTea

  This software is released under the MIT License.
  https://opensource.org/licenses/MIT
-->

<template>
  <router-link v-if="isLoaded" class="schedule-item" :to="location">
    <section class="content-section">
      <h4 class="track">
        <div
          v-show="xsOnly"
          class="room"
          :class="{
            full: isFull,
          }"
        >
          <span class="status">{{ statusText }}</span>
          <span class="name">{{ room }}</span>
        </div>
        <span>{{ track }}</span>
      </h4>
      <!--  -->
      <h4 class="period">{{ period }}</h4>
      <!--  -->
      <h2 class="title">{{ title }}</h2>
      <!--  -->
      <h3 class="speaker-list">
        <span>by</span>
        <span
          v-for="(name, i) in speakers"
          :key="`session-${sessionId}-speaker-${i}`"
          class="speaker"
        >
          {{ name }}
        </span>
      </h3>
      <!--  -->
      <div class="tag-list">
        <span
          v-for="(name, i) in tags"
          :key="`tag-${sessionId}-tag-${i}`"
          class="tag"
        >
          {{ name }}
        </span>
      </div>
    </section>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useBreakpoints } from '@/modules/breakpoints'
import { useI18n } from 'vue-i18n'
import { Locale } from '@/modules/i18n'
import { formatTimeString } from '@/modules/session/utils'
import { useSession } from '@/modules/session'

export default defineComponent({
  name: 'ScheduleItem',
  props: {
    sessionId: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const { t, locale } = useI18n()
    const { xsOnly } = useBreakpoints()
    const { isLoaded, getSessionById } = useSession()
    // const roomsStatus = inject<ComputedRef<Record<string, boolean>>>('roomsStatus') || { value: {} }
    const session = computed(() => getSessionById(props.sessionId))
    const location = computed(() => {
      return {
        name: 'SessionDetail',
        params: {
          sessionId: session.value.id
        }
      }
    })
    const track = computed(() => session.value.type[locale.value as Locale].name)
    const period = computed(() => `${formatTimeString(session.value.start, '：')} ~ ${formatTimeString(session.value.end, '：')}`)
    const title = computed(() => session.value[locale.value as Locale].title)
    const speakers = computed(() => session.value.speakers.map((speaker) => speaker[locale.value as Locale].name))
    const tags = computed(() => session.value.tags.map((tag) => tag[locale.value as Locale].name))
    const language = computed(() => session.value.language)
    const room = computed(() => session.value.room[locale.value as Locale].name.split(' / ')[0])

    // const isFull = computed(() => !!(roomsStatus.value[session.value.room.id]))
    const isFull = ref(false)
    const statusText = computed(() => t(`session['room-status'].${isFull.value ? 'full' : 'vacancy'}`))

    return {
      isLoaded,
      xsOnly,
      location,
      track,
      period,
      title,
      speakers,
      tags,
      language,
      room,
      isFull,
      statusText
    }
  }
})
</script>
