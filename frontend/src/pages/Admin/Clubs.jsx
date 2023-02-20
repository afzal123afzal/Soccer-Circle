import React from 'react'
import AdminNav from '../../components/Admin/AdminNav'
import ClubTable from '../../components/Admin/util/ClubTable'

function Clubs() {
    return (
        <div className='pages'>
            <AdminNav />
            <h2 style={{textAlign:'center',marginTop:'20px',marginBottom:'20px'}}>Clubs</h2>
            <div>
                <ClubTable />
            </div>

        </div>
    )
}

export default Clubs
