import crypto from 'crypto'
import { type ICompleteTodo, type ITodoWithId } from '../../../entities/interfaces/todo'
import { type ITodoRepository } from '../ports/todo-repository'

class InMemoryTodoRepository implements ITodoRepository {
  public repository: ITodoWithId[]
  constructor (initialValue: ITodoWithId[]) {
    this.repository = initialValue
  }

  async create (todo: ICompleteTodo): Promise<string> {
    const id = crypto.randomUUID()
    this.repository.push({
      id,
      ...todo
    })
    return id
  }

  async findById (todoId: string): Promise<ITodoWithId | null> {
    const todo = this.repository.find(item => item.id === todoId)
    return todo ?? null
  }

  async findAll (): Promise<ITodoWithId[]> {
    return this.repository
  }

  async delete (todoId: string): Promise<string> {
    const filteredRepository = this.repository.filter(todo => todo.id !== todoId)
    this.repository = filteredRepository
    return todoId
  }
}

export { InMemoryTodoRepository }
