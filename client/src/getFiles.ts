import { RemoteFile } from "./types"
import axios from 'axios'
import { endpoints } from "./constants/endpoints"

export const getFiles = async (): Promise<RemoteFile[]> => {

  return axios.get( endpoints.filesList )
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