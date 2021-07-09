import D from 'debug'
import { makeCore } from './core'
import * as config from './config'
import HTTPServer from './gateways/Http'
import { createLocalFileStorage } from './infrastructure/LocalFileStorage'

const debug = D('app:start')

const init = async () => {
  const fsAdapter = createLocalFileStorage(config.STORAGE.path)

  const core = makeCore({
    fs: fsAdapter,
    appDomain: config.SERVICE.domain,
  })

  const httpServer = HTTPServer({
    isProduction: config.IS_PRODUCTION,
    core,
    storagePath: config.STORAGE.path,
  })

  const gracefulShutdown = (): void => {
    process.removeListener('SIGTERM', gracefulShutdown)
    process.removeListener('SIGINT', gracefulShutdown)

    const timeout = config.IS_PRODUCTION ? 10 * 1000 : 1000

    debug('Received kill signal, shutting down gracefully.')
    httpServer.close(() => {
      debug('httpServer terminated remaining connections.')
      process.exit()
    })
    setTimeout(() => {
      debug(
        'httpServer could not terminate connections in time, forcefully shutting down'
      )
      process.exit()
    }, timeout)
  }

  httpServer.listen(config.SERVICE.port, (error?: Error) => {
    if (error) {
      debug(error)
      process.exit(1)
    }

    // listen for TERM signal .e.g. kill
    process.on('SIGTERM', gracefulShutdown)
    // listen for INT signal e.g. Ctrl-C
    process.on('SIGINT', gracefulShutdown)

    debug(`Ready on port ${config.SERVICE.port}`)
  })
}

init().catch(debug)
