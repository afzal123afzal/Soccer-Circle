import React from 'react'
import AdminNav from '../../components/Admin/AdminNav'
import ClubTable from '../../components/Admin/util/ClubTable'

function Clubs() {
    return (
        <div className='pages'>
            <AdminNav />
            <h2>Clubs</h2>
            <div>
                <ClubTable />
            </div>

        </div>
    )
}

export default Clubs
