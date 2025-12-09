import { Routes, Route } from "react-router-dom"; // Import Wajib
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Technologies from "./components/Technologies";
import Projects from "./components/Projects";
import Experiences from "./components/Experiences";
import Contact from "./components/Contact";
import ProjectDetail from "./components/ProjectDetail"; // Import halaman baru

const App = () => {
  return (
    <div className="overflow-x-hidden text-neutral-800 antialiased selection:bg-pink-300 selection:text-pink-900">
      
      {/* BACKGROUND TETAP ADA DI SEMUA HALAMAN */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-white overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-pink-300/85 blur-[100px] opacity-70"></div>
        <div className="absolute bottom-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-emerald-300/85 blur-[120px] opacity-70"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40"></div>
      </div>

      <div className="container mx-auto px-8 relative z-10">
        {/* Navbar selalu muncul di atas */}
        <Navbar />

        {/* AREA KONTEN BERGANTI-GANTI */}
        <Routes>
            {/* HALAMAN UTAMA (HOME) */}
            <Route path="/" element={
                <>
                    <Hero />
                    <Technologies />
                    <Projects />
                    <Experiences />
                    <Contact />
                </>
            } />

            {/* HALAMAN DETAIL PROJECT */}
            <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;