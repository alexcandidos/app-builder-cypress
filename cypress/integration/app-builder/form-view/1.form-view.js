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
        displayType,
        help,
        inline,
        label,
        multiple,
        placeholder,
        predefinedValue,
        repeatable,
        required,
        showAsSwitcher,
        showLabel = true,
        tooltip
      } = {},
      name: fieldName
    } = field

    const {
      ddmDisplayStyle,
      ddmInline,
      ddmLabel,
      ddmMultiple,
      ddmPlaceholder,
      ddmPredefinedValue,
      ddmRepeatable,
      ddmRequired,
      ddmShowAsSwitcher,
      ddmShowLabel,
      ddmTip,
      ddmTooltip
    } = this.selectors

    const withAdvancedField = predefinedValue || showLabel || repeatable || inline

    const changeTab = (index) => {
      it('Changing tab', () => {
        cy.get('.component-tbar.ddm-form-tabs.tbar li').eq(index).click()
      })
    }

    const setInputValue = (selector, value, id) => {
      it(`Typing [${value}] on [${id}]`, () => {
        cy.get(`${selector} input`)
          .should('not.have.value')
          .type(value)
          .should('have.value', value)
      })
    }

    const setChecked = (selector, id) => {
      it(`Mark [${id}] as [checked]`, () => {
        cy.get(`${selector} input`)
          .should('not.be.checked')
          .check()
          .should('be.checked')
      })
    }

    const setUnchecked = (selector, id) => {
      it(`Mark [${id}] as [unchecked]`, () => {
        cy.get(`${selector} input`)
          .should('be.checked')
          .uncheck()
          .should('not.be.checked')
      })
    }

    if (label) {
      it(`Typing [${label}] on [Label]`, () => {
        cy.get(`${ddmLabel} input`)
          .should('have.value', field.name)
          .clear()
          .type(label)
          .should('have.value', label)
      })
    }

    if (placeholder) {
      setInputValue(ddmPlaceholder, placeholder, 'placeholder')
    }

    if (help) {
      setInputValue(ddmTip, help, 'help')
    }

    if (displayType === 'multiple') {
      it('Marking [multiple] as [checked]', () => {
        cy.get(`${ddmDisplayStyle}`).within(() => {
          cy.get('input')
            .eq(1)
            .should('not.be.checked')
            .click()
            .should('be.checked')
        })
      })
    }

    if (required) {
      setChecked(ddmRequired, 'required')
    }

    if (showAsSwitcher) {
      setChecked(ddmShowAsSwitcher, 'showAsSwitcher')
    }

    if (withAdvancedField) {
      changeTab(1)
      if (predefinedValue) {
        setInputValue(ddmPredefinedValue, predefinedValue, 'predefinedValue')
      }

      if (repeatable) {
        setChecked(ddmRepeatable, 'repeatable')
      }

      if (!showLabel) {
        setUnchecked(ddmShowLabel, 'showLabel')
      }

      if (multiple) {
        setChecked(ddmMultiple, 'multiple')
      }

      if (inline) {
        setChecked(ddmInline, 'inline')
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
      const [firstFieldType] = this.config.fieldTypes
      it('Object name should be shown', () => {
        cy.get('.data-layout-builder-sidebar form h3').contains(this.config.object.name)
      })

      if (this.config.object.newObject) {
        it('Should show empty state', () => {
          cy.get('.empty.sidebar-body').should('be.visible')
        })

        this.config.fieldTypes.map(({ name: field }, index) => {
          it(`Add ${field} on Sidebar`, () => {
            cy.get('.custom-object-dropdown button').click()

            cy.get('.custom-object-dropdown-menu.show').within(() => {
              cy.get('button').eq(index).click()
            })

            cy.get('.sidebar-body .custom-object-field').eq(index).contains(field)
            cy.get('div[data-field-name="label"] input').should('have.value', field)
          })
        })

        it(`Should have ${this.config.fieldTypes.length} Types on The List`, () => {
          cy.get('.sidebar-body .custom-object-field').should('have.length', this.config.fieldTypes.length)
        })

        it('Should search for Liferay and found nothing', () => {
          cy.get('.custom-object-sidebar-header').within(() => {
            cy.get('button').eq(0).click()
            cy.get('input').should('not.have.value').type('Liferay').should('have.value', 'Liferay').as('input-search')
          })

          cy.get('.sidebar-body .custom-object-field').should('have.length', 0)
        })

        it(`Should search for ${firstFieldType.name} and found matching value`, () => {
          cy.get('.custom-object-sidebar-header input')
            .clear()
            .type(firstFieldType.name)
            .should('have.value', firstFieldType.name)
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
      if (this.config.object.newObject) {
        it('Search for Liferay as Field and Found Nothing', () => {
          cy.get('.sidebar-header input')
            .as('search-input')
            .should('be.empty')
            .type('Liferay')
            .should('have.value', 'Liferay')
          cy.get('.tab-pane .field-type').should('not.exist')
          cy.get('@search-input').clear()
        })

        this.config.fieldTypes.filter(({ type }) => type).map((field) => {
          const { name, type } = field
          describe(`Add ${name} Field and Fill Values`, () => {
            it('add field on DataLayout', () => {
              cy.get(`[data-field-type-name="${type}"]`).dblclick()
              cy.get('div[data-field-name="label"] input').should('have.value', name)
            })

            this._fieldCompose(field)

            it('Dispose', () => {
              cy.get('.sidebar-header button').eq(0).click()
            })

            // cy.get('.form-builder-layout .ddm-label').contains(name)
          })
        })
      }
    })

    this.submit()
  }

  submit () {
    describe('Submit', () => {
      it('Submit FormView', () => {
        cy.get('.app-builder-upper-toolbar button.btn-primary').click()
      })
    })
  }

  runPipeline () {
    describe('AppBuilder - FormView', () => {
      beforeEach(() => {
        cy.wait(100)
      })
      this.title()
      this.sidebarLeft()
      this.sidebarRight()
    })
  }

  run () {
    this.runPipeline()
  }
}

module.exports = FormView
