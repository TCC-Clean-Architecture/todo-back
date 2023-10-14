import { expect } from 'chai'

import { type ITodoWithId } from '@/entities/interfaces/todo'
import { UnexpectedError } from '@/shared/errors/unexpected-error'
import { type ITodoRepository } from '@/shared/todo-repository'
import { InMemoryTodoRepository } from '@/usecases/shared/repository/in-memory-todo-repository'
import { TodoNotFoundError } from '@/usecases/todo/create-new-todo/errors/todo-not-found-error'
import { DeleteTodoUseCase } from '@/usecases/todo/delete-todo/delete-todo'

class MockTodoRepository implements Partial<ITodoRepository> {
  async findById (todoId: string): Promise<ITodoWithId | null> {
    throw new Error('This is error')
  }
}

describe('Delete todo use case testing', () => {
  it('should delete todo', async () => {
    const todo: ITodoWithId = {
      id: 'id',
      name: 'name',
      description: 'description',
      status: 'todo',
      createdAt: new Date()
    }
    const todoRepository = new InMemoryTodoRepository([todo])
    const useCaseInstance = new DeleteTodoUseCase(todoRepository)
    const result = await useCaseInstance.execute(todo.id)
    expect(result.value).to.equal(todo.id)
    expect(result.isRight()).to.equal(true)
  })
  it('should not find todo to delete', async () => {
    const todoRepository = new InMemoryTodoRepository([])
    const useCaseInstance = new DeleteTodoUseCase(todoRepository)
    const result = await useCaseInstance.execute('abcde')
    expect(result.value).to.be.instanceOf(TodoNotFoundError)
    expect(result.isLeft()).to.equal(true)
  })
  it('should return an error when something unexpected happens', async () => {
    const todoRepository = new MockTodoRepository() as ITodoRepository
    const useCaseInstance = new DeleteTodoUseCase(todoRepository)
    const result = await useCaseInstance.execute('abcde')
    expect(result.value).to.be.instanceOf(UnexpectedError)
    expect(result.isLeft()).to.equal(true)
  })
})
