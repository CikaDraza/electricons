import { Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo(props) {
  const { logoSrc } = props;

  return (
    <Link href="/">
      <Box sx={{display: 'block', "& img": {objetFit: "contain"}, position: 'relative', width: 'auto', height: '75px' }}>
        <Image
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          src={logoSrc ? logoSrc?.logo : '/logo/electricons_logo.svg'}
          alt="logo"
          quality={35}
          loading="eager"
        />
      </Box>
    </Link>
  );
}