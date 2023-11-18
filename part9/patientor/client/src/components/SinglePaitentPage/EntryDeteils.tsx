import { Typography, Box } from '@mui/material';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material/';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import {
  Entry,
  HospitalEntry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HealthCheckRating,
} from '../../types';
import { assertNever } from '../../utils';

const style = {
  border: 1,
  padding: '1rem',
  marginBottom: '0.5rem',
  borderRadius: '16px',
};

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Box sx={style}>
      <Box>
        <Typography variant='body2' component='span'>
          {`${entry.date} `}
        </Typography>
        <WorkOutlineIcon fontSize='small' />
      </Box>
      <Typography variant='body1' fontStyle='italic'>
        {entry.description}
      </Typography>
      <Typography variant='body1'>{`Discharge date: ${entry.discharge.date}`}</Typography>
      <Typography variant='body1'>{`Discharge criteria: ${entry.discharge.criteria}`}</Typography>
      {entry.diagnosis && entry.diagnosis.length ? (
        <List>
          {entry.diagnosis.map((diagnos) => {
            return (
              <ListItem disablePadding key={diagnos.code}>
                <ListItemIcon>
                  <FiberManualRecordIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText primary={diagnos.name} />
              </ListItem>
            );
          })}
        </List>
      ) : null}
      <Typography variant='body1'>
        {`diagnos by ${entry.specialist}`}
      </Typography>
    </Box>
  );
};

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <Box sx={style}>
      <Box>
        <Typography variant='body2' component='span'>
          {`${entry.date} `}
        </Typography>
        <MedicalServicesIcon fontSize='small' />
      </Box>
      <Typography variant='body1' fontStyle='italic'>
        {entry.description}
      </Typography>
      {Object.entries(HealthCheckRating)
        .filter(
          (value, index, array) =>
            isNaN(Number(value[0])) && index !== array.length - 1
        )
        .map(([key, value]) => {
          console.log(key, value);
          return (
            <Box component='span' key={key}>
              {Number(value) >= Number(entry.healthCheckRating) ? (
                <FavoriteIcon color='error' />
              ) : (
                <FavoriteBorderIcon color='error' />
              )}
            </Box>
          );
        })}
      {entry.diagnosis && entry.diagnosis.length ? (
        <List>
          {entry.diagnosis.map((diagnos) => {
            return (
              <ListItem disablePadding key={diagnos.code}>
                <ListItemIcon>
                  <FiberManualRecordIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText primary={diagnos.name} />
              </ListItem>
            );
          })}
        </List>
      ) : null}
      <Typography variant='body1'>
        {`diagnos by ${entry.specialist}`}
      </Typography>
    </Box>
  );
};

const OccupationalHealthcare: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <Box sx={style}>
      <Box>
        <Typography variant='body2' component='span'>
          {`${entry.date} `}
        </Typography>
        <WorkIcon fontSize='small' />
        <Typography variant='body2' component='span' fontStyle='italic'>
          {` ${entry.employerName}`}
        </Typography>
      </Box>
      <Typography variant='body1' fontStyle='italic'>
        {entry.description}
      </Typography>
      {entry.sickLeave ? (
        <Typography variant='body1'>{`Sick leave: ${entry.sickLeave.startDate} ${entry.sickLeave.endDate}`}</Typography>
      ) : null}
      {entry.diagnosis && entry.diagnosis.length ? (
        <List>
          {entry.diagnosis.map((diagnos) => {
            return (
              <ListItem disablePadding key={diagnos.code}>
                <ListItemIcon>
                  <FiberManualRecordIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText primary={diagnos.name} />
              </ListItem>
            );
          })}
        </List>
      ) : null}
      <Typography variant='body1'>
        {`diagnos by ${entry.specialist}`}
      </Typography>
    </Box>
  );
};

const EntryDeteils: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <Hospital entry={entry} />;
    case 'HealthCheck':
      return <HealthCheck entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDeteils;
