import { type ITodoWithId } from '@/entities/interfaces/todo'
import { type DeleteTodoUseCase } from '@/usecases/todo/delete-todo/delete-todo'
import { badRequest, ok } from '@/web-controllers/helper/http-response-builder'
import { idConverter } from '@/web-controllers/helper/id-property-name-converter'
import { type Controller } from '@/web-controllers/port/controller'
import { type IHttpRequestWithParams } from '@/web-controllers/port/http-request'
import { type IHttpResponse } from '@/web-controllers/port/http-response'

class DeleteTodoController implements Controller {
  private readonly useCase: DeleteTodoUseCase
  constructor (useCase: DeleteTodoUseCase) {
    this.useCase = useCase
  }

  async handler (request: IHttpRequestWithParams<Pick<ITodoWithId, 'id'>>): Promise<IHttpResponse> {
    const response = await this.useCase.execute(request.params.id)
    if (response.isLeft()) {
      return badRequest({
        description: 'Error on delete todo',
        content: {
          message: response.value.message
        }
      })
    }
    return ok({
      description: 'Todo deleted successfully',
      content: idConverter({
        id: response.value
      })
    })
  }
}

export {
  DeleteTodoController
}
