import ClayButton from '@clayui/button'
import ClayLayout from '@clayui/layout'
import ClayPanel from '@clayui/panel'
import React from 'react'
import { withRouter } from 'react-router-dom'

const FormContainer = ({ children, history }) => {
  return (
    <ClayLayout.ContainerFluid className="mt-6">
      <div className="row">
        <div className="col col-12">
          <div
            className="sheet"
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
          </div>
        </div>
      </div>
    </ClayLayout.ContainerFluid>
  )
}

export default withRouter(FormContainer)
