import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDemoData } from '@mui/x-data-grid-generator';
import { DataGrid } from '@mui/x-data-grid';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export function FileListComponent(props) {
  return (
    <Box sx={{ p: 1, display: 'flex' }}>
      <FiberManualRecordIcon
        fontSize="small"
       
      />
      {/* Status {props.status} */}
    </Box>
  );
}

export default function FileList() {
  const [status, setStatus] = React.useState('connected');
  const { data } = useDemoData({
    dataSet: 'Employee',
    rowLength: 4,
    maxColumns: 6,
  });
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ height: 350, width: '100%', mb: 1 }}>
        <DataGrid
          {...data}
          slots={{
            footer: FileListComponent,
          }}
          slotProps={{
            footer: { status },
          }}
        />
      </Box>
      <Button
        variant="contained"
        onClick={() =>
          setStatus((current) =>
            current === 'connected' ? 'disconnected' : 'connected',
          )
        }
      >
        {status === 'connected' ? 'Disconnect' : 'Connect'}
      </Button>
    </Box>
  );
}
