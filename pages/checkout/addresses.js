import React, { useContext, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import theme from '../../src/theme';
import { Store } from '../../src/utils/Store';
import CheckoutLayout from '../../src/components/CheckoutLayout';
import CheckoutStepper from '../../src/components/CheckoutStepper';
import AddressCard from '../../src/assets/AddressCard';
import RadioGroup from '@mui/material/RadioGroup';
import AddIcon from '@mui/icons-material/Add';

export default function Addresses() {
  const router = useRouter();
  const [addNewAddress, setAddNewAddress] = useState(false);
  const { state, dispatch } = useContext(Store);
  const { userInfo, cart: { personalInfo, addresses, cartItems} } = state;
  const [errors, setErrors] = useState({
    address: false,
    city: false,
    country: false,
    postalcode: false,
    phone: false
  });
  const pattern = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
  const [checked, setChecked] = useState(false);
  const [forInvoice, setForInvoice] = useState(Number(Cookies.get('forInvoice')) && Cookies.get('forInvoice') !== NaN ? Number(Cookies.get('forInvoice')) : 0);

  const handleNext = () => {
    router.push('/checkout/shipping');
  };

  const handleChange = (event) => {
    setChecked(() => event.target.checked);
    if(!checked) {
      setForInvoice(() => Number(event.target.value));
      Cookies.set('forInvoice', Number(event.target.value));
    }else {
      setForInvoice(() => 0);
      Cookies.set('forInvoice', 0);
    }
  };

  const handleChangeInvoice = (event) => {
    setForInvoice(() => Number(event.target.value))
    Cookies.set('forInvoice', Number(event.target.value) - 1);
  };

  const emptyPersonalInfo = personalInfo && Object.keys(personalInfo).length === 0;
  const emptyAddresses = addresses && Object.keys(addresses).length === 0;
  const emptyUserInfo = userInfo && userInfo === null && Object.keys(userInfo).length === 0;
  const emptyCartItems = Object.keys(cartItems).length === 0;

  const handleSubmit = async (event) => {
    event.preventDefault();
      const formOutput = new FormData(event.currentTarget);
      const formData = {
        address: formOutput.get('address'),
        city: formOutput.get('city'),
        country: formOutput.get('country'),
        postalcode: formOutput.get('postalcode'),
        phone: formOutput.get('phone')
      };
      if(emptyCartItems) {
        dispatch({ type: 'SNACK_MESSAGE', payload: { ...state.snack, message: 'sorry, first you must select product', severity: 'warning'}});
        router.push('/');
        return;
      }
      if(formOutput.get('address') === '') {
        setErrors({ ...errors, address: true });
        dispatch({ type: 'SNACK_MESSAGE', payload: { ...state.snack, message: 'please fill address', severity: 'warning'}});
        return;
      }
      if(formOutput.get('city') === '') {
        setErrors({ ...errors, city: true });
        dispatch({ type: 'SNACK_MESSAGE', payload: { ...state.snack, message: 'city is required field', severity: 'warning'}});
        return;
      }
      if(!pattern.test(formData.phone)) {
        setErrors({ ...errors, phone: true });
        dispatch({ type: 'SNACK_MESSAGE', payload: { ...state.snack, message: 'the phone is not valid', severity: 'error'}});
        return;
      }
      if(formData.phone === '') {
        setErrors({ ...errors, phone: true });
        dispatch({ type: 'SNACK_MESSAGE', payload: { ...state.snack, message: 'the phone is required', severity: 'warning'}});
        return;
      }
      if(formOutput.get('country') === '') {
        setErrors({ ...errors, country: true });
        dispatch({ type: 'SNACK_MESSAGE', payload: { ...state.snack, message: 'the country is required', severity: 'warning'}});
        return;
      }
      if(formOutput.get('postalcode') === '') {
        setErrors({ ...errors, postalcode: true });
        dispatch({ type: 'SNACK_MESSAGE', payload: { ...state.snack, message: 'the postal code is required', severity: 'warning'}});
        return;
      }
      dispatch({ type: 'ADDRESSES', payload: { ...addresses, ...formData } });
      dispatch({ type: 'SNACK_MESSAGE', payload: { ...state.snack, message: 'successfully added address', severity: 'success' } });
      router.push('/checkout/shipping');
      setAddNewAddress(false);
      setErrors({ 
        ...errors, 
        address: false,
        city: false,
        country: false,
        postalcode: false,
        phone: false
      });
  };

  const handleEdit = (item) => {
    Cookies.set('forInvoice', JSON.stringify(addresses.length - 1));
    dispatch({ type: 'ADDRESSES_REMOVE', payload: item});
    dispatch({ type: 'SNACK_MESSAGE', payload: { ...state.snack, message: 'now you can edit address', severity: 'warning'}});
    setAddNewAddress(true);
  };
  const handleDelete = (item) => {
    Cookies.set('forInvoice', JSON.stringify(addresses.length - 1));
    dispatch({ type: 'ADDRESSES_REMOVE', payload: item});
    dispatch({ type: 'SNACK_MESSAGE', payload: { ...state.snack,message: 'address successfully removed', severity: 'warning'}});
    if(emptyAddresses) {
      setAddNewAddress(true);
    }
  };

  return (
    <CheckoutLayout>
      <CheckoutStepper activeStep={1} />
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
              {
                !emptyAddresses &&
                <RadioGroup name="radio-address-picker" value={!emptyAddresses ? Number(forInvoice) : 0} sx={{width: "100%"}} onChange={handleChangeInvoice}>
                  <Grid container space={2}>
                  {
                    !emptyAddresses ? addresses.map((address, index) => (
                      <Grid sx={{p: 2}} key={index} item xs={12} sm={6} md={4}>
                        <AddressCard index={index} addresses={address} personalInfo={personalInfo} name={userInfo && userInfo.name} handleEdit={() => handleEdit(address)} handleDelete={() => handleDelete(address)} />  
                      </Grid>
                    ))
                    : null
                  }
                  </Grid>
                </RadioGroup>
              }
              {
                !emptyAddresses &&
                <Grid container space={2}>
                  <Grid sx={{p: 2, textAlign: 'left'}} item xs={12} sm={6}>
                    <Button onClick={() => setAddNewAddress(true)} size="small" startIcon={<AddIcon />}>
                      Add new address
                    </Button>
                  </Grid>
                </Grid>
              }
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
              {
                !addNewAddress && addresses.length === 0 &&
                <Box>
                {
                  !emptyPersonalInfo && !emptyUserInfo &&
                  <React.Fragment>
                    <TextField
                      margin="normal"
                      defaultValue={userInfo && userInfo.name ? userInfo.name : personalInfo.name}
                      disabled
                      fullWidth
                      required
                      id="name"
                      label="Name"
                      name="name"
                    />
                    <TextField
                      margin="normal"
                      defaultValue={userInfo && userInfo.email ? userInfo.email : personalInfo.email}
                      disabled
                      fullWidth
                      required
                      id="email"
                      label="Email"
                      name="email"
                      error={errors.email}
                    />
                  </React.Fragment>
                }
                  <TextField
                    margin="normal"
                    defaultValue={personalInfo ? personalInfo.country ? personalInfo.country : addresses.country : ''}
                    disabled={!emptyAddresses && addresses.country && true}
                    fullWidth
                    required
                    id="country"
                    label="Country"
                    name="country"
                    error={errors.country}
                  />
                  <TextField
                    margin="normal"
                    defaultValue={personalInfo ? personalInfo.city ? personalInfo.city : addresses.city : ''}
                    disabled={!emptyAddresses && addresses.city && true}
                    fullWidth
                    required
                    id="city"
                    label="city"
                    name="city"
                    autoComplete="address-level2"
                    error={errors.city}
                  />
                  <TextField
                    margin="normal"
                    type="number"
                    defaultValue={personalInfo ? personalInfo.postalcode ? personalInfo.postalcode : addresses.postalcode : ''}
                    disabled={!emptyAddresses && personalInfo.postalcode && true}
                    fullWidth
                    required
                    id="postalcode"
                    label="Zip/Postal Code"
                    name="postalcode"
                    autoComplete="postalcode"
                    error={errors.postalcode}
                  />        
                  <TextField
                    margin="normal"
                    defaultValue={personalInfo ? personalInfo.address ? personalInfo.address : personalInfo.address : ''}
                    disabled={!emptyAddresses && userInfo.address && true}
                    fullWidth
                    required
                    id="address"
                    label="Address"
                    name="address"
                    autoComplete="address"
                    error={errors.address}
                  />
                  <TextField
                    margin="normal"
                    type="number"
                    defaultValue={personalInfo ? personalInfo.phone ? personalInfo.phone : addresses.phone : ''}
                    disabled={personalInfo && personalInfo.phone && true}
                    fullWidth
                    required
                    id="phone"
                    label="Phone"
                    name="phone"
                    autoComplete="phone"
                    error={errors.phone}
                  />
                  <FormControlLabel
                    sx={{width: '100%'}}
                    control={
                      <Checkbox
                        value={!emptyAddresses ? addresses.length : forInvoice}
                        defaultChecked
                        checked={checked}
                        color="primary"
                        name="invoice"
                        id="invoice"
                        onChange={handleChange}
                     />
                    }
                    label="Use this address for invoice too"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, '&:hover': { backgroundColor: theme.palette.secondary.main, textDecoration: 'none' } }}
                  >
                    Continue
                  </Button>
                </Box>
              }
              {
                addNewAddress &&
                <Box>
                  <TextField
                    margin="normal"
                    fullWidth
                    required
                    id="country"
                    label="Country"
                    name="country"
                    error={errors.country}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    required
                    id="city"
                    label="city"
                    name="city"
                    autoComplete="address-level2"
                    error={errors.city}
                  />
                  <TextField
                    margin="normal"
                    type="number"
                    fullWidth
                    required
                    id="postalcode"
                    label="Zip/Postal Code"
                    name="postalcode"
                    autoComplete="postalcode"
                    error={errors.postalcode}
                  />        
                  <TextField
                    margin="normal"
                    fullWidth
                    required
                    id="address"
                    label="Address"
                    name="address"
                    autoComplete="address"
                    error={errors.address}
                  />
                  <TextField
                    margin="normal"
                    type="number"
                    fullWidth
                    required
                    id="phone"
                    label="Phone"
                    name="phone"
                    autoComplete="phone"
                    error={errors.phone}
                  />
                  {
                    !emptyAddresses && addresses.length > 0 &&
                    <FormControlLabel
                      sx={{width: '100%'}}
                      control={
                        <Checkbox
                          value={!emptyAddresses ? addresses.length : addresses[addresses.length - 1]}
                          defaultChecked
                          checked={checked}
                          color="primary"
                          name="invoice"
                          id="invoice"
                          onChange={handleChange}
                      />
                      }
                      label="Use this address for invoice too"
                    />
                  }
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, '&:hover': { backgroundColor: theme.palette.secondary.main } }}
                  >
                    Continue
                  </Button>
                </Box>
              }
              {
                !emptyAddresses && !addNewAddress &&
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, '&:hover': { backgroundColor: theme.palette.secondary.main } }}
                  onClick={handleNext}
                >
                  Continue Next
                </Button>
              }
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
    </CheckoutLayout>
  );
}