import React, { useState } from 'react'

import ManagementToolbar from '../ManagementToolbar'
import Table from '../Table'

export default ({ addButton }) => {
  const totalItems = 100
  const [selectedMap, setSelectedMap] = useState({})
  const [sortAsc, setSortAsc] = useState(false)

  return (
    <div>
      <ManagementToolbar
        addButton={addButton}
        totalItems={totalItems}
        selectedMap={selectedMap}
        sortAsc={sortAsc}
        startingIndex={0}
        setSelectedMap={setSelectedMap}
        setSortAsc={setSortAsc} />
      <Table
        totalItems={totalItems}
        sortAsc={sortAsc}
        selectedMap={selectedMap}
        setSelectedMap={setSelectedMap} />
    </div>
  )
}
