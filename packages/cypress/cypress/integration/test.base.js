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

  selectLanguage (lang, force = false) {
    it('Select language', () => {
      cy.get('.app-builder-root').within(() => {
        cy.get('.localizable-dropdown button').click()
      })

      cy.get('.localizable-dropdown-ul')
        .find(`.lexicon-icon-${lang}`)
        .click({ force })
    })
  }

  normalizeLang (lang) {
    return lang.replace('_', '-').toLowerCase()
  }

  getLocalizedValue (name, untitled = '') {
    return name[this.getLanguageId()] || name[this.getDefaultLanguageId()] || untitled
  }

  getLocalizedPrefenceValue (name, defaultLanguageId = this.getDefaultLanguageId()) {
    if (name[defaultLanguageId]) {
      return name[defaultLanguageId]
    }
    return this.getLocalizedValue(name)
  }

  getLanguageId () {
    return this.pipelineConfig.settings.languageId || 'en-US'
  }

  getDefaultLanguageId () {
    return this.pipelineConfig.settings.defaultLanguageId || 'en-US'
  }

  emptyState () {
    cy.get('.taglib-empty-result-message').should('be.visible')
  }

  getLocalizedConfig (config = {}, lang = this.getDefaultLanguageId()) {
    const newConfigs = {
      ...config
    }
    Object.keys(config).forEach((key) => {
      const value = config[key]
      if (Array.isArray(value)) {
        newConfigs[key] = value.map((localizedValue) => this.getLocalizedPrefenceValue(localizedValue, lang))
      } else if (typeof value === 'object') {
        newConfigs[key] = this.getLocalizedPrefenceValue(value, lang)
      }
    })
    return newConfigs
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

    if (!name[this.getDefaultLanguageId()]) {
      name[this.getDefaultLanguageId()] = 'Untitled'
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

      selectLanguage(normalizeLang(this.pipelineConfig.settings.defaultLanguageId), true)
    }
  }

  validateListView (name) {
    const localizedValue = this.getLocalizedValue(name)
    const fakeCompany = this.faker.company.companyName()
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
      .type(`${fakeCompany} {enter}`)
      .should('have.value', fakeCompany)

    cy.get('@section').should('be.visible').contains(fakeCompany)

    this.emptyState()

    cy.get('@section').find('button').click({ force: true })
  }
}

module.exports = TestBase
