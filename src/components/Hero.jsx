import profileAbim from "../assets/profilePic.png";
import { HERO_CONTENT } from "../constants";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.5,
    },
  },
};

const childVariants = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Hero = () => {
  return (
    <div className="pb-4 lg:mb-36">
      <div className="flex flex-wrap lg:flex-row-reverse">
        <div className="flex justify-center lg:p-8">
          <motion.img
            src={profileAbim}
            alt="Aisha Aurora Zirlyvera"
            className="rounded-3xl"
            width={550}
            height={550}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          />
        </div>
        <motion.div
          className="w-full lg:w-1/2 "
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="flex flex-col items-center lg:items-start mt-10">
            <motion.h2
              variants={childVariants}
              className="pb-2 text-4xl tracking-tighter lg:text-8xl bg-gradient-to-r from-emerald-900 to-green-700 bg-clip-text text-transparent"
            >
              Aisha Aurora Zirlyvera
            </motion.h2>
            
            {/* KEMBALI KE SEMULA: Teks Gradasi (Tanpa Box) */}
            <motion.span
              variants={childVariants}
              className="bg-gradient-to-r from-pink-300 to-emerald-300 bg-clip-text text-3xl tracking-tight text-transparent font-semibold"
            >
              3D Artist Generalist
            </motion.span>
            
            <motion.p
              variants={childVariants}
              className="my-2 max-w-lg py-6 text-xl loading-relaxed tracking-tighter"
            >
              {HERO_CONTENT}
            </motion.p>
            
            {/* UPDATE: Tombol Hijau Murni (Tanpa Pink) */}
            <motion.a
              variants={childVariants}
              href="/cvabeemm.pdf"
              target="_blank"
              rel="noopener noreference"
              download
              // Menggunakan gradasi hijau yang sama dengan Nama (emerald-900 ke green-700)
              className="bg-gradient-to-r from-emerald-900 to-green-700 text-white rounded-full p-4 text-sm font-semibold mb-10 shadow-lg hover:shadow-xl hover:scale-105 hover:from-emerald-800 hover:to-green-600 transition-all duration-300"
            >
              Download CV
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;