import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container, Divider } from '@mui/material';
import Image from 'next/image';
import db from '../../../src/utils/db';
import Blog from '../../../models/Blog';
import BreadcrumbNav from '../../../src/assets/BreadcrumbNav';

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const blog = await Blog.findOne({slug}).lean();
  await db.disconnect();
  return {
    props: {
      blog: db.convertDocToObject(blog)
    },
  };
}

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', px: 1, transform: 'scale(2)' }}
  >
    {"•"}
  </Box>
);


export default function SinglePost(props) {
  const { blog } = props;
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(blog.createdAt);
  const formatDate = date.toLocaleDateString("en-US", options);

  return (
      <Box sx={{ my: 5, '& a': {textDecoration: 'none' }, '&:hover a': {textDecoration: 'none' } }}>
        <Container maxWidth="xl">
          <BreadcrumbNav blogPost={blog.title} />
          <Box component="section" sx={{my: 5}}>
            <Box sx={{display: 'flex', justifyContent: 'center', pb: 3}}>
              <Box sx={{ position: 'relative!important', width: {xs: '200px', md: '500px'}, height: {xs: '200px', md: '300px'}, '& > img': {objectFit: 'contain'}}}>
                <Image
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  src={blog.images[0].image}
                  alt={blog.title}
                  quality={75}
                  loading="eager"
                />
              </Box>
            </Box>
            <Typography variant="h4" component="h1" gutterBottom sx={{fontWeight: 'bold'}}>
              {blog.title}
            </Typography>
            <Box component="span" variant="caption">
              {blog.category}{bull}
            </Box>
            <Box component="span" variant="caption">
              {blog.subCategory}{bull}
            </Box>
            <Box component="span" variant="caption">
              {formatDate}
            </Box>
            <Box sx={{p: 0, py: 1}}>
              <Divider />
            </Box>
            <Typography variant="p" component="p" gutterBottom>
              {blog.description}
            </Typography>
          </Box>
        </Container>
      </Box>
  );
}