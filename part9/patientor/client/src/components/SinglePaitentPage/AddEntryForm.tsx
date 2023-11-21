import { useState, SyntheticEvent } from 'react';

import {
  TextField,
  Grid,
  Button,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  SelectChangeEvent,
  Stack,
} from '@mui/material';

import { EntryWithoutId, HealthCheckRating } from '../../types';

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [entry, setEntry] = useState({
    type: 'HealthCheck',
    healthCheckRating: HealthCheckRating.Healthy,
  } as EntryWithoutId);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEntry({
      ...entry,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    event.preventDefault();
    switch (entry.type) {
      case 'HealthCheck':
        const healthCheckRating = Number(event.target.value);
        if (isHealthCheckRating(healthCheckRating)) {
          setEntry({ ...entry, healthCheckRating });
        }
        break;
      default:
        break;
    }
  };

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit(entry);
  };

  return (
    <Stack
      sx={{ border: '2px dotted black', p: '0.5rem', gap: '1rem' }}
      component='form'
      onSubmit={addPatient}
    >
      <TextField
        variant='standard'
        label='Description'
        name='description'
        fullWidth
        value={entry.description || ''}
        onChange={handleChange}
      />
      <TextField
        variant='standard'
        label='Date'
        name='date'
        type='date'
        InputLabelProps={{ shrink: true }}
        fullWidth
        value={entry.date || ''}
        onChange={handleChange}
      />
      <TextField
        variant='standard'
        label='Specialist'
        name='specialist'
        fullWidth
        value={entry.specialist || ''}
        onChange={handleChange}
      />
      {entry.type === 'HealthCheck' ? (
        <FormControl fullWidth>
          <InputLabel id='HealthCheck raiting'>HealthCheck rating</InputLabel>
          <Select
            labelId='HealthCheck raiting'
            variant='standard'
            name='healthCheckRating'
            value={entry.healthCheckRating.toString()}
            fullWidth
            onChange={handleChangeSelect}
          >
            {Object.entries(HealthCheckRating)
              .filter((value) => isNaN(Number(value[0])))
              .map(([key, value]) => {
                return (
                  <MenuItem key={key} value={value}>
                    {key}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      ) : null}

      <TextField
        variant='standard'
        label='Diagnosis codes'
        name='diagnosisCodes'
        fullWidth
        value={entry.diagnosisCodes || ''}
        onChange={handleChange}
      />

      <Grid>
        <Grid item>
          <Button
            color='secondary'
            variant='contained'
            style={{ float: 'left' }}
            type='button'
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button style={{ float: 'right' }} type='submit' variant='contained'>
            Add
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default AddEntryForm;
