import axios from 'axios';
import { createRouter } from 'next-connect';
import TrackLocation from '../../../models/TrackLocation';
import db from '../../../src/utils/db';

const router = createRouter();

router.post(async (req, res) => {
  
  const { imageId, productId } = req.body;

  try {
    await db.connect();

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const geoResponse = await axios.get(`https://ipinfo.io/${ip}/json`);
    const { city, region, country } = geoResponse.data;

    const click = new TrackLocation({
      imageId,
      productId,
      ip,
      location: { city, region, country }
    });

    await click.save();

    res.status(200).json({ message: 'Track location successfully' });
  } catch (error) {
    console.log('', error);
  }finally {
    await db.disconnect();
  }
})

export default router.handler();