import React from 'react';
import { Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './ClubCards.css'
import dp from '../../assets/dp.png'
const { Meta } = Card;

const ClubCard = ({ club }) => {
    const navigate = useNavigate()
    const handleClick = (e) => {
        navigate('/player/club', { state: club._id })
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


    )
};
export default ClubCard;


