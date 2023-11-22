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
  Typography,
} from '@mui/material';

import {
  Discharge,
  EntryWithoutId,
  HealthCheckRating,
  SickLeave,
} from '../../types';

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
  type: 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare';
}

const initializeEntry = (
  type: 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare'
) => {
  switch (type) {
    case 'HealthCheck':
      return {
        type,
        healthCheckRating: HealthCheckRating.Healthy,
      } as EntryWithoutId;
    default:
      return { type } as EntryWithoutId;
  }
};

const AddEntryForm = ({ onSubmit, onCancel, type }: Props) => {
  const [entry, setEntry] = useState<EntryWithoutId>(initializeEntry(type));
  const [discharge, setDischarge] = useState<Discharge>({} as Discharge);
  const [sickLeave, setSickLeave] = useState<SickLeave>({} as SickLeave);

  const handleChange = ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = currentTarget;
    setEntry({ ...entry, [name]: value });
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    event.preventDefault();
    if (entry.type === 'HealthCheck') {
      const healthCheckRating = Number(event.target.value);
      if (isHealthCheckRating(healthCheckRating)) {
        setEntry({ ...entry, healthCheckRating });
      }
    }
  };

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    if (entry.type === 'Hospital') {
      onSubmit({ ...entry, discharge });
    } else if (
      entry.type === 'OccupationalHealthcare' &&
      sickLeave.endDate &&
      sickLeave.startDate
    ) {
      onSubmit({ ...entry, sickLeave });
    } else {
      onSubmit(entry);
    }
  };

  return (
    <Stack
      sx={{ border: '2px dotted black', p: '0.5rem', gap: '1rem' }}
      component='form'
      onSubmit={addPatient}
    >
      <Typography variant='body1' fontWeight='bold'>
        New {type} entry
      </Typography>
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
      {entry.type === 'Hospital' ? (
        <>
          <Typography variant='body1'>Discharge:</Typography>
          <TextField
            variant='standard'
            type='date'
            label='Date'
            name='date'
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={discharge.date || ''}
            onChange={({ currentTarget }) => {
              setDischarge({
                ...discharge,
                [currentTarget.name]: currentTarget.value,
              });
            }}
          />
          <TextField
            variant='standard'
            label='Criteria'
            name='criteria'
            fullWidth
            value={discharge.criteria || ''}
            onChange={({ currentTarget }) => {
              setDischarge({
                ...discharge,
                [currentTarget.name]: currentTarget.value,
              });
            }}
          />
        </>
      ) : null}
      {entry.type === 'OccupationalHealthcare' ? (
        <>
          <TextField
            variant='standard'
            label='Employer name'
            name='employerName'
            fullWidth
            value={entry.employerName || ''}
            onChange={handleChange}
          />
          <Typography variant='body1'>Discharge:</Typography>
          <TextField
            variant='standard'
            label='Start date'
            name='startDate'
            type='date'
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={sickLeave.startDate || ''}
            onChange={({ currentTarget }) => {
              setSickLeave({
                ...sickLeave,
                [currentTarget.name]: currentTarget.value,
              });
            }}
          />
          <TextField
            variant='standard'
            label='End date'
            name='endDate'
            type='date'
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={sickLeave.endDate || ''}
            onChange={({ currentTarget }) => {
              setSickLeave({
                ...sickLeave,
                [currentTarget.name]: currentTarget.value,
              });
            }}
          />
        </>
      ) : null}
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
