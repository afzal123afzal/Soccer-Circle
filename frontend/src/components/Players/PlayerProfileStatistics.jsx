
import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import dp from '../../assets/dp.png'
import { useAuthContext } from '../../hooks/Player/useAuthContext'
import { IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios'
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { Image } from 'cloudinary-react'
// import playerModel from '../../../../backend/model/playerModel';
import { axiosPlayersInstance } from '../../instance/Axios';

function ProfilePage(props) {
  console.log(props.edit);
  const [imageSelected, setImageSelected] = useState('')
  const [url, setUrl] = useState('')
  // useEffect(()=>{

  // },[imageSelected])

  useEffect(() => {
    setProfile()
  }, [url, imageSelected])

  const uploadImage = async () => {
    try {
      const formData = new FormData()
      formData.append("file", imageSelected)
      formData.append("upload_preset", "rftwidzs")
      const response = await axios.post('https://api.cloudinary.com/v1_1/des6t3rkt/image/upload',
        formData
      )
      console.log(response.data.url);
      // setUrl(response.data.url)

      if (response.status === 200) {
        const imageUrl = response.data.url
        console.log(imageUrl);
        const id = props.user[0]._id

        const profile = await axiosPlayersInstance.patch('/add-details/' + id, { image: imageUrl })

        // const image = profile.data[0].image
        setProfile()


      }

    } catch (err) {
      console.log(err.message);
    }
  }
  const setProfile = async () => {
    if (props.user[0]) {
      const email = props.user[0].email
      const response = await axiosPlayersInstance.post('/player', { email: email })
      console.log(response.data[0].image);
      const imageUrl = response.data[0].image
      setUrl(imageUrl)

    }
  }
  setProfile()






  // console.log('props1',props.user[0].name);
  // const { player } = useAuthContext()
  return (
    <div>
      <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"></link>
      <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"></link>

      <section className="pt-16 ">
        <div className="w-full lg:w-4/12 px-4 mx-auto bg-white ">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  <div className="relative">
                    <img alt="..." src={url ? url : dp} className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"></img>
                    {/* <Image cloudName='des6t3rkt'
                      publicId={url ? url : }
                    /> */}

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
                <>
                  <IconButton color="primary" aria-label="upload picture" component="label">
                    <input onChange={(event) => { setImageSelected(event.target.files[0]) }} hidden accept="image/*" type="file" />
                    <PhotoCamera />
                  </IconButton>
                  <Button onClick={uploadImage} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ">
                    Update
                  </Button>
                </>
                <button onClick={props.edit} className='p-3'><i class="fas fa-edit"></i></button>

                <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mt-2">
                  {props.user != null ? props.user[0].email : ''}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {props.user != null ? props.user[0].place : ''}
                  
                </div>
                <div className="mb-2 text-blueGray-600 mt-10">
                  <i className="fas fa-phone mr-2 text-lg text-blueGray-400"></i>
                  {props.user != null ? props.user[0].mobile : ''}


                </div>
                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-football mr-2 text-lg text-blueGray-400"></i>
                  {props.user != null ? props.user[0].position : ''}
                  
                </div>
                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-futbol mr-2 text-lg text-blueGray-400"></i>
                  {props.user != null ? props.user[0].club : ''}
                  
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      An artist of considerable range, Jenna the name taken
                      by Melbourne-raised, Brooklyn-based Nick Murphy
                      writes, performs and records all of his own music,
                      giving it a warm, intimate feel with a solid groove
                      structure. An artist of considerable range.
                    </p>
                    {/* <a href="javascript:void(0);" className="font-normal text-pink-500">
              Show more
            </a> */}

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
                  Made with <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" className="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Afzal</a>.
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