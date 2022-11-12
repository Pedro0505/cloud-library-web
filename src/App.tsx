import React from 'react';
import FormCreateBooks from './components/FromCreateBook/FormCreateBooks';
import DataTable from './components/DataTable/DataTable';
import { BookWritersProvider } from './context/BookWritersContext';
import FormCreateWriter from './components/FromCreateWriter/FormCreateWriters';
import Header from './components/Header/Header';
import './style/app.css';

function App() {
  return (
    <div>
      <BookWritersProvider>
        <Header />
        <FormCreateBooks />
        <FormCreateWriter />
        <DataTable />
      </BookWritersProvider>
    </div>
  );
}

export default App;
