import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import CardProduct from "./CardProduct";
import { IconButton, useMediaQuery } from "@mui/material";
import category_data from "../utils/category";
import Link from '../Link';
import SwipeableViews from "react-swipeable-views";
// import { autoPlay } from 'react-swipeable-views-utils';
import dynamic from 'next/dynamic';
import { useState } from "react";
import SingleCardProduct from "./SingleCardProduct";
import theme from '../theme';

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function HeroCarousel({ hero_products }) {
  const [carouselPoroduct, setCarouselPoroduct] = useState([]);
  const { categories } = category_data;
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = categories.length;
  const singleMaxSteps = hero_products && hero_products.length;
  const [stopSwipe, setStopSwipe] = useState(false);
  const matches = useMediaQuery('(min-width: 900px)');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await hero_products;
        setCarouselPoroduct(res)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [])
  
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <React.Fragment>
      {
        !matches ? 
        <Box onMouseLeave={() => setStopSwipe(false)} onMouseEnter={() => setStopSwipe(true)} sx={{ maxWidth: "100%", flexGrow: 1 }}>
          <SwipeableViews
            autoplay={stopSwipe ? false : true}
            interval={4000}
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {
              hero_products && hero_products.map((prod, index) => (
                Math.abs(activeStep - index) <= 2 &&
                <SingleCardProduct key={prod.title} product={prod} />
              ))
            }
          </SwipeableViews>
          <MobileStepper
            steps={singleMaxSteps}
            position="static"
            activeStep={activeStep}
            sx={{justifyContent: 'center'}}
            nextButton={
              <IconButton onClick={handleNext} sx={{border: "thin solid", backgroundColor: theme.palette.primary.contrastText, '&:hover': {backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText}, marginLeft: 1}} aria-label="left" size="large" disabled={activeStep === singleMaxSteps - 1}>
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </IconButton>
            }
            backButton={
              <IconButton onClick={handleBack} sx={{border: "thin solid", backgroundColor: theme.palette.primary.contrastText, '&:hover': {backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText}, marginRight: 1}} aria-label="right" size="large" disabled={activeStep === 0}>
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
              </IconButton>
            }
          />
        </Box> 
      : 
      <Box onMouseLeave={() => setStopSwipe(false)} onMouseEnter={() => setStopSwipe(true)} sx={{ maxWidth: "100%", flexGrow: 1 }}>
        <Paper
          square
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            height: 150,
            p: 3,
            bgcolor: "transparent"
          }}
        >
        <Box sx={{ maxWidth: "100%", width: '100%', flexGrow: 1, flexWrap: 'wrap', textAlign: 'center', '& a': {textDecoration: 'none'} }}>
          <Link noLinkStyle href={categories && `/category/${categories[activeStep ? activeStep : 0].slug}`} passHref sx={{color: theme.palette.secondary.main}}>
            <Typography color="primary" variant="caption">
              {categories[activeStep].categoryName}
            </Typography>
          </Link>
          <Typography variant="p" component="h1">
            {categories[activeStep].categoryName}
          </Typography>
        </Box>
        </Paper>
        <SwipeableViews
          autoplay={stopSwipe ? false : true}
          interval={4000}
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
        >
          {
            categories.map((step, index) => (
              <TabPanel key={step.categoryName} value={activeStep} index={index} dir={theme.direction}>
                <CardProduct loading products={carouselPoroduct} step={step} />
              </TabPanel>
            ))
          }
        </SwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{justifyContent: 'center', '& .MuiMobileStepper-dots': {display: 'none'} }}
          nextButton={
            <IconButton onClick={handleNext} sx={{border: "thin solid", backgroundColor: theme.palette.primary.contrastText, '&:hover': {backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText}, marginLeft: 1}} aria-label="left" size="large" disabled={activeStep === maxSteps - 1}>
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </IconButton>
          }
          backButton={
            <IconButton onClick={handleBack} sx={{border: "thin solid", backgroundColor: theme.palette.primary.contrastText, '&:hover': {backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText}, marginRight: 1}} aria-label="right" size="large" disabled={activeStep === 0}>
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
            </IconButton>
          }
        />
      </Box>
      }
    </React.Fragment>
  );
}

export default dynamic(() => Promise.resolve(HeroCarousel), { ssr: false });