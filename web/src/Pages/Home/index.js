import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './style.css'

import Task from '../../Components/Task'
import exitIcon from '../../Assets/log-out.svg'
import addIcon from '../../Assets/add.svg'
import api from '../../Services/api'

import arrayMove from 'array-move'
import { ReactSortable } from "react-sortablejs"

const Home = (props) => {
  const [tasks, setTasks] = useState([])
  const [username, setUsername] = useState('')
  const [finishedButton, setFinishedButton] = useState('Show Finished')
  const [showFinished, setShowFinished] = useState(false)
  const history = useHistory()

  useEffect(() => {
    if (sessionStorage.getItem('jwt') === null)
      history.push('/logon')
    else {
      setUsername(props.location.state.username)
      document.querySelector('title').innerHTML = `To-Do • ${props.location.state.username}`
      getTasks()
    }
  }, [])

  useEffect(() => {
    document.getElementById('taskInput').focus()
  }, [])

  useEffect(() => {
    getTasks()
  }, [tasks])

  function handleLogoff() {
    history.push('/logon')
  }

  function handleShowFinished() {
    if (showFinished) {
      setFinishedButton('Show Finished')
      setShowFinished(false)
    } else {
      setFinishedButton('Unshow Finished')
      setShowFinished(true)
    }
  }

  async function getTasks() {
    await api.get('tasks', {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` }
    })
      .then(res => setTasks(res.data.tasks))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const contentInput = e.target.querySelector('input')

    if (contentInput.value.trim() === '') return

    const data = {
      taskDate: new Date(),
      taskText: contentInput.value,
      taskColor: "rgb(160, 160, 160)",
      taskStatus: 0
    }

    await api.post('tasks', data, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` }
    })

    contentInput.value = ''
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setTasks(arrayMove(tasks, oldIndex, newIndex))
  }

  return (
    <>
      <header className="mainHeader">
        <h1>TO-DO LIST</h1>
        <div className="logout">
          <p>{username}</p>
          <img src={exitIcon} onClick={handleLogoff} />
        </div>
      </header>
      <div className="newTask">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <input id="taskInput" type="text" placeholder="I have to..." maxLength={50} />
          <button>
            <img src={addIcon} alt="" />
          </button>
        </form>
      </div>
      <div id="tasksTodo" className="tasksToDo">


        {tasks.filter(task => !task.taskStatus).length !== 0 ?
          tasks.map(task => {
            if (!task.taskStatus)
              return (<Task
                key={task._id}
                id={task._id}
                color={task.taskColor}
                status={task.taskStatus}
                date={task.taskDate}
                content={task.taskText} />)
          }) :
          (
            <div className="emptyToDo">
              <p>Nothing to do yet, take a walk or play a game :D</p>
            </div>
          )
        }
      </div>
      <div className="showFinished">
        <button onClick={handleShowFinished}>{finishedButton}</button>
      </div>
      {showFinished &&
        <div id="tasksDone" className="tasksDone">
          {tasks.filter(task => task.taskStatus).length !== 0 ?
            tasks.map(task => {
              if (task.taskStatus)
                return (<Task
                  key={task._id}
                  id={task._id}
                  color={task.taskColor}
                  status={task.taskStatus}
                  date={task.taskDate}
                  content={task.taskText} />)
            }) :
            (
              <div className="emptyToDo">
                <p>Nothing done yet. Good luck friend :P</p>
              </div>
            )
          }
        </div>
      }
    </>
  )
}

export default Home