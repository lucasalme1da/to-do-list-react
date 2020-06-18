const mongoose = require('../../database')
const bcrypt = require('bcryptjs')

const UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  userPassword: {
    type: String,
    required: true,
    select: false
  },
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetExpires: {
    type: Date,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

UsersSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.userPassword, 10)
  this.userPassword = hash

  next()
})

const Users = mongoose.model('Users', UsersSchema)

module.exports = Users
