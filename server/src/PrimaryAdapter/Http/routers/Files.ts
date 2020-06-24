import { Router } from 'express'
import { Application } from 'Application'
import { isLeft } from 'fp-ts/lib/Either'
import createError from 'http-errors'
import fs from 'fs'
import path from 'path'
import D from 'debug'

const debug = D('app:primary-adapters:http:routers:files')

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

    const filePath = path.join(storagePath, fileName)
    debug(`Request for file: ${filePath}`)
    
    // Check if there is a malicious action
    if (!filePath.includes(storagePath)) {
      debug(`Directory traversal attack ? with param: ${req.params.filename}`)
      const err = new createError.Unauthorized('You can read only listed files')
      
      res.status(err.statusCode).send(err.message)

      return
    }

    // Check the real user permission on file
    const canUserDownloadTheFile = true

    if (canUserDownloadTheFile) {
      const stream = fs.createReadStream(filePath, { highWaterMark: 64 * 1024 })
      res.setHeader('Content-Length', fs.statSync(filePath).size)
      stream.pipe(res)
      debug(`Served: ${filePath}`)
    } else {
      const err = new createError.Unauthorized('You miss permission for this file')
      res.status(err.statusCode).send(err.message)
      debug(`User can't access to file: ${filePath}`)
    }
  })

  return router
}

