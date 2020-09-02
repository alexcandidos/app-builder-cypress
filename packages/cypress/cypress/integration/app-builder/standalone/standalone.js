const TestBase = require('../../test.base')
class Standalone extends TestBase {
  constructor (config) {
    super(config)
    this.config = config
  }

  _submit () {
    cy.get(`.app-builder-form-buttons ${this.selectors.primaryButton}`).click().wait(500)
  }

  _validateEntry (fieldType, index) {
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
        showLabel = true
      }
    } = fieldType

    beforeEach(() => {
      cy.get('.position-relative.row').eq(index + 1).as('field')
    })

    if (showLabel) {
      it('Field [Label] should be present', () => {
        cy.get('@field').find('.ddm-label').contains(label)
      })
    }

    if (required) {
      it('Field [Required] should be present', () => {
        cy.get('@field').find('.reference-mark').should('exist')
      })
    }

    if (repeatable) {
      it('Field [Repeatable] should be present', () => {
        cy.get('@field').find('.ddm-form-field-repeatable-add-button').should('be.enabled').should('be.visible')
      })
    }

    if (help) {
      it('[Help] text should be present', () => {
        cy.get('@field').find('span').contains(help)
      })
    }

    if (placeholder) {
      it('Field Placeholder should be present', () => {
        cy.get('@field').find(`[placeholder="${placeholder}"]`).as('placeholder')
        if (predefinedValue) {
          cy.get('@placeholder').should('have.value', predefinedValue)
        }
      })
    }

    if (required) {
      it('Try to submit a form without filling required field', () => {
        if (predefinedValue) {
          cy.get('@field').find('.form-control[type="text"]').as('input').clear()
          cy.get('@field').find('.form-feedback-item').as('feedback').should('be.visible')
          this._submit()
          cy.get('@input').type(predefinedValue).should('have.value', predefinedValue)
          cy.get('@feedback').should('not.exist')
        }
      })
    }

    if (repeatable) {
      xit('Add Repeatable Field', () => {
        cy.get('@field').find('.ddm-form-field-repeatable-add-button').click()
      })
    }
  }

  // it('Open Standalone', () => {
  //   cy.visit('http://localhost:8080/web/App46586#/')
  // })

  pipeline () {
    describe('Validate Standalone Home Screen', () => {
      const appName = this.getLocalizedValue(
        this.config.app.name
      )
      const locale = this.getDefaultLanguageId().replace('_', '-')
      it(`Should have [${appName}] on Standalone name`, () => {
        cy.get('.app-builder-standalone-name').contains(appName)
      })

      it('Should have empty state', () => {
        this.emptyState()
      })

      it(`Translation Manager should have default value as [${locale}]`, () => {
        cy
          .get('.app-builder-standalone-translation-manager svg')
          .should('have.class', `lexicon-icon lexicon-icon-${locale.toLowerCase()}`)
      })

      it('Should open Add Entry Page', () => {
        cy.get(this.selectors.newItem).click()
      })
    })

    this.config.formView.fieldTypes.filter(({ config }) => config).forEach((fieldType, index) => {
      describe(`Should validate all fields of ${fieldType.config.label}`, () => {
        this._validateEntry(fieldType, index)
      })
    })

    describe('Submit Entries', () => {
      it('Should submit entry', () => {
        this._submit()
      })
    })

    describe('Validate Standalone Home Screen', () => {
      it('Table Values are fine', () => {
        // this.validateListView();
      })
    })
  }
}

module.exports = Standalone
