import { EXPERIENCES } from "../constants";
import { motion } from "framer-motion";

const Experiences = () => {
  return (
    <div className="border-b border-stone-200 pb-4">
      <motion.h2 
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1.5 }}
        className="my-20 text-center text-4xl text-stone-800"
      >
        Experience
      </motion.h2>
      <div>
        {EXPERIENCES.map((experience, index) => (
            <div key={index} className="mb-8 flex flex-wrap lg:justify-center">
                <motion.div 
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -100 }}
                    transition={{ duration: 1 }}
                    className="w-full lg:w-1/4"
                >
                    {/* Tahun biar lebih jelas sedikit */}
                    <p className="mb-2 text-base text-stone-500 font-medium">{experience.year}</p>
                </motion.div>
                <motion.div 
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: 100 }}
                    transition={{ duration: 1 }}
                    className="w-full max-w-xl lg:w-3/4"
                >
                    {/* UBAH DISINI: Font Role & Company diperbesar */}
                    <h6 className="mb-2 font-bold text-xl text-stone-800">
                        {experience.role} - <span className="text-lg text-pink-600">{experience.company}</span>
                    </h6>
                    
                    <p className="mb-4 text-stone-600">{experience.description}</p>
                    <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, index) => (
                            <span 
                                key={index} 
                                className="rounded bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 hover:bg-emerald-200 transition-colors"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Experiences;