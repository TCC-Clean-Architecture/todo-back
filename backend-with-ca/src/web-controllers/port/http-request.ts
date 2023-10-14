export interface IHttpRequestWithBody<B = object> {
  body: B
}

export interface IHttpRequestWithParams<P = object> {
  params: P
}

export interface IHttpRequestWithBodyAndParams<B = object, P = object> {
  body: B
  params: P
}
