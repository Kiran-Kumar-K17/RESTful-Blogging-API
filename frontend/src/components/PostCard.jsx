import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link

const PostCard = ({ post }) => {
  // Construct the image URL from your Render backend
  const imageUrl = post.coverImage
    ? `https://my-blogging-api.onrender.com/image/posts/${post.coverImage}`
    : "https://via.placeholder.com/800x450?text=No+Image";

  return (
    <div className="group bg-white rounded-3xl border border-slate-100 p-2 shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Clicking the image also takes you to the post */}
      <Link to={`/post/${post._id}`}>
        <div className="aspect-video bg-slate-100 rounded-2xl overflow-hidden relative">
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm">
              {post.category || "Technology"}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-center gap-4 text-slate-400 text-xs mb-3">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            {new Date(post.createdAt).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1 font-medium">
            <User size={14} />
            {post.author?.name || "Dev Member"}
          </div>
        </div>

        {/* Title Link */}
        <Link to={`/post/${post._id}`}>
          <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors mb-2 line-clamp-1">
            {post.title}
          </h3>
        </Link>

        <p className="text-slate-500 text-sm line-clamp-2 mb-6">
          {post.content}
        </p>

        {/* Read More Link */}
        <Link
          to={`/post/${post._id}`}
          className="flex items-center gap-2 text-indigo-600 font-bold text-sm hover:gap-3 transition-all"
        >
          Read Full Story{" "}
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
