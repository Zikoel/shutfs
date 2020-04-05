import { Router } from 'express'
import { Application } from 'Application'
import { isLeft } from 'fp-ts/lib/Either'
import HttpErrors from 'http-errors'
import fs from 'fs'
import D from 'debug'

const debug = D('adapters:http:files')

export interface PublicFilesRouterConfig {
  application: Application
  storagePath: string
}

export const FilesRouter = ({
  application,
  storagePath,
}: PublicFilesRouterConfig): Router => {
  const router = Router()

  router.get('/list', (_, res, next) => {
    debug(`Showed file list`)
    application.queries
      .avaialableFiles(null)
      .then(result =>
        isLeft(result) ? next(result.left) : res.json(result.right)
      )
  })

  router.get('/download/:filename', (req, res) => {
    const fileName = req.params.filename

    const canUserDownloadTheFile = true

    if (canUserDownloadTheFile) {
      const filePath = `${storagePath}/${fileName}`
      debug(`Served file: ${filePath}`)

      const stream = fs.createReadStream(filePath, { highWaterMark: 64 * 1024 })
      stream.pipe(res)
    } else {
      res.send(HttpErrors.Unauthorized)
    }
  })

  return router
}
