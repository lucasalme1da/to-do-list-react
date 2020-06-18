const mongoose = require('../../database')

const TasksSchema = new mongoose.Schema({
  taskDate: {
    type: Date,
    required: true
  },
  taskText: {
    type: String,
    required: true
  },
  taskColor: {
    type: String,
    required: true,
    default: false
  },
  taskStatus: {
    type: Boolean,
    required: true,
    default: false
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Tasks = mongoose.model('Tasks', TasksSchema)

module.exports = Tasks
