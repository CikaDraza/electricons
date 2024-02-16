import { createRouter } from 'next-connect';
import db from '../../../src/utils/db';
import Order from '../../../models/Order';

const router = createRouter();

router.get( async (req, res) => {
    await db.connect();
    const orders = await Order.find({ user: req.userId });
    await db.disconnect();
    res.send(orders);
});

export default router.handler();