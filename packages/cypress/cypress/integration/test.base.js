const constants = require('./helpers/constants')
const selectors = require('./helpers/selectors')
const faker = require('faker')

class TestBase {
  constructor (config) {
    this.constants = constants
    this.selectors = selectors
    this.faker = faker
    this.pipelineConfig = config
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

  getLanguageId () {
    return this.pipelineConfig.portal.languageId || 'en_US'
  }

  getDefaultLanguageId () {
    return this.pipelineConfig.portal.defaultLanguageId || 'en_US'
  }

  emptyState () {
    cy.get('.taglib-empty-result-message').should('be.visible')
  }

  managementTitle (name) {
    const normalizeLang = (lang) => lang.replace('_', '-').toLowerCase()
    const selectLanguage = (lang, force = false) => {
      cy.get('.app-builder-root').within(() => {
        cy.get('.localizable-dropdown button').click()
      })

      cy.get('.localizable-dropdown-ul')
        .find(`.lexicon-icon-${lang}`)
        .click({ force })
    }

    if (typeof name === 'object') {
      Object.keys(name).forEach((languageId) => {
        const value = name[languageId]
        const lang = normalizeLang(languageId)

        selectLanguage(lang)
        cy.get('.app-builder-root').within(() => {
          cy.get('.tbar-item.tbar-item-expand input').type(value)
        })
      })

      selectLanguage(normalizeLang(this.pipelineConfig.portal.defaultLanguageId), true)
    }
  }

  validateListView (name) {
    const { defaultLanguageId, languageId } = this.pipelineConfig.portal
    const localizedValue = name[languageId] || name[defaultLanguageId]
    cy.wait(1500)

    cy.get('form input')
      .eq(0)
      .should('not.have.value')
      .type(`${localizedValue}{enter}`)
      .should('have.value', localizedValue)
      .as('input')

    cy.get('.tbar-section')
      .as('section')
      .should('be.visible')
      .contains(localizedValue)

    cy.get('tbody tr').should('have.length', 1).as('row')

    cy.get('@input')
      .clear()
      .type('Liferay {enter}')
      .should('have.value', 'Liferay')

    cy.get('@section').should('be.visible').contains('Liferay')

    this.emptyState()

    cy.get('@section').find('button').click({ force: true })
  }
}

module.exports = TestBase
