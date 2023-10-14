import { expect } from 'chai'

import { type ITodo, type ITodoWithId } from '@/entities/interfaces/todo'
import { todoFixture } from '@/tests/helper/fixtures/todo-fixture'
import { InMemoryTodoRepository } from '@/usecases/shared/repository/in-memory-todo-repository'
import { UpdateTodoUseCase } from '@/usecases/todo/update-todo/update-todo'
import { type IHttpRequestWithBodyAndParams } from '@/web-controllers/port/http-request'
import { UpdateTodoController } from '@/web-controllers/todo/update-todo-controller'

describe('UpdateTodoController implementation testing', () => {
  it('should update an specific todo and return success', async () => {
    const fakeTodo = todoFixture()
    const todoRepository = new InMemoryTodoRepository([fakeTodo])
    const updateTodoUseCase = new UpdateTodoUseCase(todoRepository)
    const controllerInstance = new UpdateTodoController(updateTodoUseCase)
    const request: IHttpRequestWithBodyAndParams<Partial<ITodo>, Pick<ITodoWithId, 'id'>> = {
      params: {
        id: fakeTodo.id
      },
      body: {
        name: 'updated',
        description: 'updated',
        status: 'done'
      }
    }
    const response = await controllerInstance.handler(request)
    expect(response.description).to.equal('Todo updated successfully')
    expect(response.statusCode).to.equal(200)
    expect(response.message).to.equal('OK')
    expect(response.type).to.equal('success')
    expect(response.content).to.deep.include(request.body)
  })
  it('should not find todo and return error on attempt to update', async () => {
    const todoRepository = new InMemoryTodoRepository([])
    const updateTodoUseCase = new UpdateTodoUseCase(todoRepository)
    const controllerInstance = new UpdateTodoController(updateTodoUseCase)
    const request: IHttpRequestWithBodyAndParams<Partial<ITodo>, Pick<ITodoWithId, 'id'>> = {
      params: {
        id: 'todo'
      },
      body: {
        name: 'updated',
        description: 'updated',
        status: 'done'
      }
    }
    const response = await controllerInstance.handler(request)
    expect(response.description).to.equal('Error on update todo')
    expect(response.statusCode).to.equal(400)
    expect(response.message).to.equal('Bad Request')
    expect(response.type).to.equal('error')
    expect(response.content).to.deep.equal({
      message: 'Todo not found: todo.'
    })
  })
})
