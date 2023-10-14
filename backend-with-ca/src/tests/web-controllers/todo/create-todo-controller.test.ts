import { expect } from 'chai'

import { type ITodo } from '@/entities/interfaces/todo'
import { InMemoryTodoRepository } from '@/usecases/shared/repository/in-memory-todo-repository'
import { CreateNewTodoUseCase } from '@/usecases/todo/create-new-todo/create-new-todo'
import { type IHttpRequestWithBody } from '@/web-controllers/port/http-request'
import { CreateTodoController } from '@/web-controllers/todo/create-todo-controller'

describe('CreateTodoController implementation testing', () => {
  it('should create an instance of create todo controller and return success', async () => {
    const todoRepository = new InMemoryTodoRepository([])
    const createNewTodoUseCase = new CreateNewTodoUseCase(todoRepository)
    const controllerInstance = new CreateTodoController(createNewTodoUseCase)
    const request: IHttpRequestWithBody<ITodo> = {
      body: {
        name: 'todo',
        description: 'desc',
        status: 'inprogress'
      }
    }
    const expectedTodo: ITodo = {
      name: 'todo',
      description: 'desc',
      status: 'inprogress'
    }
    const response = await controllerInstance.handler(request)
    expect(response.description).to.equal('Todo created successfully')
    expect(response.statusCode).to.equal(200)
    expect(response.message).to.equal('OK')
    expect(response.type).to.equal('success')
    expect(response.content).to.deep.include(expectedTodo)
  })
  it('should create an instance of create todo controller and return error', async () => {
    const todoRepository = new InMemoryTodoRepository([])
    const createNewTodoUseCase = new CreateNewTodoUseCase(todoRepository)
    const controllerInstance = new CreateTodoController(createNewTodoUseCase)
    const request: IHttpRequestWithBody<ITodo> = {
      body: {
        name: 'a',
        description: 'desc',
        status: 'inprogress'
      }
    }
    const expectedContent = {
      message: 'Invalid name: a.'
    }
    const response = await controllerInstance.handler(request)
    expect(response.description).to.equal('Error on create todo')
    expect(response.statusCode).to.equal(400)
    expect(response.message).to.equal('Bad Request')
    expect(response.type).to.equal('error')
    expect(response.content).to.deep.equal(expectedContent)
  })
})
