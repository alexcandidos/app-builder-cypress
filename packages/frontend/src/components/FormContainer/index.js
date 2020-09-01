import ClayButton from '@clayui/button'
import ClayLayout from '@clayui/layout'
import ClayPanel from '@clayui/panel'
import { Form } from '@unform/web'
import React from 'react'
import { withRouter } from 'react-router-dom'

const FormContainer = ({ children, history, onSubmit = () => {} }) => {
  return (
    <ClayLayout.ContainerFluid className="mt-6">
      <div className="row">
        <div className="col col-12">
          <Form
            className="sheet"
            onSubmit={(e) => {
              if (e) {
                onSubmit(e)
              }
            }}
          >
            <div className="sheet-header">
              <h2 className="sheet-title">Scenario Creator</h2>
            </div>

            <ClayPanel.Group>
              {children}
            </ClayPanel.Group>

            <div className="sheet-footer">
              <ClayButton.Group>
                <div className="btn-group-item">
                  <ClayButton type="submit">
                    {'Submit'}
                  </ClayButton>
                </div>
                <div className="btn-group-item">
                  <ClayButton onClick={() => history.push('/')} displayType="secondary">
                    {'Cancel'}
                  </ClayButton>
                </div>
              </ClayButton.Group>
            </div>
          </Form>
        </div>
      </div>
    </ClayLayout.ContainerFluid>
  )
}

export default withRouter(FormContainer)
