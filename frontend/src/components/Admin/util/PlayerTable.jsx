// import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { toast } from 'react-toastify'
import { axiosAdminInstance } from '../../../instance/Axios'
function PlayerTable() {

    const [user, setUser] = useState([])
    useEffect(() => {
        getAllPlayers()
    }, [])

    const getAllPlayers = async () => {
        const response = await axiosAdminInstance.get('/players')
        const data = response.data
        setUser(data)
    }

    const blockPlayer = async (id) => {
        const response = await axiosAdminInstance.patch(`/player/block/${id}`)
        if (response.status === 200) {
            toast.error(`${response.data.mssg}`)
            getAllPlayers()
        }
    }
    const unblockPlayer = async (id) => {
        const response = await axiosAdminInstance.patch(`/player/unblock/${id}`)
        if (response.status === 200) {
            toast.success(`${response.data.mssg}`)
            getAllPlayers()
        }
    }
    const deletePlayer = async (id) => {
        const response = await axiosAdminInstance.delete(`/player/${id}`)
        if (response.status === 200) {
            toast.error(`${response.data.mssg}`)
            getAllPlayers()
        }
    }


    const columns = [

        {
            name: 'Player',
            selector: (row) => row.name
        },
        {
            name: 'Email',
            selector: (row) => row.email
        },
        {
            name: 'phoneNo',
            selector: (row) => row.mobile
        },
        {
            name: 'Payment',
            selector: (row) => (
              row.payment  ? (
                <div>
                  <i className="fa fa-check" style={{fontSize: '24px',color:"green"}} />
                </div>
              )
              :
              <div>
              <i className="fa fa-times" style={{fontSize: '24px',color:"red"}} />
            </div>
            )
          },
          
        {
            name: 'Action',
            selector: (row) => {
                return (
                    <div className='d-flex'>
                        {!row.blockStatus && (
                            <div  className="" onClick={() => blockPlayer(row._id)}>
                                <i className="fa fa-ban" style={{fontSize: '24px',color:"red"}}  aria-hidden="true"></i>
                            </div>
                            )
                            }
                        {row.blockStatus && (
                            <div onClick={() => unblockPlayer(row._id)}>
                                <i className="fa fa-unlock" style={{fontSize: '24px',color:"blue"}} aria-hidden="true"></i>
                            </div>
                        )}
                        {row.blockStatus && (
                            <div onClick={() => deletePlayer(row._id)}>
                                <i className="fa fa-trash pl-3"  style={{fontSize: '24px',color:"red"}} aria-hidden="true"></i>
                            </div>
                        )}





                    </div>
                )
            },
        },
    ]

    return (
        <DataTable
            columns={columns}
            data={user}
            pagination />
    )
}

export default PlayerTable