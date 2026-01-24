import mongoose, { Schema } from "mongoose";

const postSchema = Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: [150, "Title is too long"],
    },
    content: {
      type: String,
      required: [true, "Content cannot be empty"],
    },
    author: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model("Post", postSchema);

export default Post;
