export class InvalidTodoStatusError extends Error {
  public readonly name = 'InvalidTodoStatusError'
  constructor (name: string) {
    super('Invalid status: ' + name + '.')
  }
}
