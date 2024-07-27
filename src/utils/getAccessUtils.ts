export const getAccessUtils = (
  authorized: boolean,
  options: {startDate: string; endDate: string},
) => {
  const todayLocal = new Date().setHours(0, 0, 0, 0)

  /**
   * La date est valide si :
   * - la date de debut est inférieure ou égale à la date d'aujourd'hui
   * - la date de fin est supérieure ou égale à la date d'aujourd'hui
   */
  const dateIsValid =
    !!options?.startDate &&
    !!options?.endDate &&
    new Date(parseInt(options.startDate, 10)).setHours(0, 0, 0, 0) <=
      todayLocal &&
    new Date(parseInt(options.endDate, 10)).setHours(0, 0, 0, 0) >= todayLocal

  const icon = authorized
    ? dateIsValid
      ? 'mdi-account-lock-open'
      : 'mdi-account-clock'
    : 'mdi-account-lock'

  const color = authorized ? (dateIsValid ? 'success' : 'warning') : 'error'

  const text = authorized
    ? dateIsValid
      ? 'Autorisé'
      : 'Connu'
    : 'Non-autorisé'

  return {
    icon,
    color,
    text,
  }
}
