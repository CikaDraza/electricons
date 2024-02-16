import { createRouter } from 'next-connect';
import db from '../../../src/utils/db';
import Category from '../../../models/Category';

const router = createRouter();

router.get(async (req, res) => {
  await db.connect();
  const category = await Category.findById(req.query.id);
  await db.disconnect();
  res.send(category);
});
export default router.handler();