const Club = require('../model/clubModel')
const Player = require('../model/playerModel')
const Admin = require('../model/adminModel')
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");

/////////// create a token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

///////////Login
const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const admin = await Admin.login(email, password)

        // create a token
        const token = createToken(admin._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


//////////GEt all Player
const getAllPlayers = async (req, res) => {
    try {
        const players = await Player.find({}, { password: 0 }).sort({ createdAt: -1 });
        console.log(players, "hello");
        res.status(200).json(players)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

//////////GEt all Clubs
const getAllClubs = async (req, res) => {
    try {
        const clubs = await Club.find({}, { password: 0 }).sort({ createdAt: -1 });
       
        res.status(200).json(clubs)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

/////////Delete a player

const deletePlayer = async (req, res) => {
    const id = req.params.id
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid Player Id' })
        }
        const deleted = await Player.findByIdAndDelete({ _id: id })
        if (!deleted) {
            return res.status(400).json({ mssg: "No such player" })
        }
        res.status(200).json({ mssg: "Deleted" })

    } catch (error) {

    }
}

/////////Delete a player

const deleteClub = async (req, res) => {
    const id = req.params.id
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid Club Id' })
        }
        const deleted = await Club.findByIdAndDelete({ _id: id })
        if (!deleted) {
            return res.status(400).json({ mssg: "No such club" })
        }
        res.status(200).json({ mssg: "Deleted" })

    } catch (error) {

    }
}

////////////block a player
const blockPlayer = async (req, res) => {
    const id = req.params.id
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid Player Id' })
        }
        const player = await Player.findByIdAndUpdate({ _id: id }, { blockStatus: true })
        if (!player) {
            return res.status(400).json({ mssg: "No such player" })
        }
        res.status(200).json({ mssg: "Player has Blocked!!!!" })
    } catch (error) {
        res.status(404).json({ mssg: error.message })
    }
}

////////////unblock a player
const unblockPlayer = async (req, res) => {
    const id = req.params.id
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid Player Id' })
        }
        const player = await Player.findByIdAndUpdate({ _id: id }, { blockStatus: false })
        if (!player) {
            return res.status(400).json({ mssg: "No such player" })
        }
        res.status(200).json({ mssg: "Player has Unblocked!!!!" })
    } catch (error) {
        res.status(404).json({ mssg: error.message })
    }
}

////////////block a club
const blockClub = async (req, res) => {
    const id = req.params.id
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid Club Id' })
        }
        const club = await Club.findByIdAndUpdate({ _id: id }, { blockStatus: true })
        if (!club) {
            return res.status(400).json({ mssg: "No such club" })
        }
        res.status(200).json({ mssg: "Club has Blocked!!!" })
    } catch (error) {
        res.status(404).json({ mssg: error.message })

    }
}

////////////unblock a club
const unblockClub = async (req, res) => {
    const id = req.params.id
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid Club Id' })
        }
        const club = await Club.findByIdAndUpdate({ _id: id }, { blockStatus: false })
        if (!club) {
            return res.status(400).json({ mssg: "No such club" })
        }
        res.status(200).json({ mssg: "Club has Unblocked!!!!!!!" })
    } catch (error) {
        res.status(404).json({ mssg: error.message })

    }
}

///////////signUp
const signUp = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.signup(email, password);

        // create a token
        const token = createToken(admin._id);

        res.status(200).json({ token });

    } catch (error) {
        res.status(404).json({ mssg: error.message });
    }
}


module.exports = {
    deletePlayer,
    deleteClub,
    blockPlayer,
    blockClub,
    unblockPlayer,
    unblockClub,
    login,
    signUp,
    getAllPlayers,
    getAllClubs
}

//////login
// const loginData = req.body
    // try {
    //     const existAdmin = await Admin.findOne({ email: loginData.email, password: loginData.password})
    //     if (existAdmin) {
    //         res.status(200).json({ mssg: "Login Successfully" })
    //     } else {
    //         res.status(404).json({ mssg: "Login Denied" })
    //     }
    // }
    // catch (error) {
    //     res.status(404).json({ mssg: error.message })
    // }