/**
 * Tronque une chaîne de caractères si elle dépasse une certaine longueur.
 * @param str La chaîne de caractères à tronquer.
 * @param length La longueur maximale autorisée pour la chaîne.
 * @param pClamp La chaîne à ajouter en fin de troncature. Par défaut, '...'.
 * @returns La chaîne tronquée si elle est trop longue, sinon la chaîne d'origine.
 */
export function truncate(str: string, length: number, pClamp?: string): string {
  const clamp = pClamp ?? '...'
  return `${str.slice(0, length)}${clamp}`
}
