const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const playerSchema = new Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true },

    mobile: { type: Number, required: true },

    password: { type: String, required: true },

    blockStatus: { type: Boolean },

    age: { type: Number },

    position: { type: String },

    weight: { type: Number },

    prevClub: { type: String },

    currClub: { type: String },

    place: { type: String },
  },
  { timestamps: true }
);

//////////// static signup method
playerSchema.statics.signup = async function (name, email, mobile, password) {
  if (!name) {
    throw Error("Please fill the name");
  }
  if (!email) {
    throw Error("Please fill the email");
  }
  if (!password) {
    throw Error("Please fill the password");
  }
  if (!mobile) {
    throw Error("Please fill the mobile details");
  }

  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }

  if (!validator.isMobilePhone(mobile)) {
    throw Error('Phone number is not valid')
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const exists = await this.findOne({ email })
  const mob = await this.findOne({ mobile })

  if (exists) {
    throw Error('Email already in use')
  }
  if (mob) {
    throw Error("Phone number already in use")
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const player = await this.create({ name, email, mobile, password: hash, blockStatus: false })

  return player
}

/////// static login method

playerSchema.statics.login = async function (email, password) {
  if (!email) {
    throw Error("Please fill the email");
  }
  if (!password) {
    throw Error("Please fill the password");
  }


  const player = await this.findOne({ email })
  if (!player) {
    throw Error('Incorrect email')
  }
  const match = await bcrypt.compare(password, player.password)
  if (!match) {
    throw Error('Incorrect password')
  }
  if (player.blockStatus) {
    throw Error('You are Blocked')
  }
  return player

}


module.exports = mongoose.model("Player", playerSchema);
