import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

export default function CardProduct(props) {
  const { product, cardHeight, marginTop, imgHeight, imgWidth } = props;
  const [selected, setSelected] = React.useState('');
  const matches = useMediaQuery('(min-width: 480px)');

  const handleLoading = (product) => {
    setSelected(product._id);
  };

  const handleClick = async () => {
    await axios.post('/api/track_location', {
      imageId: product?.images?._id,
      productId: product?._id,
    });
  };

  return (
    <Card onClick={handleClick} sx={{ width: "100%", '& a': {textDecoration: 'none'},  }}>
      <Link sx={{position: 'relative'}} href={`/product/${product.slug}`} onClick={() => handleLoading(product)}>
      {
        product._id === selected &&
        <CircularProgress sx={{position: 'absolute', left: '45%', top: '20%', zIndex: 1, transform: 'translateX(-50%)'}} size={50} />
      }
        <CardActionArea sx={{display: {xs: 'block', sm: 'flex'}, flexDirection: {xs: 'row', sm: 'row-reverse'}, minHeight: cardHeight}}>
          {
            <CardMedia sx={{ justifyContent: {xs: 'center', sm: 'flex-end'}, alignItems: 'center','& img': {width: `${imgWidth}!important`, height: `${imgHeight}`, marginTop: `${marginTop}`}, overflow: 'hidden'  }} component="div">
              <Image
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                src={product?.heroImage !== '' ? product?.heroImage : '/images/no-image.jpg'}
                alt={product.title}
                quality={100}
              />
            </CardMedia>
          }
        </CardActionArea>
      </Link>
    </Card>
  )
}
