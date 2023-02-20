import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { axiosAdminInstance } from '../../../instance/Axios'
import { useDispatch } from 'react-redux'
import { logoutClub } from '../../../redux-toolkit/clubLoginReducer'
import { toast } from 'react-toastify'
function ClubTable() {

    const [user, setUser] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        getAllClubs()
    }, [])
    const getAllClubs = async () => {
        const response = await axiosAdminInstance.get('/clubs')
        console.log(response.data);
        const data = response.data
        setUser(data)
    }



    const blockClub = async (id) => {
        const response = await axiosAdminInstance.patch(`/club/block/${id}`)
        console.log(response);
        if (response.status === 200) {
            dispatch(logoutClub())
            toast.error(`${response.data.mssg}`)
            getAllClubs()


        }
    }
    const unblockClub = async (id) => {
        const response = await axiosAdminInstance.patch(`/club/unblock/${id}`)
        console.log(response);
        if (response.status === 200) {
            toast.success(`${response.data.mssg}`)
            getAllClubs()
        }
    }
    const deleteClub = async (id) => {
        const response = await axiosAdminInstance.delete(`/club/${id}`)
        console.log(response);
        if (response.status === 200) {
            toast.error(`${response.data.mssg}`)
            getAllClubs()
        }
    }
    console.log(user);


    const columns = [

        {
            name: 'Clubs',
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
                row.payment ? (
                    <div>
                        <i className="fa fa-check" style={{ fontSize: '24px', color: "green" }} />
                    </div>
                )
                    :
                    <div>
                        <i className="fa fa-times" style={{ fontSize: '24px', color: "red" }} />
                    </div>
            )
        },
        {
            name: 'Action',
            selector: (row) => {
                return (
                    <div className='d-flex'>
                        {!row.blockStatus && (
                            <div className="" onClick={() => blockClub(row._id)}>
                                <i className="fa fa-ban" style={{ fontSize: '24px', color: "red" }} aria-hidden="true"></i>
                            </div>
                        )
                        }
                        {row.blockStatus && (
                            <div onClick={() => unblockClub(row._id)}>
                                <i className="fa fa-unlock" style={{ fontSize: '24px', color: "blue" }} aria-hidden="true"></i>
                            </div>
                        )}
                        {row.blockStatus && (
                            <div onClick={() => deleteClub(row._id)}>
                                <i className="fa fa-trash pl-3" style={{ fontSize: '24px', color: "red" }} aria-hidden="true"></i>
                            </div>
                        )}





                    </div>
                )
            },
        }
    ]

    return (
        <DataTable
            columns={columns}
            data={user}
            pagination />
    )
}

export default ClubTable