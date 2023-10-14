import { expect } from 'chai'

import { InvalidTodoNameError } from '@/entities/errors/invalid-name-error'
import { type ICompleteTodo, type ITodo } from '@/entities/interfaces/todo'
import { UnexpectedError } from '@/shared/errors/unexpected-error'
import { type ITodoRepository } from '@/shared/todo-repository'
import { InMemoryTodoRepository } from '@/usecases/shared/repository/in-memory-todo-repository'
import { CreateNewTodoUseCase } from '@/usecases/todo/create-new-todo/create-new-todo'
import { TodoNotFoundError } from '@/usecases/todo/create-new-todo/errors/todo-not-found-error'

class MockTodoRepository implements Partial<ITodoRepository> {
  async create (todo: ICompleteTodo): Promise<string> {
    throw new Error('This is error')
  }
}

describe('Create new todo', () => {
  it('should create a new todo', async () => {
    const todo: ITodo = {
      name: 'thisistodo',
      description: 'thisisdescription',
      status: 'todo'
    }
    const todoRepository = new InMemoryTodoRepository([])
    const createNewTodoUseCase = new CreateNewTodoUseCase(todoRepository)
    const result = await createNewTodoUseCase.execute(todo)
    expect(result.isRight()).to.equal(true)
    expect(result.value).to.deep.include(todo)
  })
  it('should return an error on creating new todo', async () => {
    const todo: ITodo = {
      name: 'a',
      description: 'thisisdescription',
      status: 'todo'
    }
    const todoRepository = new InMemoryTodoRepository([])
    const createNewTodoUseCase = new CreateNewTodoUseCase(todoRepository)
    const result = await createNewTodoUseCase.execute(todo)
    expect(result.isLeft()).to.equal(true)
    expect(result.value).to.instanceOf(InvalidTodoNameError)
  })
  it('should not find the inserted todo', async () => {
    const todo: ITodo = {
      name: 'thisistodo',
      description: 'thisisdescription',
      status: 'todo'
    }
    const todoRepositoryMock = {
      create: async () => 'abc',
      findById: async () => null
    } as unknown as ITodoRepository
    const createNewTodoUseCase = new CreateNewTodoUseCase(todoRepositoryMock)
    const result = await createNewTodoUseCase.execute(todo)
    expect(result.isLeft()).to.equal(true)
    expect(result.value).to.be.instanceOf(TodoNotFoundError)
  })
  it('should return an error if something unexpected happens', async () => {
    const todo: ITodo = {
      name: 'thisistodo',
      description: 'thisisdescription',
      status: 'todo'
    }
    const todoRepositoryMock = new MockTodoRepository() as ITodoRepository
    const createNewTodoUseCase = new CreateNewTodoUseCase(todoRepositoryMock)
    const result = await createNewTodoUseCase.execute(todo)
    expect(result.isLeft()).to.equal(true)
    expect(result.value).to.be.instanceOf(UnexpectedError)
  })
})
