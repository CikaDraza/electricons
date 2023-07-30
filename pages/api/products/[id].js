import nc from 'next-connect';
import db from '../../../src/utils/db';
import Product from '../../../models/Product';
import ProductComment from '../../../models/ProductComment';
import mongoose from 'mongoose';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const { slug } = req.query;
  const product = await Product.findOne({ slug }).populate('comments');
  await db.disconnect();
  res.send(product);
});

handler.post(async (req, res) => {
  const { id } = req.query;
  const { authorName, email, content, rating, isAdminReply, replyCommentId, productId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid product comment ID' });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Poduct not found' });
    }

    const comment = new ProductComment({
      authorName,
      email,
      content,
      rating,
      isAdminReply,
      productId: id,
      replyCommentId
    });

    await comment.save(); // Save the comment first to generate the ObjectId

    product.comments.push(comment._id.toHexString()); // Serialize the ObjectId as a string
    await product.save();

    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Error adding comment', error: error.message });
  }
});


export default handler;