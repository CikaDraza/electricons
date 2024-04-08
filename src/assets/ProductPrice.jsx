import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { BackofficeStateContext } from '../utils/BackofficeState';
import { Typography } from '@mui/material';

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'RUB',
    label: '₽',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

export default function ProductPrice() {
  const [value, setValue] = React.useState(0);
  const [oldValue, setOldValue] = React.useState(0);
  const [currency, setCurrency] = React.useState('');
  const { state_office, dispatch_office } = React.useContext(BackofficeStateContext);

  const handleChange = (event) => {
    setValue(event.target.value);
    dispatch_office({ type: 'CREATE_PRODUCT', payload: { price: event.target.value} });
  };

  const handleChangeOld = (event) => {
    setOldValue(event.target.value);
    dispatch_office({ type: 'CREATE_PRODUCT', payload: { oldPrice: event.target.value} });
  };

  const handleChangeCurrency = (event) => {
    setCurrency(event.target.value);
    dispatch_office({ type: 'CREATE_PRODUCT', payload: { currency: event.target.value} });
  };
  
  return (
    <Box>
      <Box>
        <Typography component="label">Price information</Typography>
      </Box>
      <Box sx={{ display: 'flex', py: 3 }}>
        <Box sx={{display: 'flex', width: '100%', m: 1}}>
          <TextField
            sx={{width: '5ch', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}
            id="standard-select-currency-native"
            select
            defaultValue="USD"
            SelectProps={{
              native: true,
            }}
            variant="standard"
            value={currency}
            onChange={handleChangeCurrency}
          >
            {currencies.map((option) => (
              <option key={option.value} label={option.label} value={option.label}>
                {option.label}
              </option>
            ))}
          </TextField>
          <FormControl fullWidth sx={{ m: 0, pt: 1 }} variant="standard">
            <InputLabel htmlFor="price-amount">Price</InputLabel>
            <Input
              id="price-amount"
              value={state_office.product.price ? state_office.product.price : value}
              onChange={handleChange}
            />
          </FormControl>
        </Box>
        <Box sx={{display: 'flex', width: '100%', m: 1}}>
          <TextField
            sx={{width: '5ch', display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}
            id="select-currency-old"
            defaultValue="USD"
            SelectProps={{
              native: true,
            }}
            variant="standard"
            value={currency}
            handleChange={handleChangeCurrency}
          >
            {currencies.map((option) => (
              <option key={option.value} label={option.label} value={option.label}>
                {option.label}
              </option>
            ))}
          </TextField>
          <FormControl fullWidth sx={{ m: 0, pt: 1 }} variant="standard">
            <InputLabel htmlFor="old-price-amount">Old Price</InputLabel>
            <Input
              id="old-price-amount"
              value={state_office.product.oldPrice ? state_office.product.oldPrice : oldValue}
              onChange={handleChangeOld}
            />
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}