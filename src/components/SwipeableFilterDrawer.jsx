import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import { AppBar, Checkbox, Collapse, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, IconButton, ToggleButton, Toolbar, Typography, useMediaQuery } from '@mui/material';
import theme from '../theme';
import RangeSlider from '../assets/RangeSlider';
import TuneIcon from '@mui/icons-material/Tune';

function FilterRow(props) {
  const { items, title, handleChange } = props;
  const [expanded, setExpanded] = React.useState(false);
  
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
      <FormLabel component="legend">{title}</FormLabel>
        {
          items && items.slice(0, 3).map(item => (
            <FormGroup key={Object.keys(item)}>
              <FormControlLabel
                sx={{'& span': {color: 'secondary.lightGrey'} }}
                control={
                  Object.values(item)[0] ?
                  <Checkbox checked={Object.values(item)[0]} onChange={handleChange(item)} />
                  :
                  <Checkbox checked={false} onChange={handleChange(item)} />
                }
                label={Object.keys(item)}
              />
            </FormGroup>
          ))
        }
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        {
          items && items.slice(3, items.length).map(item => (
            <FormGroup key={Object.keys(item)}>
              <FormControlLabel
                sx={{'& span': {color: 'secondary.lightGrey'} }}
                control={
                  Object.values(item)[0] ?
                  <Checkbox checked={Object.values(item)[0]} onChange={handleChange(item)} />
                  :
                  <Checkbox checked={false} onChange={handleChange(item)} />
                }
                label={Object.keys(item)}
              />
            </FormGroup>
          ))
        }
        </Collapse>
        {
          items && items.length > 3 &&
          <FormHelperText sx={{cursor: 'pointer', '&:hover': {color: 'secondary.main'}}} onClick={() => setExpanded(!expanded)}>{!expanded ? "+ show more" : "- show less"}</FormHelperText>
        }
      </FormControl>
    </Box>
  )
}

export default function SwipeableFilterDrawer(props) {
  const { handleChange, brandFilter, topCat, subCat, handleChangeBrand, handleChangeTopCat, handleChangeSubCat, countProducts } = props;
  const [drawerState, setDrawerState] = React.useState({
    left: false
  });
  const matches = useMediaQuery('(min-width: 600px)');

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const list = (anchor) => (
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300, flexGrow: 2 }}
        role="presentation"
      >
      <Box sx={{display: 'flex', alignItems: 'center', p: 1}}>
          <IconButton onClick={toggleDrawer(anchor, false)}>
            <CloseIcon />
          </IconButton>
          <Typography gutterBottom variant="h6" component="h6" color="secondary" sx={{flex: 1, alignItems: 'center', mb: 0, textAlign: 'center'}}>
            Filters
          </Typography>
        </Box>
        <Divider />
        <AppBar elevation={1} sx={{bgcolor: theme.palette.primary.white, mt: 3}} position="static">
          <Toolbar>
            <RangeSlider countProducts={countProducts} />
          </Toolbar>
          <Toolbar>
            <FilterRow title="Brand" items={brandFilter} handleChange={handleChange} />
          </Toolbar>
          <Toolbar>
            <FilterRow title="Top Category" items={topCat} handleChange={handleChangeTopCat} />
          </Toolbar>
          <Toolbar>
            <FilterRow title="Category" items={subCat} handleChange={handleChangeSubCat} />
          </Toolbar>
        </AppBar>
      </Box>
  );

  return (
    <Box sx={{ display: {xs: 'block', lg: 'none'} }}>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <ToggleButton
            size={!matches ? 'small' : 'medium'}
            onClick={toggleDrawer(anchor, true)}
          >
            <TuneIcon />
          </ToggleButton>
          <SwipeableDrawer
            anchor={anchor}
            open={drawerState[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </Box>
  );
}
