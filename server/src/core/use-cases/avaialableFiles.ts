import { Fs } from 'core/entity-gateway'
import { File } from '../entities'

interface Deps {
  fs: Fs
  appDomain: string
}

export type Output = File[]

export const makeUseCase = ({ fs, appDomain }: Deps) => () => {
  return fs.allFiles().then(storedFiles => {
    const files: File[] = storedFiles.map(file => ({
      ...file,
      url: `${appDomain}file/download/${encodeURI(file.name)}`,
    }))

    return files
  })
}
