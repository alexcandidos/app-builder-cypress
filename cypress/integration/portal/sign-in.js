/// <reference types="cypress" />
const TestBase = require('../test.base')

class SignIn extends TestBase {
  test () {
    describe('Open Liferay', () => {
      before(() => {
        cy.log('Cleaning Cookies')
        cy.clearLocalStorage()
      })

      beforeEach(() => {
        this.preserve()
      })

      afterEach(() => {
        cy.wait(2000)
      })

      it('should open portal and sign-in', () => {
        cy.visit('http://localhost:8080')

        cy.get('span.sign-in a').click()

        cy.get('#_com_liferay_login_web_portlet_LoginPortlet_login')
          .clear()
          .type('test@liferay.com')

        cy.get('#_com_liferay_login_web_portlet_LoginPortlet_password').type(
          'test'
        )

        cy.get('.button-holder button').click()
      })
    })
  }
}
module.exports = new SignIn()
