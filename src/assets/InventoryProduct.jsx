import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { BackofficeStateContext } from '../utils/BackofficeState';

export default function InventoryProduct() {
  const [stockStatus, setStockStatus] = React.useState('');
  const [sku, setSku] = React.useState('');
  const [quantity, setQuantity] = React.useState(0);
  const { state_office, dispatch_office } = React.useContext(BackofficeStateContext);

  const handleChangeQty = (event) => {
    setQuantity(event.target.value);
    dispatch_office({ type: 'CREATE_PRODUCT', payload: { inStock: event.target.value} });
  };

  const handleChangeSku = (event) => {
    setSku(event.target.value);
    dispatch_office({ type: 'CREATE_PRODUCT', payload: { sku: event.target.value} });
  };

  const handleChangeStatus = (event) => {
    setStockStatus(event.target.value);
    dispatch_office({ type: 'CREATE_PRODUCT', payload: { stockStatus: event.target.value} });
  };

  return (
    <Box>
      <Box sx={{pb: 3}}>
        <Typography component="label">Inventory</Typography>
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
        <TextField id="quantity" type='number' label="Quantity" variant="outlined" value={state_office.product.inStock ? state_office.product.inStock : ""} onChange={handleChangeQty} />
        <TextField id="outlined-sku" value={state_office.product.sku ? state_office.product.sku : ""} label="SKU" variant="outlined" onChange={handleChangeSku} />
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="select-autowidth-label">Stock Status</InputLabel>
          <Select
            labelId="select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={state_office.product.stockStatus ? state_office.product.stockStatus : stockStatus}
            onChange={handleChangeStatus}
            autoWidth
            label="Stock Status"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'inStock'}>In Stock</MenuItem>
            <MenuItem value={'Out of stock'}>Out of stock</MenuItem>
            <MenuItem value={'Back in stock soon'}>Back in stock soon</MenuItem>
          </Select>
        </FormControl>
      </Box>

    </Box>
  );
}