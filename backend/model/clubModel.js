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

    isVerified: { type: Boolean, default: false},
    otp: { type: String },

    blockStatus: { type: Boolean },
    payment: { type: Boolean },
    image: { type: String },


    place: { type: String },
  },
  { timestamps: true }
);

///////////////////// static signup method
clubSchema.statics.signup = async function (name, email, mobile, password, confirmPassword, regNo) {
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
  if (!confirmPassword) {
    throw Error("Please fill the confirm password");
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

  if (!validator.equals(password, confirmPassword)) {
    throw Error('Passwords do not match');
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

  const club = await this.create({ name, email, mobile, password: hash, regNo, blockStatus: false, payment: false })

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
  if (!club.isVerified) {
    throw Error('Verify the code sent to your email')
  }
  return club

}

/////// static Otp login method

clubSchema.statics.otpLogin = async function (email, otp) {
  if (!email) {
    throw Error("Please fill the email");
  }
  if (!otp) {
    throw Error("Please fill the otp");
  }


  const club = await this.findOne({ email })
  if (!club){
    throw Error('Incorrect email')
  }
  if (otp != club.otp) {
    throw Error('Incorrect otp')
  }
  if (club.blockStatus) {
    throw Error('You are Blocked')
  }
  if (!club.isVerified) {
    throw Error('Verify the code sent to your email')
  }
  return club

}

module.exports = mongoose.model("Club", clubSchema);
