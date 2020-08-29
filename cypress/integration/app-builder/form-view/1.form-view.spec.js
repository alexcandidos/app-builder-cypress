const TestBase = require('../../test.base')

class FormView extends TestBase {
  constructor (config = {
    newObject: false
  }) {
    super()
    this.config = config
  }

  _deleteAllFieldsFromObject () {
    cy.get('.custom-object-field').each(() => {
      cy.get('.field-type-remove-icon button').eq(0).click({ force: true })

      cy.get('.modal.show button.btn-primary').click()
    })
  }

  _fieldCompose (field) {
    const {
      config: {
        label,
        placeholder,
        help,
        displayType,
        required,
        predefinedValue,
        showLabel,
        repeatable,
        multiple
      } = {}
    } = field

    const { ddmDisplayStyle, ddmLabel, ddmPlaceholder, ddmRequired, ddmTip, ddmPredefinedValue, ddmRepeatable, ddmShowLabel = true, ddmMultiple } = this.selectors

    const withAdvancedField = predefinedValue || showLabel || repeatable

    const changeTab = (index) => {
      cy.get('.component-tbar.ddm-form-tabs.tbar li').eq(index).click()
    }

    const setInputValue = (selector, value) => {
      cy.get(`${selector} input`)
        .should('not.have.value')
        .type(value)
        .should('have.value', value)
    }

    const setChecked = (selector) => {
      cy.get(`${selector} input`)
        .should('not.be.checked')
        .check()
        .should('be.checked')
    }

    const setUnchecked = (selector) => {
      cy.get(`${selector} input`)
        .should('be.checked')
        .uncheck()
        .should('not.be.checked')
    }

    if (label) {
      cy.get(`${ddmLabel} input`)
        .should('have.value', field.name)
        .clear()
        .type(label)
        .should('have.value', label)
    }

    if (placeholder) {
      setInputValue(ddmPlaceholder, placeholder)
    }

    if (help) {
      setInputValue(ddmTip, help)
    }

    if (displayType === 'multiple') {
      cy.get(`${ddmDisplayStyle}`).within(() => {
        cy.get('input')
          .eq(1)
          .should('not.be.checked')
          .click()
          .should('be.checked')
      })
    }

    if (required) {
      cy.get(`${ddmRequired} input`)
        .should('not.be.checked')
        .check()
        .should('be.checked')
    }

    if (withAdvancedField) {
      changeTab(1)
      if (predefinedValue) {
        setInputValue(ddmPredefinedValue, predefinedValue)
      }

      if (repeatable) {
        setChecked(ddmRepeatable)
      }

      if (!showLabel) {
        setUnchecked(ddmShowLabel, true)
      }

      if (multiple) {
        setChecked(ddmMultiple)
      }
    }
  }

  title () {
    it('Verify if title is empty and fill value', () => {
      cy.get('.app-builder-upper-toolbar').within(() => {
        cy.get('input').should('be.empty').type(`Liferay FormView ${this.faker.random.number()}`)
      })
    })

    it('Verify if default language is en-US', () => {
      cy.get('.localizable-dropdown .btn-section').contains(this.constants.languageId)
    })
  }

  sidebarLeft () {
    describe('Sidebar Left', () => {
      const [firstFieldType] = this.constants.fieldTypes
      it('Object name should be shown', () => {
        cy.get('.data-layout-builder-sidebar form h3').contains(this.config.objectName)
      })

      if (this.config.newObject) {
        it('Should show empty state', () => {
          cy.get('.empty.sidebar-body').should('be.visible')
        })

        this.constants.fieldTypes.map(({ name: field }, index) => {
          it(`Add ${field} on Sidebar`, () => {
            cy.get('.custom-object-dropdown button').click()

            cy.get('.custom-object-dropdown-menu.show').within(() => {
              cy.get('button').eq(index).click()
            })

            cy.get('.sidebar-body .custom-object-field').eq(index).contains(field)
            cy.get('div[data-field-name="label"] input').should('have.value', field)
          })
        })

        it(`Should have ${this.constants.fieldTypes.length} Types on The List`, () => {
          cy.get('.sidebar-body .custom-object-field').should('have.length', this.constants.fieldTypes.length)
        })

        it('Should search for Liferay and found nothing', () => {
          cy.get('.custom-object-sidebar-header').within(() => {
            cy.get('button').eq(0).click()
            cy.get('input').should('not.have.value').type('Liferay').should('have.value', 'Liferay').as('input-search')
          })

          cy.get('.sidebar-body .custom-object-field').should('have.length', 0)
        })

        it(`Should search for ${firstFieldType} and found matching value`, () => {
          cy.get('.custom-object-sidebar-header input').clear().type(firstFieldType).should('have.value', firstFieldType)
          cy.get('.sidebar-body .custom-object-field').should('have.length', 1)
        })

        it('Should back to list FieldTypes', () => {
          cy.get('.custom-object-sidebar-header').within(() => {
            cy.get('button').eq(1).click()
          })
        })

        it('Should remote all fields from object', () => {
          this._deleteAllFieldsFromObject()
        })
      }
    })
  }

  sidebarRight () {
    describe('Sidebar Right', () => {
      if (this.config.newObject) {
        it('Search for Liferay as Field and Found Nothing', () => {
          cy.get('.sidebar-header input')
            .as('search-input')
            .should('be.empty')
            .type('Liferay')
            .should('have.value', 'Liferay')
          cy.get('.tab-pane .field-type').should('not.exist')
          cy.get('@search-input').clear()
        })

        this.constants.fieldTypes.filter(({ type }) => type === 'text').map((field) => {
          const { name, type } = field
          it(`Add field ${name} on DataLayoutBuilder`, () => {
            cy.get(`[data-field-type-name="${type}"]`).dblclick()
            cy.get('div[data-field-name="label"] input').should('have.value', name)

            this._fieldCompose(field)

            // cy.get('.sidebar-header button').eq(0).click()
            // cy.get('.form-builder-layout .ddm-label').contains(name)
          })
        })
      }
    })
  }

  runPipeline () {
    describe('AppBuilder - FormView', () => {
      beforeEach(() => {
        cy.wait(100)
      })
      // this.title()
      // this.sidebarLeft()
      this.sidebarRight()
    })
  }

  run (objectName) {
    this.runPipeline(objectName)
  }
}

module.exports = FormView
