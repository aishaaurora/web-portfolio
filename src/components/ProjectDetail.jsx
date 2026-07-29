import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProject = async () => {
      try {
        const response = await fetch('/api/projects');
        
        const contentType = response.headers.get("content-type");
        let data = null;
        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        }

        if (!response.ok) {
          throw new Error(data?.error || `Gagal mengambil data dari server (Status: ${response.status})`);
        }

        const foundProject = data.find(p => p.id === id);
        setProject(foundProject);
      } catch (err) {
        console.error("Error fetching project detail:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center w-full py-40">
        <p className="text-emerald-600 font-medium animate-pulse text-xl">Loading project details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center w-full py-40">
        <p className="text-red-500 font-medium text-xl">Error: {error}</p>
        <Link to="/" className="inline-block mt-4 text-emerald-600 hover:underline">Back to Home</Link>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center text-stone-500 mt-40">
        <h2 className="text-2xl font-bold mb-4">Project tidak ditemukan!</h2>
        <Link to="/" className="inline-block text-emerald-600 hover:underline">Back to Home</Link>
      </div>
    );
  }

  const galleryImages = project.gallery || [];

  return (
    <div className="pb-4 pt-20 lg:mb-36 text-stone-800">
      <div className="max-w-7xl mx-auto px-6"> 
        
        <Link to="/" className="inline-flex items-center gap-2 mb-8 text-stone-500 hover:text-pink-600 transition-colors font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to Home
        </Link>

        {/* --- MAIN INFO --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-start">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
            >
                <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-auto rounded-3xl shadow-2xl border border-white/50"
                />
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col justify-center h-full"
            >
                <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-900 to-green-700 bg-clip-text text-transparent">
                    {project.title}
                </h1>

                <div className="bg-white/60 p-8 rounded-3xl border border-stone-100 shadow-sm backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-4 text-stone-800 flex items-center gap-2">
                        About Project
                    </h3>
                    <p className="text-lg leading-relaxed text-stone-600 mb-8">
                        {project.description}
                    </p>

                    <h3 className="text-xl font-semibold mb-4 text-stone-800">Tools</h3>
                    <div className="flex flex-wrap gap-2 mb-8">
                        {project.technologies.map((tech, index) => (
                            <span key={index} className="bg-gradient-to-r from-stone-800 to-stone-700 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-md">
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* --- BUTTON LINK BARU --- */}
                    {project.link && (
                        <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                            Link
                        </a>
                    )}
                </div>
            </motion.div>
        </div>
      </div>

      {/* --- GALERI RENDER --- */}
      <div className="w-full mt-20 border-t border-stone-200 pt-16">
          <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold mb-10 text-center text-stone-800"
          >
              Project Gallery
          </motion.h3>
          
          {galleryImages.length > 0 ? (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                  {galleryImages.map((img, index) => (
                      <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="group relative overflow-hidden cursor-pointer"
                      >
                          <img 
                              src={img} 
                              alt={`Render ${index + 1}`} 
                              className="w-full h-auto object-contain transform transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </motion.div>
                  ))}
              </div>
          ) : (
              <div className="max-w-7xl mx-auto text-center py-16 bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200 px-6">
                  <p className="text-stone-500 font-medium text-lg mb-2">Belum ada gambar tambahan.</p>
              </div>
          )}
      </div>
    </div>
  );
};

export default ProjectDetail;