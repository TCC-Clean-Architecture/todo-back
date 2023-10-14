export class InvalidTodoDescriptionError extends Error {
  public readonly name = 'InvalidTodoDescriptionError'
  constructor (description: string) {
    super('Invalid description: ' + description + '.')
  }
}
