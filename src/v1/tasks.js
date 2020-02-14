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
    //newTask.isDone = false
    tasks.push(newTask)

    return res.status(201).json(newTask)
  })

  .delete((req, res, next) => {
    tasks = []

    res.status(204).end()
  })

module.exports = router
