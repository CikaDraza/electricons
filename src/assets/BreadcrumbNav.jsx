import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import theme from '../theme';

const breadcrumbNameMap = {
  '/inbox': 'Inbox',
  '/inbox/important': 'Important',
  '/trash': 'Trash',
  '/spam': 'Spam',
  '/drafts': 'Drafts',
};

const Page = () => {
  const location = useRouter();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" to="/">
        Home
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography color="text.primary" key={to}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <Link underline="hover" color="inherit" to={to} key={to}>
            {breadcrumbNameMap[to]}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default function BreadcrumbNav({productData, categoryData, blogData, blogPost}) {
  const location = useRouter();
  const isBlogData = blogData === undefined;

  if(isBlogData && blogPost) {
    return (
      <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />} sx={{ fontSize: {xs: 12, sm: 'inherit'}, my: 4, '& a' : { textDecoration: 'none', display: 'flex', alignItems: 'center', color: "primary.main"} }}>
        <Link
          underline="none"
          href="/blog"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Blog
        </Link>
        <Typography
          sx={{ display: 'flex', alignItems: 'center', fontSize: {xs: 12, sm: 'inherit'} }}
          color="text.primary"
        >
          {'/post/'}{blogPost.slug}
        </Typography>
      </Breadcrumbs>
    );
  }

  if(!isBlogData) {
    return (
      <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />} sx={{ fontSize: {xs: 12, sm: 'inherit'}, my: 4, '& a' : { textDecoration: 'none', display: 'flex', alignItems: 'center', color: "primary.main"} }}>
        <Link
          underline="none"
          href="/blog"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Blog
        </Link>
        {
          !isBlogData && blogData[0] && !blogPost &&
            <Link
              underline="none"
              href={`/blog/category/${blogData[0]}`}
            >
              {blogData[0].replace(/-/g, ' ').replace(/^./, function(x){return x.toUpperCase()})}
            </Link>
        }
        {
          !isBlogData && blogData[1] && !blogPost &&
            <Link
              underline="none"
              href={`/blog/category/${blogData[0]}/${blogData[1]}`}
            >
              {blogData[1].replace(/-/g, ' ').replace(/^./, function(x){return x.toUpperCase()})}
            </Link>
        }
      </Breadcrumbs>
    );
  }

  return (
    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />} sx={{ fontSize: {xs: 12, sm: 'inherit'}, my: 4, '& a' : { textDecoration: 'none', display: 'flex', alignItems: 'center', color: theme.palette.primary.main} }}>
      <Link
        href="/"
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Home
      </Link>
      {
        categoryData && categoryData[0] &&
          <Link
            href={`/category/${categoryData[0]}`}
          >
            {categoryData[0].replace(/-/g, ' ').replace(/^./, function(x){return x.toUpperCase()})}
          </Link>
      }
      {
        categoryData && categoryData[1] &&
          <Link
            href={`/category/${categoryData[0]}/${categoryData[1]}`}
          >
            {categoryData[1].replace(/-/g, ' ').replace(/^./, function(x){return x.toUpperCase()})}
          </Link>
      }
      {
        productData && productData.categoryUrl &&
          <Link
            href={`/category/${productData.categoryUrl}`}
          >
            {productData.categoryUrl}
          </Link>
      }
      {
        productData && productData.subCategoryUrl &&
          <Link
            href={`/category/${productData.categoryUrl}/${productData.subCategoryUrl}`}
          >
            {productData.subCategory}
          </Link>
      }
      {
        productData && productData.slug &&
        <Typography
          sx={{ display: 'flex', alignItems: 'center', fontSize: {xs: 12, sm: 'inherit'}, py: 1 }}
          color="text.primary"
        >
          {productData.title}
        </Typography>
      }
      {
        !productData && !categoryData &&
          <Link
            href={`${location.pathname}`}
          >
            {`${location.pathname.replace('/', '')}`}
          </Link>
      }
    </Breadcrumbs>
  );
}
