import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import register from '../../Assets/register.png'

import InputToast from '../../Components/InputToast'
import api from '../../Services/api'

const Register = () => {
  const [showToast, setShowToast] = useState({
    state: false,
    message: 'I\'m so confused 😕',
    posX: 0,
    posY: 0
  })

  // const [registerSuccess, setRegisterSuccess] = useState(false)

  function inputError(seconds, message, posX, posY) {
    setShowToast({
      state: true,
      message,
      posX,
      posY
    })
    if (showToast.state)
      setTimeout(() => {
        setShowToast({
          state: false,
          message,
          posX,
          posY
        })
      }, seconds * 1000)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const inputs = [...e.target.querySelectorAll('input')]

    const data = {
      username: inputs[0].value,
      email: inputs[1].value,
      userPassword: inputs[2].value,
    }

    if (data.username.trim() === '')
      return inputError(3, 'Name is empty!', inputs[0].offsetLeft, inputs[0].offsetTop)

    if (!/^[a-zA-Z\s]*$/.test(data.username))
      return inputError(3, 'Only alphabetic characteres allowed!', inputs[0].offsetLeft, inputs[0].offsetTop)

    if (!/^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/.test(data.email))
      return inputError(3, 'Invalid e-mail!', inputs[1].offsetLeft, inputs[1].offsetTop)

    if (!/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){8}$/.test(data.userPassword))
      return inputError(3, 'Password must have 1 letter, 1 number and 8 to 20 digits!', inputs[2].offsetLeft, inputs[2].offsetTop)

    if (data.userPassword !== inputs[3].value)
      return inputError(3, 'Password doesn\'t match!', inputs[3].offsetLeft, inputs[3].offsetTop)
    setShowToast({ state: false })

    await api.post('auth/register', data)
      .then(res => {
        sessionStorage.setItem('jwt', res.data.token)
      })
      .catch(error => {
        return inputError(3, error.response.data.error, inputs[1].offsetLeft, inputs[1].offsetTop)
      })

    inputs.map(input => input.value = '')
  }


  return (
    <div className="container">
      {showToast.state &&
        <InputToast message={showToast.message} posX={showToast.posX} posY={showToast.posY} close={setShowToast} />
      }
      <img className="logo" src={register} />
      <div className="register">
        <p>REGISTER</p>
        <form onSubmit={handleSubmit} autoComplete="false">
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="E-mail" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />
          <div>
            <Link to="/logon">
              <div onSubmit={null} className="backButton">
                <p>Go Back</p>
              </div>
            </Link>
            <button type="submit" className="registerButton">
              Register
            </button>
          </div>
        </form>

      </div>
    </div >
  )
}


export default Register