import { type ITodoWithId } from '@/entities/interfaces/todo'
import { type FindTodoByIdUseCase } from '@/usecases/todo/find-todo-by-id/find-todo-by-id'
import { badRequest, ok } from '@/web-controllers/helper/http-response-builder'
import { idConverter } from '@/web-controllers/helper/id-property-name-converter'
import { type Controller } from '@/web-controllers/port/controller'
import { type IHttpRequestWithParams } from '@/web-controllers/port/http-request'
import { type IHttpResponse } from '@/web-controllers/port/http-response'
class FindSpecificTodoController implements Controller {
  private readonly useCase: FindTodoByIdUseCase
  constructor (useCase: FindTodoByIdUseCase) {
    this.useCase = useCase
  }

  async handler (request: IHttpRequestWithParams<Pick<ITodoWithId, 'id'>>): Promise<IHttpResponse> {
    const response = await this.useCase.execute(request.params.id)
    if (response.isLeft()) {
      return badRequest({
        description: 'Error on get todo by id',
        content: {
          message: response.value.message
        }
      })
    }
    return ok({
      description: 'Todo found successfully',
      content: idConverter(response.value)
    })
  }
}

export {
  FindSpecificTodoController
}
