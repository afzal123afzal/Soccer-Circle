const Player = require("../model/playerModel");
const Club = require("../model/clubModel");
const Stripe = require("stripe")

const stripe = Stripe(process.env.STRIPE_KEY)

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


/////////// create a token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

/////////////// signUp
const signUp = async (req, res) => {
  try {
  const { name, email, mobile, password } = req.body;

    const player = await Player.signup(name, email, mobile, password);

    // create a token
    const token = createToken(player._id);
    const payment = player.payment
    const _id = player._id


    res.status(200).json({ _id,email,name, payment,token });

  } catch (error) {
    res.status(404).json({ mssg: error.message });
  }
};

//////////// login
const login = async (req, res) => {

  const { email, password } = req.body

  try {
    const player = await Player.login(email, password)
    console.log(player.name);
    const name = player.name
    const payment = player.payment
    const _id = player._id

    // create a token
    const token = createToken(player._id)
    console.log(token);

    res.status(200).json({_id, email,name,payment, token })
  } catch (error) {
    res.status(404).json({ error: error.message })
  }

};

///////// add more details

const addDetails = async (req, res) => {
  const id = req.params.id;
  const body = req.body
  console.log(body);


  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Player Id" });
    }
    const player = await Player.findByIdAndUpdate({ _id: id }, { ...req.body });
    // const player = await Player.updateOne({ email:email }, { ...req.body });
    console.log('hello');
    if (!player) {
      return res.status(200).json({ mssg: "Player Not Found" });
    }
    // res.status(200).json({ mssg: "Player has updated!!!!" });
    res.status(200).json(player);

  } catch (error) {
    res.status(404).json({ mssg: error.message });
  }
};

///////// get All Players

const getPlayers = async (req, res) => {
  try {
    const players = await Player.find({}, {  password: 0 }).sort({ createdAt: -1 });
    res.status(200).json(players);
  } catch (error) {
    res.status(404).json({ mssg: error.message });
  }
};

//////////// get a specific player

const getPlayer = async (req, res) => {
  console.log(req.body);
  const email = req.body.email
  const id = req.params.id;
  try {
    // const player = await Player.findById({ _id: id }, { password: 0 })
    const player = await Player.find({email:email},{_password:0})
    
    if (!player) {
      return res.status(200).json({ mssg: "No such player" });
    }
    res.status(200).json(player);
  } catch (error) {
    res.status(404).json({ mssg: error.message });
  }
};

//////Get All Clubs
const getClubs = async (req, res) => {
  console.log("hi");
  try {
    // const players = await Club.find({}).sort({ createdAt: -1 });
    const players = await Club.find({}, {  password: 0 }).sort({ createdAt: -1 });
    if (!players) {
     return res.status(400).json({ mssg: "No Clubs" });
    }
    console.log("get all clubs from player side");
    res.status(200).json(players);
  } catch (error) {
    res.status(404).json({ mssg: error.message });
  }
};
//////////// get a specific club

const getClub = async (req, res) => {
  const id = req.params.id;
  const email = req.body.email
  console.log(req.body);
  try {
    console.log("hi");

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(400).json({ error: "Invalid Club Id" });
    // }
    // const club = await Club.findById({ _id: id }, { _id: 0, password: 0 });
    const club = await Club.findOne({email}, {  password: 0 });
    if (!club) {
      return res.status(200).json({ mssg: "Club Not Found" });
    }
    res.status(200).json(club);
  } catch (error) {
    res.status(404).json({ mssg: error.message });
  }
};



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
    success_url: `${process.env.CLIENT_URL}/player/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/player/clubs`,
  });

  res.send({url:session.url})
};



module.exports = {
  signUp,
  addDetails,
  getPlayers,
  getPlayer,
  login,
  getClubs,
  getClub,
  payment
};


/////////signup
// const existUser = await Player.findOne({ email: req.body.email })
// if (!existUser) {
//     const player = await Player.create({ ...req.body, blockStatus: false })
//     res.status(200).json(player)
// } else {
//     res.status(400).json({ mssg: "User Already Exist" })
// }


    ////////////////login
//   const loginData = req.body;
//   try {
//     const existUser = await Player.findOne({
//       email: loginData.email,
//       password: loginData.password,
//       blockStatus: false,
//     });
//     if (existUser) {
//       res.status(200).json({ mssg: "Login Successfully" });
//     } else {
//       res.status(404).json({ mssg: "Login Denied" });
//     }

//   } catch (error) {
//     res.status(404).json({ mssg: error.message });
//   }