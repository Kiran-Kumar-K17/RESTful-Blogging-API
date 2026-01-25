import Post from "../models/post.js";

async function getAllData(req, res) {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "field"];
    excludedFields.forEach((el) => delete queryObj[el]);
    let query = Post.find(queryObj);

    const sortBy = req.query.sort || "-createdAt";
    query = query.sort(sortBy);

    if (req.query.field) {
      const fields = req.query.field.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    const posts = await query;
    const totalPosts = await Post.countDocuments(queryObj);
    res.status(200).json({
      success: true,
      results: posts.length,
      data: posts,
      pagination: {
        totalPosts,
        currentPage: page,
      },
    });
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
