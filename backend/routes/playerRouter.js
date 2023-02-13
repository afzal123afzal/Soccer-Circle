const express = require('express')
const router = express.Router()

const { signUp,
    addDetails,
    getPlayers,
    getPlayer,
    login,
    getClubs,
    getClub,
    payment,
    createChat,
    userChats,
    findChat,
    addMessage,
    getMessages
} = require('../Controller/playerController')
const requireAuth = require('../middleware/requireAuth')



/////////// Player signup
router.post('/signup', signUp)

///////////// Player login
router.post('/login', login)



///Get a club
router.get('/club/:id', getClub)
// router.post('/club',getClub)

///////// add more details
router.patch('/add-details/:id', addDetails)
// router.patch('/add-details', addDetails)


/////Get All Players
router.get('/', getPlayers)

///////// Get a specific player
// router.post('/player', getPlayer)
router.get('/player/:id', getPlayer)


///////////// Stripe payment
router.post('/create-checkout-session',payment)


// require auth for all workout routes
// router.use(requireAuth)

///Get all club
router.get('/clubs',requireAuth, getClubs)

//////////////// Chat
router.post('/chat/create-chat', createChat);
router.get('/chat/:userId', userChats);
router.get('/chat/find/:firstId/:secondId', findChat);

/////////////// Message
router.post('/message', addMessage);
router.get('/message/:chatId', getMessages);


module.exports = router

