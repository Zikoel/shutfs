import compression from 'compression'
import D from 'debug'
import express, { Request, Response } from 'express'
import http from 'http'
import cors from 'cors'

import { Application } from '../../Application'

import { FrontendRouter } from './routers/Frontend'

import { FilesRouter } from './routers/Files'

const httpServerDebug = D('adapters:http')

interface HttpServerConfig {
  isProduction: boolean
  application: Application
}

export default function HttpServer(config: HttpServerConfig): http.Server {
  const { isProduction, application } = config

  const app = express()

  app.disable('x-powered-by')

  if (isProduction) {
    app.enable('trust proxy')
  }

  httpServerDebug(`Adding compression middleware`)
  app.use(compression())

  app.use(cors({ origin: '*' }))

  httpServerDebug(`Adding PublicFiles router`)
  app.use(
    FilesRouter({
      application,
    })
  )

  httpServerDebug(`Adding Frontend router`)
  app.use(FrontendRouter())

  app.use((err: any, req: Request, res: Response) => {
    httpServerDebug(
      `Uncaught HTTP error @ ${req.originalUrl}: [${err.name}] ${err.message}`
    )
    httpServerDebug(err.stack)
    res.sendStatus(err.statusCode || 500)
  })

  return http.createServer(app)
}
