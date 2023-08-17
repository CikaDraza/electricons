import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Header from './Header';
import Snackbars from '../assets/Snackbars';
import Footer from './Footer';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@mui/material';

export default function Layout({ children }) {
  const router = useRouter();
  const matches = useMediaQuery('(min-width: 1200px)');
  const isNotBlog = router.pathname !== '/blog';
  const isNotPost = router.pathname !== '/blog/post/[slug]';
  const isNotCat = router.pathname !== '/blog/category/[[...slug]]';
  const isBackoffice = router.pathname.replace(/\/\w+$/,'/') === '/backoffice/[id]/';
  const isBackofficeIndex = router.pathname === '/backoffice';

  if(isBackoffice || isBackofficeIndex) {
    return (
      <Box component="main">
        {children}
        <Snackbars />
      </Box>
    )
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Container maxWidth="xl">
        <Box component="main" sx={{ height: '100%', mt: {xs: isNotPost && isNotBlog && isNotCat ? '8rem' : matches ? '5rem' : '2rem', sm: isNotPost && isNotBlog && isNotCat ? '10rem' : '2rem'} }}>
          {children}
        </Box>
        <Snackbars />
      </Container>
      <Footer />
    </React.Fragment>
  )
}
