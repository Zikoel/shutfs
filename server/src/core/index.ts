import * as AvaialableFiles from './use-cases/avaialableFiles'

import { Deps } from './entity-gateway'

export function makeCore(deps: Deps) {
  // We initialize all the useCases
  const avaialableFiles = AvaialableFiles.makeUseCase({ ...deps })

  return {
    avaialableFiles,
  }
}

export type Core = ReturnType<typeof makeCore>
