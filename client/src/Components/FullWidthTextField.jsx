import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FullWidthTextField({inputName}) {
  return (
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
        marginY:5,
        height:5
        
      }}
    >
      <TextField fullWidth label={inputName} id="fullWidth" onChange={(e)=>console.log(e.target.value)} />
    </Box>
  );
}
