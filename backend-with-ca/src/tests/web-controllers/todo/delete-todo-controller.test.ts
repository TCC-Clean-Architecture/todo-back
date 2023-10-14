import { expect } from 'chai'

import { type ITodoWithId } from '@/entities/interfaces/todo'
import { todoFixture } from '@/tests/helper/fixtures/todo-fixture'
import { InMemoryTodoRepository } from '@/usecases/shared/repository/in-memory-todo-repository'
import { DeleteTodoUseCase } from '@/usecases/todo/delete-todo/delete-todo'
import { type IHttpRequestWithParams } from '@/web-controllers/port/http-request'
import { DeleteTodoController } from '@/web-controllers/todo/delete-todo-controller'

describe('DeleteTodoController implementation testing', () => {
  it('should delete an specific todo by id and return success', async () => {
    const fakeTodo = todoFixture()
    const todoRepository = new InMemoryTodoRepository([fakeTodo])
    const deleteTodoUseCase = new DeleteTodoUseCase(todoRepository)
    const controllerInstance = new DeleteTodoController(deleteTodoUseCase)
    const request: IHttpRequestWithParams<Pick<ITodoWithId, 'id'>> = {
      params: {
        id: fakeTodo.id
      }
    }
    const response = await controllerInstance.handler(request)
    expect(response.description).to.equal('Todo deleted successfully')
    expect(response.statusCode).to.equal(200)
    expect(response.message).to.equal('OK')
    expect(response.type).to.equal('success')
    expect(response.content).to.deep.equal({
      _id: fakeTodo.id
    })
  })
  it('should not find todo and return error on attempt to delete', async () => {
    const todoRepository = new InMemoryTodoRepository([])
    const deleteTodoUseCase = new DeleteTodoUseCase(todoRepository)
    const controllerInstance = new DeleteTodoController(deleteTodoUseCase)
    const request: IHttpRequestWithParams<Pick<ITodoWithId, 'id'>> = {
      params: {
        id: 'todo'
      }
    }
    const response = await controllerInstance.handler(request)
    expect(response.description).to.equal('Error on delete todo')
    expect(response.statusCode).to.equal(400)
    expect(response.message).to.equal('Bad Request')
    expect(response.type).to.equal('error')
    expect(response.content).to.deep.equal({
      message: 'Todo not found: todo.'
    })
  })
})
