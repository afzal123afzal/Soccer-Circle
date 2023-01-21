const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const clubSchema = new Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true },

    mobile: { type: Number, required: true },

    password: { type: String, required: true },

    regNo: { type: String, required: true },

    blockStatus: { type: Boolean },

    place: { type: String },
  },
  { timestamps: true }
);

///////////////////// static signup method
clubSchema.statics.signup = async function (name, email, mobile, password, regNo) {
  if (!name) {
    throw Error("Please fill the name");
  }
  if (!email) {
    throw Error("Please fill the email");
  }
  if (!mobile) {
    throw Error("Please fill the mobile details");
  }
  if (!password) {
    throw Error("Please fill the password");
  }
  if (!regNo) {
    throw Error("Please fill the register number");
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

  const exist = await this.findOne({ email })
  const mob = await this.findOne({ mobile })

  if (exist) {
    throw Error('Email already in use')
  }
  if (mob) {
    throw Error("Phone number already in use")
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const club = await this.create({ name, email, mobile, password: hash, regNo, blockStatus: false })

  return club

};

///////////// static login method

clubSchema.statics.login = async function (email, password) {
  if (!email) {
    throw Error("Please fill the email");
  }
  if (!password) {
    throw Error("Please fill the password");
  }


  const club = await this.findOne({ email })
  if (!club) {
    throw Error('Incorrect email')
  }
  const match = await bcrypt.compare(password, club.password)
  if (!match) {
    throw Error('Incorrect password')
  }
  if (club.blockStatus) {
    throw Error('You are Blocked')
  }
  return club

}

module.exports = mongoose.model("Club", clubSchema);