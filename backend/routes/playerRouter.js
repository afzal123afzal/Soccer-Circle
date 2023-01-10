const express = require('express')
const router = express.Router()

const { signUp,
    addDetails,
    getPlayers,
    getPlayer,
    login,
    getClubs,
    getClub
} = require('../Controller/playerController')
const requireAuth = require('../middleware/requireAuth')



/////////// Player signup
router.post('/signup', signUp)

///////////// Player login
router.post('/login', login)

// require auth for all workout routes
router.use(requireAuth)

///Get all club
router.get('/clubs', getClubs)

///Get a club
router.get('/club/:id', getClub)

///////// add more details
router.patch('/add-details/:id', addDetails)

/////Get All Players
router.get('/', getPlayers)

///////// Get a specific player
router.get('/:id', getPlayer)





module.exports = router

