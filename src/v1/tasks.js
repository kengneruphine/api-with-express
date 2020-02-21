const router = require('express').Router()

/**
 * Store data in DB
*/

const tasks = [
  {
    description: 'Read Closure in Javascript',
    isDone: false,
    createdAt: Date.now()
  }
]

router.route('/')
  .get((req, res, next) => {
    return res.json({ tasks })
  })

  .post((req, res, next) => {
    const newTask = req.body
    newTask.createdAt = Date.now()
    // newTask.isDone = false
    tasks.push(newTask)

    return res.status(201).json(newTask)
  })

  .post((req, res, next) => {
    const updatedTask = req.body
    
    tasks[req.params.taskId] = updatedTask

    return res.json(updatedTask)
  })

  //patch request use to update partially a resource in an API REST
  .patch((req, res, next) => {
    for (let prop in req.body) {
      tasks[req.params.taskId][prop] = req.body[prop]
    }

    return res.json(tasks[req.params.taskId])
  })

  //deleting a single resource
  .delete((req, res, next) => {
    tasks.splice(req.params.taskId, 1)
    
    res.status(204).end()
  })

  // deleting all items
  .delete((req, res, next) => {
    tasks = [];
    res.status(204).end()
  })

router.param('taskId', (req, res, next, id) => {
  const task = tasks[id]
  let err

  if (!task) {
    err = new Error('Task not found')
    err.status = 404
  } else {
    req.task = task
  }

  return next(err)
})

router.route('/:taskId')
  .get((req, res, next) => {
    return res.json(req.task)
  })

module.exports = router
