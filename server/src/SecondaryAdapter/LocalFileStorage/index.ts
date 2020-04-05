import D from 'debug'
import fs from 'fs'
import { Fs } from 'Application/ports'

const debug = D('secondaryAdapters:local-file-storage')

export interface FileStorage {
  createNewFile: (
    fileName: string,
    extension: string,
    content: Buffer
  ) => Promise<void>
}

export const createLocalFileStorage = (storagePath: string): Fs => {
  const files = fs.readdirSync(storagePath)
  debug(`There are ${files.length} on folder ${storagePath}`)

  return {
    allFiles: async () => {
      return fs.readdirSync(storagePath).map(fileName => {
        const stats = fs.statSync(`${storagePath}/${fileName}`)
        return {
          name: fileName,
          createdAt: stats.ctime,
          updatedAt: stats.ctime,
          size: stats.size,
        }
      })
    },
  }
}
