import { createRouter } from 'next-connect';
import db from '../../../../src/utils/db';
import Category from '../../../../models/Category';

const router = createRouter();

router.put(async (req, res) => {
  try {
    await db.connect();
    const { publish } = req.body;

    if (!publish || !publish.slug || typeof publish.online === 'undefined') {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const { slug, online } = publish;

    const category = await Category.findOne({ slug });
console.log(slug, online, category);
    if (!category) {
      return res.status(404).json({ message: 'Category not found with the provided slug' });
    }

    category.categoryPublished = online;
    await category.save();

    res.status(200).json({ message: 'Category published successfully', category });
  } catch (error) {
    console.error('Error publishing category:', error);
    res.status(500).json({ message: 'Error publishing category', error });
  } finally {
    await db.disconnect();
  }
});

export default router.handler();
