import { PROJECTS } from "../constants";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Projects = () => {
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
      <div>
        {PROJECTS.map((project, index) => (
          <div key={index} className="mb-8 flex flex-wrap lg:justify-center">
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -100 }}
              transition={{ duration: 1 }}
              className="w-full lg:w-1/4"
            >
              <img
                src={project.image}
                width={250}
                alt={project.title}
                className="mb-6 rounded shadow-md"
              />
            </motion.div>
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -100 }}
              transition={{ duration: 1 }}
              className="w-full max-w-xl lg:w-3/4"
            >
              <h3 className="mb-2 font-semibold text-2xl text-stone-800">{project.title}</h3>
              <p className="mb-4 text-stone-600">{project.description}</p>
              
              <div className="mb-4 flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                    <span
                    key={index}
                    // DISAMAKAN: Sekarang pakai style Emerald juga
                    className="rounded bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 hover:bg-emerald-200 transition-colors"
                    >
                    {tech}
                    </span>
                ))}
              </div>

              <Link 
                to={`/project/${index}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-pink-600 transition-colors bg-white border border-stone-200 px-4 py-2 rounded-full mt-2 shadow-sm"
              >
                View Detail
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;