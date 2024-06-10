import { createRouter } from 'next-connect';
import Product from '../../../../models/Product';
import db from '../../../../src/utils/db';

const router = createRouter();

router.post(async (req, res) => {
  try {
    await db.connect();
    const productData = req.body;
    const { 
      title,
      images,
      heroImage,
      shortDescription,
      description,
      details,
      rating,
      price,
      oldPrice,
      currency,
      slug,
      category,
      categoryUrl,
      subCategory,
      subCategoryUrl,
      brand,
      brandImg,
      brandSlug,
      reviews,
      inStock,
      inWidget,
      sku,
      stockStatus,
      shipping,
      online,
      stores
     } = productData;

    const product = await Product.find({ slug: slug });

    if (product.length !== 0) {
      return res.status(404).json({ message: 'Poduct already exist with same slug' });
    }

    const newProduct = new Product({
      title,
      images,
      heroImage,
      shortDescription,
      description,
      details,
      rating,
      price,
      oldPrice,
      currency,
      slug,
      category,
      categoryUrl,
      subCategory,
      subCategoryUrl,
      brand,
      brandImg,
      brandSlug,
      reviews,
      inStock,
      inWidget: inWidget?.map(item => ({widget: item?.widget})),
      sku,
      stockStatus,
      shipping,
      online,
      stores: stores?.map(item => ({store: item?.store}))
    });
console.log(newProduct);
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error adding product', error });
  }finally {
    await db.disconnect();
  }
  
});


export default router.handler();