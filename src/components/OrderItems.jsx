import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Link from '../Link';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import theme from '../theme';

const headCells = [
  {
    id: 'image',
    label: 'Product',
  },
  {
    id: 'title',
    label: 'Name',
  },
  {
    id: 'price',
    label: 'Price',
  },
  {
    id: 'quantity',
    label: 'Quantity',
  },
  {
    id: 'subtotal',
    label: 'Subtotal',
  },
];

const MyTableContainer = styled(TableContainer)({
  overflowY: "auto",
  margin: 0,
  padding: 0,
  listStyle: "none",
  height: "100%",
  '&::-webkit-scrollbar': {
    width: '3px',
    height: '3px'
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.secondary.borderColor
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.primary.main,
    borderRadius: '3px'
  }
});

const MyTablePagination = styled(TablePagination)({
  overflowY: "auto",
  margin: 0,
  padding: 0,
  listStyle: "none",
  height: "100%",
  '&::-webkit-scrollbar': {
    width: '3px',
    height: '3px'
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.secondary.borderColor
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.primary.main,
    borderRadius: '3px'
  }
});

export default function OrderItems({order_items}) {
  const { state } = useContext(Store);
  const { cart: {cartItems, personalInfo, addresses, shipping, payment} } = state;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const subTotal = order_items ? order_items.reduce((a, c) => a + c.quantity * (Number(c.price.replace(/[^0-9.-]+/g,""))), 0) : cartItems.reduce((a, c) => a + c.quantity * (Number(c.price.replace(/[^0-9.-]+/g,""))), 0);

  const total = subTotal;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={0} sx={{ width: '100%', mb: 2 }}>
        <MyTableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size='medium'
          >
          <TableHead>
              <TableRow>
              {
                headCells.map(cell => (
                  <TableCell align={cell.id === 'image' ? 'left' : 'right'} key={cell.id}>{cell.label}</TableCell>
                ))
              }
              </TableRow>
            </TableHead>
            {
              order_items ?
              <TableBody>
              {order_items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const subtotal = Number(row.price.replace(/[^0-9.-]+/g,"")) * row.quantity;

                  return (
                    <TableRow
                      hover
                      key={row._id}
                    >
                      <TableCell align="left" sx={{maxWidth: 100}}>
                        <Box
                          component="img"
                          sx={{
                            height: 70,
                            display: 'block',
                            maxWidth: 100,
                            overflow: 'hidden',
                            width: 'auto',
                            margin: 'auto'
                          }}
                          src={row.images[0].image}
                          alt={row.title}
                        />
                      </TableCell>
                      {
                          order_items ?
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            align="right"
                          >
                            {row.title}
                          </TableCell>
                          :
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            align="right"
                          >
                            <Link href={`/product/${row.slug}`}>
                              {row.title}
                            </Link>
                          </TableCell>
                      }
                      <TableCell color='primary' align="right">
                        {row.price}
                      </TableCell>
                      <TableCell align="right">
                        {row.quantity}
                      </TableCell>
                      <TableCell align="right">
                        ${subtotal}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            
            :
            <TableBody>
              {cartItems && cartItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const subtotal = Number(row.price.replace(/[^0-9.-]+/g,"")) * row.quantity;

                  return (
                    <TableRow
                      hover
                      key={row._id}
                    >
                      <TableCell align="left" sx={{maxWidth: 100}}>
                        <Box
                          component="img"
                          sx={{
                            height: 70,
                            display: 'block',
                            maxWidth: 100,
                            overflow: 'hidden',
                            width: 'auto',
                            margin: 'auto'
                          }}
                          src={row.images[0].image}
                          alt={row.title}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="right"
                      >
                        <Link href={`/product/${row.slug}`}>
                          {row.title}
                        </Link>
                      </TableCell>
                      <TableCell color='primary' align="right">
                        {row.price}
                      </TableCell>
                      <TableCell align="right">
                        {row.quantity}
                      </TableCell>
                      <TableCell align="right">
                        ${subtotal}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            }
            <TableBody>
              <TableRow>
                <TableCell colSpan={6}>
                  <Typography component="p" variant="h6" align="right" sx={{ fontSize: 14 }} color="secondary" gutterBottom>
                    Total: ${total}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </MyTableContainer>
        
        <MyTablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={order_items ? order_items.length : cartItems && cartItems.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
