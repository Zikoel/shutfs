import { absolutePath } from './validators/absolutePath'
import envalid, { port, str } from 'envalid'

const env = envalid.cleanEnv(
  process.env,
  {
    PORT: port({ default: 5000, desc: 'The port where to listen' }),
    STORAGE_PATH: absolutePath({
      desc: 'The root folder must be absolute path',
    }),
    APP_DOMAIN: str({
      default: '/',
      desc: 'the domain of your app, default /',
    }),
  },
)

export const IS_PRODUCTION = env.isProduction

export const SERVICE = {
  port: env.PORT,
  domain: env.APP_DOMAIN,
}

export const STORAGE = {
  path: env.STORAGE_PATH,
}
