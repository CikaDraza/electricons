import mongoose from 'mongoose';

const trackSchema = new mongoose.Schema(
  {
    id: {type: String, required: false},
    visit: {type: Number, required: false},
  },
  {
    timestamps: true
  }
);

const TrackVisit = mongoose.models.TrackVisit || mongoose.model('TrackVisit', trackSchema);

export default TrackVisit;