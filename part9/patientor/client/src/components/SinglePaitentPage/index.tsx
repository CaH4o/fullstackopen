import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Typography, LinearProgress } from '@mui/material';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import { Gender, Patient } from '../../types';

import patientService from '../../services/patients';
import EntriesList from './EntriesList';

const SinglePaitentPage = () => {
  const [patient, setPatient] = useState<Patient>({} as Patient);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatientList = async (idPatient: string) => {
      const patient = await patientService.getOne(idPatient);
      setPatient(patient);
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
        <EntriesList entries={patient.entries} />
      ) : null}
    </Stack>
  );
};
export default SinglePaitentPage;
