import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
  text: {
    type: String,
    required: false,
    index: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  like:  [
    {
      type: String,
    },
  ],
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parentId: {
    type: String,
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  image: {
    type: String,
    required: false,
  },
});

threadSchema.index({ text: "text", "author.name": "text", "author.username": "text" });

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;
