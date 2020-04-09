import { RemoteFile } from "./types"
import axios from 'axios'

export const getFiles = async (): Promise<RemoteFile[]> => {

  return axios.get( 'http://localhost:5000/file/list' )
    .then( response => response.data || [])
    .then( files => files.map( (f: any) => ({
      ...f,
      updatedAt: new Date(f.updatedAt),
      createdAt: new Date(f.createdAt)
    })))
    .catch(err => {
      console.log('We have a problem ', JSON.stringify(err, null, 2))
    })
  
}