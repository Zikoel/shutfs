import { left, right } from 'fp-ts/lib/Either'
import * as t from 'io-ts'
import { QueryHandler } from '.'
import { File } from 'Application/types'

export const Input = t.null

export type Output = File[]

export const Handler: QueryHandler<t.TypeOf<typeof Input>, Output> = async (
  _,
  { fs }
) => {
  return fs
    .allFiles()
    .then(right)
    .catch(left)
}
