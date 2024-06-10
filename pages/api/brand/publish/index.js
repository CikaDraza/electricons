import { createRouter } from 'next-connect';
import Brand from '../../../../models/Brand';
import db from '../../../../src/utils/db';

const router = createRouter();

router.put(async (req, res) => {
  try {
    await db.connect();
    const { publish } = req.body;

    if (!publish || !publish.slug || typeof publish.online === 'undefined') {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const { slug, online } = publish;

    const brand = await Brand.findOne({ brandSlug: slug });
console.log(slug, online, brand);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found with the provided slug' });
    }

    brand.brandPublish = online;
    await brand.save();

    res.status(200).json({ message: 'Brand published successfully', brand });
  } catch (error) {
    console.error('Error publishing brand:', error);
    res.status(500).json({ message: 'Error publishing brand', error });
  } finally {
    await db.disconnect();
  }
});

export default router.handler();
