import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import Rating from '@mui/material/Rating';
import { Box } from '@mui/system';
import Link from '../Link';
import Image from 'next/image';

export default function CardProduct(props) {
  const { products, step } = props; 

  return (
    <Grid container spacing={2}>
    {
      products.map(product => (
        product.inWidget === 'hero' && product.category === step.category &&
          <Grid key={product.title} item xs={12} md={4} >
              <Card sx={{ width: "100%", height: "100%" }}>
                  <CardActionArea>
                    <Link href={`/product/${product.slug}`}>
                      <CardMedia sx={{position: 'relative!important', display: 'flex', justifyContent: 'center', alignItems: 'center','& img': {objectFit: 'contain', width: 'unset!important', height: '168px!important', position: 'relative!important'}}} component="div">
                        <Image
                          fill
                          priority
                          src={product.images[0].image}
                          alt={product.title}
                          quality={35}
                        />
                      </CardMedia>
                    </Link>
                    <CardContent>
                      {
                        product.inStock > 0 ? 
                        ( <Typography color="primary" gutterBottom variant="caption" component="p" align="center">
                        Na stanju
                        </Typography>) :
                        ( <Typography color="secondary" gutterBottom variant="caption" component="p" align="center">
                        nije na stanju
                        </Typography>)
                      }
                      <Typography gutterBottom variant="h6" component="h3" align="center">
                      {product.title}
                      </Typography>
                      <Typography align="center" variant="body2" color="text.secondary">
                        {product.shortDescription}
                      </Typography>
                      <Box
                        sx={{
                          textAlign: 'center',
                          my: 1,
                        }}
                        >
                        <Rating size="small" name="read-only" value={product.rating} readOnly precision={0.5} />
                      </Box>
                      <Typography align="center" component="h3" variant="h6" color="secondary">
                        {product.price}
                        <Typography align="right" component="span" variant="body2" color="secondary.lightGrey" sx={{marginLeft: 1}}>
                          <del>
                          {product.oldPrice && product.oldPrice}
                          </del>
                        </Typography>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
              </Card>
          </Grid>
          ))
        }
    </Grid>
  );
}
