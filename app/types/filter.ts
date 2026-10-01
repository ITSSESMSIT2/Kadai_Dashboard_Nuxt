import type { Status } from '~/types/task'

/** 一覧の絞り込みに使うステータス。null なら絞り込まない（すべて表示） */
export type StatusFilter = Status | null

/** 期限の並び順 */
export type SortOrder = 'asc' | 'desc'
