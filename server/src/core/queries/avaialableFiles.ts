import { left, right } from 'fp-ts/lib/Either'
import * as t from 'io-ts'
import { QueryHandler } from '.'
import { File } from '../types'

export const Input = t.null

export type Output = File[]

export const Handler: QueryHandler<t.TypeOf<typeof Input>, Output> = async (
  _,
  { fs, appDomain }
) => {
  return fs
    .allFiles()
    .then(storedFiles => {
      const files: File[] = storedFiles.map(file => ({
        ...file,
        url: `${appDomain}file/download/${encodeURI(file.name)}`,
      }))

      return right(files)
    })
    .catch(left)
}
