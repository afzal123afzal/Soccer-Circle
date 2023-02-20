const Player = require("../model/playerModel");
const Club = require("../model/clubModel");
const Stripe = require("stripe")

const stripe = Stripe(process.env.STRIPE_KEY)

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Chat = require('../model/chatModel');
const Message = require('../model/messageModel');

//////////////
const nodemailer = require('nodemailer')
const bcrypt = require("bcrypt");
const validator = require("validator");



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});


/////////// create a token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

/////////////// signUp
// const signUp = async (req, res) => {
//   try {
//     const { name, email, mobile, password, confirmPassword } = req.body;

//     const player = await Player.signup(name, email, mobile, password, confirmPassword);

//     // create a token
//     const token = createToken(player._id);
//     const payment = player.payment
//     const _id = player._id
//     const blockStatus = player.blockStatus


//     res.status(200).json({ _id, email, name, payment, token,blockStatus });

//   } catch (error) {
//     res.status(404).json({ mssg: error.message });
//   }
// };


/////////////////////////// test signup
const signUp = async (req, res) => {
  try {
    const { name, email, mobile, password, confirmPassword } = req.body;

    const player = await Player.signup(name, email, mobile, password, confirmPassword);

    // create a token
    const token = createToken(player._id);
    const token1 = token.replace(/\./g, '__');
    const verificationLink = `${process.env.CLIENT_URL}/player/verify/${token1}`;
    // const verificationLink = `${process.env.CLIENT_URL}/player/verify/${token}`;


    // const parts = verificationLink.split('/'); // Split the URL into parts
    // const tokenIndex = parts.findIndex(part => part === 'verify') + 1; // Get the index of the token part
    // const token1 = parts[tokenIndex].replace(/\./g, '__'); // Remove dots from the token part using a regular expression

    // Reconstruct the URL with the modified token
    // const modifiedUrl = `${parts.slice(0, tokenIndex).join('/')}/${token1}${parts.slice(tokenIndex + 1).join('/')}`;

    //////////////////////
    const _id = player._id
    // const verificationLink = `${process.env.CLIENT_URL}/player/verify/${_id}`;
    const payment = player.payment
    const blockStatus = player.blockStatus

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'SoccerCircle Email Verification',
      html: `Please click this link to verify your email: <a href="${verificationLink}">The MagicLink !!!!! Click Here</a>`,
    };

    await transporter.sendMail(mailOptions);

    // Send response with success message
    res.status(200).json({ message: "Verification has been sent to the mail", _id, email, name, payment, blockStatus });


    // res.status(200).json({ _id, email, name, payment, token,blockStatus });

  } catch (error) {
    res.status(404).json({ mssg: error.message });
  }
};

/////////////////// Verify Token

// Route for email verification
const verifyToken = async (req, res) => {
  const token = req.params.token;

  if (!token) {
    return res.status(400).json({ message: "Invalid verification token" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET);

    //Find the user with the given email
    const user = await Player.findOne({ _id: decoded._id });
    // const user = await Player.findOne({ _id: token });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Mark the user as verified
    user.isVerified = true;
    await user.save();

    // Send response with success message
    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
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
    const blockStatus = player.blockStatus
    const _id = player._id

    // create a token
    const token = createToken(player._id)
    console.log(token);

    res.status(200).json({ _id, email, name, payment, token, blockStatus })
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
    const players = await Player.find({}, { password: 0 }).sort({ createdAt: -1 });
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Club Id' })
    }
    const player = await Player.findById({ _id: id }, { password: 0 })
    // const player = await Player.find({email:email},{_password:0})

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
  console.log(req.query); ////// this technique I used it for filter
  try {
    // const players = await Club.find({}).sort({ createdAt: -1 });
    const players = await Club.find({ ...req.query }, { password: 0 }).sort({ createdAt: -1 });
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
  console.log(req.body);
  try {
    console.log("hi");

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Club Id" });
    }
    const club = await Club.findById({ _id: id }, { password: 0 });
    // const club = await Club.findOne({email}, {  password: 0 });
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
          unit_amount: 1000 * 49.9,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/player/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/player/clubs`,
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

/////////// Otp Login generator

const otpLoginGenerator = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    // Generate random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const user = await Player.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    // Update user's OTP in the database
    user.otp = otp;
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Reset Password',
      text: `Your OTP to login the account is ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).send({ message: 'Failed to send OTP' });
      } else {
        console.log(`OTP sent: ${info.response}`);
        // return res.status(200).send({ token });
        return res.status(200).send({ otp });
      }
    });

  } catch (err) {
    return res.status(500).send({ message: 'Failed to send OTP' });

  }
}

//////////// Otp login
const otpLogin = async (req, res) => {

  const { email, otp } = req.body

  try {
    const player = await Player.otpLogin(email, otp)
    console.log(player.name);
    const name = player.name
    const payment = player.payment
    const _id = player._id
    const blockStatus = player.blockStatus


    // create a token
    const token = createToken(player._id)
    await Player.updateOne({ email }, { $unset: { otp: otp } })


    res.status(200).json({ _id, email, name, payment, token, blockStatus })
  } catch (error) {
    res.status(404).json({ error: error.message })
  }

};


//////////// Password controller

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log(email);

  try {
    // Generate random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const user = await Player.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    // const token = jwt.sign({ email }, 'secret', { expiresIn: '15m' });

    // Update user's OTP in the database
    user.otp = otp;
    await user.save();


    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Reset Password',
      text: `Your OTP to reset password is ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).send({ message: 'Failed to send OTP' });
      } else {
        console.log(`OTP sent: ${info.response}`);
        // return res.status(200).send({ token });
        return res.status(200).json({ otp });
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to send OTP' });
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  console.log(otp);

  try {
    // const decoded = jwt.verify(token, 'secret');
    // if (decoded.email !== email) {
    //   return res.status(400).send({ message: 'Invalid token' });
    // }
    const user = await Player.findOne({ email })
    console.log(user.otp, otp, "user otp");

    if (otp === user.otp) {
      console.log("hi");
      const newToken = jwt.sign({ email }, 'secret', { expiresIn: '15m' });
      // await Player.updateOne({ email }, { $unset: { otp: otp } })
      return res.status(200).send({ message: 'OTP verified', token: newToken });
    } else {
      return res.status(400).send({ message: 'Invalid OTP' });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).send({ message: 'Invalid token' });
  }
};

const resetPassword = async (req, res) => {
  const { email, password,otp } = req.body;

  try {
    const user = await Player.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    if (!validator.isStrongPassword(password)) {
      throw Error('Password not strong enough')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    user.password = hash;
    await user.save();
    await Player.updateOne({ email }, { $unset: { otp: otp } })
    return res.status(200).send({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    return res.status(400).send({ message: err.message });
  }
};

module.exports = {
  signUp,
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
};


