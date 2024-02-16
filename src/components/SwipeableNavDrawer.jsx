import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import data from '../utils/data';
import Link from 'next/link';
import theme from '../theme';
import Image from 'next/image';
import axios from 'axios';

function ListsItem(props) {
  const { cat, onClose } = props;
  const [open, setOpen] = React.useState(false);
  const [openSub, setOpenSub] = React.useState('');

  function collapseHeandler(e, i) {
    if(e.currentTarget.tabIndex === i) {
      setOpenSub(`open ${i}`);
    }
  }
console.log(cat.subCategory.some(sub => sub.url === 'none'));
  return (
      <React.Fragment>
        <ListItem key={cat.categoryName} disablePadding>
          {
            cat.subCategory.some(sub => sub.url !== 'none') ?
            <ListItemButton sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', '& a': {textDecoration: 'none', display: 'flex', width: '100%'} }} onClick={() => setOpen(!open)}>
              <Link onClick={onClose} href={`/category/${cat.slug}`}>
                <Avatar variant="square" sx={{ bgcolor: 'transparent', position: 'relative', mr: 1, width: 24, height: 24, '& img': {objectFit: 'contain'} }}>
                  <Image
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    src={cat?.avatar !== '' ? cat?.avatar : '/images/no-image.jpg'}
                    alt={cat?.categoryName}
                    quality={100}
                  />
                </Avatar>
                <ListItemText sx={{color: theme.palette.secondary.main}} primary={cat.categoryName} />
              </Link>
              {open ? 
                <ExpandLess />
              :
                <ExpandMore />
              }
            </ListItemButton>
            :
            <ListItemButton sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', '& a': {textDecoration: 'none', display: 'flex', width: '100%'} }} onClick={() => setOpen(!open)}>
              <Link onClick={onClose} href={`/category/${cat.slug}`}>
                <Avatar variant="square" sx={{ bgcolor: 'transparent', position: 'relative', mr: 1, width: 24, height: 24, '& img': {objectFit: 'contain'} }}>
                  <Image
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    src={cat?.avatar !== '' ? cat?.avatar : '/images/no-image.jpg'}
                    alt={cat?.categoryName}
                    quality={100}
                  />
                </Avatar>
                <ListItemText sx={{color: theme.palette.primary.main}} primary={cat.categoryName} />
              </Link>
            </ListItemButton>
          }
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List sx={{'& a': {textDecoration: 'none'}}} component="ul" disablePadding>
          {
            cat.subCategory.map((sub, i) => (
            <React.Fragment key={sub.url}>
              <ListItem disablePadding>
                <ListItemButton tabIndex={i} onClick={(e) => collapseHeandler(e, i)} sx={{ pl: 4, justifyContent: 'space-between' }}>
                  <Link href={`/category/${cat.slug}/${sub.url}`} sx={{display: 'flex', '&:hover': {color: theme.palette.primary.main} }} color="secondary">
                    <ListItemText  sx={{'& span': {fontSize: '14px', ml: 2} }} onClick={onClose} primary={sub.subCategoryName} />
                  </Link>
                  {openSub === `open ${i}` ? 
                    <ExpandLess />
                  :
                    <ExpandMore />
                  }
                </ListItemButton>
              </ListItem>
              <Collapse in={openSub === `open ${i}`} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {
                    data.products.map(prod => (
                      sub.url === prod.subCategoryUrl &&
                      <Link onClick={onClose} underline="none" key={prod.slug} href={`/product/${prod.slug}`} sx={{display: 'flex', pb: 1, '&:hover': {color: theme.palette.primary.main} }} color="secondary.lightGrey">
                        <ListItemButton sx={{ pl: 4 }}>                   
                          <ListItemText sx={{'& span': {fontSize: '13px', ml: 2, fontWeight: 'bold'} }} primary={prod.title} />
                        </ListItemButton>
                      </Link>
                    ))
                  }
                </List>
              </Collapse>
            </React.Fragment>
            ))
          }
          </List>
        </Collapse>
      </React.Fragment>
  )
}
export default function SwipeableNavDrawer({ pagesTop }) {
  const [state, setState] = React.useState({
    left: false
  });
  const [allCategories, setAllCategories] = React.useState([]);

  React.useEffect(() => {
    async function fetchCategories() {
      const { data } = await axios.get('/api/category');
      setAllCategories(data);
    }
    fetchCategories();
  }, [])

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

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            onClick={toggleDrawer(anchor, true)}
            size="small"
            sx={{ ml: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <Box
              sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, display: 'flex', flexDirection: 'column', height: '100%' }}
              role="presentation"
              onKeyDown={toggleDrawer(anchor, false)}
            >
              <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <IconButton onClick={toggleDrawer(anchor, false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Divider />
              <List 
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', flexGrow: 0, flexShrink: 0 }}
              component="ul"
              aria-labelledby="nested-list-sub-nav"
              >
               {allCategories.map((cat, index) => (
                <ListsItem key={cat.categoryName} cat={cat} onClose={toggleDrawer(anchor, false)}/>
               ))}
              </List>
              <Box sx={{ display: 'flex', alignItems: 'stretch', minHeight: '1px', flexGrow: 1 }}></Box>
              <List 
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', flexGrow: 0, flexShrink: 0, transform: 'scale(.8)' }}
              component="ul"
              aria-labelledby="nested-list-sub-nav"
              >
                <Grid container>
                  {
                    pagesTop.map((page) => (
                      <Grid key={page.link} item xs={4}>
                        <ListItem sx={{ '& a': {textDecoration: 'none'} }}>
                        {page.icon}
                          <Link
                            href={page.link}
                            sx={{ my: 2, color: theme.palette.secondary.main, display: 'block', m: 0 }}
                            passHref
                          >
                          {page.name}
                          </Link>
                        </ListItem>
                      </Grid>
                    ))
                  }
                </Grid>
              </List>
            </Box>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}