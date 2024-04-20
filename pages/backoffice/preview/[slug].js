import React from 'react'
import { styled } from '@mui/material/styles';
import { BackofficeStateContext } from '../../../src/utils/BackofficeState';
import { Box, Button, Grid, IconButton, Paper, Rating, Typography } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { LoadingButton } from '@mui/lab';
import VerticalTabs from '../../../src/components/VerticalTabs';
import Link from 'next/link';
import ReplyIcon from '@mui/icons-material/Reply';
import Wishlist from '@mui/icons-material/FavoriteBorderOutlined';
import CompareIcon from '@mui/icons-material/RepeatOutlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import GppGoodIcon from '@mui/icons-material/GppGood';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import TapAndPlayIcon from '@mui/icons-material/TapAndPlay';
import Cookies from 'js-cookie';
import StoreIcon from '@mui/icons-material/Store';
import ProductTabs from '../../../src/components/ProductTabs';
import CartIcon from '@mui/icons-material/ShoppingCartOutlined';

const LabelButton = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
  textTransform: 'capitalize',
  backgroundColor: theme.palette.default,
  border: 'thin solid lightGrey',
  borderLeft: '3px solid black',
  marginLeft: '10px',
}));

const AddToCartButton = styled(LoadingButton)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  textTransform: 'capitalize',
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.palette.addToCartButtonShape.borderRadius,
  margin: '-1px',
  padding: '.5em 2em',
  '&:hover': {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.secondary.main,
  }
}));

const ActionButtons = styled(IconButton)(({ theme }) => ({
  color: theme.palette.secondary.main,
  backgroundColor: theme.palette.badge.bgd,
  marginRight: 10,
  '&:hover': {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  }
}));

const ShareButtons = styled(IconButton)(({ theme }) => ({
  color: theme.palette.secondary.lightGrey,
  backgroundColor: theme.palette.badge.bgd,
  marginRight: 10,
  '&:hover': {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  }
}));

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className, arrow: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.primary.main,    
  },
}));

const Item = styled(Paper)(({ theme }) => ({
backgroundColor: 'transparent',
...theme.typography.body2,
padding: theme.spacing(1),
textAlign: 'center',
color: theme.palette.text.secondary,
}));

