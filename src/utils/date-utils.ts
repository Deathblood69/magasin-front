export class DateUtils {
  static dateToStringMS(date: Date) {
    return date.getTime().toString()
  }

  static msStringToDate(msString: string) {
    return new Date(parseInt(msString))
  }
}
