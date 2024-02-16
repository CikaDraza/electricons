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
  const hero_products = await Product.find({inWidget: "hero"}).lean();
  const top_products = await Product.find({inWidget: "top-product"}).lean();
  const best_seller = await Product.find({inWidget: "best-seller"}).lean();
  await db.disconnect();

  if (!hero_products || !top_products || !best_seller) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      hero_products: hero_products.map(db.convertDocToObject),
      topProducts: top_products.map(db.convertDocToObject),
      bestSeller: best_seller.map(db.convertDocToObject)
    },
  };
}

export default function Index(props) {
  const { hero_products, topProducts, bestSeller } = props;
  const [visitPerUser, setVisitPerUser] = useState('')

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
      <WidgetCarousels title="Best Seller" widgetProducts={bestSeller && bestSeller} />
    </Box>
  );
}
