import { createRouter } from 'next-connect';
import db from '../../../src/utils/db';
import Order from '../../../models/Order';

const router = createRouter();

router.get( async (req, res) => {
    await db.connect();
    const orders = await Order.find();
    const recentFiveOrders = await Order.find()
    .sort({ createdAt: -1 }) // Sort in descending order by createdAt
    .limit(5) // Limit to the last five documents
    .exec();
    res.send([{orders: orders}, {recentFiveOrders: recentFiveOrders}]);
});

export default router.handler();