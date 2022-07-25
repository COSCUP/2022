/* eslint-disable camelcase */
import axios from 'axios'
import md5 from 'js-md5'
import { saveJSON } from './utils'
import { join } from 'path'
import dotenv from 'dotenv'

dotenv.config()
dotenv.config({ path: join(__dirname, '../../.env.local') })

const pretalxOptions = { headers: { Authorization: `Token ${process.env.PRETALX_TOKEN}` } }

const SPEAKER_ZH_NAME_ID = 0
const SPEAKER_ZH_BIO_ID = 0
const SPEAKER_EN_NAME_ID = 0
const SPEAKER_EN_BIO_ID = 1798
const SESSION_ZH_DESCRIPTION_ID = 0
const SESSION_EN_TITLE_ID = 1800
const SESSION_EN_DESCRIPTION_ID = 1797
const SESSION_TAGS_ID = 1594
const SESSION_CO_WRITE_ID = 0
const SESSION_QA_ID = 0
const SESSION_SLIDE_ID = 0
const SESSION_RECORD_ID = 0

function genResult (talks, rooms, speakers) {
  function getAnswer<T extends { answers: Array<{ question: { id: number }, answer: string }>, [name: string]: string | any }> (
    data: T,
    id: number,
    fallback: string | null
  ): string | null {
    const answer = data.answers.find((a :any) => a.question.id === id)?.answer
    return (!answer || answer === '-') ? fallback : answer
  }

  const resRooms = rooms.results.map(r => {
    return {
      id: r.name.en || r.name['zh-tw'],
      zh: {
        name: r.name['zh-tw']
      },
      en: {
        name: r.name.en || r.name['zh-tw']
      }
    }
  })

  const resSpeakers = speakers.results.map(s => {
    return {
      id: s.code,
      avatar: s.avatar || `https://www.gravatar.com/avatar/${md5(s.email)}?s=1024&d=identicon&r=g`,
      zh: {
        name: getAnswer(s, SPEAKER_ZH_NAME_ID, s.name),
        bio: getAnswer(s, SPEAKER_ZH_BIO_ID, s.biography || '')
      },
      en: {
        name: getAnswer(s, SPEAKER_EN_NAME_ID, s.name),
        bio: getAnswer(s, SPEAKER_EN_BIO_ID, s.biography || '')
      }
    }
  })

  const tracks = talks.results.map(s => s.track).filter((t, i, s) => i === s.findIndex(tt => tt?.['zh-tw'] === t?.['zh-tw'] && tt?.en === t?.en))
  const resSessionTypes = tracks.map(t => {
    return {
      id: Math.random().toString(36).substring(2, 8),
      zh: {
        name: t?.['zh-tw'] || t?.en
      },
      en: {
        name: t?.en || t?.['zh-tw']
      }
    }
  })

  const resTags = [
    {
      id: 'Beginner',
      zh: {
        name: '入門'
      },
      en: {
        name: 'Beginner'
      }
    },
    {
      id: 'Skilled',
      zh: {
        name: '中階'
      },
      en: {
        name: 'Skilled'
      }
    },
    {
      id: 'Advance',
      zh: {
        name: '進階'
      },
      en: {
        name: 'Advance'
      }
    }
  ]

  const resSessions = talks.results.map((s :any) => {
    return {
      id: s.code,
      type: resSessionTypes.find((t :any) => s.track?.['zh-tw'] === t.zh.name || s.track?.en === t.en.name).id,
      room: s.slot.room?.en || s.slot.room?.['zh-tw'],
      start: s.slot.start,
      end: s.slot.end,
      language: s.content_locale === 'zh-tw' ? '華語' : 'English',
      zh: {
        title: s.title,
        description: getAnswer(s, SESSION_ZH_DESCRIPTION_ID, s.abstract || '')
      },
      en: {
        title: getAnswer(s, SESSION_EN_TITLE_ID, s.title),
        description: getAnswer(s, SESSION_EN_DESCRIPTION_ID, s.abstract || '')
      },
      speakers: s.speakers.map(ss => ss.code),
      tags: s.answers.find(a => a.question.id === SESSION_TAGS_ID) !== undefined ? [s.answers.find(a => a.question.id === SESSION_TAGS_ID).options[0].answer.en] : [],
      co_write: getAnswer(s, SESSION_CO_WRITE_ID, null),
      qa: getAnswer(s, SESSION_QA_ID, null),
      slide: getAnswer(s, SESSION_SLIDE_ID, null),
      record: getAnswer(s, SESSION_RECORD_ID, null),
      uri: `https://coscup.org/2022/session/${s.code}`
    }
  })

  return {
    sessions: resSessions,
    speakers: resSpeakers,
    session_types: resSessionTypes,
    rooms: resRooms,
    tags: resTags
  }
}

export default async function run () {
  let data = {}
  try {
    const results = await Promise.all([
      axios.get('https://pretalx.com/api/events/coscup-2022/talks/?limit=1000', pretalxOptions),
      axios.get('https://pretalx.com/api/events/coscup-2022/rooms/?limit=1000', pretalxOptions),
      axios.get('https://pretalx.com/api/events/coscup-2022/speakers/?limit=1000', pretalxOptions)
    ])
    data = genResult(results[0].data, results[1].data, results[2].data)
  } catch (e) {
    console.error(e)
    const { data: d } = await axios.get('https://coscup.org/2022/json/session.json')
    data = d
  }
  saveJSON('session', data)
}
