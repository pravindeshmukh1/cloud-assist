// import  { useEffect, useMemo, useState } from 'react'
// import { useTable, useSortBy, useFilters, usePagination } from 'react-table'
// import axios from 'axios'
// import { HistoryI } from '../../interface'
// import constants from '../../constants'

// const History = () => {

//   const [data, setHistory] = useState<HistoryI[]>([{
//       "id": "",
//       "status": "",
//       "assistantId": "",
//       "userId": "",
//       "threadId": "",
//       "question": "",
//       "answer": "",
//       "tokenUsed": "",
//       "uploadedDt": "",
//       "model":""
//   }]);
//   useEffect(() => {
//     axios.post<HistoryI[]>(`${constants.getHistory}/${localStorage.getItem("userId")}`)
//     .then(res=>{
//       console.log(res.data);
     
//       setHistory(res.data);
//     }).catch(err=>
//       console.log(err)
      
//     )
  
    
//   }, [])

//   // const data = useMemo(
//   //   () => [
//   //     // Sample data
//   //     {
//   //       id: 1,
       
//   //     },
//   //     {
//   //       id: 2,
       
//   //     },
//   //     {
//   //       id: 2,
       
//   //     },
//   //     {
//   //       id: 2,
        
//   //     },
//   //     {
//   //       id: 2,
       
//   //     },
//   //     {
//   //       id: 2,
       
//   //     },

//   //   ],
//   //   [],
//   // )
 
//   const columns = useMemo(
//     () => [
//       {
//         Header: 'ID',
//         accessor: 'id',
//         sortType: 'basic',
//       },
//       // {
//       //   Header: 'Name',
//       //   accessor: 'userId',
//       //   filter: 'text',
//       // },
//       // {
//       //   Header: 'Email',
//       //   accessor: 'email',
//       // },
      
//       {
//         Header: 'Time',
//         accessor: 'uploadedDt',
//         sortType: 'basic',
//       },
//       {
//         Header: 'Search',
//         accessor: 'question',
//       },
//       {
//         Header: 'Type',
//         accessor: 'model',
//       },
//       {
//         Header: 'Ans',
//         accessor: 'answer',
//       },
//     ],

//     [],
//   )
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,

//     prepareRow,
//     page,
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     state: { pageIndex },
//     previousPage,
//     nextPage,
//     setPageSize,
   
//   } = useTable(
//     { columns, data, initialState: { pageIndex: 0, pageSize: 5 } },
//     useFilters,
//     useSortBy,
//     usePagination,
//   )

//   // Update the filter based on input
//   // const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const value = e.target.value || undefined
//   //   setFilter('name', value)
//   //   setFilterInput(value)
//   // }

  
//   return (
//     <>
    
//       {data.length>0?<div className="col-md-12">
//         <div className=" card">
//           <h5 className="card-header border border-bottom mb-3">Search History</h5>
//           {/* <input
//             value={filterInput}
//             onChange={handleFilterChange}
//             placeholder={'Search by Name...'}
//             style={{ marginBottom: '1rem' }}
//           /> */}
//           <div className="col-md-12 row">
//             <div className="card-body">
//               <div className="table-responsive text-nowrap">
//                 <table id="myTable" className="table table-bordered" {...getTableProps()}>
//                   <thead className="table-success">
//                     {headerGroups.map((headerGroup:any) => (
//                       <tr>
//                         {headerGroup.headers.map((column:any) => (
//                           <th {...column.getHeaderProps(column.getSortByToggleProps())}>
//                             {column.render('Header')}
//                             <span>
//                               {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
//                             </span>
//                           </th>
//                         ))}
//                       </tr>
//                     ))}
//                   </thead>
//                   <tbody {...getTableBodyProps()}>
//                     {page.map((row:any) => {
//                       prepareRow(row)
//                       return (
//                         <tr {...row.getRowProps()}>
//                           {row.cells.map((cell:any) => (
//                             <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                           ))}
//                         </tr>
//                       )
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="pagination">
//           <select className="" onChange={(e) => setPageSize(Number(e.target.value))}>
//             {[5, 10, 20].map((pageSize) => (
//               <option key={pageSize} value={pageSize}>
//                 Show {pageSize}
//               </option>
//             ))}
//           </select>
//           <button onClick={() => previousPage()} disabled={!canPreviousPage}>
//             <span aria-hidden="true">&laquo;</span>
//           </button>
//           <span>
//             Page
//             <strong>
//               {pageIndex + 1} of {pageOptions.length}
//             </strong>
//           </span>
//           <button onClick={() => nextPage()} disabled={!canNextPage}>
//             <span aria-hidden="true">&raquo;</span>
//           </button>
//         </div>
//       </div>:<div>No history avalaible</div>}
//     </>
//   )
// }

