import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePlus, Send, AlertCircle } from "lucide-react";
import apiClient from "../api/axios";
import { Button } from "../components/ui/Button";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("technology");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Image Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    if (image) formData.append("coverImage", image);

    try {
      await apiClient.post("/post", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/"); // Hero move: auto-redirect back to home
    } catch (err) {
      console.error("Upload failed", err);
      alert("Error creating post. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-black text-slate-900">Create New Story</h1>
        <p className="text-slate-500">
          Share your thoughts with the developer community.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
      >
        {/* Title Input */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Story Title
          </label>
          <input
            type="text"
            required
            value={title}
            placeholder="e.g., Mastering React Hooks"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-50 focus:border-blue-600 outline-none transition"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Category
          </label>
          <select
            value={category}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-50 focus:border-blue-600 outline-none transition"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="technology">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="coding">Coding</option>
          </select>{" "}
          {/* <--- Change this from </article> to </select> */}
        </div>

        {/* Content Textarea */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Content
          </label>
          <textarea
            required
            value={content}
            placeholder="Write your heart out..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 h-40 focus:ring-4 focus:ring-blue-50 focus:border-blue-600 outline-none transition resize-none"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* Image Upload Area */}
        <div className="relative group border-2 border-dashed border-slate-200 rounded-2xl p-4 hover:border-blue-400 transition cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleImageChange}
          />
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-xl"
            />
          ) : (
            <div className="flex flex-col items-center py-6 text-slate-400">
              <ImagePlus size={32} className="mb-2" />
              <p className="text-sm font-medium">
                Click to upload a cover image
              </p>
            </div>
          )}
        </div>

        <Button type="submit" loading={loading} className="w-full">
          <Send size={18} className="mr-2" /> Publish Story
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
