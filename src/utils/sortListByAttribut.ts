/**
 * Tri la liste par attribut donné.
 * @param list - La liste à trier.
 * @param options - Les options de tri.
 * @returns La liste triée.
 */
export const sortListByAttribute = <T>(
  list: T[],
  options: {key: string; order: 'asc' | 'desc'},
): T[] => {
  const asc = options.order === 'asc' ? 1 : -1
  return list.sort((a, b) =>
    reachDepth<T>(a, {attrLink: options.key}) <
    reachDepth<T>(b, {attrLink: options.key})
      ? -asc
      : asc,
  )
}
