import React, { useState, useEffect } from 'react';
import { Upload, X, Trash2, Image as ImageIcon } from 'lucide-react';

const GalleryManager = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Events');
    const [file, setFile] = useState(null);

    const categories = ['Events', 'Education', 'Projects', 'Awards', 'General'];

    // Base API URL handling for local/production
    const getApiUrl = () => {
        const hostname = window.location.hostname;
        return (hostname === 'localhost' || hostname === '127.0.0.1')
            ? 'http://localhost/gatla-foundation/api'
            : 'https://gatlafoundation.org/api';
    };
    const apiUrl = getApiUrl();

    const fetchImages = async () => {
        try {
            const res = await fetch(`${apiUrl}/get_gallery.php`);
            const data = await res.json();
            setImages(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to load images", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files[0]) setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return alert("Please select an image");

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', title);
        formData.append('category', category);

        try {
            const res = await fetch(`${apiUrl}/upload_gallery.php`, {
                method: 'POST',
                body: formData
            });

            if (res.ok) {
                setTitle('');
                setFile(null);
                // Reset file input manually if needed or via key
                fetchImages();
                alert("Image uploaded successfully");
            } else {
                alert("Upload failed");
            }
        } catch (err) {
            console.error(err);
            alert("Error uploading image");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this image?")) return;

        try {
            const res = await fetch(`${apiUrl}/delete_gallery.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });

            if (res.ok) {
                setImages(images.filter(img => img.id !== id));
            } else {
                alert("Failed to delete");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-8">
            {/* Upload Section */}
            <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Upload className="w-5 h-5 mr-2 text-amber-500" /> Upload New Image
                </h3>
                <form onSubmit={handleUpload} className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-slate-400 text-sm mb-1">Image Title / Caption</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                                placeholder="e.g. Annual Sports Meet 2025"
                            />
                        </div>
                        <div>
                            <label className="block text-slate-400 text-sm mb-1">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                            >
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center">
                        <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-amber-500 transition-colors cursor-pointer relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            {file ? (
                                <div className="text-amber-400 font-medium truncate">{file.name}</div>
                            ) : (
                                <div className="text-slate-400">
                                    <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                    <span className="text-sm">Click to select image</span>
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={uploading || !file}
                            className={`mt-4 w-full py-2 rounded-lg font-bold uppercase tracking-wider transition-all
                        ${uploading || !file
                                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-amber-500 to-amber-600 text-[#0B1120] hover:shadow-lg'}`}
                        >
                            {uploading ? 'Uploading...' : 'Upload to Gallery'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Gallery Grid */}
            <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700 min-h-[400px]">
                <h3 className="text-xl font-bold text-white mb-6">Gallery Library ({images.length})</h3>

                {loading ? (
                    <div className="text-center text-slate-500 py-10">Loading images...</div>
                ) : images.length === 0 ? (
                    <div className="text-center text-slate-500 py-10 italic">No images in gallery yet.</div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map(img => (
                            <div key={img.id} className="group relative bg-slate-900 rounded-lg overflow-hidden border border-slate-800 hover:border-amber-500/50 transition-all">
                                <div className="aspect-square overflow-hidden">
                                    <img
                                        src={img.image_path.startsWith('http') ? img.image_path : `${apiUrl}/uploads/${img.image_path}`}
                                        alt={img.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-3">
                                    <h4 className="text-white font-medium text-sm truncate" title={img.title}>{img.title || "Untitled"}</h4>
                                    <span className="text-xs text-amber-500 uppercase tracking-wider">{img.category}</span>
                                </div>
                                <button
                                    onClick={() => handleDelete(img.id)}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                    title="Delete Image"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GalleryManager;
