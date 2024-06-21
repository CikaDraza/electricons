import mongoose from 'mongoose';

const TrackLocationSchema = new mongoose.Schema({
  imageId: String,
  userId: String,
  ip: String,
  location: {
    city: String,
    region: String,
    country: String,
  },
  timestamp: { type: Date, default: Date.now }
});

const TrackLocation = mongoose.models.TrackLocation || mongoose.model('TrackLocation', TrackLocationSchema);

export default TrackLocation;