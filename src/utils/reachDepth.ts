/**
 * Cette fonction atteint la profondeur d'un objet en fonction d'un chemin d'attributs donné.
 * @param object L'objet à parcourir.
 * @param options Les options contenant le chemin d'attributs (attrLink).
 * @returns La valeur de l'attribut final ou 'undefined' si le chemin d'attributs est inexistant.
 */
export const reachDepth = <T>(object: T, options: {attrLink: string}): any => {
  if (object && options.attrLink) {
    const attrsLink: string[] = options.attrLink.split('.')
    if (attrsLink.length === 1) {
      if (Array.isArray(object)) {
        return object.map((o) => o[attrsLink[0]]).join(', ')
      }
      return object[attrsLink[0] as keyof T]
    } else {
      return reachDepth(object[attrsLink[0] as keyof T], {
        attrLink: attrsLink.join('.'),
      })
    }
  } else {
    return 'undefined'
  }
}
