import { expect } from 'chai'

import { type ITodoWithId } from '@/entities/interfaces/todo'
import { UnexpectedError } from '@/shared/errors/unexpected-error'
import { type ITodoRepository } from '@/shared/todo-repository'
import { InMemoryTodoRepository } from '@/usecases/shared/repository/in-memory-todo-repository'
import { FindAllTodoUseCase } from '@/usecases/todo/find-all-todos/find-all-todos'

class MockTodoRepository implements Partial<ITodoRepository> {
  async findAll (): Promise<ITodoWithId[]> {
    throw new Error('This is error')
  }
}

describe('Find all todo use case testing', () => {
  it('should return all todos inserted', async () => {
    const todos: ITodoWithId = {
      id: 'id',
      name: 'name',
      description: 'description',
      status: 'todo',
      createdAt: new Date()
    }
    const todoRepository = new InMemoryTodoRepository([todos, todos])
    const useCaseInstance = new FindAllTodoUseCase(todoRepository)
    const result = await useCaseInstance.execute()
    expect(result.value).to.deep.equal([todos, todos])
    expect(result.isRight()).to.equal(true)
  })
  it('should list empty list of todos', async () => {
    const todoRepository = new InMemoryTodoRepository([])
    const useCaseInstance = new FindAllTodoUseCase(todoRepository)
    const result = await useCaseInstance.execute()
    expect(result.value).to.deep.equal([])
    expect(result.isRight()).to.equal(true)
  })
  it('should return an error when findAll throws an exception', async () => {
    const todoRepository = new MockTodoRepository() as ITodoRepository
    const useCaseInstance = new FindAllTodoUseCase(todoRepository)
    const result = await useCaseInstance.execute()
    expect(result.isLeft()).to.equal(true)
    expect(result.value).to.be.instanceOf(UnexpectedError)
  })
})
