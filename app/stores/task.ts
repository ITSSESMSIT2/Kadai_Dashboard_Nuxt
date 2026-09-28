import type { Task } from '~/types/task'

/** タスクの唯一の情報源。画面はここを読み、更新は action を通す */
export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Task[],
  }),
  actions: {
    /** タスクを1件追加する。id は既存の最大値 + 1（削除後も重複しない） */
    addTask(input: Omit<Task, 'id'>) {
      const nextId = this.tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1
      this.tasks.push({ id: nextId, ...input })
    },
  },
})
