import React from 'react';
import FormCreateBooks from './components/FormCreateBooks';
import DataTable from './components/DataTable';
import { BookWritersProvider } from './context/BookWritersContext';
import FormCreateWriter from './components/FormCreateWriter';

function App() {
  return (
    <div>
      <BookWritersProvider>
        <FormCreateBooks />
        <FormCreateWriter />
        <DataTable />
      </BookWritersProvider>
    </div>
  );
}

export default App;
