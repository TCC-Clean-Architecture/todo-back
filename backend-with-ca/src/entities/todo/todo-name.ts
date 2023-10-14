import { InvalidTodoNameError } from '@/entities/errors'
import { type Either, left, right } from '@/shared/either'

class TodoName {
  public readonly value: string
  constructor (value: string) {
    this.value = value
  }

  public static create (todoName: string): Either<InvalidTodoNameError, TodoName> {
    if (!TodoName.validate(todoName)) {
      return left(new InvalidTodoNameError(todoName))
    }
    return right(new TodoName(todoName))
  }

  public static validate (todoName: string): boolean {
    if (todoName.length < 3 || todoName.length > 100 || (typeof todoName !== 'string')) {
      return false
    }

    return true
  }
}

export { TodoName }
