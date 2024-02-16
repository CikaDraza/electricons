import { createRouter } from 'next-connect';
import db from '../../../../src/utils/db';
import Product from '../../../../models/Product';


const router = createRouter();

router.get(async (req, res) => {
  try {
    await db.connect();
    const allProducts = await Product.find();
    if (!allProducts) {
      return res.status(404).json({ message: 'Products not found' });
    }
    res.send(allProducts);
    return res.status(201).json(allProducts);
  } catch (error) {
    console.log('Error fetching all products', error);
    res.status(500).json({ message: 'Error fetching all products' });
  }finally {
    await db.disconnect();
  }
})

export default router.handler();