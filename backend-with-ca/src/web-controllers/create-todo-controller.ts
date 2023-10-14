import { type ITodo } from '@/entities/interfaces/todo'
import { type CreateNewTodoUseCase } from '@/usecases/todo/create-new-todo/create-new-todo'
import { badRequest, ok } from '@/web-controllers/helper/http-response-builder'
import { type Controller } from '@/web-controllers/port/controller'
import { type IHttpRequestWithBody } from '@/web-controllers/port/http-request'
import { type IHttpResponse } from '@/web-controllers/port/http-response'

class CreateTodoController implements Controller {
  private readonly useCase: CreateNewTodoUseCase
  constructor (useCase: CreateNewTodoUseCase) {
    this.useCase = useCase
  }

  async handler (request: IHttpRequestWithBody<ITodo>): Promise<IHttpResponse> {
    const response = await this.useCase.execute(request.body)
    if (response.isLeft()) {
      return badRequest({
        description: 'Error on create todo',
        content: response.value
      })
    }
    return ok({
      description: 'Todo created successfully',
      content: response.value
    })
  }
}

export {
  CreateTodoController
}
