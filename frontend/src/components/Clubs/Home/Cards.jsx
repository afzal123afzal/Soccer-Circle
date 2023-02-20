import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1 style={{color:'#252e48'}} >Check out what we offer!!!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='/src/assets/xaviball.jpeg'
              text='Short of numbers? We’ll show you all the local players who are looking to join a game at the time you play.'
              label='FIND PLAYERS'
              path='#'
            />
            <CardItem
              src='/src/assets/club-homepage.webp'
              text='Looking for a new club to join? Explore the local community and find the perfect club to suit your interests and level of play'
              label='DISCOVER CLUBS'
              path='#'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='/src/assets/messageHomepage.jpg'
              text='Unleash Your Sporting Potential and Connect with Clubs & Players through our Chat App.'
              label='BUILD NETWORK'
              path='#'
            />
            <CardItem
              src='/src/assets/membershipHomepage.jpeg'
              text='Unlock Exclusive Benefits and Enhance Your Sports Experience with a Membership to Our Platform.'
              label=' BECOME A MEMBER'
              path='#'
            />
            <CardItem
              src='/src/assets/community.jpeg'
              text='Join a Vibrant Community of Sports Enthusiasts and Unleash Your Passion.'
              label='JOIN A THRIVING COMMUNITY'
              path='#'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
