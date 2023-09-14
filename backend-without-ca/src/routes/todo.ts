import express from 'express'
import { todoController } from '../controllers/todoController'

const todoRouter = express.Router()

todoRouter.post('/', todoController.post)
todoRouter.get('/', todoController.get)
todoRouter.get('/:id', todoController.getById)
todoRouter.delete('/:id', todoController.delete)
todoRouter.put('/:id', todoController.update)

export {
  todoRouter
}
