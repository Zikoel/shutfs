import * as AvaialableFiles from './use-cases/avaialableFiles'
import * as MailDownloadNotify from './use-cases/mailDownloadNotify'

import { Deps } from './entity-gateway'

export function makeCore(deps: Deps) {
  // We initialize all the useCases
  const avaialableFiles = AvaialableFiles.makeUseCase({ ...deps })
  const mailDownloadNotify = MailDownloadNotify.makeUseCase()

  return {
    avaialableFiles,
    mailDownloadNotify,
  }
}

export type Core = ReturnType<typeof makeCore>
