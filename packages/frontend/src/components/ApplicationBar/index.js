import React from 'react'

export default function index () {
  return (
    <nav className="application-bar application-bar-dark navbar navbar-expand-md">
      <div className="container-fluid container-fluid-max-xl">
        <ul className="navbar-nav">
          <li className="nav-item">
            <button
              className="btn btn-unstyled nav-btn nav-btn-monospaced"
              type="button"
            >
              <svg
                className="lexicon-icon lexicon-icon-product-menu-closed"
                focusable="false"
                role="presentation"
              >
                <use
                  href="/images/icons/icons.svg#product-menu-closed"
                ></use>
              </svg>
            </button>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-unstyled nav-btn nav-btn-monospaced"
              type="button"
            >
              <svg
                className="lexicon-icon lexicon-icon-angle-left"
                focusable="false"
                role="presentation"
              >
                <use href="/images/icons/icons.svg#angle-left"></use>
              </svg>
            </button>
          </li>
        </ul>
        <div className="navbar-title navbar-text-truncate">App Builder Scenarios</div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <button
              className="btn btn-unstyled nav-btn nav-btn-monospaced"
              type="button"
            >
              <svg
                className="lexicon-icon lexicon-icon-cog"
                focusable="false"
                role="presentation"
              >
                <use href="/images/icons/icons.svg#cog"></use>
              </svg>
            </button>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-unstyled nav-btn nav-btn-monospaced"
              type="button"
            >
              <svg
                className="lexicon-icon lexicon-icon-plus"
                focusable="false"
                role="presentation"
              >
                <use href="/images/icons/icons.svg#plus"></use>
              </svg>
            </button>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-unstyled nav-btn nav-btn-monospaced"
              type="button"
            >
              <svg
                className="lexicon-icon lexicon-icon-simulation-menu-closed"
                focusable="false"
                role="presentation"
              >
                <use
                  href="/images/icons/icons.svg#simulation-menu-closed"
                ></use>
              </svg>
            </button>
          </li>
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
            <ul
              aria-labelledby="navbarDropdownMenuLink"
              className="dropdown-menu dropdown-menu-right"
            >
              <li><a className="dropdown-item" href="#1">Action</a></li>
              <li>
                <a className="dropdown-item" href="#1">Another action</a>
              </li>
              <li>
                <a className="dropdown-item" href="#1"
                >Something else here</a
                >
              </li>
              <li className="dropdown-divider"></li>
              <li>
                <a className="dropdown-item" href="#1">Separated link</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>

  )
}
