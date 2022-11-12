import React, { useContext, useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField,
} from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import FormCreateSchemas from './validations/FormCreateSchemas';
import { BookWritersContext } from '../../context/BookWritersContext';
import './style.css';

export default function FormCreateWriter() {
  const { handleSetWriters } = useContext(BookWritersContext);
  const [birthDate, setBirthDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [sex, setSex] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [name, setName] = useState<string>('');
  const [errorInputs, setErrorInput] = useState('');

  const handleChangeDate = (newValue: Dayjs | null) => {
    setBirthDate(newValue);
  };

  const handleChangeSex = (event: SelectChangeEvent) => {
    setSex(event.target.value as 'Male' | 'Female' | 'Other');
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(event.target.value as string);
  };

  const addWriter = async () => {
    const toValidate = {
      name,
    };

    const { error: errorJoi } = FormCreateSchemas.validate(toValidate);

    console.log(errorJoi);
    if (!errorJoi) {
      try {
        const newWriter = {
          ...toValidate,
          birthDate: birthDate?.toISOString() || new Date().toISOString(),
          sex,
        };

        await handleSetWriters(newWriter);
        setErrorInput('');
      } catch (error) {
        console.error(error);
      }
    } else {
      setErrorInput(errorJoi.message);
    }
  };

  return (
    <form className="form-create-writer">
      <h3 className="title-form-writer no-select">Adicione um novo autor</h3>
      <Stack spacing={2} direction="row" paddingLeft="15px" paddingBottom="10px" paddingTop="10px">
        <div className="name-container">
          <TextField id="name-field" label="Nome" variant="outlined" error={ Boolean(errorInputs.length) } onChange={ handleChangeName } value={ name } />
          <p className="error-message-writer no-select">{ errorInputs }</p>
        </div>
        <LocalizationProvider dateAdapter={ AdapterDayjs }>
          <DesktopDatePicker
            label="Data de Aniversário"
            inputFormat="MM/DD/YYYY"
            value={birthDate}
            onChange={handleChangeDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <FormControl>
          <InputLabel id="sex-field">Sexo</InputLabel>
          <Select
            labelId="sex-field"
            id="sex"
            value={sex}
            label="Sexo"
            onChange={handleChangeSex}
          >
            <MenuItem value={'Male'}>Masculino</MenuItem>
            <MenuItem value={'Female'}>Feminino</MenuItem>
            <MenuItem value={'Other'}>Outro</MenuItem>
          </Select>
        </FormControl>
        <Button style={ { height: '56px' } } onClick={ addWriter } variant="contained">Adicionar Autor</Button>
      </Stack>
    </form>
  );
}
