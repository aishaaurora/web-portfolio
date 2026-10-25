import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  // State baru untuk menyimpan data dari Notion dan status loading
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Kategori filter dinamis berdasarkan data projects yang di-fetch dari Notion
  const allCategories = [
    "All",
    ...new Set(
      projects
        .flatMap((p) => {
          const cats = p.categories ?? p.category ?? [];
          return Array.isArray(cats) ? cats : [cats];
        })
        .filter(Boolean)
    ),
  ];

  // Menarik data dari API lokal saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const contentType = response.headers.get("content-type");
        if (!response.ok) {
          throw new Error('Gagal mengambil data dari server (status: ' + response.status + ')');
        }
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error('Endpoint /api/projects mengembalikan format non-JSON. Silakan restart "npm start" agar setupProxy aktif, atau jalankan "npm run dev".');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter menggunakan state 'projects' hasil fetch
  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(project => {
      const cats = project.categories ?? project.category ?? [];
      return Array.isArray(cats) ? cats.includes(activeCategory) : cats === activeCategory;
    });

  return (
    <div className="pb-4">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1.5 }}
        className="my-20 text-center text-4xl text-stone-800 font-bold"
      >
        Projects
      </motion.h2>

      {/* --- TOMBOL FILTER --- */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border 
              ${activeCategory === category
                ? "bg-emerald-600 text-white border-emerald-600 shadow-md scale-105"
                : "bg-white text-stone-600 border-stone-200 hover:border-emerald-400 hover:text-emerald-600"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* --- LOADING & ERROR STATES --- */}
      {loading && (
        <div className="text-center w-full py-20">
          <p className="text-emerald-600 font-medium animate-pulse">Loading projects data...</p>
        </div>
      )}

      {error && (
        <div className="text-center w-full py-20">
          <p className="text-red-500 font-medium">Error: {error}</p>
        </div>
      )}

      {/* --- GRID PROJECTS --- */}
      {!loading && !error && (
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          <AnimatePresence>
            {filteredProjects.length > 0 ? (
              filteredProjects.slice().reverse().map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={project.id} // Diubah menggunakan project.id dari database
                  className="flex flex-col gap-6 bg-white p-6 lg:p-8 rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow h-full"
                >
                  {/* --- BAGIAN GAMBAR --- */}
                  <div className="w-full">
                    <div className="relative w-full aspect-video overflow-hidden rounded-xl shadow-lg border border-stone-100 bg-stone-100">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* --- BAGIAN TEKS & TOMBOL --- */}
                  <div className="w-full flex flex-col h-full">
                    <h3 className="mb-2 font-bold text-3xl text-stone-800 tracking-tight">
                      {project.title}
                    </h3>

                    {/* Label Kategori */}
                    <div className="mb-4 flex gap-2 flex-wrap items-start">
                      {project.categories && project.categories.map((cat, idx) => (
                        <span key={idx} className="inline-flex bg-stone-100/80 backdrop-blur-sm text-stone-500 text-xs px-3 py-1.5 rounded-full border border-stone-200/50 font-medium tracking-wide">
                          {cat}
                        </span>
                      ))}
                    </div>

                    <p className="mb-6 text-stone-600 leading-relaxed text-lg flex-grow">{project.description}</p>

                    {/* Software/Tools */}
                    <div className="mb-6 flex flex-wrap gap-2 items-start">
                      {project.technologies && project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="rounded bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 border border-emerald-100/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Tombol View Details */}
                    <div>
                      <Link
                        to={`/project/${project.id}`} // Diubah dari indexOf menjadi ID Database
                        className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-white transition-all duration-300 bg-white hover:bg-emerald-600 border border-stone-200 hover:border-emerald-600 px-6 py-2.5 rounded-full shadow-sm hover:shadow-md group"
                      >
                        View Details
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center w-full py-10">
                <p className="text-stone-400">Belum ada project di kategori ini.</p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default Projects;