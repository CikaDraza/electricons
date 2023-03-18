import React from 'react';
import Box from '@mui/material/Box';
import HeroCarousel from '../src/components/HeroCarousel';
import Product from '../models/Product';
import db from '../src/utils/db';
import WidgetCarousels from '../src/components/WidgetCarousels';
import { useRouter } from 'next/router';
import theme from '../src/theme';

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

  const router = useRouter()

  React.useEffect(() => {
    // Always do navigations after the first render
    router.push('/?counter=10', undefined, { shallow: true })
  }, [])

  React.useEffect(() => {
    // The counter changed!
  }, [router.query.counter])

  return (
    <Box sx={{ my: 4 }}>
      <Box sx={{boxShadow: '0 10px 10px 5px #f4f4f4', borderRadius: '10px'}}>
        <HeroCarousel hero_products={hero_products} />
      </Box>
      <WidgetCarousels title="Top Products" widgetProducts={topProducts && topProducts} />
      <WidgetCarousels title="Best Seller" widgetProducts={bestSeller && bestSeller} />
    </Box>
  );
}
