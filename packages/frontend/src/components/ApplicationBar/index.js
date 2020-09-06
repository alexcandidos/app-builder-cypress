import { ClayButtonWithIcon } from '@clayui/button'
import React from 'react'
import { withRouter } from 'react-router-dom'
const spritemap = require('@clayui/css/lib/images/icons/icons.svg')

const ApplicationBar = ({ history: { location, push } }) => {
  return (
    <nav className="application-bar application-bar-dark navbar navbar-expand-md">
      <div className="container-fluid container-fluid-max-xl">
        <ul className="navbar-nav">
          {location.pathname !== '/' &&
          <li className="nav-item">
            <ClayButtonWithIcon
              onClick={() => push('/')}
              spritemap={spritemap}
              displayType="unstyled"
              symbol="angle-left" />
          </li>}
        </ul>
        <div className="navbar-title navbar-text-truncate">App Builder Scenarios</div>
        <ul className="navbar-nav">
          <li className="dropdown nav-item">
            <button
              aria-expanded="false"
              aria-haspopup="true"
              className="btn btn-unstyled dropdown-toggle nav-btn nav-btn-monospaced"
              data-toggle="dropdown"
              type="button"
            >
              <svg
                className="lexicon-icon lexicon-icon-ellipsis-v"
                focusable="false"
                role="presentation"
              >
                <use href="/images/icons/icons.svg#ellipsis-v"></use>
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(ApplicationBar)
