/// <reference types="cypress" />

const TestBase = require('../../test.base')
const FormView = require('../form-view/1.form-view')
const signIn = require('../../portal/sign-in')
const pipelines = require('../../helpers/pipelines')
const TableView = require('../table-view/1.table-view')

class AppBuilderObject extends TestBase {
  constructor () {
    super()
    this.objectName = `Liferay Object ${new Date().getMilliseconds()}`.trim()
    this.lastObject = null
  }

  createAnObject (name, unCheck = false) {
    cy.get('button[data-title="New Custom Object"]').click()

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
      // cy.wait(2000)
      deleteRow(index)
    })
  }

  test () {
    this.pipeline()
    // signIn.test()

    // describe('Object', () => {
    //   const formView = new FormView({
    //     newObject: true,
    //     objectName: this.objectName
    //   })

    //   beforeEach(() => {
    //     this.preserve()
    //   })

    //   it('Navigate to Object', () => {
    //     cy.visit(this.constants.object)
    //   })

    //   it('Should delete all Objects', () => {
    //     this.deleteAllObjects()
    //   })

    //   it('should create an custom object and go to form view', () => {
    //     this.createAnObject()
    //   })

    //   describe('run FormView pipeline', () => {
    //     formView.runPipeline('Liferay Object')
    //   })
    // })
  }

  pipeline () {
    // signIn.test()

    Object.keys(pipelines).forEach((key) => {
      const pipeline = pipelines[key]
      const formView = new FormView(pipeline)
      describe(`Execute Pipeline: [${pipeline.name}]`, () => {
        beforeEach(() => {
          this.preserve()
        })

        it('Navigate to Object', () => {
          cy.visit(this.constants.object)
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
          const tableView = new TableView(pipeline)
          tableView.pipeline()
        })
      })
    })
  }
}

module.exports = new AppBuilderObject()
