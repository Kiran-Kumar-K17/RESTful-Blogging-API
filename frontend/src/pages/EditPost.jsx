import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../api/axios";
import { Save, ArrowLeft, Loader2 } from "lucide-react";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 1. Load the existing post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await apiClient.get(`/post/${id}`);
        setTitle(data.data.title);
        setContent(data.data.content);
      } catch (err) {
        alert("Failed to load post data.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, navigate]);

  // 2. Handle the Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiClient.patch(`/post/${id}`, { title, content });
      navigate(`/post/${id}`); // Redirect back to the post view
    } catch (err) {
      alert("You are not authorized to edit this post.");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-indigo-600" />
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 mb-8 font-bold"
      >
        <ArrowLeft size={20} /> Cancel
      </button>

      <h1 className="text-3xl font-black text-slate-900 mb-8">
        Edit Your Story
      </h1>

      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-3xl font-bold p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="New title..."
            required
          />
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
            Story Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-80 p-6 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-lg leading-relaxed"
            placeholder="Tell your story..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition flex items-center justify-center gap-2"
        >
          {saving ? (
            "Saving Changes..."
          ) : (
            <>
              <Save size={20} /> Save Changes
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default EditPost;
