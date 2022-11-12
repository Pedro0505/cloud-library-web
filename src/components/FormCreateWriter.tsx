import React, { useContext, useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField,
} from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { BookWritersContext } from '../context/BookWritersContext';

export default function FormCreateWriter() {
  const { handleSetWriters } = useContext(BookWritersContext);
  const [birthDate, setBirthDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [sex, setSex] = React.useState<'Male' | 'Female' | 'Other'>('Male');
  const [name, setName] = React.useState<string>('');

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
    await handleSetWriters({
      birthDate: birthDate?.toISOString() || new Date().toISOString(),
      name,
      sex,
    });
  };

  return (
    <form>
      <Stack spacing={2} direction="row" paddingBottom="10px" paddingTop="10px">
        <TextField id="name-field" label="Nome" variant="outlined" onChange={ handleChangeName } value={ name } />
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
        <Button onClick={ addWriter } variant="contained">Adicionar Autor</Button>
      </Stack>
    </form>
  );
}
