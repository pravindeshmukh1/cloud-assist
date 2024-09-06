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

interface Column {
  id: string
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'model', label: 'Model', minWidth: 100 },
  {
    id: 'size',
    label: 'Size',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'noOfDocs',
    label: 'No of Documents',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'createdDt',
    label: 'Created Date',
    minWidth: 170,
    align: 'right',
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
const BotList = () => {
  interface Bot {
    size: string;
    noOfDocs: string;
    id: number,
    "name": string,
    "description": string,
    "assistantId": string,
    "threadId": string,
    "userId": string,
    "documentId": string,
    "createdDt": string,
    "expireDt": string,
    "instruction": string,
    "model": string
  }
  const [refresh, setRefresh] = React.useState<boolean>(true)
  const [bot, setbot] = React.useState<Bot[]>([{
    id: 0,
    "name": "",
    "description": "",
    "assistantId": "",
    "threadId": "",
    "userId": "",
    "documentId": "",
    "createdDt": "",
    "expireDt": "",
    "instruction": "",
    "model": "",
    "size":"",
    "noOfDocs":""
  }]);
  React.useEffect(() => {
    axios.get<Bot[]>(`${constants.getAssistantByUser}/${localStorage.getItem('userId')}`).then(res => {
      setbot(res.data);
    }).catch(err => {
      console.error(err)
    })
  }, [refresh])
  
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <>
    {bot.length>0?<Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {bot.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id]
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
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
    </Paper>:<div>No assistant avalaible</div>}
    </>
  )
}
export default BotList