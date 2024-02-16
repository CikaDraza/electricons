import { createRouter } from 'next-connect';
import db from '../../../../src/utils/db';
import Guest from '../../../../models/Guest';

const router = createRouter();

router.get(async (req, res) => {
  await db.connect();
  const guest_order = await Guest.findById(req.query.id);
  await db.disconnect();
  res.send(guest_order);
});


export default router.handler();