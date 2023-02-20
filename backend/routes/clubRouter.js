const express = require('express')
const router = express.Router()
const { signUp,
    login,
    getClubs,
    getClub,
    editDetails,
    getPlayers,
    getPlayer,  
    payment,
    createChat,
    userChats,
    findChat,
    addMessage,
    getMessages,
    verifyToken
} = require('../Controller/clubController')

const requireClubAuth = require('../middleware/requireClubAuth')



//////////signUp
router.post('/signup', signUp)

///////////login
router.post('/login', login)

// require auth for all club routes
// router.use(requireClubAuth)

//////Get all player
router.get('/players',requireClubAuth, getPlayers)

//////Get a specific player
router.get('/player/:id',requireClubAuth, getPlayer)

/////Get All Clubs
router.get('/', getClubs)

//////Get a club
router.get('/:id',requireClubAuth, getClub)

//////Edit Details
router.patch('/edit-club/:id',requireClubAuth, editDetails)

///////////// Stripe payment
router.post('/create-checkout-session',requireClubAuth,payment)

//////////////// Chat
router.post('/chat/create-chat',requireClubAuth, createChat);
router.get('/chat/:userId',requireClubAuth, userChats);
router.get('/chat/find/:firstId/:secondId', findChat);

/////////////// Message
router.post('/message',requireClubAuth, addMessage);
router.get('/message/:chatId',requireClubAuth, getMessages);

////////////verify Email
router.post('/verify/:token',verifyToken)



module.exports = router