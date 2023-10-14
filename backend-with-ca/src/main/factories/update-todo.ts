import { MongoTodoRepository } from '@/external/repositories/MongoTodoRepository'
import { UpdateTodoUseCase } from '@/usecases/todo/update-todo/update-todo'
import { UpdateTodoController } from '@/web-controllers/todo/update-todo-controller'

const makeUpdateTodoController = (): UpdateTodoController => {
  const todoRepository = new MongoTodoRepository()
  const useCase = new UpdateTodoUseCase(todoRepository)
  const controller = new UpdateTodoController(useCase)
  return controller
}

export { makeUpdateTodoController }
