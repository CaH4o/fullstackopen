import { useState, useEffect } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material/';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import { Diagnosis, Entry } from '../../types';
import diagnosService from '../../services/diagnos';

interface Props {
  entries: Entry[];
}

const EntriesList = ({ entries }: Props) => {
  const [diagnos, setDiagnos] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnosisList = async () => {
      const diagnos = await diagnosService.getAll();
      setDiagnos(diagnos);
    };
    void fetchDiagnosisList();
  }, [entries]);

  return (
    <Stack>
      <Typography variant='h6' style={{ margin: '1em 0', fontWeight: 'bold' }}>
        entries
      </Typography>
      {entries.map((e) => {
        return (
          <Box key={e.id}>
            <Typography variant='body1'>
              {e.date} {e.description}
            </Typography>
            {e.diagnosisCodes && e.diagnosisCodes.length && diagnos.length ? (
              <List>
                {e.diagnosisCodes.map((dc) => {
                  return (
                    <ListItem disablePadding key={dc}>
                      <ListItemIcon>
                        <FiberManualRecordIcon fontSize='small' />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${dc} ${
                          diagnos.find((d) => d.code === dc)?.name || ''
                        }`}
                      />
                    </ListItem>
                  );
                })}
              </List>
            ) : null}
          </Box>
        );
      })}
    </Stack>
  );
};
export default EntriesList;
