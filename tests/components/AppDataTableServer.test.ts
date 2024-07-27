import {describe, expect, test} from 'vitest'
import {mount} from '@vue/test-utils'
import AppDataTableServer from '../../src/components/AppDataTableServer.vue'
import {vuetify} from '../../src/plugins/vuetify'

describe('Tests de AppDataTableServer', () => {
  interface Props {
    headers: any[]
    items: any[]
    itemsLength?: number
    itemsPerPage: number
    itemsPerPageTextName: string
    page: number
    totalPages?: number
    loading: boolean
    error: boolean
  }

  const props: Props = {
    headers: [
      {title: 'Nom', key: 'lastName', align: 'start'},
      {title: 'Prénom', key: 'firstName', align: 'start'},
    ],
    items: [
      {lastName: 'Durand', firstName: 'Stéphane'},
      {lastName: 'Durand', firstName: 'Isabelle'},
      {lastName: 'Morel', firstName: 'Benjamin'},
    ],
    itemsPerPage: 10,
    itemsPerPageTextName: 'Items par page',
    page: 1,
    loading: false,
    error: false,
  }
  test('Cas Nominal', () => {
    const wrapper = mount(AppDataTableServer, {
      props: props,
      global: {
        plugins: [vuetify],
      },
    })
    const headersDuTableau = wrapper.findAll('th')
    expect(headersDuTableau.length).toBe(2)
    const lignesDuTableau = wrapper.findAll('tr')
    expect(lignesDuTableau.length).toBe(4)
  })
  test('Aucunes props valides', () => {
    const wrapper = mount(AppDataTableServer, {
      props: {
        headers: [],
        items: [],
        itemsPerPage: -1,
        itemsPerPageTextName: '',
        page: -1,
        loading: false,
        error: false,
      },
      global: {
        plugins: [vuetify],
      },
    })
    expect(wrapper).toBeDefined()
  })
  test('Tableau sans données', () => {
    const wrapper = mount(AppDataTableServer, {
      props: {...props, items: []},
      global: {
        plugins: [vuetify],
      },
    })
    const lignesDuTableau = wrapper.findAll('tbody  tr')
    expect(lignesDuTableau.length).toBe(1)

    // Recherchez le texte dans le composant
    const texteTrouve = wrapper.text().includes('Aucun résultat')

    // Vérifiez si le texte recherché existe dans le composant
    expect(texteTrouve).toBeTruthy()
  })
  test('Tableau sans en-têtes', () => {
    const wrapper = mount(AppDataTableServer, {
      props: {
        ...props,
        headers: [],
      },
      global: {
        plugins: [vuetify],
      },
    })
    const headersDuTableau = wrapper.findAll('th')
    expect(headersDuTableau.length).toBe(0)
  })
  test('Tableau en chargement', () => {
    const wrapper = mount(AppDataTableServer, {
      props: {
        ...props,
        loading: true,
      },
      global: {
        plugins: [vuetify],
      },
    })
    // Vérifiez si un seul tr du tableau a une classe spécifique
    const element = 'tr.v-data-table-progress'
    // Assurez-vous qu'un seul élément est trouvé
    expect(wrapper.findAll(element)).toHaveLength(1)
  })
  test('Tableau en erreur', () => {
    const wrapper = mount(AppDataTableServer, {
      props: {
        ...props,
        items: [],
        error: true,
      },
      global: {
        plugins: [vuetify],
      },
    })
    // Vérifiez si un seul tr du tableau a une classe spécifique
    const element = 'div.v-alert'
    // Assurez-vous qu'un seul élément est trouvé
    expect(wrapper.findAll(element)).toHaveLength(1)
  })
  test("Changement du nombre d'élément affichés", async () => {
    const items: any[] = []
    for (let i = 0; i < 30; i++) {
      items.push({lastName: 'Durand', firstName: i.toString()})
    }

    function getItemsByPageAndItemsByPage(page: number, itemsPerPage: number) {
      // Calculez l'index de début en fonction du numéro de page et du nombre d'items par page
      const startIndex = (page - 1) * itemsPerPage

      return items.slice(startIndex, startIndex + itemsPerPage)
    }

    const itemsFiltered = getItemsByPageAndItemsByPage(
      props.page,
      props.itemsPerPage,
    )

    const wrapper = mount(AppDataTableServer, {
      props: {
        ...props,
        items: itemsFiltered,
        itemsPerPage: props.itemsPerPage,
      },
      global: {
        plugins: [vuetify],
      },
    })

    // Vérifiez le nombre initial d'éléments
    expect(wrapper.findAll('tbody tr')).toHaveLength(props.itemsPerPage)

    await wrapper.setProps({itemsPerPage: 25})

    const newItemsFiltered = getItemsByPageAndItemsByPage(
      wrapper.vm.page,
      wrapper.vm.itemsPerPage,
    )

    await wrapper.setProps({items: newItemsFiltered})

    expect(wrapper.findAll('tbody tr')).toHaveLength(25)
  })
})
