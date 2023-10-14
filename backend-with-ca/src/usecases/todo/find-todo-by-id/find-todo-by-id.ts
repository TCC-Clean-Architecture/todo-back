import { type ITodoWithId } from '@/entities/interfaces/todo'
import { type Either, left, right } from '@/shared/either'
import { UnexpectedError } from '@/shared/errors/unexpected-error'
import { type ITodoRepository } from '@/shared/todo-repository'
import { type IUseCase } from '@/usecases/shared/ports/use-case'
import { TodoNotFoundError } from '@/usecases/todo/create-new-todo/errors/todo-not-found-error'

class FindTodoByIdUseCase implements IUseCase {
  private readonly todoRepository: ITodoRepository
  constructor (todoRepository: ITodoRepository) {
    this.todoRepository = todoRepository
  }

  public async execute (todoId: string): Promise<Either<TodoNotFoundError | UnexpectedError, ITodoWithId>> {
    try {
      const findResult = await this.todoRepository.findById(todoId)
      if (!findResult) {
        return left(new TodoNotFoundError(todoId))
      }
      return right(findResult)
    } catch (err) {
      return left(new UnexpectedError('Something went wrong on attempt to find todo by id'))
    }
  }
}

export { FindTodoByIdUseCase }
