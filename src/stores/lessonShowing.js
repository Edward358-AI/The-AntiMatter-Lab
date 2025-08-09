import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLessonShowingStore = defineStore('lessonShowing', () => {
  const lessonShowing = ref(true)

  return { lessonShowing }
})