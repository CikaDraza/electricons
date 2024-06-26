import * as mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    authorName: { type: String, required: true },
    slug: { type: String, required: true },
    email: { type: String, required: true },
    content: { type: String, required: true },
    isAdminReply: { type: Boolean, default: false },
    replyCommentId: { type: String, default: false }
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

export default Comment;