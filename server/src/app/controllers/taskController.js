const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth')
const Task = require('../models/task')

router.use(authMiddleware)

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.userID })
    return res.send({ tasks })
  } catch (err) {
    return res.status(400).send({ error: "Erro na listagem de projetos" })
  }
})

router.get('/tasks/:tasksID', async (req, res) => {
  try {
    const tasks = await Task.findById(req.params.tasksID)
    return res.send({ tasks })
  } catch (err) {
    return res.status(400).send({ error: "Erro na exibição da tarefa" })
  }
})

router.post('/tasks', async (req, res) => {
  try {
    const { taskDate, taskText, taskColor, taskStatus } = req.body
    const task = await Task.create({ taskDate, taskText, taskColor, taskStatus, assignedTo: req.userID })
    return res.send({
      task
    })
  } catch (err) {
    return res.status(400).send({ error: "Error creating a new task" })
  }
})

router.delete('/tasks/:tasksID', async (req, res) => {
  try {
    const tasks = await Task.findByIdAndRemove(req.params.tasksID)
    return res.send({ tasks, message: "Tarefa apagada com sucesso" })
  } catch (err) {
    return res.status(400).send({ error: "Erro na exclusão da tarefa" })
  }
})

router.put('/tasks/:tasksID', async (req, res) => {
  try {
    const tasks = await Task.findOneAndUpdate({ _id: req.params.tasksID }, req.body)
    return res.send({ tasks, message: "Tarefa atualizada com sucesso" })
  } catch (err) {
    return res.status(400).send({ error: "Erro ao atualizar a tarefa" })
  }
})

module.exports = app => app.use('/', router)