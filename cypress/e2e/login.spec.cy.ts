describe('Login spec', () => {
  it('login form with enter', () => {
    cy.login('administrateur')

    cy.get('.mdi-menu').should('be.visible')
  })

  it('login nok bad pwd', () => {
    cy.visit('/')
    cy.intercept('/api/auth/login', {
      statusCode: 401,
      fixture: 'auth/badPwd1.json',
    })

    /* ==== Generated with Cypress Studio ==== */
    cy.findByLabelText('Identifiant').type('d.dev')
    cy.findByLabelText('Mot de passe').type('aaaaa')

    cy.findByRole('main').type('{enter}')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.v-alert-title').should('be.visible')
    cy.get('.v-alert-title').should('have.text', 'Erreur connexion')
    cy.get('.v-alert__content').should(
      'have.text',
      'Erreur connexionVeuillez saisir des identifiants valides svp.',
    )
    /* ==== End Cypress Studio ==== */
  })

  it('login nok login vide', () => {
    cy.visit('/')

    cy.findByLabelText('Identifiant').clear()
    cy.findByLabelText('Mot de passe').clear()

    cy.findByRole('main').type('{enter}')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#input-0-messages > .v-messages__message').should(
      'have.text',
      'Ce champ est requis !',
    )
    cy.get('#input-0-messages > .v-messages__message').should('be.visible')
    cy.get('#input-0-messages > .v-messages__message').should(
      'have.class',
      'v-messages__message',
    )
    cy.get('#input-2-messages > .v-messages__message').should('be.visible')
    cy.get('#input-2-messages > .v-messages__message').should(
      'have.text',
      'Ce champ est requis !',
    )
    cy.get('#input-2-messages > .v-messages__message').should(
      'have.class',
      'v-messages__message',
    )
    /* ==== End Cypress Studio ==== */
  })

  it('login as d.dev', () => {
    cy.login('administrateur')

    /* ==== Generated with Cypress Studio ==== */
    cy.get('.v-main > div').should('be.visible')
    cy.get('.mdi-menu').click()

    cy.get('[href="/utilisateurs"] > .v-list-item__content').should(
      'be.visible',
    )

    cy.get('.v-navigation-drawer__append > .v-btn').should('be.enabled')
    cy.get('.v-navigation-drawer__append > .v-btn > .v-btn__content').should(
      'be.visible',
    )
    cy.get('.v-navigation-drawer__append > .v-btn > .v-btn__content').should(
      'have.text',
      'Déconnexion',
    )
    /* ==== End Cypress Studio ==== */
  })

  it('logout', () => {
    cy.visit('/')
    cy.intercept('/api/auth/login', {fixture: 'auth/login.json'})
    cy.findByLabelText('Identifiant').type('d.dev')
    cy.findByLabelText('Mot de passe').type('dev')
    cy.findByRole('main').type('{enter}')

    cy.get('.mdi-menu').should('be.visible')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.mdi-menu').click()
    cy.get('.v-navigation-drawer__append > .v-btn > .v-btn__content').should(
      'be.visible',
    )
    cy.get('.v-navigation-drawer__append > .v-btn > .v-btn__content').should(
      'have.text',
      'Déconnexion',
    )
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.v-navigation-drawer__append > .v-btn > .v-btn__content').click()
    cy.findByLabelText('Identifiant').should('be.empty')
    cy.findByLabelText('Mot de passe').should('be.empty')
    cy.get('.bg-primary > .v-btn__content').should('have.text', 'Connexion')
    cy.get('.bg-primary > .v-btn__content').should('be.visible')
    /* ==== End Cypress Studio ==== */
  })
})
