import { type ITodoWithId, type ITodo } from '../../entities/interfaces/todo'
import { type Either, right, left } from '../../shared/either'
import { TodoNotFoundError } from '../create-new-todo/errors/todo-not-found-error'
import { type ITodoRepository } from '../shared/ports/todo-repository'
import { type IUseCase } from '../shared/ports/use-case'

class UpdateTodoUseCase implements IUseCase {
  private readonly todoRepository: ITodoRepository
  constructor (todoRepository: ITodoRepository) {
    this.todoRepository = todoRepository
  }

  public async execute (todoId: string, content: Partial<ITodo>): Promise<Either<TodoNotFoundError, ITodoWithId>> {
    const result = await this.todoRepository.update(todoId, content)
    if (!result) {
      return left(new TodoNotFoundError(todoId))
    }
    return right(result)
  }
}

export { UpdateTodoUseCase }