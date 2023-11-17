import { Stack, Typography, Box } from '@mui/material';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material/';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import { Entry } from '../../types';

interface Props {
  entries: Entry[];
}

const EntriesList = ({ entries }: Props) => {
  console.log(entries);

  return (
    <Stack>
      <Typography variant='h6' style={{ margin: '1em 0', fontWeight: 'bold' }}>
        entries
      </Typography>
      {entries.map((entry) => {
        return (
          <Box key={entry.id}>
            <Typography variant='body1'>
              {entry.date} {entry.description}
            </Typography>
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
          </Box>
        );
      })}
    </Stack>
  );
};
export default EntriesList;
