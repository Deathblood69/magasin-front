import type {Catalogue} from '~/domains/catalogue/catalogue'
import {PATHS_API} from '~/constants/pathsAPI.const'

export const useCatalogueStore = defineStore('catalogue', () => {
  const {data: entities} = useFetchService<Catalogue[]>(
    `${PATHS_API.catalogue}/all`
  )

  function findByProduitNom(nom: string) {
    return entities.value?.find((e) => e.nom === nom)
  }

  return {entities, findByProduitNom}
})
