import { ClayListWithItems } from '@clayui/list'
import { ClayPaginationBarWithBasicItems } from '@clayui/pagination-bar'
import React from 'react'
const spritemap = require('@clayui/css/lib/images/icons/icons.svg')

const List = ({
  items,
  selectedMap,
  setSelectedMap,
  sortAsc,
  totalItems
}) => {
  const [activePage, setActivePage] = React.useState(1)
  const [delta, setDelta] = React.useState(10)

  const listItems = items.map(({ _id }) => ({
    _id,
    description: 'Abcdef',
    dropdownActions: [
      {
        label: 'Edit',
        onClick: () => {
          console.log(_id)
          alert('you clicked!')
        }
      },
      {
        href: '#',
        label: 'Remove'
      }
    ],
    title: 'Oi!'
  }))

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
        totalItems={10}
      />
    </div>
  )
}

export default List
