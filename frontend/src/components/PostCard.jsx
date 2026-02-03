import { Calendar, User, ArrowRight } from "lucide-react";

const PostCard = ({ post }) => {
  return (
    <div className="group bg-white rounded-3xl border border-slate-100 p-2 shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Image Placeholder - We'll link the actual Render images next */}
      <div className="aspect-video bg-slate-100 rounded-2xl overflow-hidden relative">
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm">
            {post.category || "General"}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-4 text-slate-400 text-xs mb-3">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            {new Date(post.createdAt).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1">
            <User size={14} />
            {post.author?.name || "Anonymous"}
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
          {post.title}
        </h3>

        <p className="text-slate-500 text-sm line-clamp-2 mb-6">
          {post.content}
        </p>

        <button className="flex items-center gap-2 text-blue-600 font-bold text-sm">
          Read More{" "}
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </div>
  );
};

export default PostCard;
