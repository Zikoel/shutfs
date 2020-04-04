import { Fs } from './ports'
import { ApplicationQueries, CreateApplicationQueries } from './queries'

export interface ApplicationDependencies {
  fs: Fs
}

export interface Application {
  queries: ApplicationQueries
}

export function createApplication({
  fs,
}: ApplicationDependencies): Application {
  const { queries } = CreateApplicationQueries({
    fs,
  })

  return {
    queries,
  }
}
