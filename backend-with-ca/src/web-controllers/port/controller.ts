import { type IHttpResponse } from './http-response'

export interface Controller {
  handler: (request: any) => Promise<IHttpResponse>
}
