import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  selectedFile: String,
  tags: [String],
  likes: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date
  }
})

export const PostMessage = mongoose.model( "PostMessage", postSchema );
