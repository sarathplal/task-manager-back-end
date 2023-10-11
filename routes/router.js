const express = require('express')

// create new object for express.Router class
const router = new express.Router()

const userController = require('../controller/userController')
const projectController = require('../controller/projectController')
const { authenticationMiddleware } = require('../middleware/authMiddleware')

// Requests

// Register request
router.post('/register', userController.register)
// Login Request
router.post('/login', userController.login)

// test Proteted Route
router.get('/test', authenticationMiddleware, userController.test)

// Project Routes
// create project
router.post('/create-project', authenticationMiddleware, projectController.create)

// Task routes
// Add Tasks to  Project
router.post('/add-task', authenticationMiddleware, projectController.taskCreation)

// Edit Task
router.put('/:id/delete-task', authenticationMiddleware, projectController.deleteTask)

module.exports = router
