import Post from "../models/post.js";

async function getAllData(req, res) {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

async function postData(req, res) {
  try {
    const data = req.body;
    const newPost = await Post.create(data);
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

async function getById(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, error: "Invalid ID format" });
  }
}

async function deleteData(req, res) {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

async function updateData(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedPost = await Post.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!updatedPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, data: updatedPost });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

export { getAllData, postData, getById, deleteData, updateData };
