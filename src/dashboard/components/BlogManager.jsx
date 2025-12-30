// src/dashboard/components/BlogManager.jsx

import React, { useState } from 'react';
import { Plus, Edit, Trash2, PenTool, ImageIcon } from 'lucide-react';
// We assume FORM_SCHEMAS will be available either through props or separate import if needed later.

const BlogManager = ({ posts, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  const handleEdit = (post) => {
    // Clone post to prevent direct state mutation before saving
    setCurrentPost({ ...post }); 
    setIsEditing(true);
  };

  const handleNew = () => {
    // Initialize new post structure
    setCurrentPost({ 
        title: '', 
        content: '', 
        category: 'General', 
        status: 'Draft', 
        author: 'Admin', // Default author
        date: new Date().toISOString().slice(0, 10) // Default date
    });
    setIsEditing(true);
  };

  const handleSavePost = (e) => {
    e.preventDefault();
    onSave(currentPost); // The onSave function in App.jsx handles setting the correct ID/status
    setIsEditing(false);
  };

  const handleSaveDraft = () => {
    if (currentPost) {
        onSave({ ...currentPost, status: 'Draft' });
    }
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    setCurrentPost(null);
  };


  if (isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">
            {currentPost.id ? 'Edit Post' : 'New Blog Post'}
          </h2>
          <button onClick={handleCancel} className="px-3 py-1 border rounded-lg text-slate-600 hover:bg-slate-50">Cancel</button>
        </div>
        
        <form onSubmit={handleSavePost} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Title</label>
            <input 
              type="text" 
              className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-amber-500 outline-none"
              value={currentPost.title || ''}
              onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Category */}
             <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                <select 
                  className="w-full border border-slate-300 rounded-lg p-3 outline-none"
                  value={currentPost.category || 'General'}
                  onChange={(e) => setCurrentPost({...currentPost, category: e.target.value})}
                >
                   <option>General</option>
                   <option>Cricket</option>
                   <option>Education</option>
                   <option>Music</option>
                </select>
             </div>
             {/* Featured Image */}
             <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Featured Image</label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-3 text-center text-slate-400 cursor-pointer hover:bg-slate-50 flex items-center justify-center gap-2">
                   <ImageIcon className="w-4 h-4" /> Upload Image
                </div>
             </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Content</label>
            <textarea 
              className="w-full border border-slate-300 rounded-lg p-3 h-64 focus:ring-2 focus:ring-amber-500 outline-none font-mono text-sm"
              value={currentPost.content || ''}
              onChange={(e) => setCurrentPost({...currentPost, content: e.target.value})}
              placeholder="Write your article here..."
              required
            />
          </div>

          <div className="flex justify-end gap-3">
             <button type="button" onClick={handleSaveDraft} className="px-6 py-2 border rounded-lg text-slate-600 hover:bg-slate-50">Save Draft</button>
             <button type="submit" className="px-6 py-2 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600">Publish</button>
          </div>
        </form>
      </div>
    );
  }

  // List View
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200 flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <PenTool className="w-5 h-5 text-slate-600"/> All Posts
        </h2>
        <button onClick={handleNew} className="flex items-center px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800">
          <Plus className="w-4 h-4 mr-2" /> New Post
        </button>
      </div>
      <div className="divide-y divide-slate-100">
        {posts.map(post => (
          <div key={post.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
            <div>
              <h3 className="font-bold text-slate-800">{post.title}</h3>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                <span>{post.category}</span>
                <span>•</span>
                <span>{post.date}</span>
                <span>•</span>
                <span className={`px-2 py-0.5 rounded-full ${post.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                  {post.status}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(post)} className="p-2 text-slate-400 hover:text-amber-500" title="Edit"><Edit className="w-4 h-4"/></button>
              <button onClick={() => onDelete('blog-manager', post.id)} className="p-2 text-slate-400 hover:text-red-500" title="Delete"><Trash2 className="w-4 h-4"/></button>
            </div>
          </div>
        ))}
        {posts.length === 0 && <div className="p-8 text-center text-slate-400">No blog posts found.</div>}
      </div>
    </div>
  );
};

export default BlogManager;