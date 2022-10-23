import React, { useContext, useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Wishlist from '@mui/icons-material/FavoriteBorderOutlined';
import MoreIcon from '@mui/icons-material/MoreVert';
import CompareIcon from '@mui/icons-material/RepeatOutlined';
import { styled, alpha } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Divider, Grid, Link } from '@mui/material';
import NextLink from 'next/link';
import InfoIcon from '@mui/icons-material/Info';
import BusinessIcon from '@mui/icons-material/Business';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import theme from '../theme';
import Logo from '../assets/Logo';
import NavTabs from '../assets/NavTabs';
import MenuIcon from '@mui/icons-material/Menu';
import DropdownMenu from '../assets/DropdownMenu';
import { useRouter } from 'next/router';
import { Store } from '../utils/Store';
import SwipeableCartDrawer from '../assets/SwipeableCartDrawer';

const pagesTop = [{name:'About', link: '/about', icon: <InfoIcon />}, {name:'Store', link: '/store', icon: <BusinessIcon />}, {name:'Blog', link: '/blog', icon: <RssFeedIcon />}];
const settings = ['Profile', 'Logout'];
const pages = [{name:'Home', link: '/'}, {name:'Sale', link: '/on-sale'}, {name:'Mobile', link: '/mobile'}, {name:'Brands', link: '/brands'}, {name:'Terms and Services', link: '/terms'}, {name:'policies privacy', link: '/privacy'} ];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  flexWrap: 'nowrap',
  display: 'flex',
  borderRadius: theme.palette.shape.borderRadius,
  border: `thin solid ${theme.palette.secondary.borderColor}`,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    marginLeft: theme.spacing(3),
    width: '20ch',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '20ch',
    },
  },
}));

const StyledInputButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  textTransform: 'capitalize',
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.palette.inputButtonShape.borderRadius,
  margin: '-1px',
  padding: '.5em 2em',
  '&:hover': {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.secondary.main,
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 50,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

export default function Header(props) {
  const [isVisible, setIsVisible] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [cartAnchorEl, setCartAnchorEl] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElDropdown, setAnchorElDropdown] = React.useState(null);
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const handleClick = (event) => {
    setAnchorElDropdown(event.currentTarget);
  };
  const handleCloseDropdown = () => {
    setAnchorElDropdown(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const openDropdown = Boolean(anchorElDropdown);
  const isMenuOpen = Boolean(anchorEl);

  const handleCartOpen = (event) => {
    setCartAnchorEl(event.currentTarget);
  };

  const handleCartClose = () => {
    setCartAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleCloseUserMenu}
    >
      <MenuItem>Profile</MenuItem>
      <MenuItem>My account</MenuItem>
    </Menu>
  );
  
  function toggleVisibility() {
    const visibleBtn = window.scrollY;
    visibleBtn > 50 ? setIsVisible(prev => prev = true) : setIsVisible(prev => prev = false);
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
        <AppBar sx={{ transform: isVisible ? 'translateY(-147px)' : 'translateY(0px)', transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms' }} elevation={isVisible ? 4 : 0} color="default">
          <Container>
          <CssBaseline />
            <Toolbar sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, flexWrap: 'wrap', justifyContent: 'center', '& > :not(style) + :not(style)': { ml: 2 } }}>
                {pagesTop.map((page) => (
                  <Box key={page.name} sx={{display: 'flex', 'hr': { marginLeft: 2}, '&:last-child hr': {display: 'none'}}}>
                  {page.icon}
                    <NextLink href={page.link} passHref>
                      <Link
                        href={page.link}
                        underline="hover"
                        sx={{ my: 2, color: theme.palette.secondary.main, display: 'block', m: 0 }}
                      >
                      {page.name}
                      </Link>
                    </NextLink>
                    <Divider variant="middle" orientation="vertical" flexItem />
                  </Box>
                ))}
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ width: 30, height: 30 }} alt="Milan" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography align="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
            <Toolbar disableGutters sx={{ justifyContent: 'space-between', alignItems: 'end', py: 1, }}>
              <Grid container>
                <Grid item xs={9} md={4}>
                  <Logo sx={{width: 290, height: 60}} viewBox="0 0 306 76"/>
                </Grid>
                <Grid item xs={12} md={8} sx={{ display: { xs: 'none', md: 'flex', justifyContent: 'flex-end', alignItems: 'end' } }}>
                  <NavTabs pages={pages} />
                </Grid>
                <Grid item xs={3} md={9} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'end' }}>
                  <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Milan" src="/static/images/avatar/2.jpg" />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting, index) => (
                        <MenuItem key={setting + index} onClick={handleCloseUserMenu}>
                          <Typography align="center">
                          {setting}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>     
                </Grid>
              </Grid>    
            </Toolbar>
            <Toolbar>
              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', width: '100%', postion: 'relative' }}>
                <Tooltip title="Dropdown menu">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Tooltip>
                <DropdownMenu
                openDropdown={openDropdown}
                anchorElDropdown={anchorElDropdown}
                handleCloseDropdown={handleCloseDropdown}
                isVisible={isVisible}
                />
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                  <StyledInputButton>Search</StyledInputButton>
                </Search>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  <IconButton size="large" aria-label="show 4 new mails" sx={{ backgroundColor: theme.palette.badge.bgd }} color="inherit">
                    <Badge sx={{ 'span': {top:'-20%', right:'-50%'} }} badgeContent={4} color="secondary">
                      <CompareIcon color="badge" />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                    sx={{ backgroundColor: theme.palette.badge.bgd, ml: 2 }}
                  >
                    <Badge sx={{ 'span': {top:'-20%', right:'-50%'} }} badgeContent={7} color="secondary">
                      <Wishlist color="secondary"/>
                    </Badge>
                  </IconButton>
                  <SwipeableCartDrawer cart={cart}/>
                </Box>
              </Box>
            </Toolbar>
          </Container> 
        </AppBar>
        {renderMenu}
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  )
}
