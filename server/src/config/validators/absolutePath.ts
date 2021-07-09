import path from 'path'
import { makeValidator } from 'envalid'

export const absolutePath = makeValidator<string>(x => {
  if (!path.isAbsolute(x)) {
    throw new Error('Expected absolute path')
  }
  return x
})
