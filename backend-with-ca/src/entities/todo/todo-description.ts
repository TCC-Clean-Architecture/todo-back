import { InvalidTodoDescriptionError } from '@/entities/errors'
import { type Either, left, right } from '@/shared/either'

class TodoDescription {
  public readonly value: string
  constructor (value: string) {
    this.value = value
  }

  public static create (todoDescription: string): Either<InvalidTodoDescriptionError, TodoDescription> {
    if (!TodoDescription.validate(todoDescription)) {
      return left(new InvalidTodoDescriptionError(todoDescription))
    }
    return right(new TodoDescription(todoDescription))
  }

  public static validate (todoDescription: string): boolean {
    if (todoDescription.length < 2 || todoDescription.length > 256 || (typeof todoDescription !== 'string')) {
      return false
    }

    return true
  }
}

export { TodoDescription }
