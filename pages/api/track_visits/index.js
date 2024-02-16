import { createRouter } from 'next-connect';
import db from '../../../src/utils/db';
import TrackVisit from '../../../models/TrackVisit';

const router = createRouter();

router.get(async (req, res) => {
  try {
    await db.connect();
    const allVisits = await TrackVisit.find({});
    res.send(allVisits);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error' });
  }finally {
    await db.disconnect();
  }
});


export default router.handler();