import { createRouter } from 'next-connect';
import db from '../../../src/utils/db';
import Brand from '../../../models/Brand';

const router = createRouter();

router.get(async (req, res) => {
  await db.connect();
  const brands = await Brand.find({});
  await db.disconnect();
  res.send(brands);
});

export default router.handler();