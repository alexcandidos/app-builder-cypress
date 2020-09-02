const TestBase = require('../../test.base')

class App extends TestBase {
  constructor (config) {
    super(config)
    this.config = config
  }

  _validateCreatedItemInForm (item) {
    const value = item[this.getLanguageId()] || item[this.getDefaultLanguageId()]
    const fakeValue = 'keven'
    cy.get(this.selectors.primaryButton).should('be.disabled')
    cy.get('tbody tr').as('row').should('have.length', 1)
    cy.get('.input-group-item input')
      .eq(1)
      .as('search')
      .should('not.have.value')
      .type(fakeValue)

    cy.get('@row')
      .should('not.exist')

    this.emptyState()

    cy.get('@search')
      .should('have.value', fakeValue)
      .clear()
      .type(value)

    cy.get('tbody tr').eq(0).click()
    cy.get(this.selectors.primaryButton).click()
  }

  _deployAs (options = {}) {
    cy.get(this.selectors.primaryButton).should('be.disabled')

    const onToggle = (index, name) => {
      cy.get('.toggle-switch-check')
        .eq(index)
        .should('not.be.checked')
        .check()
        .should('be.checked')
        .uncheck()
        .as(name)
    }

    onToggle(0, 'widget')
    onToggle(1, 'standalone')
    onToggle(2, 'product')

    Object.keys(options).map((key) => {
      if (options[key]) {
        cy.get(`@${key}`).check().should('be.checked')
      }
    })
  }

  pipeline (standaloneApp) {
    it('Should open [App] Tab', () => {
      this.selectors.changeObjectTab(2)
    })

    if (this.config.object.newObject) {
      it('Should contains an empty state', () => {
        this.emptyState()
      })
    }

    if (this.config.app.newApp) {
      it('Click on Add App', () => {
        cy.get('.nav-item button.btn-primary').click()
      })

      it('Should set App title', () => {
        this.managementTitle(this.config.app.name, this.config.portal)
      })

      it('Should validate [FormView] content', () => {
        this._validateCreatedItemInForm(this.config.formView.name)
      })

      it('Should validate [TableView] content', () => {
        this._validateCreatedItemInForm(this.config.tableView.name)
      })

      const { options } = this.config.app

      it(`Should check options ${Object.keys(options).join(', ')}`, () => {
        this._deployAs(options)
      })

      let standaloneApp

      it('Should save the App with sucesss', () => {
        cy.get(this.selectors.primaryButton).should('be.enabled').click()
        cy.get('.alert-container .alert-notifications a').then(doc => {
          standaloneApp = doc[0].href
        })
      })

      it('Validate ListView', () => {
        this.validateListView(this.config.app.name)
      })

      it('Open Standalone App', () => {
        cy.visit(standaloneApp)
      })
    }
  }
}

module.exports = App
