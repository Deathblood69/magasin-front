describe('Resident', () => {
  it('check profil administrateur', () => {
    cy.login('administrateur')
    cy.intercept('/api/resident*', {
      data: [],
      meta: {
        itemsPerPage: 20,
        totalItems: 0,
        currentPage: 1,
        totalPages: 0,
        sortBy: [['idAnnudef', 'ASC']],
      },
    })
  })

  it('check profil operateur', () => {
    cy.login('operateur')
    cy.intercept('/api/resident*', {
      data: [],
      meta: {
        itemsPerPage: 20,
        totalItems: 0,
        currentPage: 1,
        totalPages: 0,
        sortBy: [['idAnnudef', 'ASC']],
      },
    })
  })

  it('check profil enroleur', () => {
    cy.login('enroleur')
    cy.intercept('/api/resident*', {
      data: [],
      meta: {
        itemsPerPage: 20,
        totalItems: 0,
        currentPage: 1,
        totalPages: 0,
        sortBy: [['idAnnudef', 'ASC']],
      },
    })
  })

  it('check champs obligatoire', () => {
    let interceptFlag = false
    cy.intercept('POST', '/api/resident*', (req) => {
      interceptFlag = true
    })
    cy.intercept('GET', '/api/resident*', {
      data: [],
      meta: {
        itemsPerPage: 20,
        totalItems: 0,
        currentPage: 1,
        totalPages: 0,
        sortBy: [['idAnnudef', 'ASC']],
      },
    })

    cy.login('enroleur')

    cy.get('.bg-primary.ml-3').click()
    cy.get('.v-card-actions > .bg-primary').click()

    cy.get('[iserror-id="cims"]').should('be.enabled')

    cy.wrap(interceptFlag).should('eq', false)
  })
  it('create resident ok', () => {
    cy.intercept('POST', '/api/resident*', (req) => {
      req.on('before:response', (res) => {
        expect(req.body).to.deep.equal({
          idAnnudef: 'r.esident',
          firstName: 'resident',
          lastName: 'esident',
          CIMS_cardNumber: '01984994',
          access: [
            {
              startDate: '1772755200000',

              endDate: '1773273600000',
              authorized: true,
              zone: {
                id: '09f9d2d1-fbd2-4df3-915d-eaa8a3dd5bd3',
                name: 'BALARD',
              },
            },
          ],
          disabled: false,
          gabarit: null,
          isCimsCarte: true,
        })
      })
      req.reply({
        statusCode: 201,
      })
    })

    cy.intercept('GET', '/api/zone', {fixture: 'zones.json'})
    cy.intercept('GET', '/api/resident*', {
      data: [],
      meta: {
        itemsPerPage: 20,
        totalItems: 0,
        currentPage: 1,
        totalPages: 0,
        sortBy: [['idAnnudef', 'ASC']],
      },
    })

    cy.login('enroleur')

    cy.get('.bg-primary.ml-3').click()

    let currentDate = new Date()
    let t = new Date().setDate(currentDate.getDate() + 10)
    let futureDate = new Date(t)
    console.log(currentDate, futureDate)
    cy.createResident(
      '01984994',
      'esident',
      'resident',
      '2026-03-06',
      '2026-03-12',
    )

    cy.get('[style="font-size: 1rem;"]').should('be.visible')
    cy.get('[style="font-size: 1rem;"]').should(
      'have.text',
      'Enregistrement reussi',
    )
    cy.get('.mdi-check-circle-outline').should('be.visible')
  })

  it('filtre resident', () => {
    cy.intercept('GET', '/api/resident*', {fixture: 'resident/residents.json'})
    cy.login('enroleur')

    cy.get('.v-data-table__tbody > :nth-child(1) > :nth-child(1)').should(
      'have.text',
      '01984994 ',
    )
    cy.get('.v-data-table__tbody > :nth-child(1) > :nth-child(2)').should(
      'have.text',
      'r.esident ',
    )
    cy.get('.v-data-table__tbody > :nth-child(2) > :nth-child(1)').should(
      'have.text',
      '02222222 ',
    )
    cy.get('.v-data-table__tbody > :nth-child(2) > :nth-child(2)').should(
      'have.text',
      'r.esident2 ',
    )
    cy.get('.v-data-table__tbody > :nth-child(3) > :nth-child(1)').should(
      'have.text',
      '01000000 ',
    )
    cy.get('.v-data-table__tbody > :nth-child(3) > :nth-child(2)').should(
      'have.text',
      'r.esident3 ',
    )

    cy.get(
      ':nth-child(1) > :nth-child(1) > .mdi-card-account-details-star',
    ).should('not.exist')
    cy.get(
      ':nth-child(2) > :nth-child(1) > .mdi-card-account-details-star',
    ).should('be.visible')
    cy.get(
      ':nth-child(3) > :nth-child(1) > .mdi-card-account-details-star',
    ).should('be.visible')

    cy.get('.mdi-account').should('have.class', 'mdi-account')
    cy.get(':nth-child(2) > :nth-child(5) > .mdi-account-off').should(
      'have.class',
      'mdi-account-off',
    )
    cy.get(':nth-child(3) > :nth-child(5) > .mdi-account-off').should(
      'have.class',
      'mdi-account-off',
    )
  })
  it('edit resident', () => {
    cy.login('enroleur')
    cy.intercept('/api/resident*', {fixture: 'resident/residents.json'})
    cy.intercept('POST', '/api/resident*', (req) => {
      req.on('before:response', (res) => {
        console.log('zefzzef')
        console.log(req.body)
        expect(req.body).to.deep.equal({
          idAnnudef: 'r.esident2',
          firstName: 'modification',
          lastName: 'test',
          CIMS_cardNumber: '11111111',
          access: [
            {
              startDate: '1709161200000',

              endDate: '1710025200000',
              authorized: true,
              zone: {
                id: '09f9d2d1-fbd2-4df3-915d-eaa8a3dd5bd3',
                name: 'BALARD',
              },
            },
          ],
          disabled: false,
          gabarit: null,
          isCimsCarte: true,
        })
      })
      req.reply({
        statusCode: 201,
      })
    })

    cy.findByRole('row', {name: /r.esident2/i}).within(()=>{
       cy.findByTitle('Modifier').click()
    })


    cy.get('[test-id="cims"]').clear()
    cy.get('[test-id="cims"]').type('11111111')

    cy.get('[test-id="lastName"]').clear()
    cy.get('[test-id="lastName"]').type('test')

    cy.get('[test-id="firstName"]').clear()
    cy.get('[test-id="firstName"]').type('modification')

    cy.get('.v-card-actions > .bg-primary > .v-btn__content').click()
  })


  it('edit nok champs obligatoire et annuler', () => {
    cy.login('enroleur')
    cy.intercept('/api/resident*', {fixture: 'resident/residents.json'})

    cy.findByRole('row', {name: /r.esident2/i}).within(()=>{
      cy.findByTitle('Modifier').click()
    })

    cy.get('[test-id="cims"]').clear()

    cy.get('[test-id="lastName"]').clear()

    cy.get('[test-id="firstName"]').clear()

    cy.get('.v-card-actions > .bg-primary > .v-btn__content').click()
    cy.get('.v-card-actions > .v-btn--variant-text > .v-btn__content').click()
    cy.get('.v-data-table__tbody > :nth-child(2) > :nth-child(1)').should(
      'have.text',
      '02222222 ',
    )
    cy.get('.v-data-table__tbody > :nth-child(2) > :nth-child(2)').should(
      'have.text',
      'r.esident2 ',
    )
    cy.get('.v-data-table__tbody > :nth-child(2) > :nth-child(3)').should(
      'have.text',
      'esident2 ',
    )
  })

  it('désactiver', () => {
    cy.login('enroleur')
    cy.intercept('/api/resident*', {fixture: 'resident/residents.json'})

    cy.findByRole('row', {name: /r.esident2/i}).within(()=>{
      cy.findByTitle('Désactiver').click()
    })

    cy.get('.v-card-actions > .bg-primary > .v-btn__content').should(
      'have.text',
      'Valider',
    )

    cy.get('.v-form').should(
      'have.text',
      'Voulez-vous vraiment désactiver ce resident ?',
    )
    cy.intercept('/api/resident*', {
      fixture: 'resident/residentsWithDisabled.json',
    })
    cy.get('.v-card-actions > .bg-primary > .v-btn__content').click()
    cy.get('.bg-grey-lighten-5 > :nth-child(2)').should('not.be.enabled')
  })

  it('consultation', () => {
    cy.login('enroleur')
    cy.intercept('/api/resident*', {fixture: 'resident/residents.json'})

    cy.findByRole('row', {name: /r.esident3/i}).within(()=>{
      cy.findByTitle('Consulter').click()
    })

    cy.get(
      '.v-form > :nth-child(1) > .v-table__wrapper > table > tbody > :nth-child(1) > td',
    ).should('have.text', '01000000 ')

    cy.get(':nth-child(5) > td').should('have.text', 'Aucun ')

    cy.get(':nth-child(1) > td > .mdi-card-account-details-star').should(
      'have.class',
      'mdi-card-account-details-star',
    )
  })
})
