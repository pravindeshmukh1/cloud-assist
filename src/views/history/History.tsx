import React, { useMemo, useState } from 'react'
import classNames from 'classnames'
import { useTable, useSortBy, useFilters, usePagination } from 'react-table'

const History = () => {
  const [filterInput, setFilterInput] = useState('')

  const data = useMemo(
    () => [
      // Sample data
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        time: 'Wed, 03 Apr 2024 11:43:20',
        search: 'What is DSA',
        type: 'AI',
        ans: 'View',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        time: 'Wed, 03 Apr 2024 11:43:20',
        search: 'What is DSA',
        type: 'GPT',
        ans: 'View',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        time: 'Wed, 03 Apr 2024 11:43:20',
        search: 'What is DSA',
        type: 'GPT',
        ans: 'View',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        time: 'Wed, 03 Apr 2024 11:43:20',
        search: 'What is DSA',
        type: 'GPT',
        ans: 'View',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        time: 'Wed, 03 Apr 2024 11:43:20',
        search: 'What is DSA',
        type: 'GPT',
        ans: 'View',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        time: 'Wed, 03 Apr 2024 11:43:20',
        search: 'What is DSA',
        type: 'GPT',
        ans: 'View',
      },

    ],
    [],
  )

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        sortType: 'basic',
      },
      {
        Header: 'Name',
        accessor: 'name',
        filter: 'text',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Time',
        accessor: 'time',
        sortType: 'basic',
      },
      {
        Header: 'Search',
        accessor: 'search',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Ans',
        accessor: 'ans',
      },
    ],

    [],
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state: { pageIndex },
    previousPage,
    nextPage,
    setPageSize,
    setFilter,
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 5 } },
    useFilters,
    useSortBy,
    usePagination,
  )

  // Update the filter based on input
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || undefined
    setFilter('name', value)
    setFilterInput(value)
  }

  
  return (
    <>
      <div className="col-md-12">
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
                    {headerGroups.map((headerGroup) => (
                      <tr>
                        {headerGroup.headers.map((column) => (
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
                    {page.map((row) => {
                      prepareRow(row)
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => (
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
      </div>
    </>
  )
}

export default History
