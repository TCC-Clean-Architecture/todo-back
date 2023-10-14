import { type Router } from 'express'

import { expressRouteAdapter } from '@/main/adapters/express-route-adapter'
import {
  makeCreateTodoController,
  makeDeleteTodoController,
  makeFindSpecificTodoController,
  makeGetTodoController,
  makeUpdateTodoController
} from '@/main/factories'

const routerConfig = (router: Router): void => {
  router.post('/todos', expressRouteAdapter(makeCreateTodoController()))
  router.get('/todos', expressRouteAdapter(makeGetTodoController()))
  router.get('/todos/:id', expressRouteAdapter(makeFindSpecificTodoController()))
  router.delete('/todos/:id', expressRouteAdapter(makeDeleteTodoController()))
  router.put('/todos/:id', expressRouteAdapter(makeUpdateTodoController()))
}

export { routerConfig }
