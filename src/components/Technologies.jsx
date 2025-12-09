// Import Icon Software dari 'react-icons/si' (Simple Icons)
import { 
  SiBlender, 
  SiUnity, 
  SiUnrealengine, 
  SiAdobephotoshop,
  SiAutodesk,
  SiAdobeillustrator,
  SiSketchup
} from "react-icons/si"; 
import { motion } from "framer-motion";

// IMPORT ICON PNG (Contoh nanti kalau kamu sudah download logonya)
import substanceIcon from "../assets/SP_Logo.png";
// import zbrushIcon from "../assets/zbrush.png";

const iconVariants = (duration) => ({
  initial: { y: -10 },
  animate: {
    y: [10, -10],
    transition: {
      duration: duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
});

const Technologies = () => {
  return (
    <div className="pb-24">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1.5 }}
        className="my-20 text-center text-4xl text-stone-800"
      >
        Software & Tools
      </motion.h2>
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        className="flex flex-wrap justify-center gap-8 items-center"
      >
        
        {/* BLENDER (Ada di React Icons) */}
        <motion.div
          variants={iconVariants(2.5)}
          initial="initial"
          animate="animate"
          className="p-4"
          title="Blender"
        >
          <SiBlender className="text-7xl text-orange-500" />
        </motion.div>

        {/* UNITY (Ada di React Icons) */}
        <motion.div
          variants={iconVariants(3)}
          initial="initial"
          animate="animate"
          className="p-4"
          title="Unity Engine"
        >
          <SiUnity className="text-7xl text-stone-700" />
        </motion.div>
        <motion.div
          variants={iconVariants(3.5)}
          initial="initial"
          animate="animate"
          className="p-4"
          title="Adobe Illustrator"
        >
          <SiAdobeillustrator className="text-7xl text-orange-600" />
        </motion.div>

        <motion.div
          variants={iconVariants(4.5)}
          initial="initial"
          animate="animate"
          className="p-4"
          title="Sketchup"
        >
          <SiSketchup className="text-7xl text-blue-500" />
        </motion.div>

        {/* UNREAL ENGINE (Ada di React Icons) */}
        <motion.div
          variants={iconVariants(5)}
          initial="initial"
          animate="animate"
          className="p-4"
          title="Unreal Engine"
        >
            <div className="bg-stone-800 rounded-full p-2">
                <SiUnrealengine className="text-6xl text-white" />
            </div>
        </motion.div>

        {/* PHOTOSHOP (Ada di React Icons) */}
        <motion.div
          variants={iconVariants(2)}
          initial="initial"
          animate="animate"
          className="p-4"
          title="Adobe Photoshop"
        >
          <SiAdobephotoshop className="text-7xl text-blue-600" />
        </motion.div>

        {/* AUTODESK (Maya/3ds Max) - Placeholder Umum */}
        

        
        {<motion.div
            variants={iconVariants(4)}
            initial="initial"
            animate="animate"
            className="p-4"
        >
            <img src={substanceIcon} alt="Substance Painter" className="w-20 h-20 object-contain" />
        </motion.div> 
        }

      </motion.div>
    </div>
  );
};

export default Technologies;