import { createRouter } from 'next-connect';
import db from '../../../src/utils/db';
import Blog from '../../../models/Blog';

const router = createRouter();

router.get(async (req, res) => {
  await db.connect();
  const { slug } = req.query;
  const blog = await Blog.findOne({ slug });
  await db.disconnect();
  res.send(blog);
});

export default router.handler();