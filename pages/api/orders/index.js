import { createRouter } from 'next-connect';
import db from '../../../src/utils/db';
import Order from '../../../models/Order';

const router = createRouter();

router.post( async (req, res) => {
  await db.connect();
    const newOrder = await Order({
      ...req.body,
    });
    const order = await newOrder.save();
    await db.disconnect();
    res.status(201).send(order);
});

export default router.handler();