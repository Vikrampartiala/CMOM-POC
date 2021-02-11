import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import API from '../utils/API';
const columns = [
  {
    name: 'Image',
    cell: (row) => <img src={row.image} alt='' height='100' width='100' />,
  },
  {
    name: 'Name',
    cell: (row) => (
      <Link to={`/coins/${row.id}`} className='' target='_blank'>
        {row.name}
      </Link>
    ),
    sortable: true,
  },
  {
    name: 'Symbol',
    selector: 'symbol',
    sortable: true,
  },
  {
    name: 'Current Price',
    selector: 'current_price',
    sortable: true,
  },
  {
    name: 'High 24 hour Price',
    selector: 'high_24h',
    sortable: true,
  },
  {
    name: 'Low 24 hour Price',
    selector: 'low_24h',
    sortable: true,
  },
];

const Markets = () => {
  const Currency = 'eur';
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const fetchUsers = async (page) => {
    setLoading(true);
    const response = await API.get('/coins/markets', {
      params: {
        vs_currency: Currency,
        order: 'market_cap_desc',
        per_page: perPage,
        page: page,
        sparkline: false,
      },
    });

    setData(response.data);
    setTotalRows(2000);
    setLoading(false);
  };

  const handlePageChange = (page) => {
    fetchUsers(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);

    const response = await API.get('/coins/markets', {
      params: {
        vs_currency: Currency,
        order: 'market_cap_desc',
        per_page: newPerPage,
        page: page,
        sparkline: false,
      },
    });

    setData(response.data);
    setPerPage(newPerPage);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  //Using react-data-table-component
  //Document:- https://www.npmjs.com/package/react-data-table-component
  return (
    <DataTable
      title='Markets'
      columns={columns}
      data={data}
      progressPending={loading}
      pagination
      paginationServer
      paginationTotalRows={totalRows}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
      paginationComponentOptions={{
        noRowsPerPage: true,
      }}
    />
  );
};

export default Markets;
