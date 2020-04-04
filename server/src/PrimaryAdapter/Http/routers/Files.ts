import { Router } from 'express'
import { Application } from 'Application'
import { isLeft } from 'fp-ts/lib/Either'

export interface PublicFilesRouterConfig {
  application: Application
}

export const FilesRouter = ({
  application,
}: PublicFilesRouterConfig): Router => {
  const router = Router()

  router.get('/files', (_, res, next) => {
    application.queries
      .avaialableFiles(null)
      .then(result =>
        isLeft(result) ? next(result.left) : res.json(result.right)
      )
  })
  return router
}
