const constants = require('./helpers/constants')
const selectors = require('./helpers/selectors')
const faker = require('faker')

class TestBase {
  constructor () {
    this.constants = constants
    this.selectors = selectors
    this.faker = faker
  }

  preserve () {
    Cypress.Cookies.defaults({
      preserve: [
        'JSESSIONID',
        'LFR_SESSION_STATE_20126',
        'SCREEN_NAME',
        'COMPANY_ID',
        'GUEST_LANGUAGE_ID',
        'LFR_SESSION_STATE_20103',
        'COOKIE_SUPPORT'
      ]
    })
  }

  emptyState () {
    cy.get('.taglib-empty-result-message').should('be.visible')
  }

  managementTitle (name) {
    const selectLanguage = (lang, force = false) => {
      cy.get('.app-builder-upper-toolbar').within(() => {
        cy.get('.localizable-dropdown button').click()
      })

      cy.get('.localizable-dropdown-ul')
        .find(`.lexicon-icon-${lang}`)
        .click({ force })
    }

    if (typeof name === 'object') {
      Object.keys(name).forEach((languageId) => {
        const value = name[languageId]
        const lang = languageId.replace('_', '-').toLowerCase()

        selectLanguage(lang)
        cy.get('.app-builder-upper-toolbar').within(() => {
          cy.get('.tbar-item.tbar-item-expand input').type(value)
        })
      })

      selectLanguage('en-us', true)
    }
  }

  validateListView (name) {
    const localizedValue = name.en_US
    cy.get('form input')
      .eq(0)
      .should('not.have.value')
      .type(`${localizedValue}{enter}`)
      .should('have.value', localizedValue)
      .as('input')

    cy.get('.tbar-section')
      .as('section')
      .should('be.visible')
      .contains(`1 Results for ${localizedValue}`)

    cy.get('tbody tr').should('have.length', 1).as('row')

    cy.get('@input')
      .clear()
      .type('Liferay {enter}')
      .should('have.value', 'Liferay')

    cy.get('@section').should('be.visible').contains('0 Results for Liferay')

    this.emptyState()

    cy.get('@section').find('button').click()
  }
}

module.exports = TestBase
