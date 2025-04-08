// components/Footer.jsx
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12 border-t border-gray-700">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-xl font-bold text-white tracking-wide">NextPick</h1>
          <p className="text-xs text-gray-400 mt-1">Your Personal Movie Genie!</p>
        </div>

        <div className="flex gap-6 text-xl">
          <a href="https://github.com/siddharthtashildar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/siddharthtashildar/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <FaLinkedin />
          </a>
          <a href="https://www.instagram.com/siddharthtashildar17/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <FaInstagram  />
          </a>
        </div>

        <p className="text-xs text-gray-500 text-center md:text-right">
          © {new Date().getFullYear()} NextPick. Built with 🍿 and React.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
