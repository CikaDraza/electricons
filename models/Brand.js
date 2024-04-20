import mongoose from 'mongoose'

const brandSchema = new mongoose.Schema(
  {
    brandName: {type: String, required: true},
    brandImg: {type: String, required: true},
    brandSlug: {type: String, required: true},
    brandUrl: {type: String, required: true},
    brandPublish: {type: Boolean, required: true, default: false},
  },
  {
    timestamps: true
  }
);

const Brand = mongoose.models.Brand || mongoose.model('Brand', brandSchema);

export default Brand;