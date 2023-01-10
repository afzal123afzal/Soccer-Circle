const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const { deletePlayer,
    deleteClub,
    blockPlayer,
    blockClub,
    unblockPlayer,
    unblockClub,
    login,
    signUp
} = require('../Controller/adminController')

////////////login
router.post('/login', login)

//////////delete player
router.delete('/player/:id', deletePlayer)

///////////delete club
router.delete('/club/:id', deleteClub)

///////////// block a player
router.patch('/player/block/:id', blockPlayer)

///////////// unblock a player
router.patch('/player/unblock/:id', unblockPlayer)

//////////// block a club
router.patch('/club/block/:id', blockClub)

//////////// unblock a club
router.patch('/club/unblock/:id', unblockClub)

//////////signup
router.post('/signup', signUp)




module.exports = router
