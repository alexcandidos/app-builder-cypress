/// <reference types="cypress" />

const TestBase = require('../../test.base')
const FormView = require('../form-view/1.form-view')
const signIn = require('../../portal/sign-in')
const pipelines = require('../../helpers/pipelines')
const TableView = require('../table-view/1.table-view')
const Language = require('../../portal/language')

class AppBuilderObject extends TestBase {
  constructor () {
    super()
    this.objectName = `Liferay Object ${new Date().getMilliseconds()}`.trim()
    this.lastObject = null
  }

  createAnObject (name, unCheck = false) {
    cy.get('.nav-item button.btn-primary').click()

    cy.get('.popover.mw-100').within(() => {
      if (unCheck) {
        cy.get('input[type="checkbox"]').should('be.checked').uncheck()
      }
      cy.get('#customObjectNameInput').type(`${name}{enter}`, {
        delay: 20
      })
    })
  }

  deleteAllObjects () {
    const deleteRow = () => {
      cy.get('tbody tr:nth-child(1) .dropdown-action').click()
      cy.get('.dropdown-menu.show').within(() => {
        cy.get('button').eq(4).click()
      })
    }
    cy.get('tbody tr').each((_, index) => {
      cy.wait(2000)
      deleteRow(index)
    })
  }

  pipeline (pipeline) {
    const tableView = new TableView(pipeline)
    const formView = new FormView(pipeline)
    const portalLanguage = new Language(pipeline)

    portalLanguage.normalizeLanguages()

    describe('Run Portal on Instance', () => {
      it('Navigate to Object', () => {
        cy.visit(this.constants.modules.object)
      })

      it('Should delete all Objects', () => {
        this.deleteAllObjects()
      })

      it('should create an custom object and go to form view', () => {
        this.createAnObject(pipeline.name)
      })

      describe('Run FormView pipeline', () => {
        formView.runPipeline()
      })

      describe('Run TableView pipeline', () => {
        tableView.pipeline()
      })
    })
  }

  test () {
    // signIn.test()

    Object.keys(pipelines).forEach((key) => {
      const pipeline = pipelines[key]

      describe(`Execute Pipeline: [${pipeline.name}]`, () => {
        beforeEach(() => {
          this.preserve()
        })

        if (pipeline.portal.repeatsOn) {
          pipeline.portal.repeatsOn.forEach((instance) => {
            this.pipeline({
              ...pipeline,
              portal: {
                ...pipeline.portal,
                ...instance
              }
            })
          })
        }
      })
    })
  }
}

module.exports = new AppBuilderObject()
