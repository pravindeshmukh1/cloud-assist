import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import { Link } from 'react-router-dom'

function createData(fileName: string, size: string, uploadDate: string, tags: string) {
  return { fileName, size, uploadDate, tags }
}

const rows = [createData('watch?v=lFqxenB9CX8', '33.9MB', '22 Apr 2022, 1:43 PM', 'No tags')]
const EditBot = () => {
  const [bot, setBot] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setBot(event.target.value as string)
  }
  return (
    <Box>
      <Card>
        <CardHeader
          action={
            <FormControl size="small" fullWidth sx={{ minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Bot</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={bot}
                label="Age"
                size="small"
                onChange={handleChange}
              >
                <MenuItem value="Bot1">Bot1</MenuItem>
                <MenuItem value="Bot2">Bot2</MenuItem>
                <MenuItem value="Bot3">Bot3</MenuItem>
              </Select>
            </FormControl>
          }
          title="Bot"
          subheader="File Upload List"
          titleTypographyProps={{ fontSize: 18 }}
          subheaderTypographyProps={{ fontSize: 18 }}
        />

        <CardContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
              <TableHead style={{ backgroundColor: 'skyblue' }}>
                <TableRow>
                  <TableCell>File Name</TableCell>
                  <TableCell align="left">Size</TableCell>
                  <TableCell align="left">Create Date</TableCell>
                  <TableCell align="left">Tags</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.fileName}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.fileName}
                    </TableCell>
                    <TableCell align="left">{row.size}</TableCell>
                    <TableCell align="left">{row.uploadDate}</TableCell>
                    <TableCell align="left">{row.tags}</TableCell>
                    <TableCell align="left">
                      <ButtonGroup variant="outlined" aria-label="Basic button group" size="small">
                        <Link to="/botConfig">
                          <Button
                            component="label"
                            variant="outlined"
                            startIcon={<Edit color="info" />}
                          >
                            Edit
                          </Button>
                        </Link>
                        <Button
                          component="label"
                          variant="outlined"
                          color="error"
                          startIcon={<Delete color="error" />}
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  )
}

export default EditBot
