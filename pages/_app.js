import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import Layout from '../src/layout/Layout';
import '../src/globals.css';
import { StoreProvider } from '../src/utils/Store';
import { Analytics } from '@vercel/analytics/react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useRouter } from 'next/router';
import DashboardLayout from '../src/layout/DashboardLayout';
import Loader from '../src/layout/Loader';
import { Box } from '@mui/material';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [isSSR, setIsSsr] = React.useState(true);
  const exceptRouter = router.pathname !== '/blog' && router.pathname !== '/blog/post/[slug]' && router.pathname !== '/blog/category/[[...slug]]';

  const isBackoffice = router.pathname.replace(/\/\w+$/,'/') === '/backoffice/[id]/' || router.pathname === '/backoffice';
  const isBackofficeProfile = router.pathname === '/backoffice/profile/[id]'

  React.useEffect(() => {
    setIsSsr(false);
  }, []);

  React.useEffect(() => {
    let loadingTimeout;

    const handleStart = () => {
      clearTimeout(loadingTimeout); // Poništava postojeći timeout
      setLoading(true);
    };

    const handleComplete = () => {
      // Postavlja loading na false nakon kratkog kašnjenja (500 ms)
        loadingTimeout = setTimeout(() => {
          setLoading(false);
        }, 500);
    };

    const handleError = () => {
      // Ako se pojavi greška, takođe postavlja loading na false
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleError);

    return () => {
      clearTimeout(loadingTimeout); // Očisti timeout prilikom unmounting-a
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleError);
    };
  }, [router]);

  if(isSSR) {
    return (
      <div style={{width: '100%', height: '100vh', display: 'flex'}}>
        <svg style={{margin: 'auto'}} width="306" height="76" viewBox="0 0 306 76" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M28.1201 67.0002L28.3601 65.7402C30.5601 65.7402 31.8801 65.3402 32.3201 64.5402L37.3601 34.3602C37.1201 33.5602 35.9201 33.1602 33.7601 33.1602L34.0001 31.9002H58.1801L57.2201 37.7202H55.9601C56.0801 36.8802 56.1401 36.2002 56.1401 35.6802C56.1401 34.7602 55.8801 34.1802 55.3601 33.9402H42.9401L40.6601 47.7402H49.0601C49.9001 47.4202 50.5001 46.1602 50.8601 43.9602H52.1201L50.5001 53.5602H49.2401C49.4001 52.4402 49.4801 51.7602 49.4801 51.5202C49.4801 50.6002 49.2201 50.0202 48.7001 49.7802H40.3001L37.7801 64.9602H51.4601C52.5001 64.5602 53.6001 63.3002 54.7601 61.1802H55.9601L53.5601 67.0002H28.1201Z" fill="#222222"/>
          <path d="M65.6689 33.4602C63.1889 33.2602 61.9289 33.1602 61.8889 33.1602L62.1289 31.7802C62.8889 31.7802 64.4489 31.3602 66.8089 30.5202C69.1689 29.6402 70.8089 29.2002 71.7289 29.2002L66.5089 60.6402C66.4289 61.2802 66.3889 61.7202 66.3889 61.9602C66.3889 63.1202 66.6489 64.0202 67.1689 64.6602C67.7289 65.3002 68.4889 65.6202 69.4489 65.6202L69.2089 67.0002C66.4089 67.0002 64.3089 66.6402 62.9089 65.9202C61.5489 65.2002 60.8689 64.0402 60.8689 62.4402C60.8689 62.2002 60.9089 61.8002 60.9889 61.2402L65.6689 33.4602Z" fill="#222222"/>
          <path d="M100.483 48.0402C100.483 49.2802 99.9629 50.3002 98.9229 51.1002C97.9229 51.8602 95.7229 52.4802 92.3229 52.9602L80.7429 54.5202C80.7429 57.5202 81.4229 60.0802 82.7829 62.2002C84.1829 64.2802 85.9429 65.3202 88.0629 65.3202C91.5829 65.3202 94.6029 64.0002 97.1229 61.3602L98.4429 62.0802C96.9629 63.9602 95.2229 65.3602 93.2229 66.2802C91.2229 67.1602 88.6829 67.6002 85.6029 67.6002C82.6829 67.6002 80.1429 66.7402 77.9829 65.0202C75.8629 63.3002 74.8029 60.4602 74.8029 56.5002C74.8029 51.7402 76.1229 47.8002 78.7629 44.6802C81.4029 41.5602 85.0229 40.0002 89.6229 40.0002C93.3429 40.0002 96.0829 40.8402 97.8429 42.5202C99.6029 44.1602 100.483 46.0002 100.483 48.0402ZM80.8629 52.6602L89.8029 51.4602C93.3229 51.0202 95.0829 49.6002 95.0829 47.2002C95.0829 45.8402 94.6029 44.6002 93.6429 43.4802C92.7229 42.3602 91.2029 41.8002 89.0829 41.8002C87.4429 41.8002 85.7829 42.8202 84.1029 44.8602C82.4629 46.9002 81.3829 49.5002 80.8629 52.6602Z" fill="#222222"/>
          <path d="M123.417 47.6202C123.417 46.7002 123.697 46.0002 124.257 45.5202C124.817 45.0402 125.377 44.8002 125.937 44.8002C125.777 42.8002 123.897 41.8002 120.297 41.8002C117.497 41.8002 115.077 43.0402 113.037 45.5202C111.037 47.9602 110.037 51.0802 110.037 54.8802C110.037 57.7602 110.737 60.2202 112.137 62.2602C113.577 64.3002 115.337 65.3202 117.417 65.3202C120.937 65.3202 123.957 64.0002 126.477 61.3602L127.797 62.0802C126.317 63.9602 124.577 65.3602 122.577 66.2802C120.577 67.1602 118.037 67.6002 114.957 67.6002C112.037 67.6002 109.497 66.7402 107.337 65.0202C105.217 63.3002 104.157 60.4602 104.157 56.5002C104.157 51.7402 105.597 47.8002 108.477 44.6802C111.357 41.5602 115.197 40.0002 119.997 40.0002C125.957 40.0002 128.937 41.7602 128.937 45.2802C128.937 46.4802 128.637 47.4602 128.037 48.2202C127.477 48.9802 126.717 49.3602 125.757 49.3602C124.197 49.3602 123.417 48.7802 123.417 47.6202Z" fill="#222222"/>
          <path d="M145.109 31.9002L143.669 40.6002H148.829L148.529 42.4002H143.369L140.129 61.4802C140.049 62.1202 140.009 62.5802 140.009 62.8602C140.009 64.5002 140.889 65.3202 142.649 65.3202C143.369 65.3202 144.149 64.9802 144.989 64.3002C145.869 63.5802 146.549 62.6002 147.029 61.3602L148.349 62.0802C146.869 65.7602 144.149 67.6002 140.189 67.6002C136.269 67.6002 134.309 65.9602 134.309 62.6802C134.309 62.1602 134.369 61.6002 134.489 61.0002L137.609 42.4002H133.409L133.709 40.6002C136.029 40.6002 138.049 39.7402 139.769 38.0202C141.529 36.2602 142.589 34.2202 142.949 31.9002H145.109Z" fill="#222222"/>
          <path d="M172.35 45.4602C171.79 45.4602 171.35 45.2802 171.03 44.9202C170.71 44.5602 170.49 44.1802 170.37 43.7802C170.25 43.3402 170.01 42.9402 169.65 42.5802C169.33 42.2202 168.89 42.0402 168.33 42.0402C167.05 42.0402 164.83 44.7202 161.67 50.0802L158.85 67.0002H153.45L157.23 44.2602C156.87 44.2202 156.41 44.1802 155.85 44.1402C155.29 44.1002 154.83 44.0602 154.47 44.0202C154.11 43.9802 153.79 43.9602 153.51 43.9602L153.75 42.5802C154.51 42.5802 156.07 42.1602 158.43 41.3202C160.79 40.4402 162.43 40.0002 163.35 40.0002L162.39 45.8802C165.15 41.9602 167.45 40.0002 169.29 40.0002C170.97 40.0002 172.35 40.3202 173.43 40.9602C174.55 41.5602 175.11 42.2602 175.11 43.0602C175.11 43.8202 174.83 44.4202 174.27 44.8602C173.71 45.2602 173.07 45.4602 172.35 45.4602Z" fill="#222222"/>
          <path d="M188.056 32.1402C188.056 33.2202 187.676 34.1602 186.916 34.9602C186.196 35.7602 185.316 36.1602 184.276 36.1602C183.476 36.1602 182.816 35.9002 182.296 35.3802C181.776 34.8202 181.516 34.1202 181.516 33.2802C181.516 32.2002 181.876 31.2602 182.596 30.4602C183.316 29.6202 184.196 29.2002 185.236 29.2002C186.036 29.2002 186.696 29.4802 187.216 30.0402C187.776 30.6002 188.056 31.3002 188.056 32.1402ZM180.376 44.2602C180.016 44.2202 179.556 44.1802 178.996 44.1402C178.436 44.1002 177.976 44.0602 177.616 44.0202C177.256 43.9802 176.936 43.9602 176.656 43.9602L176.896 42.5802C177.656 42.5802 179.216 42.1602 181.576 41.3202C183.936 40.4402 185.576 40.0002 186.496 40.0002L181.996 67.0002H176.596L180.376 44.2602Z" fill="#222222"/>
          <path d="M209.726 47.6202C209.726 46.7002 210.006 46.0002 210.566 45.5202C211.126 45.0402 211.686 44.8002 212.246 44.8002C212.086 42.8002 210.206 41.8002 206.606 41.8002C203.806 41.8002 201.386 43.0402 199.346 45.5202C197.346 47.9602 196.346 51.0802 196.346 54.8802C196.346 57.7602 197.046 60.2202 198.446 62.2602C199.886 64.3002 201.646 65.3202 203.726 65.3202C207.246 65.3202 210.266 64.0002 212.786 61.3602L214.106 62.0802C212.626 63.9602 210.886 65.3602 208.886 66.2802C206.886 67.1602 204.346 67.6002 201.266 67.6002C198.346 67.6002 195.806 66.7402 193.646 65.0202C191.526 63.3002 190.466 60.4602 190.466 56.5002C190.466 51.7402 191.906 47.8002 194.786 44.6802C197.666 41.5602 201.506 40.0002 206.306 40.0002C212.266 40.0002 215.246 41.7602 215.246 45.2802C215.246 46.4802 214.946 47.4602 214.346 48.2202C213.786 48.9802 213.026 49.3602 212.066 49.3602C210.506 49.3602 209.726 48.7802 209.726 47.6202Z" fill="#222222"/>
          <path d="M224.998 56.4402C224.998 59.6002 225.638 61.9602 226.918 63.5202C228.238 65.0402 230.058 65.8002 232.378 65.8002C235.178 65.8002 237.438 64.3002 239.158 61.3002C240.918 58.2602 241.798 54.7002 241.798 50.6202C241.798 44.7802 239.258 41.8602 234.178 41.8602C231.458 41.8602 229.238 43.3402 227.518 46.3002C225.838 49.2602 224.998 52.6402 224.998 56.4402ZM231.298 67.6002C227.378 67.6002 224.378 66.6002 222.298 64.6002C220.218 62.6002 219.178 59.8802 219.178 56.4402C219.178 51.6402 220.598 47.7002 223.438 44.6202C226.278 41.5402 230.298 40.0002 235.498 40.0002C239.538 40.0002 242.558 40.9402 244.558 42.8202C246.598 44.7002 247.618 47.3202 247.618 50.6802C247.618 55.5602 246.198 59.6002 243.358 62.8002C240.518 66.0002 236.498 67.6002 231.298 67.6002Z" fill="#222222"/>
          <path d="M261.77 44.3802C264.17 41.4202 267.35 39.9402 271.31 39.9402C276.43 39.9402 278.99 42.0602 278.99 46.3002C278.99 46.9802 278.93 47.7202 278.81 48.5202L276.77 60.6402C276.69 61.2802 276.65 61.7202 276.65 61.9602C276.65 63.1202 276.91 64.0202 277.43 64.6602C277.99 65.3002 278.75 65.6202 279.71 65.6202L279.47 67.0002C276.67 67.0002 274.57 66.6402 273.17 65.9202C271.81 65.2002 271.13 64.0402 271.13 62.4402C271.13 62.2002 271.17 61.8002 271.25 61.2402L273.47 48.1002C273.55 47.7002 273.59 47.1202 273.59 46.3602C273.59 43.4802 272.05 42.0402 268.97 42.0402C266.13 42.0402 263.55 43.9402 261.23 47.7402L257.99 67.0002H252.59L256.37 44.2602C256.01 44.2202 255.55 44.1802 254.99 44.1402C254.43 44.1002 253.97 44.0602 253.61 44.0202C253.25 43.9802 252.93 43.9602 252.65 43.9602L252.89 42.5802C253.65 42.5802 255.21 42.1602 257.57 41.3202C259.93 40.4402 261.57 40.0002 262.49 40.0002L261.77 44.3802Z" fill="#222222"/>
          <path d="M296.38 42.0402C295.02 42.0402 293.72 42.4202 292.48 43.1802C291.28 43.9002 290.68 44.7602 290.68 45.7602C290.68 46.7602 291.14 47.6602 292.06 48.4602C292.98 49.2602 294.1 49.9602 295.42 50.5602C296.74 51.1602 298.06 51.7802 299.38 52.4202C300.7 53.0602 301.82 53.9002 302.74 54.9402C303.66 55.9802 304.12 57.1602 304.12 58.4802C304.12 61.2802 302.98 63.5002 300.7 65.1402C298.42 66.7802 295.72 67.6002 292.6 67.6002C291.16 67.6002 289.74 67.3002 288.34 66.7002C286.98 66.1002 286.22 65.8002 286.06 65.8002C285.58 65.8002 285.28 66.2002 285.16 67.0002H283.72L284.38 59.3802H285.7C285.7 60.9802 286.54 62.3602 288.22 63.5202C289.94 64.6402 291.7 65.2002 293.5 65.2002C294.22 65.2002 294.96 65.1202 295.72 64.9602C296.48 64.8002 297.24 64.3802 298 63.7002C298.8 62.9802 299.2 62.0402 299.2 60.8802C299.2 59.9202 298.76 59.0602 297.88 58.3002C297.04 57.5402 295.98 56.9002 294.7 56.3802C293.46 55.8202 292.22 55.2402 290.98 54.6402C289.74 54.0402 288.68 53.2202 287.8 52.1802C286.96 51.1402 286.54 49.9202 286.54 48.5202C286.54 45.8402 287.48 43.7602 289.36 42.2802C291.28 40.7602 293.66 40.0002 296.5 40.0002C297.86 40.0002 299.2 40.3002 300.52 40.9002C301.88 41.5002 302.66 41.8002 302.86 41.8002C303.38 41.8002 303.7 41.4002 303.82 40.6002H305.2L304.48 48.2202H303.16C303.16 46.5802 302.48 45.1402 301.12 43.9002C299.76 42.6602 298.18 42.0402 296.38 42.0402Z" fill="#222222"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M71.4077 19.8761C65.2186 11.4611 55.247 6 44 6C25.2223 6 10 21.2223 10 40C10 58.7777 25.2223 74 44 74C47.4146 74 50.7116 73.4966 53.821 72.5601C49.0041 74.7687 43.6459 76 38 76C17.0132 76 0 58.9868 0 38C0 17.0132 17.0132 0 38 0C52.424 0 64.9711 8.03649 71.4077 19.8761Z" fill="#36C3E6"/>
          <path d="M57.8954 26.4814C43.5196 23.6806 18.2396 18.6471 11.937 27.9812C11.3738 29.6305 10.9042 31.1642 10.5 32.5C10.5975 30.7143 11.0998 29.221 11.937 27.9812C16.443 14.7859 26.9414 -5.80326 57.8954 8.4467C70.3692 14.0577 72.4482 20.8042 71.9285 23.476C71.7552 25.4796 68.7061 28.8858 57.8954 26.4814Z" fill="#1CB7DD"/>
          </svg>
      </div>
    )
  }

  if (exceptRouter && loading) {
    return (
      <Box sx={{bgcolor: 'white', position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 2}}>
        <Loader />
      </Box>
    )
  }

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StoreProvider>
          <PayPalScriptProvider deferLoading={true}>
            {
              isBackoffice || isBackofficeProfile ?
              <DashboardLayout>
                <Component {...pageProps} />
                <Analytics />
              </DashboardLayout>
              :
              <Layout>
                <Component {...pageProps} />
                <Analytics />
              </Layout>
            }
          </PayPalScriptProvider>
        </StoreProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
