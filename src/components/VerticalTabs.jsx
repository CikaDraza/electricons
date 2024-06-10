import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import theme from '../theme';
import SwipeableViews from 'react-swipeable-views';
import { useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, width: '100%' }}>
          {children}
        </Box>
      )}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs({ productData }) {
  const [value, setValue] = React.useState(0);
  const [swipeValue, setSwipeValue] = React.useState('0');
  const [isSwipe, setIsSwipe] = React.useState(false);
  const matches = useMediaQuery('(min-width: 600px)');
  const router = useRouter();

  const handleChange = (event, newValue) => {
    setIsSwipe(false)
    setValue(newValue);
  };

  const handleSwipeChange = (event, newValue) => {
    setIsSwipe(true)
    setValue(newValue);
    setSwipeValue(event);
    console.log(event, newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: router.pathname === '/backoffice/preview/[slug]' ? 'transparent' : 'background.paper', display: 'flex', height: 240,  width: '100%', flexWrap: {xs: 'wrap', sm: 'nowrap'}}}
    >
      <Tabs
        orientation={matches && "vertical"}
        variant="scrollable"
        value={isSwipe ? swipeValue : value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: {xs: 0, sm: `thin solid ${theme.palette.secondary.borderColor}`}, minWidth: '80px' }}
      >
      {
        productData?.images.map((img, index) => (
          <Tab key={img.imageUrl} label="" {...a11yProps(index)} sx={{ backgroundImage: img?.imageUrl ? `url(${img.imageUrl})` : img.image ? `url(${img.image})` : '/images/no-image.jpg', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', my: 1, minWidth: '70px', maxWidth: '70px'}}>
          </Tab>
        ))
      }
      </Tabs>
      {
        productData?.images.map((img, index) => img.image) === '' ?
        <Image
          height={matches ? 140 : 200}
          width={400}
          src={'/images/no-image.jpg'}
          alt={'no image'}
        />
        :
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={isSwipe ? swipeValue : value}
          onChangeIndex={handleSwipeChange}
          style={{width: "100%", height: "100%", overflow: 'hidden'}}
          enableMouseEvents
        >
        {
          productData?.images.map((img, index) => (
            <TabPanel key={img?.name ? img?.name : img.image.name} value={index} index={index}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', '& img': {objectFit: 'contain', width: 'unset!important', height: '200px!important', position: 'relative!important' } }}>
                <Image
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  src={img?.imageUrl ? img?.imageUrl : img.image ? img.image : '/images/no-image.jpg'}
                  alt={img?.name ? img?.name : img.image.name}
                  quality={100}
                />
              </Box>
            </TabPanel>
            ))
        }
        </SwipeableViews>
      }
    </Box>
  );
}
