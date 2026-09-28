/** 'yyyy-MM-dd' を 'yyyy/MM/dd' に整形する。想定外の値はそのまま返す */
export const formatDate = (isoDate: string): string => {
  const [year, month, day] = isoDate.split('-')
  if (!year || !month || !day) return isoDate
  return `${year}/${month}/${day}`
}

/** 今日の日付を 'yyyy-MM-dd' で返す。フォームの期限の初期値に使う */
export const today = (): string => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
