import envalid, { port, str } from 'envalid'

const env = envalid.cleanEnv(
  process.env,
  {
    PORT: port({ default: 5000, desc: 'The port where to listen' }),
    STORAGE_PATH: str(),
    APP_DOMAIN: str(),
  },
  { strict: true }
)

export const IS_PRODUCTION = env.isProduction

export const SERVICE = {
  port: env.PORT,
  domain: env.APP_DOMAIN,
}

export const STORAGE = {
  path: env.STORAGE_PATH,
}
