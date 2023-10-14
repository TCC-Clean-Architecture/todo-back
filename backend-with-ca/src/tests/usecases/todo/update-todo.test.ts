import { expect } from 'chai'

import { type ITodo, type ITodoWithId } from '@/entities/interfaces/todo'
import { UnexpectedError } from '@/shared/errors/unexpected-error'
import { type ITodoRepository } from '@/shared/todo-repository'
import { InMemoryTodoRepository } from '@/usecases/shared/repository/in-memory-todo-repository'
import { TodoNotFoundError } from '@/usecases/todo/create-new-todo/errors/todo-not-found-error'
import { UpdateTodoUseCase } from '@/usecases/todo/update-todo/update-todo'

class MockTodoRepository implements Partial<ITodoRepository> {
  async update (todoId: string, content: Partial<ITodo>): Promise<string | null> {
    throw new Error('This is error')
  }
}

describe('Update todo use case testing', () => {
  it('should update todo', async () => {
    const todo: ITodoWithId = {
      id: 'id',
      name: 'name',
      description: 'description',
      status: 'todo',
      createdAt: new Date()
    }
    const todoUpdate: ITodo = {
      name: 'dataupdated',
      description: 'dataupdated',
      status: 'inprogress'
    }
    const todoRepository = new InMemoryTodoRepository([todo])
    const useCaseInstance = new UpdateTodoUseCase(todoRepository)
    const result = await useCaseInstance.execute(todo.id, todoUpdate)
    const expectedResult = {
      id: todo.id,
      ...todoUpdate,
      createdAt: todo.createdAt
    }
    expect(result.value).to.deep.equal(expectedResult)
    const validateId = await todoRepository.findAll()
    expect(validateId).to.deep.equal([expectedResult])
  })
  it('should not find todo to update', async () => {
    const todoRepository = new InMemoryTodoRepository([])
    const useCaseInstance = new UpdateTodoUseCase(todoRepository)
    const result = await useCaseInstance.execute('abcde', {})
    expect(result.value).to.be.instanceOf(TodoNotFoundError)
    expect(result.isLeft()).to.equal(true)
  })
  it('should return an error when something unexpected happens', async () => {
    const todoRepository = new MockTodoRepository() as ITodoRepository
    const useCaseInstance = new UpdateTodoUseCase(todoRepository)
    const result = await useCaseInstance.execute('abcde', {})
    expect(result.value).to.be.instanceOf(UnexpectedError)
    expect(result.isLeft()).to.equal(true)
  })
})