// export default History
// const BotList = () => {
//   return (
//     <>
//       <table className="table table-hover ">
//         <thead className="thead-light">
//           <tr className="">
//             <th scope="col">Bot Name</th>
//             <th scope="col">Model</th>
//             <th scope="col">Size</th>
//             <th scope="col">Number of File</th>
//             <th scope="col">Date Time</th>
//             <th scope="col">Status</th>
//             <th scope="col">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <th scope="row">abcd</th>
//             <td>GPT</td>
//             <td>0 Bytes</td>
//             <td>@0 Files</td>
//             <td>22 Apr 2022, 1:43 PM</td>
//             <td>
//               <select className="custom-select custom-select-sm">
//                 <option value="1">Active</option>
//                 <option value="2">Not Active</option>
//               </select>
//             </td>
//           </tr>
//           <tr>
//             <th scope="row">2</th>
//             <td>Jacob</td>
//             <td>Thornton</td>
//             <td>@fat</td>
//           </tr>
//           <tr>
//             <th scope="row">3</th>
//             <td colspan="2">Larry the Bird</td>
//             <td>@twitter</td>
//           </tr>
//         </tbody>
//       </table>
//     </>
//   )
// }

// export default BotList

import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import axios from 'axios'
import constants from '../../constants'
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  TextField,
} from '@mui/material'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { Link, useLocation } from 'react-router-dom'
import { Delete } from '@mui/icons-material'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import { HistoryI } from '../../interface'
import Markdown from 'react-markdown'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

interface Column {
  id: string
  label: string
  minWidth?: number
  align?: 'left'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'Sr.no', label: 'Name', minWidth: 170 },
  { id: 'model', label: 'Model', minWidth: 100 },
  {
    id: 'question',
    label: 'Question',
    minWidth: 170,
    align: 'left',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  
  {
    id: 'createdDt',
    label: 'Created Date',
    minWidth: 170,
    align: 'left',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'answer',
    label: 'Answer',
    minWidth: 170,
    align: 'left',
    format: (value: number) => value.toLocaleString('en-US'),
  },
]

interface Data {
  name: string
  code: string
  population: number
  size: number
  density: number
}

function createData(name: string, code: string, population: number, size: number): Data {
  const density = population / size
  return { name, code, population, size, density }
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
]
const History = () => {
  // const {assistant} = useLocation().state
  interface Bot {
    size: string
    noOfDocs: string
    id: number
    name: string
    description: string
    assistantId: string
    threadId: string
    userId: string
    documentId: string
    createdDt: string
    expireDt: string
    instruction: string
    model: string
  }
  const [refresh, setRefresh] = React.useState<boolean>(true)
  const [bot, setbot] = React.useState<Bot[]>([
    {
      id: 0,
      name: '',
      description: '',
      assistantId: '',
      threadId: '',
      userId: '',
      documentId: '',
      createdDt: '',
      expireDt: '',
      instruction: '',
      model: '',
      size: '',
      noOfDocs: '',
    },
  ])
  const [data, setHistory] = React.useState<HistoryI[]>([{
          "id": "",
          "status": "",
          "assistantId": "",
          "userId": "",
          "threadId": "",
          "question": "",
          "answer": "",
          "tokenUsed": "",
          "uploadedDt": "",
          "model":""
      }]);
  React.useEffect(() => {
        axios.post<HistoryI[]>(`${constants.getHistory}/${localStorage.getItem("userId")}`)
        .then(res=>{
          console.log(res.data);
         
          setHistory(res.data);
        }).catch(err=>
          console.log(err)
          
        )
      
        
      }, [])

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const [open, setOpen] = React.useState(false)
  const [answer, setanswer] = React.useState("")

  const handleClickOpen = (answer:string) => {
    setanswer(answer)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const [model, setModel] = React.useState('')
  const [name, setname] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setModel(event.target.value)
  }
  function updatedName(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    setname(event.target.value)
  }

  return (
    <>
      {bot.length > 0 ? (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table" size="small">
              <TableHead style={{ backgroundColor: 'skyblue' }}>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, backgroundColor: 'skyblue' }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
      
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => {
                  function deletAssistant(assistantId: string) {
                    // axios.delete(`${constants.deleteAssistant}/${assistantId}`).catch(err=>console.log(err))
                   
                  }

                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell>{index+1}</TableCell>
                      <TableCell>{row.model}</TableCell>
                      <TableCell>{row.question}</TableCell>
                      <TableCell>{row.uploadedDt}</TableCell>
                      <TableCell>

                      <Button onClick={()=>handleClickOpen(row.answer)}>
          View Answer
        </Button>
                      </TableCell>
                      
                      
                      
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <div>No assistant available</div>
      )}

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 1, borderBottom: 1 }} id="customized-dialog-title">
          Answer
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        <Markdown>{answer}</Markdown>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="inherit"  onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  )
}
export default History

