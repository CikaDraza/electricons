import { createRouter } from 'next-connect';
import db from '../../../src/utils/db';
import Product from '../../../models/Product';
import ProductComment from '../../../models/ProductComment';
import mongoose from 'mongoose';

const router = createRouter();

router.get(async (req, res) => {
  await db.connect();
  const { slug } = req.query;
  const product = await Product.findOne({ slug }).populate('comments');
  await db.disconnect();
  res.send(product);
});

router.post(async (req, res) => {
  const { id } = req.query;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid product comment ID' });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Poduct not found' });
    }

    if (req.method === 'POST') {
      const { slug } = req.query;
      const { authorName, email, content, rating, isAdminReply, replyCommentId } = req.body;
  
      // Save the new comment to the database
      const newComment = new ProductComment({
         slug,
         authorName,
         email,
         content,
         rating,
         isAdminReply,
         productId: id,
         replyCommentId
      });

      await newComment.save();
  
      return res.status(201).json(newComment);
    }

    product.comments.push(newComment._id.toHexString()); // Serialize the ObjectId as a string
    await product.save();

    res.status(201).json({ message: 'Comment added successfully', newComment });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Error adding comment', error: error.message });
  }
});


export default router.handler();