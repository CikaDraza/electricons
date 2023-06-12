import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
  {
    image: {type: String, required: true}
  },
  {
    timestamps: true
  }
);

const blogSchema = new mongoose.Schema(
  {
    title: {type: String, required: true},
    images: [imageSchema],
    shortDescription: {type: String, required: true},
    description: {type: String, required: true},
    slug: {type: String, required: true, unique: true},
    category: {type: String, required: true},
    subCategory: {type: String, required: true},
    reviews: {type: Number, required: true, default: 0},
  },
  {
    timestamps: true
  }
);

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;