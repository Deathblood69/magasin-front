import '@testing-library/cypress/add-commands'
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
export function registerCommands() {
  Cypress.Commands.add('login', (role: string) => {
    switch (role) {
      case 'administrateur':
        cy.intercept('/api/auth/login', {fixture: 'auth/login.json'})
        break
      case 'enroleur':
        cy.intercept('/api/auth/login', {fixture: 'auth/loginEnroleur.json'})
        break
      case 'operateur':
        cy.intercept('/api/auth/login', {fixture: 'auth/loginOperateur.json'})
        break
    }

    cy.visit('/')
    cy.findByLabelText('Identifiant').type('d.dev')
    cy.findByLabelText('Mot de passe').type('dev')
    cy.findByRole('main').type('{enter}')
  })
}

Cypress.Commands.add(
  'createResident',
  (
    cims: string,
    lastname: string,
    firstname: string,
    dateDebut: string,
    dateFin: string,
  ) => {
    cy.get('[test-id="cims"]').clear()
    cy.get('[test-id="cims"]').type(cims)

    cy.get('[test-id="idAnnudef"]').clear()
    cy.get('[test-id="idAnnudef"]').type(`${firstname.charAt(0)}.${lastname}`)

    cy.get('[test-id="lastName"]').clear()
    cy.get('[test-id="lastName"]').type(lastname)

    cy.get('[test-id="firstName"]').clear()
    cy.get('[test-id="firstName"]').type(firstname)

    cy.get(
      '.v-form > .v-select > .v-input__control > .v-field > .v-field__field > .v-field__input',
    ).click()
    cy.get('.v-list-item-title').click()
    cy.get('.v-field__append-inner > .v-btn').click()
    cy.get('.v-expansion-panel-title__overlay').click()

    cy.get('[test-id="dateDebutVerif"]').type(dateDebut)
    cy.get('[test-id="dateFinVerif"]').type(dateFin)
    cy.get('.v-card-actions > .bg-primary > .v-btn__content').click()
  },
)

Cypress.Commands.add(
  'createUtilisateur',
  (
    nom: string,
    prenom: string,
    identifiant: string,
    pwd: string,
    profils: string[],
  ) => {
    cy.findByRole('menuitem', {name: /Utilisateurs/i}).click()
    cy.findByRole('button', {name: /ajouter/i}).click()

    cy.findByRole('dialog').within(() => {
      cy.findAllByRole('textbox')
      cy.findByRole('textbox', {name: 'Nom'}).type(nom)
      cy.findByRole('textbox', {name: /prénom/i}).type(prenom)
      cy.findByRole('textbox', {name: /identifiant/i}).type(identifiant)
      cy.findByTestId('pwd').type(pwd)
      cy.findByTestId('pwdVerif').type(pwd)
      cy.findByRole('combobox').click()
    })
    cy.findAllByRole('listbox')
      .last()
      .within(() => {
        profils.forEach((profil) => {
          cy.findByRole('option', {name: profil}).click({force: true})
        })
      })

    cy.findByRole('button', {name: /valider/i}).click({force: true})
    cy.findByRole('alert', {name: /Enregistrement reussi/i}).should('exist')
  },
)

Cypress.Commands.add('deleteUtilisateur', (identifiant: string) => {
  cy.findByRole('menuitem', {name: /Utilisateurs/i}).click()
  cy.findByText(identifiant)
    .parent()
    .within(() => {
      cy.findByRole('button', {name: /delete/i}).click()
    })
  cy.findByRole('dialog', {name: /suppression/i}).within(() => {
    cy.findByText(/valider/i).click()
  })
  cy.findByRole('alert', {name: /L'utilisateur à été supprimé/i}).should(
    'exist',
  )
  cy.findByText(identifiant).should('not.exist')
})

declare global {
  namespace Cypress {
    interface Chainable {
      login(role: string): Chainable<void>

      createResident(
        cims: string,
        lastname: string,
        firstname: string,
        dateDebut: string,
        dateFin: string,
      ): Chainable<void>

      createUtilisateur(
        nom: string,
        prenom: string,
        identifiant: string,
        pwd: string,
        profils: string[],
      ): Chainable<void>

      deleteUtilisateur(identifiant: string): Chainable<void>
    }
  }
}
