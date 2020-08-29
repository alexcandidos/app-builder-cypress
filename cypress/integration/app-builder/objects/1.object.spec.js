/// <reference types="cypress" />

const TestBase = require('../../test.base')
const FormView = require('../../app-builder/form-view/1.form-view.spec')
const signIn = require('../../portal/sign-in')

class AppBuilderObject extends TestBase {
  constructor () {
    super()
    this.objectName = `Liferay Object ${new Date().getMilliseconds()}`.trim()
    this.lastObject = null
  }

  createAnObject (unCheck = false) {
    cy.get('button[data-title="New Custom Object"]').click()

    cy.get('.popover.mw-100').within(() => {
      if (unCheck) {
        cy.get('input[type="checkbox"]').should('be.checked').uncheck()
      }
      cy.get('#customObjectNameInput').type(`${this.objectName}{enter}`, {
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
    // signIn.test()

    describe('Object', () => {
      const formView = new FormView({
        objectName: this.objectName,
        newObject: true
      })

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
        this.createAnObject()
      })

      describe('run FormView pipeline', () => {
        formView.runPipeline('Liferay Object')
      })
    })
  }
}
module.exports = new AppBuilderObject()

new AppBuilderObject().test()
