import { Fs } from './ports'
import { CreateApplicationQueries } from './queries'

export interface Deps {
  fs: Fs
  appDomain: string
}

export function makeCore({ fs, appDomain }: Deps) {
  const { queries } = CreateApplicationQueries({
    fs,
    appDomain,
  })

  return {
    queries,
  }
}

export type Core = ReturnType<typeof makeCore>
