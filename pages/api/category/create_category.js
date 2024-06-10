import { createRouter } from 'next-connect';
import db from '../../../src/utils/db';
import fs from "fs";
import path from "path";
import Category from '../../../models/Category';

const router = createRouter();

router.post(async (req, res) => {
  try {
    await db.connect();
    const { categoryName, avatar, slug, subCategory, categoryPublished } = req.body;

    const category = await Category.findOne({slug: slug});

    if (category?.categoryName === categoryName) {
      // Handle the case where the order is not found.
      return res.status(404).json({ error: 'Category already exist' });
    }

    const base64Data = avatar[0].imageUrl.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const filePath = path.join(process.cwd(), 'public/images/category', `${avatar[0].image.name}`);
    fs.writeFileSync(filePath, buffer);

    const subCetegoryIndex = subCategory.findIndex((item) => item.topCategoryUrl === slug);

    if (subCetegoryIndex === -1) {
      // Handle the case where the product is not found in the order.
      return res.status(404).json({ error: 'Category not found to match that subcategory' });
    }

    const newCat = new Category({
      categoryName: categoryName,
      avatar: avatar[0].imageUrl,
      slug: slug,
      subCategory: subCategory,
      categoryPublished: categoryPublished
    })

    const categories = await newCat.save();

    res.status(200).json(categories);

    await db.disconnect();
  } catch (error) {
    console.error('Update to MongoDB', error);
    res.status(500).json({ error: error.message });
  }
});

export default router.handler();
