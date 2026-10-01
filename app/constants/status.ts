import type { Status } from '~/types/task'

/** ステータスの選択肢。文字列を画面ごとに直書きしないため、ここにまとめる */
export const STATUSES: Status[] = ['未対応', '処理中', '完了']

/**
 * ステータスごとの見た目を切り替えるクラス名。
 * 色そのものは使う側の scoped style で定義する（一覧は枠と背景、トップは文字色だけ変える）。
 */
export const STATUS_CLASS: Record<Status, string> = {
  未対応: 'is-todo',
  処理中: 'is-doing',
  完了: 'is-done',
}
