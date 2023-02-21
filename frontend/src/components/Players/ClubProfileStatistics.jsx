import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PayButton from './util/PayButton'
import dp from '../../assets/dp.png'
import { axiosPlayersInstance } from '../../instance/Axios'
import { useSelector } from 'react-redux'

function ProfilePage({ club, playerDetails }) {
  const navigate = useNavigate()
  const payment = useSelector((state) => state.player.paymentDetails.payment)

  const chatHandler = async () => {
    const data = {
      senderId: playerDetails._id,
      receiverId: club._id
    }
    await axiosPlayersInstance.post('/chat/create-chat', data,
      { headers: { 'Authorization': `Bearer ${playerDetails.token}` } }
    )
    navigate('/player/chat', { state: playerDetails._id })
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
                    <img alt="..." src={club.image ? club.image : dp} className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"></img>
                  </div>
                </div>
                <div className="w-full px-4 text-center mt-20">
                </div>
              </div>

              <div className="text-center mt-12">
                {payment ?
                  <Link to={"/player/chat"} >
                    <button onClick={chatHandler} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ">
                      Connect
                    </button>
                  </Link>
                  : <Link>
                    <PayButton />
                  </Link>}

                <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mt-2">
                  {club.email}
                </h3>
                { payment &&  club.place && <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {club.place } Kerala
                </div>}
                { payment &&<div className="mb-2 text-blueGray-600 mt-10">
                  <i className="fas fa-phone mr-2 text-lg text-blueGray-400"></i>
                  {club.mobile}
                </div>}
                { payment &&<div className="mb-2 text-blueGray-600">
                  <i className="fas fa-football mr-2 text-lg text-blueGray-400"></i>
                  {club.regNo}
                </div>}
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      We are more than just a football club. It's a community of passionate players, dedicated coaches, and loyal fans united by a love of the game and a shared commitment to excellence on and off the field.
                    </p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="relative  pt-8 pb-6 mt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                <div className="text-sm text-blueGray-500 font-semibold py-1">
                  Made with <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" className="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Creative Tim</a>.
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>

    </div>
  )
}

export default ProfilePage