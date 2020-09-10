import ClayButton, { ClayButtonWithIcon } from '@clayui/button'
import { ClayDropDownWithItems } from '@clayui/drop-down'
import { ClayInput } from '@clayui/form'
import ClayIcon from '@clayui/icon'
import ClayManagementToolbar from '@clayui/management-toolbar'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

import axios from '../../api'

const spritemap = require('@clayui/css/lib/images/icons/icons.svg')

const ManagementToolbar = ({
  addButton,
  selectedMap,
  setSelectedMap
}) => {
  const [searchMobile, setSearchMobile] = useState(false)
  const [value, setValue] = useState('')

  const viewTypes = [
    {
      label: 'List',
      onClick: () => alert('Show view list'),
      symbolLeft: 'list'
    },
    {
      active: true,
      label: 'Table',
      onClick: () => alert('Show view talbe'),
      symbolLeft: 'table'
    },
    {
      label: 'Card',
      onClick: () => alert('Show view card'),
      symbolLeft: 'cards2'
    }
  ]

  const numOfSelected = Object.values(selectedMap).filter(Boolean).length
  const isActive = !!numOfSelected

  return (
    <ClayManagementToolbar active={isActive}>
      <ClayManagementToolbar.ItemList expand={isActive}>
        {isActive && (
          <>
            <ClayManagementToolbar.Item className="nav-item-shrink">
              <ClayButton
                className="nav-link"
                displayType="unstyled"
                onClick={() => {
                  setSelectedMap({})
                }}
                type="button"
              >
                <span className="text-truncate-inline">
                  <span className="text-truncate">
                    {'Clear'}
                  </span>
                </span>
              </ClayButton>
            </ClayManagementToolbar.Item>
          </>
        )}
      </ClayManagementToolbar.ItemList>

      {!isActive && (
        <>
          <ClayManagementToolbar.Search showMobile={searchMobile}>
            <ClayInput.Group>
              <ClayInput.GroupItem>
                <ClayInput
                  aria-label="Search"
                  className="form-control input-group-inset input-group-inset-after"
                  onChange={(event) =>
                    setValue(event.target.value)
                  }
                  type="text"
                  value={value}
                />
                <ClayInput.GroupInsetItem after tag="span">
                  <ClayButtonWithIcon
                    className="navbar-breakpoint-d-none"
                    displayType="unstyled"
                    onClick={() =>
                      setSearchMobile(false)
                    }
                    spritemap={spritemap}
                    symbol="times"
                  />
                  <ClayButtonWithIcon
                    displayType="unstyled"
                    spritemap={spritemap}
                    symbol="search"
                    type="submit"
                  />
                </ClayInput.GroupInsetItem>
              </ClayInput.GroupItem>
            </ClayInput.Group>
          </ClayManagementToolbar.Search>

          <ClayManagementToolbar.ItemList>
            <ClayManagementToolbar.Item className="navbar-breakpoint-d-none">
              <ClayButton
                className="nav-link nav-link-monospaced"
                displayType="unstyled"
                onClick={() => setSearchMobile(true)}
              >
                <ClayIcon
                  spritemap={spritemap}
                  symbol="search"
                />
              </ClayButton>
            </ClayManagementToolbar.Item>

            <ClayManagementToolbar.Item>
              <ClayButton
                className="nav-link nav-link-monospaced"
                displayType="unstyled"
                onClick={() => axios.get('/sync').then(({ data: { message } }) => {
                  toast.info(message)
                })}
              >
                <ClayIcon
                  spritemap={spritemap}
                  symbol="cloud"
                />
              </ClayButton>
            </ClayManagementToolbar.Item>

            <ClayManagementToolbar.Item>
              <ClayDropDownWithItems
                items={viewTypes}
                spritemap={spritemap}
                trigger={
                  <ClayButton
                    className="nav-link nav-link-monospaced"
                    displayType="unstyled"
                  >
                    <ClayIcon
                      spritemap={spritemap}
                      symbol="list"
                    />
                  </ClayButton>
                }
              />
            </ClayManagementToolbar.Item>

            <ClayManagementToolbar.Item>
              <ClayButtonWithIcon
                onClick={addButton}
                className="nav-btn nav-btn-monospaced"
                spritemap={spritemap}
                symbol="plus"
              />
            </ClayManagementToolbar.Item>
          </ClayManagementToolbar.ItemList>
        </>
      )}
    </ClayManagementToolbar>
  )
}

export default ManagementToolbar
