import { createRouter } from 'next-connect';
import fs from "fs";
import path from "path";
import db from '../../../src/utils/db';
import Brand from '../../../models/Brand';

const router = createRouter();

router.post(async (req, res) => {
  try {

    await db.connect();
    const { brandName, brandSlug, brandImg, brandUrl } = req.body;

    if (!brandName || !brandSlug || !brandImg || !brandUrl) {
      return res.status(400).json({ error: 'Incomplete brand data' });
    }

    const base64Data = brandUrl.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const filePath = path.join(process.cwd(), 'public/logo/', `${brandImg}`);

    fs.writeFileSync(filePath, buffer);

    const createdBrand = await Brand({
      brandName,
      brandSlug,
      brandImg: brandImg,
      brandUrl: brandUrl,
      brandPublish: false
    });

    const newBrand = await createdBrand.save();
    console.log(newBrand);
    res.status(201).json(newBrand);

  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Internal server error" });
  }finally {
    await db.disconnect();
  }
});

export default router.handler();
