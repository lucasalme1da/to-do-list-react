const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth.json')
const User = require('../models/user')


function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 864000,
  })
}

router.post('/register', async (req, res) => {
  console.log(req.body);

  const { username, email, userPassword } = req.body

  try {

    if (await User.findOne({ email }))
      return res.status(400).send({ error: 'E-mail already used!', type: 'email' })

    const user = await User.create(req.body)

    user.password = undefined

    return res.send({
      user,
      token: generateToken({ id: user.id })
    })
  } catch (err) {
    console.log(err);
    return res.status(400).send('Falha no registro')
  }
})

router.post('/authenticate', async (req, res) => {
  const { email, userPassword } = req.body

  const user = await User.findOne({ email }).select('+userPassword')

  if (!user || !await bcrypt.compare(userPassword, user.userPassword))
    return res.status(400).send({ error: "Invalid e-mail or password" })

  user.userPassword = undefined

  res.send({
    user,
    token: generateToken({ id: user.id })
  })
})

module.exports = app => app.use('/auth', router)