// tslint:disable no-if-statement
import { Router, static as serveStatic } from 'express'
import fs from 'fs'
import path from 'path'

const clientCodeDirectory = path.resolve(
  __dirname,
  '..',
  '..',
  '..',
  '..',
  '..',
  'client'
)

export const FrontendRouter = (): Router => {
  /**
   * Create an instance of an express router
   */
  const router = Router()

  const frontendStaticFilesDirectory = path.resolve(clientCodeDirectory, 'build')

  const cachedIndexFileContents = fs.readFileSync(
    path.resolve(frontendStaticFilesDirectory, 'index.html'),
    {
      encoding: 'utf8',
    }
  )

  /**
   * Lets serve the bundle directory static files
   */
  router.use(serveStatic(frontendStaticFilesDirectory))

  /**
   * Then for every other route reached through GET reqs
   * we serve the index.html contents
   */
  router.get('*', (_, res) => res.send(cachedIndexFileContents))

  return router
}
