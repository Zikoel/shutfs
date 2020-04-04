import { RemoteFile } from "./types"
import axios from 'axios'

export const getFiles = async (): Promise<RemoteFile[]> => {

  return axios.get( 'http://localhost:5000/files' )
    .then( response => response.data || [])
    .catch(err => {
      console.log('We have a problem ', JSON.stringify(err, null, 2))
    })
  
}