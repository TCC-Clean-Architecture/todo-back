import { type ITodoWithId } from '@/entities/interfaces/todo'
import { type Either, left, right } from '@/shared/either'
import { UnexpectedError } from '@/shared/errors/unexpected-error'
import { type ITodoRepository } from '@/shared/todo-repository'
import { type IUseCase } from '@/usecases/shared/ports/use-case'

class FindAllTodoUseCase implements IUseCase {
  private readonly todoRepository: ITodoRepository
  constructor (todoRepository: ITodoRepository) {
    this.todoRepository = todoRepository
  }

  public async execute (): Promise<Either<UnexpectedError, ITodoWithId[]>> {
    try {
      const result = await this.todoRepository.findAll()
      return right(result)
    } catch (err) {
      return left(new UnexpectedError('Something went wrong on list all todos'))
    }
  }
}

export { FindAllTodoUseCase }
