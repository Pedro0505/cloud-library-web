import React, {
  ChangeEvent, useContext, useState, useEffect,
} from 'react';
import {
  Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField,
} from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import FormCreateSchemas from './validations/FormCreateSchemas';
import { BookWritersContext } from '../../context/BookWritersContext';
import './style.css';

interface IBooksTextFields {
  title: string;
  caption: string;
  writer: string;
}

export default function FormCreateBooks() {
  const { getAllWriters, writers, handleSetBooks } = useContext(BookWritersContext);
  const [dateField, setDateField] = useState<Dayjs | null>(dayjs(new Date()));
  const [textFields, setTextFields] = useState<IBooksTextFields>({ caption: '', title: '', writer: '' });
  const [writerSelect, setWriterSelect] = useState('');
  const [errorInputs, setErrorInput] = useState('');

  const handleChangeWriter = (event: SelectChangeEvent) => {
    setWriterSelect(event.target.value as string);
  };

  const handleChangeDate = (newValue: Dayjs | null) => {
    setDateField(newValue);
  };

  const handleChangeTextFileds = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTextFields((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const addBook = async () => {
    const toValidate = {
      caption: textFields.caption,
      title: textFields.title,
      writerId: String(writerSelect),
    };

    console.log(writerSelect);

    const { error: errorJoi } = FormCreateSchemas.validate(toValidate);

    if (!errorJoi) {
      try {
        const newBook = {
          ...toValidate,
          writerId: +writerSelect,
          publicationDate: dateField?.toISOString() || new Date().toISOString(),
        };

        await handleSetBooks(newBook, +writerSelect);
        setErrorInput('');
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrorInput(errorJoi.message);
    }
  };

  useEffect(() => {
    const getWriter = async () => {
      try {
        getAllWriters();
      } catch (error) {
        console.error(error);
      }
    };

    getWriter();
  }, []);

  return (
    <form className="form-create-book">
      <div className="container-book-title">
        <h3 className="no-select">Adicione um novo livro</h3>
        <p className="error-message-book">{ errorInputs }</p>
      </div>
      <Stack spacing={2} direction="row" paddingBottom="10px" paddingTop="10px" paddingLeft="15px">
        <TextField id="title-field" name="title" label="Título" variant="outlined" onChange={ handleChangeTextFileds } />
        <TextField id="caption-field" name="caption" label="Subtítulo" variant="outlined" onChange={ handleChangeTextFileds } />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="select-writer-field">Autor</InputLabel>
            <Select
              labelId="select-writer-field"
              id="select-writer"
              value={writerSelect}
              label="Autor"
              onChange={ handleChangeWriter }
            >
              {
                writers.map((e) => (
                  <MenuItem key={e.id} value={e.id}>{ e.name }</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Box>
        <LocalizationProvider dateAdapter={ AdapterDayjs }>
          <DesktopDatePicker
            label="Data de Publicação"
            inputFormat="MM/DD/YYYY"
            value={dateField}
            onChange={handleChangeDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button onClick={ addBook } variant="contained">Adicionar Livro</Button>
      </Stack>
    </form>
  );
}
