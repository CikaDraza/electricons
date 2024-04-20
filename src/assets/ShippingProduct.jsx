import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { InputAdornment, Typography } from '@mui/material';
import { BackofficeStateContext } from '../utils/BackofficeState';

export default function ShipingProduct() {
  const { state_office, dispatch_office } = React.useContext(BackofficeStateContext);
  const [shipping, setShipping] = React.useState({ weightGross: '', weightNeto: '', lenght: '', width: '', height: '' });

  const handleShipping = (field, value) => {
    const updatedShipping = shipping;
    updatedShipping[field] = value;
    setShipping(updatedShipping);
    dispatch_office({ type: 'CREATE_PRODUCT', payload: { shipping: updatedShipping} });
  };

  React.useEffect(() => {
    setShipping(state_office?.product?.shipping || {} );
  }, []);

  return (
    <Box>
      <Box sx={{pb: 3}}>
        <Typography component="label">Shipping</Typography>
      </Box>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': { m: 1, width: {xs: '100%', md: '100%'} },
        }}
        noValidate
        autoComplete="off"
      >
        <Box sx={{ width: '100%', display: {xs: 'block', md: 'flex'}, justifyContent: {xs: 'flex-start', md: 'space-between'}, '& > *': {width: {xs: '100%', md: '49%'}} }}>
          <TextField sx={{mb: 1}} id="weightGross" label="Gross Weight" variant="outlined" InputProps={{
              endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            }} value={shipping?.weightGross} onChange={(e) => handleShipping('weightGross', e.target.value)} />
          <TextField id="weightNeto" label="Neto Weight" variant="outlined" InputProps={{
              endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            }} value={shipping?.weightNeto} onChange={(e) => handleShipping('weightNeto', e.target.value)} />
        </Box>
        <Box sx={{width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', '& > *': {width: {xs: '100%', md: '32%'}, mb: {xs: 1, md: 0}} }}>
          <TextField id="lenght" label="Lenght" variant="outlined" InputProps={{
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            }} value={shipping?.lenght} onChange={(e) => handleShipping('lenght', e.target.value)} />
          <TextField id="width" label="Width" variant="outlined" InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
          }} value={shipping?.width} onChange={(e) => handleShipping('width', e.target.value)} />
          <TextField id="height" label="Height" variant="outlined" InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
          }} value={shipping?.height} onChange={(e) => handleShipping('height', e.target.value)} />
        </Box>
      </Box>
    </Box>
  );
}