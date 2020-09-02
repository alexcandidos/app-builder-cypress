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

  pipeline () {
    const fieldTypes = this.config.formView.fieldTypes
    // it('Should open [App] Tab', () => {
    //   this.selectors.changeObjectTab(2)
    // })

    if (this.config.object.newObject) {
    //   it('Should contains an empty state', () => {
    //     this.emptyState()
    //   })
    }

    if (this.config.app.newApp) {
      it('Click on Add App', () => {
        cy.visit('http://localhost:8080/group/guest/~/control_panel/manage?p_p_id=com_liferay_app_builder_web_internal_portlet_ObjectsPortlet&p_p_lifecycle=0&p_p_state=maximized&refererPlid=1&p_v_l_s_g_id=20122&p_p_auth=adA5qdbq#/custom-object/46575/apps')

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

      let href

      it('Should save the App with sucesss', () => {
        cy.get(this.selectors.primaryButton).should('be.enabled').click()
        cy.get('.alert-container .alert-notifications a').then(doc => {
          href = doc[0].href
          cy.log(href)
        })
      })

      it('Ccc', () => {
        cy.visit(href)
      })
      return

      it('Layout should be empty', () => {
        cy.get('.empty-drop-zone').should('be.visible')
      })

      it(`Should have ${fieldTypes.length} items on the list`, () => {
        cy.get('.tab-content .field-type').should('have.length', fieldTypes.length)
      })

      describe('Save and validate the TableView', () => {
        it('Should save the Table View', () => {
          cy.get('.btn-primary').click()
        })

        it('Validate ListView', () => {
          this.validateListView(this.config.tableView.name)
        })
      })
    }
  }
}

module.exports = App
