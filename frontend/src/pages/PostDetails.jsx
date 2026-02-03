import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import apiClient from "../api/axios";
import { Calendar, User, ArrowLeft, Trash2, Edit, Tag } from "lucide-react";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Safe User Check for Edit/Delete buttons
  const userItem = localStorage.getItem("user");
  const currentUser =
    userItem && userItem !== "undefined" ? JSON.parse(userItem) : null;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await apiClient.get(`/post/${id}`);
        setPost(data.data);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Delete this masterpiece forever?")) {
      try {
        await apiClient.delete(`/post/${id}`);
        navigate("/");
      } catch (err) {
        alert("Action failed: Are you the author?");
      }
    }
  };

  if (loading)
    return (
      <div className="py-20 text-center font-bold text-slate-400 animate-pulse">
        Fetching the story...
      </div>
    );
  if (!post) return <div className="py-20 text-center">Story not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 mb-8 font-bold transition"
      >
        <ArrowLeft size={20} /> Back to Feed
      </button>

      {/* Hero Image */}
      <img
        src={`https://my-blogging-api.onrender.com/image/posts/${post.coverImage || "default.jpg"}`}
        className="w-full h-[450px] object-cover rounded-[2.5rem] shadow-2xl mb-10"
        alt="Post Cover"
      />

      {/* Metadata */}
      <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 mb-8">
        <span className="flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full font-black uppercase tracking-widest text-[10px]">
          <Tag size={12} /> {post.category}
        </span>
        <span className="flex items-center gap-1">
          <Calendar size={16} /> {new Date(post.createdAt).toLocaleDateString()}
        </span>
        <span className="flex items-center gap-1">
          <User size={16} /> {post.author?.name || "Dev Member"}
        </span>
      </div>

      <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-8">
        {post.title}
      </h1>

      <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed whitespace-pre-line border-l-4 border-slate-100 pl-6 md:pl-10">
        {post.content}
      </div>

      {/* Author Controls */}
      {currentUser && currentUser._id === post.author?._id && (
        <div className="mt-16 pt-8 border-t border-slate-100 flex gap-4">
          <Link
            to={`/edit/${post._id}`}
            className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition shadow-lg"
          >
            <Edit size={18} /> Edit Story
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-8 py-4 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition"
          >
            <Trash2 size={18} /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
