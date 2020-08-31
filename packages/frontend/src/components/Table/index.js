import { ClayListWithItems } from '@clayui/list'
import { ClayPaginationBarWithBasicItems } from '@clayui/pagination-bar'
import React from 'react'
const spritemap = require('@clayui/css/lib/images/icons/icons.svg')

export default ({
  selectedMap,
  setSelectedMap,
  sortAsc,
  totalItems
}) => {
  const [activePage, setActivePage] = React.useState(1)
  const [delta, setDelta] = React.useState(10)

  const dropdownActions = [
    {
      label: 'clickable',
      onClick: () => {
        alert('you clicked!')
      }
    },
    {
      type: 'divider'
    },
    {
      href: '#',
      label: 'linkable'
    }
  ]

  const startingIndex = (activePage - 1) * delta

  const items = Array(delta)
    .fill(0)
    .map((item, i) => {
      const index = sortAsc
        ? i + startingIndex
        : totalItems - startingIndex - i

      return {
        classPK: `${index}`,
        description: `classPK is ${index}`,
        dropdownActions,
        href: '#',
        title: `${index}`
      }
    })

  return (
    <div className="container" style={{ paddingTop: 8 }}>
      <ClayListWithItems
        itemIdentifier="classPK"
        items={[
          {
            header: 'List of Items',
            items
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
        totalItems={totalItems}
      />
    </div>
  )
}
