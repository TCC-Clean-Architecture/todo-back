export class UnexpectedError extends Error {
  public readonly name = 'UnexpectedError'
  constructor (description: string) {
    super('UnexpectedError: ' + description + '.')
  }
}
