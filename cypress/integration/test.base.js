const constants = require('./helpers/constants')
const selectors = require('./helpers/selectors')
const faker = require('faker')

class TestBase {
  constructor () {
    this.constants = constants
    this.selectors = selectors
    this.faker = faker
  }

  preserve () {
    Cypress.Cookies.defaults({
      preserve: [
        'JSESSIONID',
        'LFR_SESSION_STATE_20126',
        'SCREEN_NAME',
        'COMPANY_ID',
        'GUEST_LANGUAGE_ID',
        'LFR_SESSION_STATE_20103',
        'COOKIE_SUPPORT'
      ]
    })
  }
}

module.exports = TestBase
