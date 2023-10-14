export class InvalidTodoNameError extends Error {
  public readonly name = 'InvalidTodoNameError'
  constructor (name: string) {
    super('Invalid name: ' + name + '.')
  }
}
