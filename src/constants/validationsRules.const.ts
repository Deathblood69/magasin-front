/**
 * Liste des règles de validation du formulaire
 */
export const VALIDATIONS_RULES = {
  required: (v: string) => !!v || 'Ce champ est requis !',
  // Ajout de la règle pour le nom et prénom
  nameFormat: (v: string) => {
    const pattern =
      /^[A-Za-z'"\-_éèêëûüùîïöôàâäç]+(?: [A-Za-z'"\-_éèêëûüùîïöôàâäç]+)?$/
    return (
      pattern.test(v) ||
      'Peut contenir uniquement les caractères spéciaux suivants : \' " - _ é è ê ë û ü ù î ï ö ô à â ä\n' +
        'ç  et ne doit pas contenir de chiffres'
    )
  },

  notEmpty: (v: Array<unknown>) =>
    v.length > 0 || 'Ce champ ne doit pas être vide !',
  annudefFormat: (v: string) => {
    const pattern = /\b.*\..*\b$/
    return (
      pattern.test(v) ||
      'Veuillez respecter le format identifiant annudef (XXX.XXX)'
    )
  },
  passwordValid: (v: string) => {
    if (v === undefined) {
      return true
    }
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{12,30}$/
    return (
      pattern.test(v) ||
      'Le mot de passe doit contenir au moins 12 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.'
    )
  },
  email: (v: string) => {
    const pattern = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
    return pattern.test(v) || 'Adresse mail invalide !'
  },
  nbCaraMax: (v: string, nb: number) => {
    return (
      v === null ||
      v.length <= nb ||
      `Le champ doit avoir moins de ${nb} caractères`
    )
  },
  onlyNumber: (v: string) => {
    return (
      v === null ||
      v === '' ||
      /^\d+$/.test(v) ||
      'Ce champ ne doit contenir que des chiffres'
    )
  },
  fileName: (v: string) => {
    const pattern = /^[A-Za-z0-9_-]+$/
    return (
      pattern.test(v) ||
      'Le nom du fichier est invalide (lettres, chiffres, caractères "-"  et "_" autorisés uniquement)'
    )
  },
  csv: (v: Array<File>) => {
    const types = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ]
    if (v.length <= 0) return 'Veuillez sélectionner un fichier CSV'

    if (v.some((file) => !types.includes(file.type)))
      return "Un des fichiers n'est pas un CSV"

    return true
  },
}
