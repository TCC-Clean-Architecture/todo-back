import { type Request, type Response } from 'express'

import { type Controller } from '@/web-controllers/port/controller'

const expressRouteAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const response = await controller.handler({
      body: req.body,
      params: req.params
    })
    return res.status(response.statusCode).json(response)
  }
}

export { expressRouteAdapter }
