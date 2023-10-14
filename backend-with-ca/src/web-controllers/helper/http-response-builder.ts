import { type IHttpResponse } from '@/web-controllers/port/http-response'

interface IHttpResponsePayload<T = object> {
  description: string
  content: T
}

const ok = <T = object>({ description, content }: IHttpResponsePayload<T>): IHttpResponse<T> => ({
  statusCode: 200,
  message: 'OK',
  type: 'success',
  description,
  content
})

const badRequest = <T = object>({ description, content }: IHttpResponsePayload<T>): IHttpResponse<T> => ({
  statusCode: 400,
  message: 'Bad Request',
  type: 'error',
  description,
  content
})

export { badRequest, ok }
