import React, { useContext, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import Link from '../../src/Link';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import theme from '../../src/theme';
import { Store } from '../../src/utils/Store';
import CheckoutLayout from '../../src/components/CheckoutLayout';
import CheckoutStepper from '../../src/components/CheckoutStepper';
import { FormControl, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormHelperText from '@mui/material/FormHelperText';

export default function Shipping() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { snack, cart: {shipping, addresses} } = state;
  const [value, setValue] = React.useState('postexpress');
  const [city, setCity] = React.useState('');
  const [store, setStore] = React.useState('');
  const [errors, setErrors] = useState({
    city: false,
    store: false
  });

  const handleChangeCity = (event) => {
    setCity(event.target.value);
  };

  const handleChangeStore = (event) => {
    setStore(event.target.value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };
 
  const shippingCost = 50;
  const emptyShipping = Object.keys(shipping).length === 0;
  const deliveryCity = addresses[Cookies.get('forInvoice')].city;
  const deliveryAddress = addresses[Cookies.get('forInvoice')].address;

  const handleSubmit = async (event) => {
    event.preventDefault();
      const formOutput = new FormData(event.currentTarget);
      const formData = {
        shippingMethod: formOutput.get('shipping-method'),
        shippingCity: formOutput.get('shiping-city') !== null ? formOutput.get('shiping-city') : deliveryCity,
        store: formOutput.get('shiping-store') !== null ? formOutput.get('shiping-store') : deliveryAddress,
        comment: formOutput.get('shiping-comment') !== null ? formOutput.get('shiping-comment') : ''
      };
      if(formData.shippingCity === '' && formData.shippingMethod === 'store') {
        setErrors({ ...errors, city: true });
        dispatch({ type: 'SNACK_MESSAGE', payload: { ...state.snack, message: 'please select city', severity: 'warning'}});
        return;
      }
      if(formData.store === '' && formData.shippingMethod === 'store') {
        setErrors({ ...errors, store: true });
        dispatch({ type: 'SNACK_MESSAGE', payload: { ...state.snack, message: 'please select store', severity: 'warning'}});
        return;
      }
      dispatch({ type: 'SHIPPING', payload: formData});
      dispatch({ type: 'SNACK_MESSAGE', payload: { ...state.snack, message: 'successfully added shipping', severity: 'success'}});
      Cookies.set('shipping', JSON.stringify(formData));
      router.push('/checkout/payment');
  };

  const handleEdit = () => {
    dispatch({ type: 'SNACK_MESSAGE', payload: { ...state.snack, message: 'now you can edit shipping', severity: 'warning'}});
    dispatch({ type: 'SHIPPING_REMOVE' });
    Cookies.remove('shipping');
  };

  useEffect(() => {
    !emptyShipping ? setValue(shipping.shippingMethod) : setValue('postexpress')
    !emptyShipping ? setCity(shipping.shippingCity) : setCity('')
    !emptyShipping ? setStore(shipping.store) : setStore('')
  }, [shipping]);

  return (
    <CheckoutLayout>
      <CheckoutStepper activeStep={2} />
      <ThemeProvider theme={theme}>
        <Container component="div" maxWidth="xl">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                <Grid container spacing={2}>
                  <Grid align="left" item xs={12}>
                    <FormControl sx={{width: '100%'}}>
                      <RadioGroup
                        aria-labelledby="controlled-radio-buttons-group"
                        name="shipping-method"
                        value={value}
                        onChange={handleChange}
                        >
                          <Box sx={{backgroundColor: theme.palette.secondary.borderColor, px: 2, py: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', my: 1}}>
                          <FormControlLabel sx={{width: '200px'}} color="secondary" value="postexpress" control={<Radio />} label="POST Express" />
                          <Typography>
                            Delivery in 2 - 3 days!
                          </Typography>
                          <Typography>
                            {shippingCost ? `$${shippingCost}` : 'Free'}
                          </Typography>
                          </Box>
                          <Box sx={{backgroundColor: theme.palette.secondary.borderColor, px: 2, py: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', my: 1}}>
                            <FormControlLabel sx={{width: '200px'}} value="dhl" control={<Radio />} label="DHL" />
                            <Typography align="left">
                              Delivery in 5 - 7 days!
                            </Typography>
                            <Typography>
                              {shippingCost ? `$${shippingCost * 1.8}` : 'Free'}
                            </Typography>
                          </Box>
                          <Box sx={{backgroundColor: theme.palette.secondary.borderColor, px: 2, py: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', my: 1}}>
                            <FormControlLabel sx={{width: '200px'}} value="store" control={<Radio />} label="Electricons Store" />
                            <Typography>
                              Pick up in-store
                            </Typography>
                            <Typography>
                              {'Free'}
                            </Typography>
                          </Box>
                        </RadioGroup>
                      </FormControl>
                      {
                        value === 'store' &&
                        <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                          <FormControl sx={{ m: 1, minWidth: 80 }}>
                            <InputLabel id="select-label-city">City</InputLabel>
                            <Select
                              name="shiping-city"
                              labelId="select-label-city"
                              id="select-autowidth"
                              value={city}
                              onChange={handleChangeCity}
                              autoWidth
                              label="City"
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value="Москва">Москва</MenuItem>
                              <MenuItem value="London">London</MenuItem>
                              <MenuItem value="Paris">Paris</MenuItem>
                            </Select>
                            {
                              errors.city && 
                              <FormHelperText error>{snack.city ? snack.city : 'please select city'}</FormHelperText>
                            }
                          </FormControl>
                          {
                            city === "Москва" &&
                            <FormControl sx={{ m: 1, minWidth: 80 }}>
                              <InputLabel id="select-label-store">Store</InputLabel>
                              <Select
                                name="shiping-store"
                                labelId="select-label-store"
                                id="simple-select-store"
                                value={store}
                                onChange={handleChangeStore}
                                autoWidth
                                label="Store"
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value="Електриконс пр. Ленина, 30А, Балашиха">Електриконс пр. Ленина, 30А, Балашиха</MenuItem>
                                <MenuItem value="Електриконс Тверская улица, 12">Електриконс Тверская улица, 12</MenuItem>
                                <MenuItem value="Талалихина ул. 41 строение 4">Талалихина ул. 41 строение 4</MenuItem>
                              </Select>
                              {
                                errors.store && 
                                <FormHelperText error>{snack.store ? snack.store : 'please select store'}</FormHelperText>
                              }
                            </FormControl>
                          }
                          {
                            city === "London" &&
                            <FormControl sx={{ m: 1, minWidth: 80 }}>
                              <InputLabel id="select-label-store">Store</InputLabel>
                              <Select
                                name="shiping-store"
                                labelId="select-label-store"
                                id="simple-select-store"
                                value={store}
                                onChange={handleChangeStore}
                                autoWidth
                                label="Store"
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value="Electricons Staines Rd, Hounslow TW4 5DS">Electricons Staines Rd</MenuItem>
                                <MenuItem value="Electricons Prince Ave, Westcliff-on-Sea, Southend-on-Sea SS0 0JP">Prince Ave, Westcliff-on-Sea</MenuItem>
                                <MenuItem value="Electricons Windsor Rd, Englefield Green, Windsor SL4 2JL">Windsor Rd, Englefield Green</MenuItem>
                              </Select>
                            </FormControl>
                          }
                          {
                            city === "Paris" &&
                            <FormControl sx={{ m: 1, minWidth: 80 }}>
                              <InputLabel id="select-label-store">Store</InputLabel>
                              <Select
                                name="shiping-store"
                                labelId="select-label-store"
                                id="simple-select-store"
                                value={store}
                                onChange={handleChangeStore}
                                autoWidth
                                label="Store"
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value="Electricons 701 Av. du Général Leclerc, 92100 Boulogne-Billancourt">Electricons 701 Av. du Général Leclerc</MenuItem>
                                <MenuItem value="Electricons Rue André Citroën, 78140 Vélizy-Villacoublay">Electricons Rue André Citroën</MenuItem>
                                <MenuItem value="Electricons 6 ALLEE BUISSONNIERE">Electricons 6 ALLEE BUISSONNIERE</MenuItem>
                              </Select>
                            </FormControl>
                          }
                        </Box>
                      }
                  </Grid>
                  <Grid item xs={12}>
                    <Typography align="left">
                    If you would like to add a comment about your order, please write it in the field below.
                    </Typography>
                    <TextareaAutosize
                      name="shiping-comment"
                      maxRows={10}
                      minRows={4}
                      aria-label="empty textarea"
                      style={{ width: '100%', resize: 'vertical' }}
                    />
                  </Grid>
                </Grid>
            {
              emptyShipping &&
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Continue
                </Button>
            }
            </Box>
            {
              !emptyShipping &&
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleEdit}
                >
                  Edit
                </Button>
            }
          </Box>
        </Container>
      </ThemeProvider>
    </CheckoutLayout>
  );
}