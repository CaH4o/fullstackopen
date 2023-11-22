import * as React from 'react';

import { Tabs, Tab, Box } from '@mui/material';

import AddEntryForm from './AddEntryForm';

import { EntryWithoutId } from '../../types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
}

const AddEntryTabs = ({ onSubmit, onCancel }: Props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab label='Health check' {...a11yProps(0)} />
          <Tab label='Hospital' {...a11yProps(1)} />
          <Tab label='Occupational healthcare' {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <AddEntryForm
          onSubmit={onSubmit}
          onCancel={onCancel}
          type='HealthCheck'
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AddEntryForm onSubmit={onSubmit} onCancel={onCancel} type='Hospital' />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <AddEntryForm
          onSubmit={onSubmit}
          onCancel={onCancel}
          type='OccupationalHealthcare'
        />
      </CustomTabPanel>
    </Box>
  );
};

export default AddEntryTabs;
