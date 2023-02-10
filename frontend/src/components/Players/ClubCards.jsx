import React from 'react';
import { Card, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './ClubCards.css'
import dp from '../../assets/dp.png'
// import clubModel from '../../../../backend/model/clubModel';
const { Meta } = Card;

const ClubCard = ({ club }) => {
    const navigate = useNavigate()
    const handleClick = (e) => {
        console.log(e);
        console.log(club);

        // navigate('/player/club', { state: club.email })
        navigate('/player/club', { state: club._id })
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
            cover={<img alt="example" src={club.image ? club.image : dp} />}
        >
            <Meta style={{ align: 'center' }} title={club.name} />
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
export default ClubCard;


