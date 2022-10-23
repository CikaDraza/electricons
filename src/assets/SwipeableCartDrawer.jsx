import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';
import { Badge, Grid, IconButton, Typography } from '@mui/material';
import theme from '../theme';
import CartIcon from '@mui/icons-material/ShoppingCartOutlined';
import { RecentActorsTwoTone } from '@mui/icons-material';
import Link from '../Link';

export default function SwipeableCartDrawer({cart}) {
  const [state, setState] = React.useState({
    right: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <React.Fragment>
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300, flexGrow: 1 }}
        role="presentation"
      >
        <Box sx={{display: 'flex', alignItems: 'center', p: 1}}>
          <IconButton onClick={toggleDrawer(anchor, false)}>
            <CloseIcon />
          </IconButton>
          <Typography gutterBottom variant="h6" component="h6" color="secondary" sx={{flex: 1, alignItems: 'center', mb: 0, textAlign: 'center'}}>
            Shoping Cart
          </Typography>
          <Typography gutterBottom variant="h6" component="h6" color="secondary.lightGrey" sx={{textAlign: 'center', mb: 0, px: 1}}>
            {cart.cartItems.length}
          </Typography>
        </Box>
        <Divider />
      {
        cart.cartItems.length === 0 ?
        <Box sx={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', height: '90%'}}>
          <Box sx={{width: '100%'}}>
            <Box
              component="img"
              sx={{
                height: 'auto',
                display: 'block',
                maxWidth: 400,
                overflow: 'hidden',
                width: 'auto',
                margin: 'auto'
              }}
              src="/images/empty_cart.png"
              alt="cart is empty"
            />
            <Typography gutterBottom variant="h6" component="h6" color="secondary.lightGrey" sx={{textAlign: 'center', mb: 0, px: 1}}>
              Cart is Empty <RecentActorsTwoTone />
            </Typography>
          </Box>
        </Box>
        : 
        <List>
          {cart.cartItems.map((item, index) => (
            <React.Fragment key={item._id}>
              <ListItem disablePadding >
                <Grid container space={2}>
                  <Grid item xs={3}>
                    <Box
                      component="img"
                      sx={{
                        height: 50,
                        display: 'block',
                        maxWidth: 400,
                        overflow: 'hidden',
                        width: 'auto',
                        margin: 'auto'
                      }}
                      src={item.images[0].image}
                      alt={item.title}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom variant="p" component="h5" align="left" color="secondary" sx={{flex: 1}}>
                      {item.title}
                    </Typography>
                    <Typography gutterBottom variant="caption" component="p" align="left" color="secondary" sx={{flex: 1}}>
                      QTY: {item.quantity}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h6" align="left" color="primary" sx={{flex: 1}}>
                      {item.price}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <IconButton sx={{display: 'flex', justifyContent: 'flex-end'}}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      }
      </Box>
      {
        cart.cartItems.length !== 0 &&
        <React.Fragment>
          <Box>
            <List sx={{ flexGrow: 0 }}>
              <Box sx={{ p: 2 }}>
              {['Sub Total', 'Shipping', 'Total'].map((text, index) => (
                <React.Fragment key={text}>
                <ListItem disablePadding>
                    <ListItemText sx={{textAlign: 'left'}} primary={text} />
                    <ListItemText sx={{textAlign: 'right'}} primary="N/A" />
                </ListItem>
                <Divider />
                </React.Fragment>
              ))}
              </Box>
            </List>
          </Box>
          <Box sx={{display: 'flex'}}>
            <Link sx={{ p: 2, backgroundColor: 'primary.main', color: 'primary.contrastText', flex: 1, textAlign: 'center' }} href="/cart" onClick={toggleDrawer(anchor, false)}>
              <Typography component="span">View Cart</Typography>
            </Link>
            <Link sx={{ p: 2, backgroundColor: 'secondary.main', color: 'primary.contrastText', flex: 1, textAlign: 'center' }} href="/checkout" onClick={toggleDrawer(anchor, false)}>
              <Typography component="span">Checkout</Typography>
            </Link>
          </Box>
        </React.Fragment>
      }
    </React.Fragment>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={toggleDrawer(anchor, true)}
            color="inherit"
            sx={{ backgroundColor: theme.palette.badge.bgd, ml: 2 }}
          >
            <Badge sx={{ 'span': {top:'-20%', right:'-50%'} }} badgeContent={cart.cartItems.length > 0 ? cart.cartItems.length : "0"} color="secondary">
              <CartIcon color="secondary"/>
            </Badge>
          </IconButton>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
