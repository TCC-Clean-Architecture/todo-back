import { type InvalidTodoDescriptionError, type InvalidTodoNameError, type InvalidTodoStatusError } from '@/entities/errors'
import { type ITodo, type ITodoWithId } from '@/entities/interfaces/todo'
import { Todo } from '@/entities/todo/todo'
import { type Either, left, right } from '@/shared/either'
import { UnexpectedError } from '@/shared/errors/unexpected-error'
import { type ITodoRepository } from '@/shared/todo-repository'
import { type IUseCase } from '@/usecases/shared/ports/use-case'
import { TodoNotFoundError } from '@/usecases/todo/create-new-todo/errors/todo-not-found-error'

type ErrorTypes = InvalidTodoNameError | InvalidTodoDescriptionError | InvalidTodoStatusError | TodoNotFoundError | UnexpectedError

class CreateNewTodoUseCase implements IUseCase {
  private readonly todoRepository: ITodoRepository
  constructor (todoRepository: ITodoRepository) {
    this.todoRepository = todoRepository
  }

  public async execute (todo: ITodo): Promise<Either<ErrorTypes, ITodoWithId>> {
    try {
      const todoInstance = Todo.create(todo)
      if (todoInstance.isLeft()) {
        return left(todoInstance.value)
      }
      const createdId = await this.todoRepository.create(todoInstance.value)
      const todoCreated = await this.todoRepository.findById(createdId)
      if (!todoCreated) {
        return left(new TodoNotFoundError(createdId))
      }
      return right(todoCreated)
    } catch (err) {
      return left(new UnexpectedError('Something went wrong on attempt to create new todo'))
    }
  }
}

export { CreateNewTodoUseCase }
