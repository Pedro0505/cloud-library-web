import React, { useContext, useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { BookWritersContext } from '../context/BookWritersContext';
import ITableRows from '../interfaces/ITableRows';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id', width: 130 },
  { field: 'title', headerName: 'Título', width: 330 },
  { field: 'caption', headerName: 'Subtítulo', width: 330 },
  { field: 'writer', headerName: 'Autor', width: 330 },
  {
    field: 'publicationDate', headerName: 'Data de Publicação', width: 230, type: 'dateTime',
  },
];

function DataTable() {
  const [rows, setRows] = useState<ITableRows[]>([]);
  const { getAllBookWriters, booksWriters } = useContext(BookWritersContext);

  useEffect(() => {
    const fetchRows = async () => {
      getAllBookWriters();
    };

    fetchRows();
  }, []);

  useEffect(() => {
    if (booksWriters.length > 0) {
      const mapBooks = booksWriters.map(({ books, writers }) => ({
        id: books.id,
        title: books.title,
        caption: books.caption,
        publicationDate: books.publicationDate.split(/T/)[0],
        writer: writers.name,
      }));

      setRows(mapBooks);
    }
  }, [booksWriters]);

  return (
    <div style={{ height: 302, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}

export default DataTable;
