import { type Either, left, right } from '@/shared/either'
import { UnexpectedError } from '@/shared/errors/unexpected-error'
import { type ITodoRepository } from '@/shared/todo-repository'
import { type IUseCase } from '@/usecases/shared/ports/use-case'
import { TodoNotFoundError } from '@/usecases/todo/create-new-todo/errors/todo-not-found-error'

class DeleteTodoUseCase implements IUseCase {
  private readonly todoRepository: ITodoRepository
  constructor (todoRepository: ITodoRepository) {
    this.todoRepository = todoRepository
  }

  public async execute (todoId: string): Promise<Either<TodoNotFoundError | UnexpectedError, string>> {
    try {
      const result = await this.todoRepository.delete(todoId)
      if (!result) {
        return left(new TodoNotFoundError(todoId))
      }
      return right(result)
    } catch (err) {
      return left(new UnexpectedError('Something went wrong on attempt to delete todo'))
    }
  }
}

export { DeleteTodoUseCase }
