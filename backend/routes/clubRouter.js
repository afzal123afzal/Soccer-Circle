const express = require('express')
const router = express.Router()
const { signUp,
    login,
    getClubs,
    getClub,
    editDetails,
    getPlayers,
    getPlayer
} = require('../Controller/clubController')

const requireClubAuth = require('../middleware/requireClubAuth')



//////////signUp
router.post('/signup', signUp)

///////////login
router.post('/login', login)

// require auth for all club routes
router.use(requireClubAuth)

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




module.exports = router