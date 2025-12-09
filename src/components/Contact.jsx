import { CONTACT } from "../constants";
import { motion } from "framer-motion";
import { SiGmail, SiInstagram } from "react-icons/si"; // Import Ikon

const Contact = () => {
  return (
    <div className="border-b border-stone-200 pb-20">
      <motion.h2 
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="my-10 text-center text-4xl text-stone-800"
      >
        Get in Touch
      </motion.h2>
      
      <div className="flex flex-col items-center justify-center gap-6 tracking-tighter text-stone-600">
        
        {/* EMAIL */}
        <motion.a 
            href={`mailto:${CONTACT.email}`}
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -50 }}
            transition={{ duration: 1 }}
            className="flex items-center gap-3 text-lg font-medium hover:text-pink-600 transition-colors group"
        >
            <div className="bg-stone-100 p-3 rounded-full group-hover:bg-pink-100 transition-colors">
                <SiGmail className="text-xl text-stone-700 group-hover:text-pink-600" />
            </div>
            {CONTACT.email}
        </motion.a>

        {/* INSTAGRAM */}
        <motion.a 
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 50 }}
            transition={{ duration: 1 }}
            className="flex items-center gap-3 text-lg font-medium hover:text-pink-600 transition-colors group"
        >
             <div className="bg-stone-100 p-3 rounded-full group-hover:bg-pink-100 transition-colors">
                <SiInstagram className="text-xl text-stone-700 group-hover:text-pink-600" />
            </div>
            {CONTACT.instagramHandle}
        </motion.a>

      </div>
    </div>
  );
};

export default Contact;