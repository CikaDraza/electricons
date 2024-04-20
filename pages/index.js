import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import HeroCarousel from '../src/components/HeroCarousel';
import Product from '../models/Product';
import db from '../src/utils/db';
import WidgetCarousels from '../src/components/WidgetCarousels';
import Cookies from 'js-cookie';
import axios from 'axios';

export async function getStaticProps() {
  await db.connect();

  const hero_products = await Product.find({ heroImage: { $ne: '' } })
  .select('heroImage category _id slug')
  .lean({ virtuals: false });


  hero_products.map(product => {
    product._id = product._id.toString();
    return product
  });

  const filtered_hero_products = hero_products.filter(product => product.heroImage);

  const top_products = await Product.find({ 'inWidget.widget': 'top-product' })
  .select('_id category inWidget images title shortDescription rating price oldPrice slug')
  .lean();

  const top_products_cleaned = top_products.map(product => {
    const { _id, inWidget, images, ...rest } = product;
    const cleanedWidget = inWidget.map(({ _id, createdAt, updatedAt, ...widgetRest }) => widgetRest);
    const cleanedImages = images.map(({ _id, createdAt, updatedAt, ...imagesRest }) => imagesRest);
    return { ...rest, inWidget: cleanedWidget, images: cleanedImages };
  });
  
  await db.disconnect();

  return {
    props: {
      hero_products: filtered_hero_products,
      topProducts: top_products_cleaned
    },
  };
}

export default function Index(props) {
  const { hero_products, topProducts } = props;

  function generateUniqueToken() {
    const timestamp = new Date().getTime();
    const random = Math.random().toString(36).substring(2, 10);
    return `${timestamp}_${random}`;
  }

  function setVisitToken() {
    const token = generateUniqueToken();
    Cookies.set('token_visits', token);
  }

  useEffect(() => {
    const isToken = Cookies.get('token_visits');
    !isToken ? setVisitToken() : null;
  }, [])
  

  useEffect(() => {
    const currentToken = Cookies.get('token_visits') || '';
    async function handleGetVisits() {
      try {
        const { data } = await axios.get('/api/track_visits');
        console.info(`this site was visited ${data.length} number of times`);        
      } catch (error) {
        console.log(error);
      }
    }

    async function handlePostVisits() {
      try {
        const { data } = await axios.post('/api/track_visits/collect_visits', {
          id: currentToken 
        });
      } catch (error) {
        console.log(error);
      }
    }
    handlePostVisits();
    if (currentToken) {
      handleGetVisits();
    }
  }, []);

  return (
    <Box sx={{ my: 4 }}>
      <Box sx={{borderRadius: '10px'}}>
        <HeroCarousel hero_products={hero_products && hero_products} />
      </Box>
      <WidgetCarousels title="Top Products" widgetProducts={topProducts && topProducts} />
      {/* <WidgetCarousels title="Best Seller" widgetProducts={bestSeller && bestSeller} /> */}
    </Box>
  );
}
