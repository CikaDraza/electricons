import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import theme from '../theme';
import { ThemeProvider } from '@mui/material/styles';
import { FormControl, FormControlLabel } from '@mui/material';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { styled } from '@mui/material/styles';

const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
  ({ theme, checked }) => ({
    '.MuiFormControlLabel-label': checked && {
      color: theme.palette.primary.main,
    },
  }),
);

function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return (
    <StyledFormControlLabel checked={checked} {...props} />
  )
}

export default function AddressCard(props) {
  const { addresses, index, name, handleEdit, handleDelete } = props;

  return (
    <Box sx={{ minWidth: '100%' }}>
      <Card variant="outlined">
        <ThemeProvider theme={theme}>
          {
            index !== '' &&
            <CardActions>
                <MyFormControlLabel value={index} control={<Radio />}/>
            </CardActions>
          }
          <CardContent>
            <Typography color="secondary" sx={{ mb: 2, textAlign: 'center' }} variant="h6" component="h2">
              {addresses.address} <br /><Typography variant="body2" component="span">{addresses.city}</Typography>
            </Typography>
            <Typography align="left" color="secondary.lightGrey">
              {name}
            </Typography>
            <Typography align="left" color="secondary.lightGrey">
              {addresses.address}
            </Typography>
            <Typography align="left" sx={{ mb: 0.5 }} color="secondary.lightGrey">
              {addresses?.postalcode} {' '} {addresses?.city}
            </Typography>
            <Typography align="left" sx={{ mb: 0.5 }} color="secondary.lightGrey">
              {addresses?.country}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              size="small"
              fullWidth
              color="secondary"
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleDelete}
              startIcon={<DeleteIcon />}
            >
              delete
            </Button>
          </CardActions>
        </ThemeProvider>
      </Card>
    </Box>
  );
}