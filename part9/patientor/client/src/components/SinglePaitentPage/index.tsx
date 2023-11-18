import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Typography, LinearProgress, Button } from '@mui/material';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import { Gender, Patient } from '../../types';

import patientService from '../../services/patients';
import diagnosService from '../../services/diagnos';
import EntryDeteils from './EntryDeteils';

const SinglePaitentPage = () => {
  const [patient, setPatient] = useState<Patient>({} as Patient);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatientList = async (idPatient: string) => {
      const patient = await patientService.getOne(idPatient);
      const diagnos = await diagnosService.getAll();
      const entries = patient.entries.map((entry) =>
        entry.diagnosisCodes
          ? {
              ...entry,
              diagnosis: entry.diagnosisCodes.map(
                (dc) =>
                  diagnos.find((d) => d.code === dc) || { code: dc, name: '' }
              ),
            }
          : entry
      );
      setPatient({ ...patient, entries });
    };
    if (id) {
      void fetchPatientList(id);
    }
  }, [id]);

  if (!patient.id)
    return (
      <Typography style={{ margin: '1em 0' }}>
        <LinearProgress />
      </Typography>
    );

  return (
    <Stack>
      <Typography variant='h5' style={{ margin: '1em 0', fontWeight: 'bold' }}>
        {patient.name}{' '}
        {patient.gender === Gender.Female ? <FemaleIcon /> : <MaleIcon />}
      </Typography>
      <Typography variant='body1'>ssn: {patient.ssn!}</Typography>
      <Typography variant='body1'>occupation: {patient.occupation}</Typography>
      <br />
      {patient.entries.length ? (
        <Stack>
          <Typography
            variant='h6'
            style={{ margin: '1em 0', fontWeight: 'bold' }}
          >
            entries
          </Typography>
          <Stack>
            {patient.entries.map((entry) => {
              return <EntryDeteils entry={entry} key={entry.id} />;
            })}
          </Stack>
        </Stack>
      ) : null}
      <Button variant='contained'>Add new entry</Button>
    </Stack>
  );
};

export default SinglePaitentPage;
