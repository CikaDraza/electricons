import { createRouter } from 'next-connect';
import db from '../../../../src/utils/db';
import Order from '../../../../models/Order';

const router = createRouter();

router.get(async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  await db.disconnect();
  res.send(order);
});

export default router.handler();