import { createRouter } from 'next-connect';

const router = createRouter();

router.get(async (req, res) => {
    res.send(process.env.CLIENT_ID_PAYPAL || 'sandbox')
});

export default router.handler();