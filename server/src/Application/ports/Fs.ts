import { File } from 'Application/types'

export interface Fs {
  allFiles: () => Promise<Omit<File, 'url'>[]>
}
