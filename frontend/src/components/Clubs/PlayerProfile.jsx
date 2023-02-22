import { Button } from 'antd'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import dp from '../../assets/dp.png'
import { axiosClubsInstance } from '../../instance/Axios'
import Subscribe from './util/Subscribe'
import { useSelector } from 'react-redux'

function PlayerProfile({ player }) {
    const clubDet = useSelector((state) => state.club.paymentDetails)
    const clubId = useSelector((state) => state.club.clubDetails._id)
    const clubAuth = useSelector((state) => state.club.clubDetails)
    const payment = clubDet.payment
    const navigate = useNavigate()



    const chatHandler = async () => {
        const data = {
            senderId: clubId,
            receiverId: player._id
        }
        await axiosClubsInstance.post('/chat/create-chat', data,
            { headers: { 'Authorization': `Bearer ${clubAuth.token}` } }
        )
        navigate('/club/chat', { state: clubId })
    }





    return (
        <div>
            <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"></link>
            <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"></link>

            <section className="pt-16 ">
                <div className="w-full lg:w-4/12 px-4 mx-auto ">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full px-4 flex justify-center">
                                    <div className="relative">
                                        <img alt="..." src={player.image ? player.image : dp} className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"></img>
                                    </div>
                                </div>
                                <div className="w-full px-4 text-center mt-20">
                                    {/* <div className="flex justify-center py-4 lg:pt-4 pt-8">
            <div className="mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                22
              </span>
              <span className="text-sm text-blueGray-400">Friends</span>
            </div>
            <div className="mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                10
              </span>
              <span className="text-sm text-blueGray-400">Photos</span>
            </div>
            <div className="lg:mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                89
              </span>
              <span className="text-sm text-blueGray-400">Comments</span>
            </div>
          </div> */}
                                </div>
                            </div>

                            <div className="text-center mt-12">
                                {payment && payment ?
                                    <Link to={'/club/chat'}>
                                        <button onClick={chatHandler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ">
                                            Connect
                                        </button>
                                    </Link>
                                    : <Link>
                                        <Subscribe />
                                    </Link>}

                            
                               <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mt-2">
                                    {player.email}
                                </h3>
                                
                               { payment && player.place && <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                    {player.place},Kerala
                                </div>}
                               { payment && <div className="mb-2 text-blueGray-600 mt-10">
                                    <i className="fas fa-phone mr-2 text-lg text-blueGray-400"></i>
                                    {player.mobile}
                                </div>}
                                { player.position && <div className="mb-2 text-blueGray-600">
                                    <i className="fas fa-football mr-2 text-lg text-blueGray-400"></i>
                                    {player.position ? player.position : ""}
                                </div>}
                                { payment && player.club && <div className="mb-2 text-blueGray-600">
                                    <i className="fas fa-futbol mr-2 text-lg text-blueGray-400"></i>
                                    {player.club ? player.club : ""}

                                </div> }
                            </div>
                            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-9/12 px-4">
                                        {/* <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                            An artist of considerable range, Jenna the name taken
                                            by Melbourne-raised, Brooklyn-based Nick Murphy
                                            writes, performs and records all of his own music,
                                            giving it a warm, intimate feel with a solid groove
                                            structure. An artist of considerable range.
                                        </p> */}
                                        {player.video && payment && <p className="mb-4 text-3xl leading-relaxed text-blueGray-700">
                                            Skills
                                        </p>}

                                    </div> 
                                     
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <footer className="relative  pt-8 pb-6 mt-8">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap items-center md:justify-between justify-center">
                            <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                                <div className="text-sm text-blueGray-500 font-semibold py-1">
                                    Made with <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" className="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Creative Tim</a>.
                                </div>
                            </div>
                        </div>
                    </div>
                </footer> */}
            </section>

        </div>
    )
}

export default PlayerProfile