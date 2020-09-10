import { ClayListWithItems } from '@clayui/list'
import { ClayPaginationBarWithBasicItems } from '@clayui/pagination-bar'
import React from 'react'
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'

import api from '../../api'
const spritemap = require('@clayui/css/lib/images/icons/icons.svg')

const List = ({
  fetchData,
  history,
  items,
  selectedMap,
  setSelectedMap
}) => {
  const [activePage, setActivePage] = React.useState(1)
  const [delta, setDelta] = React.useState(10)

  const listItems = items.map(item => {
    const { _id, settings: { testDescription, testName } } = item
    const url = `/scenario/${_id}`
    return {
      _id,
      description: testDescription,
      dropdownActions: [
        {
          label: 'Edit',
          onClick: () => history.push(url)
        },
        {
          label: 'Remove',
          onClick: () => {
            api.delete(url)
              .then(({ data: { message } }) => Promise.resolve(toast.success(message)))
              .then(fetchData)
          }
        }
      ],
      href: url,
      title: testName
    }
  })

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <ClayListWithItems
        itemIdentifier="_id"
        items={[
          {
            header: 'List of Scenarios',
            items: listItems
          }
        ]}
        onSelectedItemsChange={setSelectedMap}
        selectedItemsMap={selectedMap}
        spritemap={spritemap}
      />

      <ClayPaginationBarWithBasicItems
        activeDelta={delta}
        activePage={activePage}
        onDeltaChange={setDelta}
        onPageChange={setActivePage}
        spritemap={spritemap}
        totalItems={listItems.length}
      />
    </div>
  )
}

export default withRouter(List)