export default function ProductPreview() {
  const { state_office: { product }, state_office, dispatch_office } = React.useContext(BackofficeStateContext);
  const userInf0 = Cookies.get('userInfo') && JSON.parse(Cookies.get('userInfo'));

  if(!product.slug) {
    return (
      <Box sx={{ flexGrow: 1, my: 4  }}>
        <Typography gutterBottom variant="h6" component="h3" sx={{textAlign: 'center', pt: 5}}>
          Product not found
        </Typography>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Item elevation={0}>
              <Link href={`/backoffice/${userInf0?._id}/create`}>
                <Button variant="contained" startIcon={<ReplyIcon />}>
                  back to create new product
                </Button>
              </Link>
            </Item>
          </Grid>
        </Grid>
      </Box>
    )
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid xs={12} md={6}>
          <Item elevation={0}>
            <VerticalTabs productData={state_office?.product} />
          </Item>
        </Grid>
        <Grid xs={12} md={6}>
          <Item elevation={0}>
            <Box sx={{ flexGrow: 0, my: 1, display: 'flex'  }}>
              <Typography gutterBottom variant="h6" component="h1" align="left" color="secondary" sx={{flex: 1}}>
                {state_office?.product?.title}
              </Typography>
              <Box
                component="img"
                sx={{
                  height: 22,
                  display: 'block',
                  maxWidth: 150,
                  overflow: 'hidden',
                  width: 'auto',
                  margin: 'auto'
                }}
                src={state_office?.product?.brand?.brandImg ? state_office?.product?.brand?.brandUrl : '/images/no-image.jpg'}
                alt={state_office?.product?.title}
              />
            </Box>
            <Box sx={{ flexGrow: 1, my: 1, display: 'flex', alignItems: 'center', '& a': {textDecoration: 'none' }, '&:hover a': {textDecoration: 'none' }  }}>
              <Rating align="center" size="small" name="read-only" value={0} readOnly precision={0.5} />
              <Link noLinkStyle href="#reviews">
                <Typography align="center" gutterBottom variant="p" component="span" color="secondary" sx={{marginLeft: 1}}>
                  Reviews {'(0)'}
                </Typography>
              </Link>
            </Box>
          </Item>
          <Item elevation={0}>
            <Typography sx={{fontWeight: 'bolder'}} align="left" component="h3" variant="h4" color="primary">
            {state_office?.product?.currency}{state_office?.product?.price}
              <Typography align="right" component="span" variant="body2" color="secondary.lightGrey" sx={{marginLeft: 1}}>
                <del>{state_office?.product?.currency}{state_office?.product?.oldPrice && state_office?.product?.oldPrice}</del>
              </Typography>
            </Typography>
          </Item>
          <Item elevation={0}>
            <Typography align="left" component="p" variant="p" color="secondary.lightGray">
              {state_office?.product?.shortDescription}
            </Typography>
          </Item>
          <Item elevation={0}>
            <Box sx={{ flexGrow: 1, my: 1, display: 'flex', alignItems: 'center', flexWrap: 'wrap'  }}>
                <Typography gutterBottom variant="p" component="span" align="left" color="secondary" sx={{marginLeft: 1, width: {xs: '100%', sm: 'auto'}}}>
                  Avalability: 
                </Typography>
                <LabelButton sx={{width: { xs: '100%', sm: 'auto'}, my: .5}} startIcon={<TapAndPlayIcon />}>
                  online shopping
                </LabelButton>
                <LabelButton href='#available-store' sx={{width: { xs: '100%', sm: 'auto'}, my: .5}} startIcon={<StoreIcon />}>
                  store shopping
                </LabelButton>
            </Box>  
          </Item>
          {/*
            cartItems.length !== 0 && cartItems.find(item => item._id === product._id) &&
            <Item elevation={0}>
              <Box sx={{ flexGrow: 1, my: 1, display: 'flex', alignItems: 'center'  }}>
                <Typography gutterBottom variant="p" component="span" align="left" color="secondary" sx={{marginLeft: 1}}>
                Quantity :
                </Typography>
                {
                  cartItems.map(item => item._id === product._id && (
                    <CountQuantity maxItem={item.inStock} quantityItem={item.quantity} item={item}/>
                  ))
                }
              </Box>  
            </Item>
              */}
          <Item elevation={0}>
            <Box sx={{ flex: 1, my: 1, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: {xs: 'center', sm: 'normal'} }}>
              <Box sx={{ flex: {xs: '0 0 100%', lg: '0 0 35%'}, my: 1, mb: 2, display: 'flex', alignItems: 'center', '& > a': {textDecoration: 'none', width: {xs:'100%', sm: 'auto'}} }}> 
                <AddToCartButton loadingPosition="start" sx={{width: {xs: '100%', sm: 'auto'}}} variant="contained" startIcon={<CartIcon />}>
                  Add To Cart
                </AddToCartButton>
              </Box>
              <Box sx={{ flex: {xs: '0 0 100%', lg: '0 0 65%'}, my: 1, display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                <Box sx={{display: 'flex', justifyContent: 'left', width: {xs: '100%', sm: 'auto'}, mb: {xs: 2, sm: 0}}}>
                  <LightTooltip arrow title="add to wishlist" placement="top">
                    <ActionButtons color="secondary" aria-label="add-to-wishlist" size="small">
                      <Wishlist fontSize="inherit" />
                    </ActionButtons>
                  </LightTooltip>
                  <Typography gutterBottom variant="p" component="span" align="left" color="secondary.lightGray" sx={{marginRight: 1}}>
                    Add to wishlist
                  </Typography>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'left',width: {xs: '100%', sm: 'auto'}}}>
                  <LightTooltip arrow title="add to comparasion" placement="top">
                    <ActionButtons aria-label="add-to-compare" size="small">
                      <CompareIcon fontSize="inherit" />
                    </ActionButtons>
                  </LightTooltip>
                  <Typography gutterBottom variant="p" component="span" align="left" color="secondary.lightGray" sx={{marginRight: 1}}>
                    Add to comparasion
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Item>
          <Item elevation={0}>
            <Box sx={{ flexGrow: 1, my: 1, display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
              <LabelButton sx={{width: { xs: '100%', sm: 'auto'}, my: .5}} startIcon={<LocalShippingIcon />}>
                Delivery policy
              </LabelButton>
              <LabelButton sx={{width: { xs: '100%', sm: 'auto'}, my: .5}} startIcon={<GppGoodIcon />}>
                Security Policy
              </LabelButton>
              <LabelButton sx={{width: { xs: '100%', sm: 'auto'}, my: .5}} startIcon={<CreditCardIcon />}>
                Security Payment
              </LabelButton>
            </Box>  
          </Item>
        </Grid>
        <Grid id="reviews" item xs={12}>
          <ProductTabs product={product} slug={product?.slug} />
        </Grid>
      </Grid>
    </Box>
  )
}
