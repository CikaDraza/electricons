import { createRouter } from 'next-connect';
import db from '../../../src/utils/db';
import User from '../../../models/User';

const router = createRouter();

router.get(async (req, res) => {
  await db.connect();
  const existUser = await User.find({});
  await db.disconnect();
  res.send(existUser);
});


export default router.handler();