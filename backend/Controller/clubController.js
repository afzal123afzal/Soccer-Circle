const Club = require('../model/clubModel')
const Player = require('../model/playerModel')
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const Stripe = require("stripe")

const stripe = Stripe(process.env.STRIPE_KEY)

/////////// create a token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//////////signUp
const signUp = async (req, res) => {
    const { name, email, mobile, password, regNo } = req.body

    try {
        const club = await Club.signup(name, email, mobile, password, regNo);
        const _id = club._id
        

        // create a token
        const token = createToken(club._id);

        res.status(200).json({ _id,name,token,email });

    } catch (error) {
        res.status(404).json({ mssg: error.message });
    }

}

/////////login
const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const club = await Club.login(email, password)
        const _id = club._id
        const name = club.name
        const payment = club.payment
        console.log(payment,"payment");

        // create a token
        const token = createToken(club._id)

        res.status(200).json({ _id,name,email,payment,token})
    } catch (error) {
        res.status(404).json({ mssg: error.message })
    }
}

//////Get All Clubs
const getClubs = async (req, res) => {
    try {
        const players = await Club.find({}, { _id: 0, password: 0 }).sort({ createdAt: -1 });
        res.status(200).json(players)
    }
    catch (error) {
        res.status(404).json({ mssg: error.message })
    }

}

//////////// get a specific club

const getClub = async (req, res) => {
    const id = req.params.id
    try {
        console.log("hi");

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid Club Id' })
        }
        const club = await Club.findById({ _id: id }, {  password: 0 });
        if (!club) {
            return res.status(200).json({ mssg: "Club Not Found" })
        }
        res.status(200).json(club)
    }
    catch (error) {
        res.status(404).json({ mssg: error.message })
    }

}

///////////Edit Club Details
const editDetails = async (req, res) => {
    const id = req.params.id
    try {
        // console.log("hi");

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid Club Id' })
        }
        const club = await Club.findByIdAndUpdate({ _id: id },{ ...req.body }).select('-password -mobile -regNo ')
        console.log(club.payment);
        
        if (!club) {
            return res.status(200).json({ mssg: "Club Not Found" })
        }
        res.status(200).json(club)
    }
    catch (error) {
        res.status(404).json({ mssg: error.message })
    }
}

///////// get All Players

const getPlayers = async (req, res) => {
    try {
        const player = await Player.find({}, { password: 0 }).sort({ createdAt: -1 });
      
        res.status(200).json(player)
    }
    catch (error) {
        res.status(404).json({ mssg: error.message })
    }

}

//////////// get a specific player

const getPlayer = async (req, res) => {
    const id = req.params.id
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid Player Id' })
        }
        const player = await Player.findById({ _id: id }, { _id: 0, password: 0 })
        if (!player) {
            return res.status(200).json({ mssg: "No such player" })
        }
        res.status(200).json(player)
    }
    catch (error) {
        res.status(404).json({ mssg: error.message })
    }

}

////////////////stripe payment

const payment = async (req, res) => {
    console.log(req.body);
    const email = req.body.email
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'Soccer Circle Membership',
            },
            unit_amount: 1000*49.9,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/club/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/club/players`,
    });
  
    res.send({url:session.url})
  };
  

module.exports = {
    signUp,
    login,
    getClubs,
    getClub,
    editDetails,
    getPlayers,
    getPlayer,
    payment
}


//////////////signup
 // try {
    //     const existClub = await Club.findOne({ email: req.body.email })
    //     if (!existClub) {
    //         const club = await Club.create({ ...req.body, blockStatus: false })
    //         res.status(200).json(club)
    //     } else {
    //         res.status(400).json({ mssg: "Club Already Exist" })
    //     }
    // }
    // catch (error) {
    //     res.status(404).json({ mssg: error.message })
    // }

    //////////login
    // const loginData = req.body
    // try {
    //     const existUser = await Club.findOne({ email: loginData.email, password: loginData.password, blockStatus: false })
    //     if (existUser) {
    //         res.status(200).json({ mssg: "Login Successfully" })
    //     } else {
    //         res.status(404).json({ mssg: "Login Denied" })
    //     }
    // }
    // catch (error) {
    //     res.status(404).json({ mssg: error.message })
    // }