/** タスクのステータス。文字列の直書きを防ぐため Union 型で定義する */
export type Status = '未対応' | '処理中' | '完了'

export interface Task {
  id: number
  title: string
  /** 'yyyy-MM-dd' で持ち、表示するときに yyyy/MM/dd へ整形する */
  dueDate: string
  status: Status
}
