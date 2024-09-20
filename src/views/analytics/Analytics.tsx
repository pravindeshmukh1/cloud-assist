import React, { useEffect, useRef } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import {
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface QuestionColumns {
  id: 'name' | 'code'
  label: string
  align?: 'right'
  format?: (value: number) => string
}

const questionColumns: readonly QuestionColumns[] = [
  { id: 'name', label: 'Name' },
  { id: 'code', label: 'ISO\u00a0Code' },
]

interface Data {
  name: string
  code: string
}

function createData(name: string, code: string): Data {
  return { name, code }
}

const questionRow = [
  createData('What is the first steps?', 'IN'),
  createData('How do i start with modeling', 'CN'),
  createData('How do i start with modeling', 'CN'),
  createData('How do i start with modeling', 'CN'),
]
const knowGapRow = [
  createData('What is the steps? ', 'IN'),
  createData('How do modeling', 'CN'),
  createData('How do modeling', 'CN'),
]

const Analytics = () => {
  const [bot, setBot] = React.useState('')

  const handleBotChange = (event) => {
    setBot(event.target.value as string)
  }

  //table
  const [quePage, setQuePage] = React.useState(0)
  const [knowGapPage, setKnowGapPage] = React.useState(0)
  const [queRowsPerPage, setQueRowsPerPage] = React.useState(10)
  const [knowGapRowsPerPage, setKnowGapRowsPerPage] = React.useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setQuePage(newPage)
    setKnowGapPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueRowsPerPage(+event.target.value)
    setQuePage(0)
    setKnowGapRowsPerPage(+event.target.value)
    setKnowGapPage(0)
  }

  // chart
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Net Profit',
        data: [50, 60, 70, 180, 190, 200],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <>
      <Paper>
        <Box display={'flex'} justifyContent={'flex-end'} gap={2} padding={2}>
          <FormControl size="small" sx={{ minWidth: '120px' }}>
            <InputLabel id="demo-simple-select-label">Bot</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={bot}
              label="Bot"
              onChange={handleBotChange}
            >
              <MenuItem value={'bot1'}>Bot 1</MenuItem>
              <MenuItem value={'bot2'}>Bot 2</MenuItem>
            </Select>
          </FormControl>
        
        </Box>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ backgroundColor: 'lightgray' }}>
              Top Asked Questions
            </Typography>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'lightblue' }}>
                    {questionColumns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        // style={{ minWidth: column.minWidth }}
                        sx={{ backgroundColor: 'lightblue' }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {questionRow
                    .slice(quePage * queRowsPerPage, quePage * queRowsPerPage + queRowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                          {questionColumns.map((column) => {
                            const value = row[column.id]
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
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
              count={questionRow.length}
              rowsPerPage={queRowsPerPage}
              page={quePage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ backgroundColor: 'lightgray' }}>
              Knowledge Gaps
            </Typography>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'lightblue' }}>
                    {questionColumns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        // style={{ minWidth: column.minWidth }}
                        sx={{ backgroundColor: 'lightblue' }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {knowGapRow
                    .slice(
                      quePage * knowGapRowsPerPage,
                      knowGapPage * knowGapRowsPerPage + knowGapRowsPerPage,
                    )
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                          {questionColumns.map((column) => {
                            const value = row[column.id]
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
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
              count={knowGapRow.length}
              rowsPerPage={knowGapRowsPerPage}
              page={knowGapPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent sx={{ width: '50vw', height: '50vh' }}>
            <Bar options={options} data={data} />
          </CardContent>
        </Card>
      </Paper>
    </>
  )
}

export default Analytics

// <CChartLine
//       ref={chartRef}
//       style={{ height: '300px', marginTop: '40px' }}
//       data={{
//         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//         datasets: [
//           {
//             label: 'My First dataset',
//             backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
//             borderColor: getStyle('--cui-info'),
//             pointHoverBackgroundColor: getStyle('--cui-info'),
//             borderWidth: 2,
//             data: [
//               random(50, 200),
//               random(50, 200),
//               random(50, 200),
//               random(50, 200),
//               random(50, 200),
//               random(50, 200),
//               random(50, 200),
//             ],
//             fill: true,
//           },
//           {
//             label: 'My Second dataset',
//             backgroundColor: 'transparent',
//             borderColor: getStyle('--cui-success'),
//             pointHoverBackgroundColor: getStyle('--cui-success'),
//             borderWidth: 2,
//             data: [
//               random(50, 200),
//               random(50, 200),
//               random(50, 200),
//               random(50, 200),
//               random(50, 200),
//               random(50, 200),
//               random(50, 200),
//             ],
//           },
//           {
//             label: 'My Third dataset',
//             backgroundColor: 'transparent',
//             borderColor: getStyle('--cui-danger'),
//             pointHoverBackgroundColor: getStyle('--cui-danger'),
//             borderWidth: 1,
//             borderDash: [8, 5],
//             data: [65, 65, 65, 65, 65, 65, 65],
//           },
//         ],
//       }}
//       options={{
//         maintainAspectRatio: false,
//         plugins: {
//           legend: {
//             display: false,
//           },
//         },
//         scales: {
//           x: {
//             grid: {
//               color: getStyle('--cui-border-color-translucent'),
//               drawOnChartArea: false,
//             },
//             ticks: {
//               color: getStyle('--cui-body-color'),
//             },
//           },
//           y: {
//             beginAtZero: true,
//             border: {
//               color: getStyle('--cui-border-color-translucent'),
//             },
//             grid: {
//               color: getStyle('--cui-border-color-translucent'),
//             },
//             max: 250,
//             ticks: {
//               color: getStyle('--cui-body-color'),
//               maxTicksLimit: 5,
//               stepSize: Math.ceil(250 / 5),
//             },
//           },
//         },
//         elements: {
//           line: {
//             tension: 0.4,
//           },
//           point: {
//             radius: 0,
//             hitRadius: 10,
//             hoverRadius: 4,
//             hoverBorderWidth: 3,
//           },
//         },
//       }}
//     />
