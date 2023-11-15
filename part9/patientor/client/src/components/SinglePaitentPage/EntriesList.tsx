import { Stack, Typography, Box } from '@mui/material';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material/';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import { Entry } from '../../types';

interface Props {
  entries: Entry[];
}

const EntriesList = ({ entries }: Props) => {
  return (
    <Stack>
      <Typography variant='h6' style={{ margin: '1em 0', fontWeight: 'bold' }}>
        {entries.length ? 'entries' : null}
      </Typography>
      {!entries.length
        ? null
        : entries.map((e) => {
            return (
              <Box key={e.id}>
                <Typography variant='body1'>
                  {e.date} {e.description}
                </Typography>
                {e.diagnosisCodes ? (
                  <List>
                    {e.diagnosisCodes.map((dc) => {
                      return (
                        <ListItem disablePadding key={dc}>
                          <ListItemIcon>
                            <FiberManualRecordIcon fontSize='small' />
                          </ListItemIcon>
                          <ListItemText primary={dc} />
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
