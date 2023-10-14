import { expect } from 'chai'

import { type ITodoWithId } from '@/entities/interfaces/todo'
import { UnexpectedError } from '@/shared/errors/unexpected-error'
import { type ITodoRepository } from '@/shared/todo-repository'
import { InMemoryTodoRepository } from '@/usecases/shared/repository/in-memory-todo-repository'
import { TodoNotFoundError } from '@/usecases/todo/create-new-todo/errors/todo-not-found-error'
import { FindTodoByIdUseCase } from '@/usecases/todo/find-todo-by-id/find-todo-by-id'

class MockTodoRepository implements Partial<ITodoRepository> {
  async findById (todoId: string): Promise<ITodoWithId | null> {
    throw new Error('This is error')
  }
}

describe('Find todo by id', () => {
  it('should find todo by id', async () => {
    const todoId = 'thisisid'
    const todo: ITodoWithId = {
      id: todoId,
      name: 'thisisname',
      description: 'thisisdescription',
      status: 'inprogress',
      createdAt: new Date()
    }
    const todoRepository = new InMemoryTodoRepository([todo])
    const useCaseInstance = new FindTodoByIdUseCase(todoRepository)
    const result = await useCaseInstance.execute(todoId)
    expect(result.isRight()).to.equal(true)
    expect(result.value).to.deep.equal(todo)
  })
  it('should return an error when not find id', async () => {
    const todoId = 'thisisid'
    const todo: ITodoWithId = {
      id: 'anotherid',
      name: 'thisisname',
      description: 'thisisdescription',
      status: 'inprogress',
      createdAt: new Date()
    }
    const todoRepository = new InMemoryTodoRepository([todo])
    const useCaseInstance = new FindTodoByIdUseCase(todoRepository)
    const result = await useCaseInstance.execute(todoId)
    expect(result.isLeft()).to.equal(true)
    expect(result.value).instanceOf(TodoNotFoundError)
  })
  it('should return an error when something unexpected happens', async () => {
    const todoId = 'thisisid'
    const todoRepository = new MockTodoRepository() as ITodoRepository
    const useCaseInstance = new FindTodoByIdUseCase(todoRepository)
    const result = await useCaseInstance.execute(todoId)
    expect(result.isLeft()).to.equal(true)
    expect(result.value).instanceOf(UnexpectedError)
  })
})
