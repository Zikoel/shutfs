import React from 'react'
import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { CloudDownload } from '@mui/icons-material'
import dayjs from 'dayjs'

import { RemoteFile } from '../../types/RemoteFile'

interface Props {
  files: RemoteFile[]
}

const cellSx = { padding: '0px 10px' }

export const FileList: React.FC<Props> = ({ files }) => {
  const lastUpdate =
    files.length > 0
      ? files.reduce(
          (last, file) =>
            file.updatedAt.getTime() > last.getTime() ? file.updatedAt : last,
          new Date('1970-01-01')
        )
      : null

  const headerText = lastUpdate
    ? `Last update ${formatDate(lastUpdate)}`
    : 'Folder empty'

  return (
    <Grid container direction='column'>
      <Grid item sm style={{ margin: 10 }}>
        <Paper style={{ padding: 10 }}>{headerText}</Paper>
      </Grid>

      <Grid item sm style={{ margin: 10 }}>
        <TableContainer component={Paper}>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Date</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {files.map((file) => (
                <TableRow key={file.name}>
                  <TableCell sx={cellSx} align='left'>
                    <IconButton
                      type='button'
                      aria-label='download'
                      href={file.url}
                      download={file.name}
                      target='_blank'
                      size='small'
                    >
                      <CloudDownload fontSize='small' />
                    </IconButton>
                  </TableCell>
                  <TableCell sx={cellSx} component='th' scope='row'>
                    {formatDate(file.updatedAt)}
                  </TableCell>
                  <TableCell sx={cellSx} align='left'>
                    {formatBytes(file.size)}
                  </TableCell>
                  <TableCell sx={cellSx} align='left'>
                    {file.name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

function formatDate(date: Date): string {
  return dayjs(date).format('DD/MM/YYYY HH:mm:ss')
}

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}
