import React from 'react';
import { Card, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './ClubCards.css'
import fcb from '../../assets/fcbarcelona.jpeg'
// import clubModel from '../../../../backend/model/clubModel';
const { Meta } = Card;

const ClubCard = ({ club }) => {
    const navigate = useNavigate()
    const handleClick = (e) => {
        console.log(e);
        // console.log(clubModel);

        navigate('/player/club', { state: club.email })
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
            cover={<img alt="example" src={fcb} />}
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


