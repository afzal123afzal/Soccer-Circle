import React from 'react'
import AdminNav from '../../components/Admin/AdminNav'
import PlayerTable from '../../components/Admin/util/PlayerTable'

function Players() {
  return (
    <div>
        <AdminNav/>
        <h2 style={{textAlign:'center',marginTop:'20px',marginBottom:'20px'}}>Players</h2>
        <div>
            <PlayerTable/>
        </div>
    </div>
  )
}

export default Players