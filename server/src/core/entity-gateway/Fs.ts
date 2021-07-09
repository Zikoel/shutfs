import { File } from '../entities'

export interface Fs {
  allFiles: () => Promise<Omit<File, 'url'>[]>
}
