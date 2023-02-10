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
    getMessages
} = require('../Controller/clubController')

const requireClubAuth = require('../middleware/requireClubAuth')



//////////signUp
router.post('/signup', signUp)

///////////login
router.post('/login', login)

// require auth for all club routes
// router.use(requireClubAuth)

//////Get all player
router.get('/players', getPlayers)

//////Get a specific player
router.get('/player/:id', getPlayer)

/////Get All Clubs
router.get('/', getClubs)

//////Get a club
router.get('/:id', getClub)

//////Edit Details
router.patch('/edit-club/:id', editDetails)

///////////// Stripe payment
router.post('/create-checkout-session',payment)

//////////////// Chat
router.post('/chat/create-chat', createChat);
router.get('/chat/:userId', userChats);
router.get('/chat/find/:firstId/:secondId', findChat);

/////////////// Message
router.post('/message', addMessage);
router.get('/message/:chatId', getMessages);




module.exports = router