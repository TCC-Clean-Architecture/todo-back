import { MongoTodoRepository } from '@/external/repositories/MongoTodoRepository'
import { CreateNewTodoUseCase } from '@/usecases/todo/create-new-todo/create-new-todo'
import { CreateTodoController } from '@/web-controllers/todo/create-todo-controller'

const makeCreateTodoController = (): CreateTodoController => {
  const todoRepository = new MongoTodoRepository()
  const useCase = new CreateNewTodoUseCase(todoRepository)
  const controller = new CreateTodoController(useCase)
  return controller
}

export { makeCreateTodoController }
