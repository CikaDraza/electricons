import * as React from 'react';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import theme from '../theme';
import { Box } from '@mui/material';

export default function Deposits(props) {
  const { total } = props;

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  function convertDate() {
    const date = new Date();
    const formatDate = date.toLocaleDateString("en-US", options);
    return formatDate;
  }

  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <Typography component='span' variant='caption' color={theme.palette.secondary.lightGrey}>in last 5 days</Typography>
      <Typography component="p" variant="h4">
        {'$'}{total && total.toFixed(2)}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {convertDate()}
      </Typography>
      <Box>
        <Link href="#">
          <Typography variant='span' color="primary">
            View balance
          </Typography>
        </Link>
      </Box>
    </React.Fragment>
  );
}