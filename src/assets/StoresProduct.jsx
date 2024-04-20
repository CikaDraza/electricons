import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Typography } from '@mui/material';
import axios from 'axios';
import { BackofficeStateContext } from '../utils/BackofficeState';

export default function StoresProduct() {
  const [storeInfo, setStoreInfo] = React.useState([]);
  const [stores, setStores] = React.useState([{ city: '', address: '' }]);
  const { state_office, dispatch_office } = React.useContext(BackofficeStateContext);

  const handleStoresChange = (index, field, value) => {
    const updatedStores = [...stores];
    updatedStores[index][field] = value;
    setStores(updatedStores);
    dispatch_office({ type: 'CREATE_PRODUCT', payload: { stores: updatedStores} });
  };

  React.useEffect(() => {
    setStores(state_office?.product?.stores || [{ city: '', address: '' }]);
  }, []);

  React.useEffect(() => {
    let active = true;

    (async () => {
      const { data } = await axios.get('/api/store_info');
      if(active) {
        setStoreInfo(data);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const handleAddStores = () => {
    const newStore = { city: '', address: '' };
    setStores([...stores, newStore]);
  };

  return (
    <Box>
      <Box sx={{pb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <Typography component="label">Available in Stores</Typography>
        <Button size='small' onClick={handleAddStores}>{'+ Add Store'}</Button>
      </Box>
      {
        stores.map((store, index) => (
          <Box key={index} component="form" sx={{display: 'flex', '& > :not(style)': { m: 1, width: {xs: '100%', md: '50%'} }}}>
            <FormControl sx={{ m: 1 }}>
              <InputLabel id={`city-${index}`}>Cities</InputLabel>
              <Select
                labelId={`city-${index}`}
                id={`city-${index}`}
                value={
                  store.city
                }
                onChange={(e) => handleStoresChange(index, 'city', e.target.value)}
                autoWidth
                label="Cities"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {storeInfo.map(item => (
                  <MenuItem key={item._id} value={item.city}>{item.city}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id={`address-${index}`}>Stores</InputLabel>
              <Select
                labelId={`address-${index}`}
                id={`address-${index}`}
                value={store.address}
                onChange={(e) => handleStoresChange(index, 'address', e.target.value)}
                autoWidth
                label="Stores"
              >
                {storeInfo.map(item => (
                  (item.city === store.city) &&
                  <MenuItem key={item._id} value={item.address}>{item.address}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        ))
      }
    </Box>
  )
}

