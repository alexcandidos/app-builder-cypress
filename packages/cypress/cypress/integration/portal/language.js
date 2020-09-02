const TestBase = require('../test.base')

class Language extends TestBase {
  constructor (config = { portal: { defaultLanguageId: undefined, languageId: undefined } }) {
    super()
    this.config = config
  }

  normalizeLanguages () {
    const { en_US, pt_BR, zh_CN } = this.constants.languages
    const { defaultLanguageId = pt_BR.key, languageId = zh_CN.key } = this.config.portal
    const { accountSettings, instance } = this.constants.modules

    describe('Change Instance Language', () => {
      it('Open Instance Language Page', () => {
        cy.visit(instance)
      })

      it('Change instance language', () => {
        cy
          .get(this.selectors.instanceLanguageSelect)
          .select(defaultLanguageId)
          .should('have.value', defaultLanguageId)
      })

      it(`Save instance language with ${defaultLanguageId}`, () => {
        cy.get('.btn-primary').click()
      })
    })

    describe('Change Account Settings Language', () => {
      it('Open Account Settings Page', () => {
        cy.visit(accountSettings)
      })

      it('Change Portal Language', () => {
        cy
          .get(this.selectors.accountSettingsLanguageSelect)
          .select(languageId)
          .should('have.value', languageId)
      })

      it(`Save Portal Language with ${languageId}`, () => {
        cy.get('.btn-primary').click()
      })
    })
  }

  run () {
    this.normalizeLanguages()
  }
}

module.exports = Language
