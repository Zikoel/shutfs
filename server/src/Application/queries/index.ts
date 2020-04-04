import { Either, isLeft, left, right } from 'fp-ts/lib/Either'
import * as t from 'io-ts'
import { Fs } from '../ports'

import {
  InputValidationError,
} from '../utils/inputValidation'

import D from 'debug'

import * as avaialableFiles from './avaialableFiles'

export const QueriesDefinitionsMap = {
  avaialableFiles,
}
export type QueriesDefinitionsMap = typeof QueriesDefinitionsMap

export interface QueriesFactoryDependencies {
  fs: Fs
}

export interface QueryHandlerDependencies {
  fs: Fs
}

export type ApplicationQueries = {
  [K in keyof QueriesDefinitionsMap]: ApplicationQuery<
    t.OutputOf<QueriesDefinitionsMap[K]['Input']>,
    QueriesDefinitionsMap[K]['Handler']
  >
}

type ApplicationQuery<Input, Handler> = (
  input: Input
) => Promise<
  Either<
    QueryHandlerError<Handler> | InputValidationError,
    QueryHandlerOutput<Handler>
  >
>

export type QueryHandlerOutput<Handler> = Handler extends QueryHandler<
  any,
  infer Output,
  Error
>
  ? Output
  : never
export type QueryHandlerError<Handler> = Handler extends QueryHandler<
  any,
  any,
  infer Error
>
  ? Error
  : never

export type QueryHandler<
  Input extends any = any,
  Output extends any = any,
  E extends Error = Error
> = (
  input: Input,
  dependencies: QueryHandlerDependencies
) => Promise<Either<E, Output>>

export const CreateApplicationQueries = ({
  fs,
}: QueriesFactoryDependencies): {
  queries: ApplicationQueries
} => {
  const createQuery = (name: keyof QueriesDefinitionsMap) => {
    const queryDebug = D(`application:query:${name}`)
    const handler = QueriesDefinitionsMap[name].Handler
    const inputCodec = QueriesDefinitionsMap[name].Input

    type QueryType = ApplicationQuery<
      t.TypeOf<typeof inputCodec>,
      typeof handler
    >

    const query: QueryType = async () => {
      const result = await handler(null, { fs })

      if (isLeft(result)) {
        queryDebug('Error', result.left)
        return left(result.left)
      }

      return right(result.right)
    }

    return query
  }

  const avaialableFilesQuery = createQuery('avaialableFiles')

  return {
    queries: {
      avaialableFiles: avaialableFilesQuery,
    },
  }
}
