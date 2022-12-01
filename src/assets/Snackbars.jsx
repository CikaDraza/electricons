import React, { useState, useEffect, useContext } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
import theme from '../theme';
import { Store } from '../utils/Store';

export default function Snackbars() {
  const { state, dispatch } = useContext(Store);
  const { snack, snack: {message, severity} } = state;
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'escapeKeyDown') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
    return () => {
      setOpen(false);
    };
  }, [snack]);

  const messageSnack = (
    <Typography variant="p" color={severity === 'success' ? theme.palette.success.main : severity === 'error' ? theme.palette.error.main : severity === 'warning' ? theme.palette.warning.main : severity}>
      {message ? message : 'Welcome to our Store'}
    </Typography>
  )

  const action = (
    <IconButton
    size="small"
    aria-label="close"
    color="inherit"
    onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
  
  return (
    <Stack spacing={2}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Snackbar
          sx={{ flexGrow: 0 }}
          onClose={handleClose}
          open={open}
          action={action}
          message={messageSnack}
        />
      </Snackbar>
    </Stack>
  );
}
