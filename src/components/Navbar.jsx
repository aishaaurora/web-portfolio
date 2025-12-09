import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "../assets/raviKumarLogo.webp";
const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-6">
      <div className="flex flex-shrink-0 items-center">
        <a href="/" aria-label="Home">
          {/* <img src={logo} alt="" /> */}
        </a>
      </div>
      <div className="mx-8 flex items-center justify-center gap-4 text-2xl">
        <a
          href="https://www.linkedin.com/in/aishaaurora/"
          target="_blank"
          rel="noopener norefferer"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        
        <a
          href="https://www.instagram.com/cattyburn/"
          target="_blank"
          rel="noopener norefferer"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>
        {/* <a
          href="https://www.linkedin.com/in/maulana-malik-ibrahim-7b4539216/"
          target="_blank"
          rel="noopener norefferer"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a> */}
      </div>
    </nav>
  );
};

export default Navbar;
