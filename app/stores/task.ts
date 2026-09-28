import type { Task } from '~/types/task'

/** タスクの唯一の情報源。画面はここを読み、更新は action を通す */
export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Task[],
  }),
})
