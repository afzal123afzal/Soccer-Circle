
import React from 'react';
import { Card, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './PlayerCard.css'
import dp from '../../assets/dp.png'
// import clubModel from '../../../../backend/model/clubModel';
const { Meta } = Card;

const PlayerCard = ({ player }) => {

  const navigate = useNavigate()
  const handleClick = (e) => {

    navigate('/club/player', { state: player._id })
  }


  return (
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


