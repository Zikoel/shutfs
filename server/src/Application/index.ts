import { Fs } from './ports'
import { ApplicationQueries, CreateApplicationQueries } from './queries'

export interface ApplicationDependencies {
  fs: Fs
  appDomain: string
}

export interface Application {
  queries: ApplicationQueries
}

export function createApplication({
  fs,
  appDomain,
}: ApplicationDependencies): Application {
  const { queries } = CreateApplicationQueries({
    fs,
    appDomain,
  })

  return {
    queries,
  }
}
