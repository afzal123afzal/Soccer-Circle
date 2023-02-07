import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ClubNavbar from '../../components/Clubs/ClubNavbar'
import { axiosClubsInstance } from '../../instance/Axios'
import './ClubDashboard.css'
import { clubProfile,nameNav } from '../../redux-toolkit/clubLoginReducer'
import ClubProfileStatistics from '../../components/Clubs/ClubProfileStatistics'
import ClubEditForm from '../../components/Clubs/ClubEditForm'


function ClubDashboard() {
  const [edit, setEdit] = useState(false)
  const club = useSelector((state) => state.club.clubDetails)
  const clubSpec = useSelector((state) => state.club.clubSpec)
  console.log(clubSpec);
  const _id = club._id
  const dispatch = useDispatch()



  const fetchClub = async () => {
    try {
      const response = await axiosClubsInstance.get(`/${_id}`)
      console.log(response);
      if (response.status === 200) {
        dispatch(clubProfile(response.data))
        dispatch(nameNav(response.data.name))
      }

    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchClub()
  }, [edit])


  const handleClick = () => {
    setEdit(true)
  }
  const editMode = () => {
    setEdit(false)
  }

  return (
    <div>
      <ClubNavbar />
      <div className='carousel' id="grad1"><span className='name-center'>{clubSpec.name}</span></div>
      <div className="container1">
        {edit ? <ClubEditForm state={editMode} _id={_id} /> : <ClubProfileStatistics club={clubSpec} edit={handleClick} />}
        {/* <ClubProfileStatistics club={clubSpec} edit={handleClick} /> */}
      </div >
    </div>
  )
}

export default ClubDashboard