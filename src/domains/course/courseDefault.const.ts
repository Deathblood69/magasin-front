import type {Course} from '~/domains/course/course'

/**
 * Valeur par défaut d'un utilisateur dans un formulaire
 */
export const DEFAULT_COURSE: Omit<Course, 'id'> = {
  nom: '',
  stock: 0,
  prix: 0
}
