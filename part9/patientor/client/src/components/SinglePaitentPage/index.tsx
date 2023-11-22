import axios from 'axios';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Typography, LinearProgress, Button } from '@mui/material';

import patientService from '../../services/patients';
import diagnosService from '../../services/diagnos';
import EntryDeteils from './EntryDeteils';
import Notification from './Notification';
import AddEntryTabs from '../AddEntryTabs';

import { Gender, Patient, EntryWithoutId } from '../../types';

const SinglePaitentPage = () => {
  const [patient, setPatient] = useState<Patient>({} as Patient);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);
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

  const onSubmit = async (values: EntryWithoutId) => {
    console.log(values);
    try {
      const updatedPatient = await patientService.createEntry({
        id: patient.id,
        entry: values,
      });
      setIsFormOpen(false);
      setPatient(updatedPatient);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          console.error(message);
          setNotification(message);
        } else {
          console.error('Unrecognized axios error', e);
          setNotification('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setNotification('Unknown error');
      }
    }
  };

  const onCancel = () => {
    setIsFormOpen(false);
  };

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
      <Notification
        notification={notification}
        setNotification={setNotification}
      />
      {isFormOpen ? (
        <AddEntryTabs onSubmit={onSubmit} onCancel={onCancel} />
      ) : null}
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
      {isFormOpen ? null : (
        <Button
          variant='contained'
          style={{
            float: 'left',
            width: '200px',
          }}
          onClick={() => {
            setIsFormOpen(true);
          }}
        >
          Add new entry
        </Button>
      )}
    </Stack>
  );
};

export default SinglePaitentPage;
