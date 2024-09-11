import  { useEffect, useMemo, useState } from 'react'
import { useTable, useSortBy, useFilters, usePagination } from 'react-table'
import axios from 'axios'
import { HistoryI } from '../../interface'
import constants from '../../constants'

const History = () => {

  const [data, setHistory] = useState<HistoryI[]>([{
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
  useEffect(() => {
    axios.post<HistoryI[]>(`${constants.getHistory}/${localStorage.getItem("userId")}`)
    .then(res=>{
      console.log(res.data);
     
      setHistory(res.data);
    }).catch(err=>
      console.log(err)
      
    )
  
    
  }, [])

  // const data = useMemo(
  //   () => [
  //     // Sample data
  //     {
  //       id: 1,
       
  //     },
  //     {
  //       id: 2,
       
  //     },
  //     {
  //       id: 2,
       
  //     },
  //     {
  //       id: 2,
        
  //     },
  //     {
  //       id: 2,
       
  //     },
  //     {
  //       id: 2,
       
  //     },

  //   ],
  //   [],
  // )
 
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        sortType: 'basic',
      },
      // {
      //   Header: 'Name',
      //   accessor: 'userId',
      //   filter: 'text',
      // },
      // {
      //   Header: 'Email',
      //   accessor: 'email',
      // },
      
      {
        Header: 'Time',
        accessor: 'uploadedDt',
        sortType: 'basic',
      },
      {
        Header: 'Search',
        accessor: 'question',
      },
      {
        Header: 'Type',
        accessor: 'model',
      },
      {
        Header: 'Ans',
        accessor: 'answer',
      },
    ],

    [],
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,

    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state: { pageIndex },
    previousPage,
    nextPage,
    setPageSize,
   
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 5 } },
    useFilters,
    useSortBy,
    usePagination,
  )

  // Update the filter based on input
  // const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value || undefined
  //   setFilter('name', value)
  //   setFilterInput(value)
  // }

  
  return (
    <>
    
      {data.length>0?<div className="col-md-12">
        <div className=" card">
          <h5 className="card-header border border-bottom mb-3">Search History</h5>
          {/* <input
            value={filterInput}
            onChange={handleFilterChange}
            placeholder={'Search by Name...'}
            style={{ marginBottom: '1rem' }}
          /> */}
          <div className="col-md-12 row">
            <div className="card-body">
              <div className="table-responsive text-nowrap">
                <table id="myTable" className="table table-bordered" {...getTableProps()}>
                  <thead className="table-success">
                    {headerGroups.map((headerGroup:any) => (
                      <tr>
                        {headerGroup.headers.map((column:any) => (
                          <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                            {column.render('Header')}
                            <span>
                              {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                            </span>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {page.map((row:any) => {
                      prepareRow(row)
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell:any) => (
                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                          ))}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="pagination">
          <select className="" onChange={(e) => setPageSize(Number(e.target.value))}>
            {[5, 10, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            <span aria-hidden="true">&laquo;</span>
          </button>
          <span>
            Page
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            <span aria-hidden="true">&raquo;</span>
          </button>
        </div>
      </div>:<div>No history avalaible</div>}
    </>
  )
}

export default History
