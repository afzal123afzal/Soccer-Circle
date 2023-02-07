// // import './PlayerDetails.css'
// // date fns
// // import formatDistanceToNow from 'date-fns/formatDistanceToNow'

// // const ClubDetails = ({ club }) => {

// //   return (

// //     <div className="workout-details">
// //       <div className="card">
// //         <div className="card-border-top">
// //         </div>
// //         <div className="img">
// //         </div>
// //         <span> {club.name}</span>
// //         <p className="job"> {club.email}</p>
// //         <button> Connect
// //         </button>
// //       </div>
// //     </div>




// //   )

// // }
// // export default ClubDetails

import React from 'react';
import { Card, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './PlayerCard.css'
import dp from '../../assets/dp.png'
// import clubModel from '../../../../backend/model/clubModel';
const { Meta } = Card;

const PlayerCard = ({ player }) => {

  const navigate = useNavigate()
  console.log(player);
  const handleClick = (e) => {
    console.log(e);
    console.log(player);

    navigate('/club/player', { state: player._id })
  }


  return (
    // <Link to= "/user/players" >
    <Card

      hoverable
      style={{
        width: 240,
        marginRight: 30,
        marginTop: 40,
        justifyContent: 'center',

      }}

      cover={<img alt="example" src={player.image ? player.image : dp} />}
    >
      <Meta style={{ align: 'center' }} title={player.name} />
      <Button
        type="primary"
        style={{
          marginTop: 8,

        }}
        onClick={handleClick}

      >
        More Details</Button>



    </Card>
    // </Link>

  )
};
export default PlayerCard;


