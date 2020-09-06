import React, { useEffect, useState } from 'react'

import axios from '../../api'
import List from '../List'
import ManagementToolbar from '../ManagementToolbar'

export default ({ addButton }) => {
  const [items, setItems] = useState([])
  const [selectedMap, setSelectedMap] = useState({})
  const [sortAsc, setSortAsc] = useState(false)

  const fetchData = async () => {
    try {
      const response = await axios.get('/scenario')
      const scenarios = response.data.data
      setItems(scenarios)
      console.log(scenarios)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <ManagementToolbar
        addButton={addButton}
        totalItems={items.length}
        selectedMap={selectedMap}
        sortAsc={sortAsc}
        startingIndex={0}
        setSelectedMap={setSelectedMap}
        setSortAsc={setSortAsc} />
      <List
        items={items}
        totalItems={items.length}
        sortAsc={sortAsc}
        selectedMap={selectedMap}
        setSelectedMap={setSelectedMap} />
    </div>
  )
}
