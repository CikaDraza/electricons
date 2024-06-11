import { createRouter } from 'next-connect';
import db from '../../../../src/utils/db';
import Product from '../../../../models/Product';

const router = createRouter();

router.put(async (req, res) => {
  try {
    await db.connect();
    const { publish } = req.body;

    if (!publish || !publish.slug || typeof publish.online === 'undefined') {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const { slug, online } = publish;

    const product = await Product.findOne({ slug });

    if (!product) {
      return res.status(404).json({ message: 'Product not found with the provided slug' });
    }

    product.online = online;
    await product.save();

    res.status(200).json({ message: 'Product published successfully', product });
  } catch (error) {
    console.error('Error publishing product:', error);
    res.status(500).json({ message: 'Error publishing product', error });
  } finally {
    await db.disconnect();
  }
});

export default router.handler();
