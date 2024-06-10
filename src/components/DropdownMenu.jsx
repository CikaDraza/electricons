import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import data from '../utils/data';
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import theme from '../theme';
import ExpandMore from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import Image from 'next/image';

export default function DropdownMenu(props) {
  const { openDropdown, anchorElDropdown, handleCloseDropdown, isVisible } = props;
  const { products } = data;
  const [expanded, setExpanded] = React.useState(false);
  const [allCategories, setAllCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  React.useEffect(() => {
    async function fetchCategories() {
      const { data } = await axios.get('/api/category');
      setAllCategories(data);
      setLoading(false);
    }
    
    fetchCategories();
  }, [loading, openDropdown])

  const defaultTop = '50px!important';

  return (
    <Menu
        anchorEl={anchorElDropdown}
        id="account-menu"
        open={openDropdown}
        onClose={handleCloseDropdown}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            minWidth: 300,
            top: isVisible && defaultTop,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              left: 12,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <MenuItem sx={{'&:hover': {bgcolor: 'background.paper'}}}>
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="ul"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader sx={{backgroundColor: 'transparent!important'}} component="div" id="nested-list-subheader">
                Categories
              </ListSubheader>
            }
          >
          {
            allCategories?.map((item, index) => (
              item?.subCategory?.some(sub => sub.url !== "none") ? (
                  <Accordion
                    elevation={0}
                    TransitionProps={{ unmountOnExit: true }}
                    key={item.categoryName + index}
                    component="li"
                    expanded={expanded === item.categoryName}
                    onChange={handleChange(item.categoryName)}
                    sx={{position: 'relative'}}
                    >
                      {
                        <AccordionSummary
                          expandIcon={<ExpandMore color={expanded === item.categoryName ? "primary" : 'secondary'} />}
                          aria-controls={`${item.categoryName} controls`}
                          id={`${item.categoryName} panel`}
                          sx={{ '& a': {textDecoration: 'none', width: "100%" }, '&:hover a': {textDecoration: 'none' } }}

                        >
                        <Link href={`/category/${item.slug}`}>
                          <Box sx={{display: 'flex'}}>
                            <Avatar variant="square" component="span" sx={{ bgcolor: theme.palette.primary.white, position: 'relative', width: 24, height: 24, '& img': {objectFit: 'contain'} }} onClick={handleCloseDropdown}>
                              <Image
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority
                                src={item?.avatar !== '' ? item?.avatar : '/images/no-image.jpg'}
                                alt={item?.categoryName}
                                quality={100}
                              />
                            </Avatar>
                            <Typography onClick={handleCloseDropdown} color="secondary" sx={{ width: '100%', flexShrink: 0, display: 'flex', alignItems: 'center', '&:hover': {color: theme.palette.primary.main} }}>
                              {item.categoryName}
                            </Typography>
                          </Box>
                        </Link>
                        </AccordionSummary>
                      }
                      {
                        item.categoryPublished === true ?
                        <AccordionDetails onClick={handleCloseDropdown} sx={{position: 'fixed', left: '100%', top: 0, backgroundColor: theme.palette.primary.contrastText, width: '500px', height: 'auto', py: 5, px: 3, marginLeft: '8px'}}>
                          <Grid container spacing={2}>
                        {
                          item.subCategory.map((sub, index) => (
                              <Grid sx={{ '& a': {textDecoration: 'none' }, '&:hover a': {textDecoration: 'none' } }} key={index} item xs={4}>
                                <Link href={`/category/${item.slug}/${sub.url}`} passHref>
                                  <Typography sx={{pb: 2, '&:hover': {color: theme.palette.primary.main}}} color="secondary" component="h5" variant="p">
                                  {sub.subCategoryName}
                                  </Typography>
                                </Link>
                                {
                                  products.map((prod, i) => (
                                    prod.subCategoryUrl === sub.url &&
                                    <Link key={prod.slug + i} href={`/product/${prod.slug}`} underline="hover" sx={{display: 'flex', pb: 1}}>
                                      <Typography sx={{'&:hover': {color: theme.palette.primary.main}}} color="secondary.lightGrey" component="h6" variant="p">
                                      {prod.title}
                                      </Typography>
                                    </Link>
                                  ))
                                }
                              </Grid>
                          ))
                        }
                          </Grid>
                        </AccordionDetails>
                        : 
                        <AccordionDetails sx={{position: 'fixed', left: '100%', top: 0, backgroundColor: theme.palette.primary.contrastText, width: '500px', height: 'auto', py: 5, px: 3, marginLeft: '8px', display: 'none'}}></AccordionDetails>
                      }
                  </Accordion>
              ) : (
                <Accordion
                  elevation={0}
                  TransitionProps={{ unmountOnExit: true }}
                  key={index}
                  onClick={handleCloseDropdown}
                  >
                  <AccordionSummary
                    aria-controls={`${item.categoryName} controls`}
                    id={`${item.categoryName} panel`}
                  >
                    <Link href={`/product/${item.slug}`} underline="hover" sx={{display: 'flex', '& img': {objectFit: 'contain'}}}>
                    <Box sx={{display: 'flex'}}>
                      <Avatar variant="square" alt={item.categoryName} src={item.avatar} />
                      <Typography color={'primary'} sx={{ width: '33%', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                        {item.categoryName}
                      </Typography>
                    </Box>
                    </Link>
                  </AccordionSummary> 
                </Accordion>
              )
            ))
          }
          </List>
        </MenuItem>
      </Menu>
  );
}