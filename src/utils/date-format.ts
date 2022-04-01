import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export function FormutcToString(utcstring: string, format = DATE_TIME_FORMAT) {
  return dayjs.utc(utcstring).utcOffset(8).format(format)
}
