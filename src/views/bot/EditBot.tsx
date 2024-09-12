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
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import constants from '../../constants'
import { useState } from 'react'
import { Assistant, Bot,Document } from '../../interface'


function createData(fileName: string, size: string, uploadDate: string, tags: string) {
  return { fileName, size, uploadDate, tags }
}

const rows = [createData('watch?v=lFqxenB9CX8', '33.9MB', '22 Apr 2022, 1:43 PM', 'No tags')]
const EditBot = () => {
  const location = useLocation()
  const state = location.state
  const [assistant, setassistant] = useState<Bot[]>()
  const [documents, setdocuments] = useState<Document[]>()
  const [bot, setBot] = React.useState("")
  if(state!=null){
    // setBot(state.botVal)
  }
  React.useEffect(() => {
  
    axios.get<Bot[]>(`${constants.getAssistantByUser}/${localStorage.getItem('userId')}`).then(res=>{
      setassistant(res.data);
      if(state!=null){
      setBot(state.botVal)
      }else{
        setBot(res.data[0].assistantId)
      }
    })
  }, [])
  React.useEffect(() => {
    if(bot!=null){
    axios.post<Document[]>(`${constants.getDocuments}/${localStorage.getItem('userId')}/id/${bot}`).then(res=>{
      setdocuments(res.data);
    })}
  }, [bot])
  const handleChange = (event: SelectChangeEvent) => {
    alert(event.target.value as string)
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
              {assistant?.map((res:Bot)=>{
                return(               
                  <MenuItem key={res.assistantId} value={res.assistantId}>{res.name}</MenuItem> 
                )
              })}
              </Select>
            </FormControl>
          }
          title="Bot"
          subheader="File Upload List"
          titleTypographyProps={{ fontSize: 18 }}
          subheaderTypographyProps={{ fontSize: 18 }}
        />

        <CardContent>
          {documents?.length}
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
                {documents?.map((row) => (
                  <TableRow
                    key={row.documentId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.docName}
                    </TableCell>
                    <TableCell align="left">{row.docSize}</TableCell>
                    <TableCell align="left">{row.uploadedDt}</TableCell>
                    <TableCell align="left">{row.status}</TableCell>
                    <TableCell align="left">
                      <ButtonGroup variant="outlined" aria-label="Basic button group" size="small">
                        <Link to="/editBotConfig" state={{row:documents,assistant:assistant?.filter(res=>res.assistantId==bot)}}>
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
