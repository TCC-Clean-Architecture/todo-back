import { type InvalidTodoDescriptionError, type InvalidTodoNameError, type InvalidTodoStatusError } from '@/entities/errors/'
import { type AvailableStatus, type ITodo } from '@/entities/interfaces/todo'
import { TodoDescription } from '@/entities/todo/todo-description'
import { TodoName } from '@/entities/todo/todo-name'
import { TodoStatus } from '@/entities/todo/todo-status'
import { type Either, left, right } from '@/shared/either'

class Todo {
  public readonly name: string
  public readonly description: string
  public readonly status: AvailableStatus
  public readonly createdAt: Date

  constructor (name: TodoName, description: TodoDescription, status: TodoStatus, createdAt?: Date) {
    this.name = name.value
    this.description = description.value
    this.status = status.value
    this.createdAt = new Date()
  }

  static create (value: ITodo): Either<InvalidTodoStatusError | InvalidTodoNameError | InvalidTodoDescriptionError, Todo> {
    const todoName = TodoName.create(value.name)
    if (todoName.isLeft()) {
      return left(todoName.value)
    }
    const todoDescription = TodoDescription.create(value.description)
    if (todoDescription.isLeft()) {
      return left(todoDescription.value)
    }
    const todoStatus = TodoStatus.create(value.status)
    if (todoStatus.isLeft()) {
      return left(todoStatus.value)
    }
    return right(new Todo(todoName.value, todoDescription.value, todoStatus.value))
  }
}

export { Todo }
