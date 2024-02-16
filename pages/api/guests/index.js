import { createRouter } from 'next-connect';
import db from '../../../src/utils/db';
import Guest from '../../../models/Guest';

const router = createRouter();

router.post(async (req, res) => {
    await db.connect();
    const newOrder = await Guest({
      ...req.body
    });
    const order = await newOrder.save();
    res.status(201).send(order);
});

export default router.handler();