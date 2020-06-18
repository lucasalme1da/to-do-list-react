import React, { useState, useEffect } from 'react'
import './style.css'
import api from '../../Services/api'

import Color from '../../Helper/Color'

const Task = (props) => {
  const date = new Date(props.date)
  const [color, setColor] = useState('rgb(187, 187, 187)')
  const [doneButton, setDoneButton] = useState(false)
  const [deleteButton, setDeleteButton] = useState(false)

  useEffect(() => {
    setColor(props.color)
  }, [])

  function fullDate() {
    let day = date.getDate()
    return [...Array(10).keys()].slice(1).includes(day) ? '0' + day : day
  }

  function fullMonth() {
    let month = date.getMonth()
    return [9, 10, 11].includes(month) ? month + 1 : '0' + (month + 1)
  }

  function handleMouseEnter() {
    !props.status ? setDoneButton(true) : setDeleteButton(true)
  }

  function handleMouseLeave() {
    !props.status ? setDoneButton(false) : setDeleteButton(false)
  }

  function renderButton() {
    return !props.status ?
      (<button className="doneButton" onClick={handleDone}>done!</button>) :
      (<button className="deleteButton" onClick={handleDelete}>delete</button>)
  }

  function handleDone() {
    api.put(`tasks/${props.id}`, { taskStatus: true }, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` }
    })
  }

  function handleDelete() {
    api.delete(`tasks/${props.id}`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` }
    })
      .catch(error => { console.log(error.response.data) })
  }

  function handleChangeColor(e) {
    if (!props.status && e.target !== e.currentTarget.querySelector('button')) {
      const newColor = Color(props.color)
      api.put(`tasks/${props.id}`, { taskColor: newColor }, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` }
      })
    }
  }


  return (
    <div onClick={handleChangeColor} onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave} className="task" style={{ backgroundColor: props.color }}>
      <header>
        <div />
        <span />
        <p>{`${fullDate()}/${fullMonth()}`}</p>
      </header>
      <div className="content">
        <p>{props.content}</p>
      </div>
      <div className="submit">
        {!props.status ? doneButton && renderButton() : deleteButton && renderButton()}
      </div>
    </div>
  )
}


export default Task