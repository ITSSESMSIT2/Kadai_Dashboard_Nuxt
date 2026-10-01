import type { Task } from '~/types/task'
import type { SortOrder, StatusFilter } from '~/types/filter'

/** 期限が未入力のタスクは、昇順・降順のどちらでも末尾に置く */
const compareMissingDueDate = (a: Task, b: Task): number => {
  if (Boolean(a.dueDate) === Boolean(b.dueDate)) return 0
  return a.dueDate ? -1 : 1
}

/**
 * タスクの絞り込みと並び替えをまとめた composable。
 *
 * 絞り込み条件と並び順は「画面の状態」なのでストアには置かない。
 * ストアに入れると localStorage に保存され、次に開いたとき前回の条件で
 * 絞り込まれた状態から始まってしまう。
 */
export const useTaskSearch = () => {
  const taskStore = useTaskStore()
  // 分割代入するとリアクティビティが切れるため storeToRefs を使う
  const { tasks } = storeToRefs(taskStore)

  const status = ref<StatusFilter>(null)
  const sortOrder = ref<SortOrder>('asc')

  /** ステータスで絞り込んだ一覧。未選択のときは絞り込まない */
  const filteredTasks = computed(() =>
    status.value === null
      ? tasks.value
      : tasks.value.filter((task) => task.status === status.value),
  )

  /**
   * 絞り込んだ結果を期限順に並べた一覧。元の配列は書き換えずコピーしてから sort する。
   * dueDate は 'yyyy-MM-dd' なので、文字列の辞書順がそのまま日付順になる。
   * 期限が同じときは追加順（id順）に固定し、並びが毎回変わらないようにする。
   */
  const sortedTasks = computed(() => {
    const direction = sortOrder.value === 'asc' ? 1 : -1
    return [...filteredTasks.value].sort(
      (a, b) =>
        compareMissingDueDate(a, b) ||
        a.dueDate.localeCompare(b.dueDate) * direction ||
        a.id - b.id,
    )
  })

  return { tasks, status, sortOrder, sortedTasks }
}
