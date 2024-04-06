import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { InputAdornment, Typography } from '@mui/material';
import { BackofficeStateContext } from '../utils/BackofficeState';

export default function ShipingProduct() {
  const { dispatch_office } = React.useContext(BackofficeStateContext);
  const [shipping, setShipping] = React.useState([{ weight: '', lenght: '', width: '' }]);

  const handleShipping = (index, field, value) => {
    const updatedShipping = [...shipping];
    updatedShipping[index][field] = value;
    setShipping(updatedShipping);
    dispatch_office({ type: 'CREATE_PRODUCT', payload: { shipping: updatedShipping} });
  };

  return (
    <Box>
      <Box sx={{pb: 3}}>
        <Typography component="label">Shipping</Typography>
      </Box>
      <Box
        component="form"
        sx={{
          display: 'flex',
          '& > :not(style)': { m: 1, width: {xs: '100%', md: '50%'} },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="weight" label="Weight" variant="outlined" InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }} onChange={(e) => handleShipping(0, 'weight', e.target.value)} />
        <TextField id="lenght" label="Lenght" variant="outlined" InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
          }} onChange={(e) => handleShipping(0, 'lenght', e.target.value)} />
        <TextField id="width" label="Width" variant="outlined" InputProps={{
          endAdornment: <InputAdornment position="end">cm</InputAdornment>,
        }} onChange={(e) => handleShipping(0, 'width', e.target.value)} />
      </Box>
    </Box>
  );
}