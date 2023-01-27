// import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { axiosAdminInstance } from '../../../instance/Axios'
function PlayerTable() {
    // const [user,setUser]=useState([])
    //     useEffect(()=>{

    //     const token = localStorage.getItem('adminToken');
    //      getAllUsers();
    //     async function getAllUsers(){
    //         const config={
    //             headers:{
    //                 Accept:'application/json',
    //                 Authorization:token,
    //                 'Content-Type':'application/json',
    //             },
    //         }
    //             const response = await axios.get('http://localhost:4000/api/admin/userInfo',config)
    //             setUser(response.data.details)


    //     }
    // },[user])

    // async function block(id){
    //     const token =localStorage.getItem('adminToken');
    //     const config={
    //         headers:{
    //             Accept:'application/json',
    //         Authorization:token,
    //         'Content-Type':'application/json'
    //     }
    // }
    // const data = await axios.put(`http://localhost:4000/api/admin/block/${id}`,config) 
    // if(data.blocked){
    //     setUser(data.user)
    //     }
    // }
    // async function unblock(id){
    //     const token =localStorage.getItem('adminToken');
    //     const config={
    //         headers:{
    //             Accept:'application/json',
    //         Authorization:token,
    //         'Content-Type':'application/json'
    //     }
    // }
    // const data = await axios.put(`http://localhost:4000/api/admin/unblock/${id}`,config)
    // if(data.unblocked){
    //     window.relocation.reload(true)
    // setUser(data.user)
    // }
    // }

    const [user, setUser] = useState([])
    useEffect(() => {
        getAllPlayers()
    }, [])

    const getAllPlayers = async () => {
        const response = await axiosAdminInstance.get('/players')
        console.log(response.data);
        const data = response.data
        setUser(data)
    }

    const blockPlayer = async (id) => {
        const response = await axiosAdminInstance.patch(`/player/block/${id}`)
        console.log(response);
        if (response.status === 200) {
            getAllPlayers()
        }
    }
    const unblockPlayer = async (id) => {
        const response = await axiosAdminInstance.patch(`/player/unblock/${id}`)
        console.log(response);
        if (response.status === 200) {
            getAllPlayers()
        }
    }
    const deletePlayer = async (id) => {
        const response = await axiosAdminInstance.delete(`/player/${id}`)
        console.log(response);
        if (response.status === 200) {
            getAllPlayers()
        }
    }

    console.log(user);

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
            selector: (row) => row.payment.toString()
        },
        {
            name: 'Action',
            selector: (row) => {
                return (
                    <div>
                        {/* {row.blockStatus?(
                <button
                onClick={()=>unblock(row._id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Unblock
                </button>
            
            ):(<button onClick={()=>block(row._id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">Block
            </button>)} */}

                        {!row.blockStatus && (
                            <button onClick={() => blockPlayer(row._id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2  rounded-full">
                                <i class="fa fa-ban" aria-hidden="true"></i>

                            </button>)}
                        {row.blockStatus && (
                            <button
                                onClick={() => unblockPlayer(row._id)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-full">
                                <i class="fa fa-unlock" aria-hidden="true"></i>
                            </button>
                        )}
                        {row.blockStatus && (
                            <button onClick={() => deletePlayer(row._id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded-full">
                                <i class="fa fa-trash" aria-hidden="true"></i>
                            </button>
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