import { createRouter } from 'next-connect';
import Category from '../../../models/Category';
import db from '../../../src/utils/db';
import fs from "fs";
import path from "path";

const router = createRouter();

router.put(async (req, res) => {
  try {
    await db.connect();
    const { categoryName, avatar, image_name, slug, subCategory } = req.body;

      const base64Data = avatar?.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      const filePath = path.join(process.cwd(), 'public/images/category', `${image_name}`);
      await fs.promises.writeFile(filePath, buffer);

      const updateCategory = await Category.findOneAndUpdate({
        slug
      },
      {
        $set: { avatar },
        $addToSet: { subCategory: { $each: subCategory } },
      },
      {
        new: true
      });

      const responseData = {
        categoryName: updateCategory?.categoryName,
        avatar: updateCategory?.avatar,
        subCategory: updateCategory?.subCategory,
      };

      res.status(200).json(responseData);

  } catch (error) {
    console.log('Error during category update:', error);
    res.status(500).json({ error: error });
  }finally {
    await db.disconnect();
  }
});


export default router.handler();