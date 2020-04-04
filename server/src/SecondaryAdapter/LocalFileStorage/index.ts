import D from 'debug'
import fs from 'fs'
import { Fs } from 'Application/ports'

const debug = D('secondaryAdapters:LocalFileStorage')

export interface FileStorage {
  createNewFile: (
    fileName: string,
    extension: string,
    content: Buffer
  ) => Promise<void>
}

export const createLocalFileStorage = (storagePath: string): Fs => {
  return {
    allFiles: async () => {
      return fs.readdirSync(storagePath).map(file => {
        const stats = fs.statSync(file)
        return {
          name: file,
          createdAt: stats.ctime,
          updatedAt: stats.ctime,
          size: stats.size,
        }
      })
    },
  }
}
