/// <reference types="cypress" />

const TestBase = require('../../test.base')
const FormView = require('../form-view/form-view')
const signIn = require('../../portal/sign-in')
const pipelines = require('../../helpers/pipelines')
const TableView = require('../table-view/table-view')
const Language = require('../../portal/language')
const App = require('../app/app')
const Standalone = require('../standalone/standalone')

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
        cy.get('button').eq(5).click()
      })
    }
    cy.get('tbody tr').each((_, index) => {
      cy.wait(2000)
      deleteRow(index)
    })
  }

  pipeline (pipeline) {
    const app = new App(pipeline)
    const tableView = new TableView(pipeline)
    const formView = new FormView(pipeline)
    const portalLanguage = new Language(pipeline)
    const standalone = new Standalone(pipeline)

    const { app: appConfig } = pipeline

    portalLanguage.normalizeLanguages()

    describe('Run Portal on Instance', () => {
      it('open', () => {
        cy.visit('http://localhost:8080/en/group/control_panel/manage?p_p_id=com_liferay_app_builder_web_internal_portlet_ObjectsPortlet&p_p_lifecycle=0&p_p_state=maximized&p_p_mode=view&refererPlid=1&p_p_auth=M9bgGddi&_com_liferay_app_builder_web_internal_portlet_ObjectsPortlet_dataDefinitionId=48157&_com_liferay_app_builder_web_internal_portlet_ObjectsPortlet_mvcRenderCommandName=%2Fedit_form_view')
      })

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

      if (appConfig) {
        describe('Run App pipeline', () => {
          app.pipeline()
        })

        if (false) {
          describe('Run Standalone Pipeline', () => {
            standalone.pipeline()
          })
        }
      }
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

        if (pipeline.portal.repeatsOn && pipeline.portal.repeatsOn.length) {
          pipeline.portal.repeatsOn.forEach((instance) => {
            this.pipeline({
              ...pipeline,
              portal: {
                ...pipeline.portal,
                ...instance
              }
            })
          })
        } else {
          this.pipeline(pipeline)
        }
      })
    })
  }
}

module.exports = new AppBuilderObject()
