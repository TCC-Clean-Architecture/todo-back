import { MongoTodoRepository } from '@/external/repositories/MongoTodoRepository'
import { FindTodoByIdUseCase } from '@/usecases/todo/find-todo-by-id/find-todo-by-id'
import { FindSpecificTodoController } from '@/web-controllers/todo/find-specific-todo-controller'

const makeFindSpecificTodoController = (): FindSpecificTodoController => {
  const todoRepository = new MongoTodoRepository()
  const useCase = new FindTodoByIdUseCase(todoRepository)
  const controller = new FindSpecificTodoController(useCase)
  return controller
}

export { makeFindSpecificTodoController }
