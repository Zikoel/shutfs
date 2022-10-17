import compression from 'compression'
import D from 'debug'
import express, { Request, Response } from 'express'
import http from 'http'

import { Core } from '../../core'
import { FrontendRouter } from './routers/Frontend'
import { FilesRouter } from './routers/Files'

const debug = D('app:primary-adapters:http')

interface HttpServerConfig {
  isProduction: boolean
  core: Core
  storagePath: string
}

export default function HttpServer(config: HttpServerConfig): http.Server {
  const { isProduction, core, storagePath } = config

  const app = express()

  app.disable('x-powered-by')

  if (isProduction) {
    app.enable('trust proxy')
  }

  app.use(compression())

  debug(`Adding PublicFiles router`)
  app.use('/file', FilesRouter({ core, storagePath }))

  debug(`Adding Frontend router`)
  app.use(FrontendRouter())

  app.use((err: any, req: Request, res: Response) => {
    debug(
      `Uncaught HTTP error @ ${req.originalUrl}: [${err.name}] ${err.message}`
    )
    debug(err.stack)
    res.sendStatus(err.statusCode || 500)
  })

  return http.createServer(app)
}
