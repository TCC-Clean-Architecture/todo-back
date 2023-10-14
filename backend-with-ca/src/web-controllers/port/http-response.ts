type HttpResponseType = 'success' | 'error'

export interface IHttpResponse<T = object> {
  statusCode: number
  type: HttpResponseType
  message: string
  description: string
  content: T
}
