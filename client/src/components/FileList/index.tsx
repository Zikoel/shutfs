import React from "react"
import { Grid, Paper, TableContainer, TableHead, TableRow, TableCell, Table, TableBody } from '@material-ui/core'
import { RemoteFile } from "../../types/RemoteFile"

interface Props {
  files: RemoteFile[]
}

export const FileList: React.FC<Props> = ({files}) => {

  return (
    <Grid container direction='column'>

      <Grid item sm style={{margin: 10}}>
        <Paper style={{padding: 10}}>Some infos</Paper>
      </Grid>

      <Grid item sm style={{margin: 10}}>
        <TableContainer component={Paper} style={{padding: 10}}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {files.map(file => (
                <TableRow key={file.name}>
                  <TableCell component="th" scope="row">
                    {file.createdAt}
                  </TableCell>
                  <TableCell align="right">{file.size}</TableCell>
                  <TableCell align="right">{file.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

    </Grid>
  )
}