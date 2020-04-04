import React, { useState, useEffect } from 'react';
import { FileList } from './components/FileList';
import { RemoteFile } from './types/RemoteFile';
import { getFiles } from './getFiles';

function App() {

  const [files, setFiles] = useState<RemoteFile[]>([])

  useEffect( () => {
    getFiles()
      .then( setFiles )
  },[])

  return (
    <FileList files={files} />
  );
}

export default App;
