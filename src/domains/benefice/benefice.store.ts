import type {Benefice} from '~/domains/benefice/benefice'
import {PATHS_API} from '~/constants/pathsAPI.const'
import type {Course} from '~/domains/course/course'

export const useBeneficeStore = defineStore('benefice', () => {
  const {data: entities} = useFetchService<Benefice[]>(
    `${PATHS_API.benefice}/all`
  )

  function findBeneficeByCourse(course: Course) {
    return entities.value?.find((e) => e.course === course.id)
  }

  return {entities, findBeneficeByCourse}
})
