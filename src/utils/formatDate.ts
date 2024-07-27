/**
 * Formate une date au format 'fr-FR'.
 * @param date - La date à formater en format string.
 * @returns La date formatée au format 'fr-FR'.
 */
export const formatDate = (date: string) => {
  try {
    const dateMS = parseInt(date, 10)
    const newDate = new Date(dateMS)
    return newDate.toLocaleDateString('fr-FR')
  } catch (e) {
    return 'Invalid Date'
  }
}
