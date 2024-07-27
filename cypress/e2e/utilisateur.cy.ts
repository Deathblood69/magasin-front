describe('utilisateur', () => {
  it('create ok', () => {
    cy.login('administrateur')

    cy.intercept('POST', '/api/user', (req) => {
      expect(req.body).to.deep.equal({
        firstName: 'Prenom',
        lastName: 'NOM',
        username: 'i.dentifiant',
        password: 'Azertyuiop123+',
        roles: ['ADMINISTRATEUR', 'OPERATEUR'],
        disabled: false,
        isLocked: false,
        dateLocked: 0,
        loginAttempts: 0,
      })
      req.reply({
        statusCode: 200,
      })
    })

    cy.findByText('Ajouter').click()

    const elements = [
      {
        libelle: 'Nom',
        value: 'nom',
      },
      {
        libelle: 'Prénom',
        value: 'prenom',
      },
      {
        libelle: 'Identifiant',
        value: 'i.dentifiant',
      },
      {
        libelle: 'Mot de passe',
        value: 'Azertyuiop123+',
      },
      {
        libelle: 'Confirmer le mot de passe',
        value: 'Azertyuiop123+',
      },
    ]

    elements.forEach((e) => {
      cy.get(`label:contains("${e.libelle}") + input`).clear().type(e.value)
    })

    cy.get('[data-testid="profils"]').click()
    cy.get('[data-testid="profils"]').children().first().click()
    cy.get('[data-testid="profils"]').children().last().click()
    // cy.get('#input-40').check()
    // cy.get('#input-44').check()
    cy.get('.v-card-actions > .bg-primary > .v-btn__content').click()
  })

  it('create nok champs obligatoire', () => {
    cy.login('administrateur')
    let interceptFlag = false
    cy.intercept('POST', '/api/user', (req) => {
      interceptFlag = true
    })

    cy.findByText('Ajouter').click()

    /* ==== Generated with Cypress Studio ==== */
    cy.get('.v-card-actions > .bg-primary > .v-btn__content').click()

    cy.get('#lastName-field').should('not.be.checked')

    cy.get('#firstName-field').should('not.be.checked')

    cy.wrap(interceptFlag).should('eq', false)

    cy.get('#password-field').should('not.be.checked')
  })

  it('create nok password  != ', () => {
    cy.login('administrateur')
    let interceptFlag = false
    cy.intercept('POST', '/api/user', (req) => {
      interceptFlag = true
    })

    cy.findByText('Ajouter').click()

    const elements = [
      {
        libelle: 'Mot de passe',
        value: 'Azertyuiop123+',
      },
      {
        libelle: 'Confirmer le mot de passe',
        value: 'Azertyuiop123+zdzd',
      },
    ]

    elements.forEach((e) => {
      cy.get(`label:contains("${e.libelle}") + input`).clear().type(e.value)
    })

    cy.get('.v-messages__message').should(
      'have.text',
      'Les mots de passe ne correspondent pas.',
    )
  })
})
