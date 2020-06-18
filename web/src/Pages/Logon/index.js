import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './style.css'
import login from '../../Assets/login.png'

import InputToast from '../../Components/InputToast'
import api from '../../Services/api'

const Logon = () => {
  const history = useHistory()
  const [showToast, setShowToast] = useState({
    state: false,
    message: 'I\'m so confused 😕',
    posX: 0,
    posY: 0
  })

  function inputError(seconds, message, posX, posY) {
    setShowToast({
      state: true,
      message,
      posX,
      posY
    })
    setTimeout(() => {
      setShowToast({
        state: false,
        message,
        posX,
        posY
      })
    }, seconds * 1000)
  }


  async function handleLogin(e) {
    e.preventDefault()

    const inputs = [...e.target.querySelectorAll('input')]

    const data = {
      email: inputs[0].value,
      userPassword: inputs[1].value
    }

    await api.post('auth/authenticate', data)
      .then((res) => {
        const username = res.data.user.username
        const token = res.data.token
        sessionStorage.setItem('user', username)
        sessionStorage.setItem('jwt', token)
        history.push('/home', { username, token })
      })
      .catch(error => {
        return inputError(3, error.response.data.error, inputs[1].offsetLeft, inputs[1].offsetTop)
      })

  }

  return (
    <div className="container">
      {showToast.state &&
        <InputToast message={showToast.message} posX={showToast.posX} posY={showToast.posY} close={setShowToast} />
      }
      <img className="logo" src={login} />
      <div className="login">
        <p>TO-DO LIST</p>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="E-mail" />
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
        <Link className="link" to="/register">Don’t have an account yet?<br />Create one!</Link>
      </div>
    </div>
  )

}

export default Logon