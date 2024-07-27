/**
 * Supprime tout indice de tableau du paramètre de chaîne donné.
 *
 * @param {string} param - Le paramètre de chaîne à formater.
 * @return {string} Le paramètre de chaîne formaté sans aucun indice de tableau.
 */
export const formatSortBy = (param: string) => {
  return param.replace(/\[\d+]/g, '')
}
