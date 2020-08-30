const TestBase = require('../../test.base')

class TableView extends TestBase {
  constructor (config) {
    super()
    this.config = config
  }

  pipeline () {
    const fieldTypes = this.config.formView.fieldTypes
    it('Should open TableView Tab', () => {
      this.selectors.changeObjectTab(1)
    })

    if (this.config.object.newObject) {
      it('Should contains an empty state', () => {
        this.emptyState()
      })
    }

    if (this.config.tableView.newTableView) {
      it('Open Add TableView', () => {
        cy.get('[data-title="New Table View"]').click()
      })

      it('Should set TableView title', () => {
        this.managementTitle(this.config.tableView.name)
      })

      it('Should Collapse (close) Sidebar', () => {
        cy.get('button.close-sidebar-btn').click({ force: true }).wait(1000)
      })

      it('Should Collapse (open) Sidebar', () => {
        cy.get('button.open-sidebar-btn').click({ force: true })
      })

      it('Layout should be empty', () => {
        cy.get('.empty-drop-zone').should('be.visible')
      })

      it(`Should have ${fieldTypes.length} items on the list`, () => {
        cy.get('.tab-content .field-type').should('have.length', fieldTypes.length)
      })

      fieldTypes.filter(({ config, type }) => type && config).forEach(({ config: { label } }) => {
        describe(`Should do action on [${label}] column created on FormView`, () => {
          const findByLabel = () => cy.get('.list-group-title span').contains(label)
          it(`Column [${label}] matches with the FormView item label`, () => {
            findByLabel()
          })

          it('Should search find matching value', () => {
            cy.get('.sidebar-section input')
              .should('not.have.value')
              .type(label)
              .should('have.value', label)
              .as('input')
            findByLabel()
            cy.get('@input').clear()
          })

          it('Add item on the list', () => {
            cy.get('.tab-content .field-type')
              .contains(label)
              .dblclick()
              .as('item')
            cy.get('@item')
              .parent()
              .parent()
              .parent()
              .should('have.class', 'disabled')
          })

          it('The item should be on Table List', () => {
            cy.get('.container.table-view-container th').contains(label)
          })
        })
      })

      describe('Save and validate the TableView', () => {
        xit('Should save the Table View', () => {
          cy.get('.btn-primary').click()
        })

        it('Validate ListView', () => {
          this.validateListView(this.config.tableView.name)
        })
      })
    }
  }
}

module.exports = TableView
