import React, { useEffect, useState } from 'react'

import axios from '../../api'
import List from '../List'
import ManagementToolbar from '../ManagementToolbar'

export default ({ addButton }) => {
  const [items, setItems] = useState([])
  const [selectedMap, setSelectedMap] = useState({})

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
        selectedMap={selectedMap}
        setSelectedMap={setSelectedMap} />
      <List
        fetchData={fetchData}
        items={items}
        totalItems={items.length}
        selectedMap={selectedMap}
        setSelectedMap={setSelectedMap} />
    </div>
  )
}
