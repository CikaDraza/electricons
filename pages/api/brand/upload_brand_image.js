import { createRouter } from 'next-connect';
import fs from "fs";
import path from "path";
import db from '../../../src/utils/db';

const router = createRouter();

router.post(async (req, res) => {
  try {

    await db.connect();
    const { brandImg, brandUrl } = req.body;

    if (!brandUrl) {
      return res.status(400).json({ error: 'Image data is missing' });
    }

    const base64Data = brandUrl.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const filePath = path.join(process.cwd(), 'public/logo/', `${brandImg}`);
    fs.writeFileSync(filePath, buffer);

    const responseData = {
      image: brandUrl,
    };

    await db.disconnect();
    
    res.status(200).json(responseData);

  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router.handler();
