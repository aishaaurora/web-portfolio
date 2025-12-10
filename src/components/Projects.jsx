import { useState } from "react"; // Import useState untuk filter
import { PROJECTS } from "../constants";
import { motion, AnimatePresence } from "framer-motion"; // AnimatePresence untuk animasi halus
import { Link } from "react-router-dom";

const Projects = () => {
  // State untuk menyimpan kategori yang sedang aktif (Default: All)
  const [activeCategory, setActiveCategory] = useState("All");

  // Daftar kategori yang mau ditampilkan di tombol
  const categories = ["All", "3D Character", "3D Hardsurface","3D Icon", "Projects", "2D Illustration"];

  // Logika Filter: Jika "All" ambil semua, jika tidak ambil yang sesuai kategori
  const filteredProjects = activeCategory === "All" 
    ? PROJECTS 
    : PROJECTS.filter(project => project.category === activeCategory);

  return (
    <div className="pb-4">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1.5 }}
        className="my-20 text-center text-4xl text-stone-800"
      >
        Projects
      </motion.h2>

      {/* --- TOMBOL FILTER --- */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border 
              ${
                activeCategory === category
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-md scale-105" // Gaya saat Aktif
                  : "bg-white text-stone-600 border-stone-200 hover:border-emerald-400 hover:text-emerald-600" // Gaya saat Tidak Aktif
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* --- GRID PROJECTS --- */}
      <motion.div layout className="grid grid-cols-1 gap-8">
        <AnimatePresence>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.title} // Gunakan title sebagai key agar unik saat filter
                className="mb-8 flex flex-wrap lg:justify-center"
              >
                <div className="w-full lg:w-1/4">
                  <img
                    src={project.image}
                    width={250}
                    alt={project.title}
                    className="mb-6 rounded shadow-md"
                  />
                </div>
                <div className="w-full max-w-xl lg:w-3/4">
                  <h3 className="mb-2 font-semibold text-2xl text-stone-800">
                    {project.title}
                  </h3>
                  
                  {/* Label Kategori Kecil di atas Deskripsi */}
                  <span className="inline-block bg-stone-100 text-stone-500 text-xs px-2 py-1 rounded mb-2 border border-stone-200">
                    {project.category}
                  </span>

                  <p className="mb-4 text-stone-600">{project.description}</p>
                  
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                        <span
                        key={index}
                        className="rounded bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 hover:bg-emerald-200 transition-colors"
                        >
                        {tech}
                        </span>
                    ))}
                  </div>

                  <Link 
                    to={`/project/${PROJECTS.indexOf(project)}`} // Trik: Cari index asli dari data utama
                    className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-pink-600 transition-colors bg-white border border-stone-200 px-4 py-2 rounded-full mt-2 shadow-sm"
                  >
                    View Details
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            // Pesan jika kategori kosong (misal 2D Illustration belum ada isinya)
            <div className="text-center w-full py-10">
                <p className="text-stone-400">Belum ada project di kategori ini.</p>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Projects;