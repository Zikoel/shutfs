import { File } from '../types'

export interface Fs {
  allFiles: () => Promise<Omit<File, 'url'>[]>
}
