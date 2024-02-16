import { createRouter } from 'next-connect';
import db from '../../../src/utils/db';
import TrackVisit from '../../../models/TrackVisit';

const router = createRouter();
const visitsDatabase = {};

router.post(async (req, res) => {
  try {
    await db.connect();
    const { id } = req.body;
    const visit = await TrackVisit.findOne({ id: id });

    if (visit?.id !== id) {
      visitsDatabase[id] = 1;
      const newVisit = new TrackVisit({
        id,
        visit: visitsDatabase[id],
      });
      await newVisit.save();
    } else {
      visitsDatabase[id]++;
    }
    
    res.send({ success: true });
  } catch (error) {
    console.error('Error collect visits:', error);
    res.status(500).json({ message: 'Error collect visits' });
  }finally {
    await db.disconnect();
  }
});


export default router.handler();