import { useEffect, useState } from "react";
import apiClient from "../api/axios";
import PostCard from "../components/PostCard";
import { Loader2, Newspaper } from "lucide-react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // Using our custom axios client
        const response = await apiClient.get("/post");

        if (response.data && response.data.success) {
          setPosts(response.data.data);
        }
      } catch (err) {
        setError("Failed to fetch stories. Is the server waking up?");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 1. Loading State
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="mt-4 text-slate-500 font-medium">
          Fetching the latest stories from Render...
        </p>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="text-center py-20 bg-red-50 rounded-3xl border border-red-100">
        <p className="text-red-600 font-bold">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-sm font-bold text-red-800 underline"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <header className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          Engineering <span className="text-blue-600">Insights</span>
        </h1>
        <p className="text-slate-500 mt-2 text-lg">
          The latest articles from our community of developers.
        </p>
      </header>

      {/* 3. Empty State */}
      {posts.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-3xl">
          <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 font-medium">No posts found yet.</p>
        </div>
      ) : (
        /* 4. The Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
