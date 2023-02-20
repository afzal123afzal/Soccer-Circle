const Club = require('../model/clubModel')
const Player = require('../model/playerModel')
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const Stripe = require("stripe");
const Chat = require('../model/chatModel');
const Message = require('../model/messageModel');


const stripe = Stripe(process.env.STRIPE_KEY)

/////////// create a token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//////////signUp
const signUp = async (req, res) => {
  const { name, email, mobile, password,confirmPassword, regNo } = req.body

  try {
    const club = await Club.signup(name, email, mobile, password,confirmPassword, regNo);
    const _id = club._id


    // create a token
    const token = createToken(club._id);

    res.status(200).json({ _id, name, token, email });

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
    console.log(payment, "payment");

    // create a token
    const token = createToken(club._id)

    res.status(200).json({ _id, name, email, payment, token })
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
    const club = await Club.findById({ _id: id }, { password: 0 });
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
    const club = await Club.findByIdAndUpdate({ _id: id }, { ...req.body }).select('-password -mobile -regNo ')
    console.log(club.payment);
    res.status(200).json(club)
  }
  catch (error) {
    res.status(404).json({ mssg: error.message })
  }
}

///////// get All Players

const getPlayers = async (req, res) => {
  console.log(req.query); ////// this technique I used it for filter
  try {
    const player = await Player.find({ ...req.query }, { password: 0 }).sort({ createdAt: -1 });
    console.log(player,"Player");
    if (!player) {
      return res.status(400).json({ mssg: "No Players" });
     }
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
    const player = await Player.findById({ _id: id }, { password: 0 })
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
          unit_amount: 1000 * 49.9,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/club/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/club/players`,
  });

  res.send({ url: session.url })
};

///////////////////// Chat Controller

const createChat = async (req, res) => {
  const newChat = new Chat({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const chat = await Chat.findOne({
      members: { $all: [req.body.senderId, req.body.receiverId] },
    });
    if (chat) {
      res.status(200).json({ mssg: "Already Existed" })
    }
    if (!chat) {
      const result = await newChat.save();
      res.status(200).json(result);
    }

  } catch (error) {
    res.status(500).json(error);
  }
};

const userChats = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(500).json({ error: 'Invalid Id' })
    }
    const chat = await Chat.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

const findChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json(error)
  }
};

////////////////// Message Controller

const addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const message = new Message({
    chatId,
    senderId,
    text,
  });
  try {
    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await Message.find({ chatId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  signUp,
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