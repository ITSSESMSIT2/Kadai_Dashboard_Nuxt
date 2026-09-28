/** 'yyyy-MM-dd' を 'yyyy/MM/dd' に整形する。想定外の値はそのまま返す */
export const formatDate = (isoDate: string): string => {
  const [year, month, day] = isoDate.split('-')
  if (!year || !month || !day) return isoDate
  return `${year}/${month}/${day}`
}
