import { expect } from 'chai'

import { type ITodoWithId } from '@/entities/interfaces/todo'
import { type ITodoRepository } from '@/shared/todo-repository'
import { todoFixture } from '@/tests/helper/fixtures/todo-fixture'
import { InMemoryTodoRepository } from '@/usecases/shared/repository/in-memory-todo-repository'
import { FindAllTodoUseCase } from '@/usecases/todo/find-all-todos/find-all-todos'
import { FindAllTodoController } from '@/web-controllers/todo/find-all-todo-controller'

class MockTodoRepository implements Partial<ITodoRepository> {
  async findAll (): Promise<ITodoWithId[]> {
    throw new Error('This is error')
  }
}

describe('FindAllTodoController implementation testing', () => {
  it('should find all instances created and return success', async () => {
    const fakeTodo = todoFixture()
    const todoRepository = new InMemoryTodoRepository([fakeTodo, fakeTodo])
    const findAllTodosUseCase = new FindAllTodoUseCase(todoRepository)
    const controllerInstance = new FindAllTodoController(findAllTodosUseCase)
    const response = await controllerInstance.handler()
    expect(response.description).to.equal('Find all todos executed successfully')
    expect(response.statusCode).to.equal(200)
    expect(response.message).to.equal('OK')
    expect(response.type).to.equal('success')
    const { id, ...rest } = fakeTodo
    const expectedFakeTodo = {
      _id: id,
      ...rest
    }
    expect(response.content).to.deep.equal([expectedFakeTodo, expectedFakeTodo])
  })
  it('should return an error happen something unexpected on use case', async () => {
    const todoRepository = new MockTodoRepository() as ITodoRepository
    const findAllTodosUseCase = new FindAllTodoUseCase(todoRepository)
    const controllerInstance = new FindAllTodoController(findAllTodosUseCase)
    const response = await controllerInstance.handler()
    expect(response.description).to.equal('Error on find all todos')
    expect(response.statusCode).to.equal(400)
    expect(response.message).to.equal('Bad Request')
    expect(response.type).to.equal('error')
    expect(response.content).to.deep.equal({
      message: 'UnexpectedError: Something went wrong on list all todos.'
    })
  })
})
