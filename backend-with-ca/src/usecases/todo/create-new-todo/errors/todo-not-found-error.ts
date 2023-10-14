export class TodoNotFoundError extends Error {
  public readonly name = 'TodoNotFoundError'
  constructor (todoId: string) {
    super('Todo not found: ' + todoId + '.')
  }
}
