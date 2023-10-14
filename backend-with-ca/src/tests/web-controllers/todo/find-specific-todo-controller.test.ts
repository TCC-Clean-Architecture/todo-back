import { expect } from 'chai'

import { type ITodoWithId } from '@/entities/interfaces/todo'
import { todoFixture } from '@/tests/helper/fixtures/todo-fixture'
import { InMemoryTodoRepository } from '@/usecases/shared/repository/in-memory-todo-repository'
import { FindTodoByIdUseCase } from '@/usecases/todo/find-todo-by-id/find-todo-by-id'
import { type IHttpRequestWithParams } from '@/web-controllers/port/http-request'
import { FindSpecificTodoController } from '@/web-controllers/todo/find-specific-todo-controller'

describe('FindSpecificTodoController implementation testing', () => {
  it('should find an specific todo by id and return success', async () => {
    const fakeTodo = todoFixture()
    const todoRepository = new InMemoryTodoRepository([fakeTodo])
    const findTodoByIdUseCase = new FindTodoByIdUseCase(todoRepository)
    const controllerInstance = new FindSpecificTodoController(findTodoByIdUseCase)
    const request: IHttpRequestWithParams<Pick<ITodoWithId, 'id'>> = {
      params: {
        id: fakeTodo.id
      }
    }
    const response = await controllerInstance.handler(request)
    expect(response.description).to.equal('Todo found successfully')
    expect(response.statusCode).to.equal(200)
    expect(response.message).to.equal('OK')
    expect(response.type).to.equal('success')
    const { id, ...rest } = fakeTodo
    const expectedFakeTodo = {
      _id: id,
      ...rest
    }
    expect(response.content).to.deep.equal(expectedFakeTodo)
  })
  it('should not find todo and return error', async () => {
    const todoRepository = new InMemoryTodoRepository([])
    const findTodoByIdUseCase = new FindTodoByIdUseCase(todoRepository)
    const controllerInstance = new FindSpecificTodoController(findTodoByIdUseCase)
    const request: IHttpRequestWithParams<Pick<ITodoWithId, 'id'>> = {
      params: {
        id: 'todo'
      }
    }
    const response = await controllerInstance.handler(request)
    expect(response.description).to.equal('Error on get todo by id')
    expect(response.statusCode).to.equal(400)
    expect(response.message).to.equal('Bad Request')
    expect(response.type).to.equal('error')
    expect(response.content).to.deep.equal({
      message: 'Todo not found: todo.'
    })
  })
})
