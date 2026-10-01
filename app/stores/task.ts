import type { Status, Task } from '~/types/task'
import { STATUSES } from '~/constants/status'

/** タスクの唯一の情報源。画面はここを読み、更新は action を通す */
export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Task[],
  }),
  getters: {
    /** ステータスごとの件数。トップページの件数サマリで使う */
    countByStatus(): Record<Status, number> {
      const counts = Object.fromEntries(STATUSES.map((status) => [status, 0])) as Record<Status, number>
      for (const task of this.tasks) counts[task.status] += 1
      return counts
    },
  },
  actions: {
    /** タスクを1件追加する。id は既存の最大値 + 1（削除後も重複しない） */
    addTask(input: Omit<Task, 'id'>) {
      const nextId = this.tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1
      this.tasks.push({ id: nextId, ...input })
    },

    /** 指定したタスクのステータスを変更する */
    updateStatus(id: number, status: Status) {
      const target = this.tasks.find((task) => task.id === id)
      if (target) target.status = status
    },

    /** 指定したタスクを削除する */
    removeTask(id: number) {
      this.tasks = this.tasks.filter((task) => task.id !== id)
    },
  },

  // リロードしても残るよう localStorage に保存する（加点要件）
  persist: {
    // キーは明示する。GitHub Pages は itssesmsit2.github.io の1オリジンに全リポジトリが
    // 載るため、既定値のストアID 'task' のままだと他の課題と衝突しうる
    key: 'kadai-dashboard-nuxt.task',

    // 保存先も明示する。Nuxt版の既定は Cookie（useCookie）で、4KB制限があるうえ
    // 同一オリジンの全リクエストに載る。タスク本体の保存先には向かない
    storage: piniaPluginPersistedstate.localStorage(),

    afterHydrate(context) {
      // localStorage の中身は手で書き換えられるし、型を変えれば古い形のデータも残る。
      // プラグインは中身を検証しないので、復元した値は信用せず型に合うものだけ残す
      const state = context.store.$state as { tasks: unknown }
      state.tasks = Array.isArray(state.tasks)
        ? state.tasks.filter(
            (task) =>
              task &&
              Number.isSafeInteger(task.id) &&
              typeof task.title === 'string' &&
              typeof task.dueDate === 'string' &&
              STATUSES.includes(task.status),
          )
        : []
    },
  },
})
