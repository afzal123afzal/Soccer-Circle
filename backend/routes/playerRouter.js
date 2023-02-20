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
    getMessages,
    forgotPassword,
    verifyOtp,
    resetPassword,
    otpLoginGenerator,
    otpLogin,
    verifyToken
} = require('../Controller/playerController')
const requireAuth = require('../middleware/requireAuth')



/////////// Player signup
router.post('/signup', signUp)

///////////// Player login
router.post('/login', login)


///Get all club
router.get('/clubs',requireAuth, getClubs)

///Get a club
router.get('/club/:id',requireAuth, getClub)
// router.post('/club',getClub)

///////// add more details
router.patch('/add-details/:id',requireAuth, addDetails)
// router.patch('/add-details', addDetails)


/////Get All Players
router.get('/', getPlayers)

///////// Get a specific player
// router.post('/player', getPlayer)
router.get('/player/:id',requireAuth, getPlayer)


///////////// Stripe payment
router.post('/create-checkout-session',requireAuth,payment)

// require auth for all workout routes
// router.use(requireAuth)

//////////////// Chat
router.post('/chat/create-chat',requireAuth, createChat);
router.get('/chat/:userId',requireAuth, userChats);
router.get('/chat/find/:firstId/:secondId', findChat);
    
/////////////// Message
router.post('/message',requireAuth, addMessage);
router.get('/message/:chatId',requireAuth, getMessages);

//////////////// reset
router.post('/forgot-password',forgotPassword)
router.post('/verify-otp',verifyOtp)
router.post('/reset-password',resetPassword)

//////////// Otp Login
router.post('/otp-login-generator',otpLoginGenerator)
router.post('/otp-login',otpLogin)

////////////verify Email
router.post('/verify/:token',verifyToken)




module.exports = router

