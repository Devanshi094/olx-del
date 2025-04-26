import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#a3cced] text-[#183056] py-8 mt-10">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 📚 About Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">About DEL</h2>
          <p className="text-sm">
            Your one-stop platform to buy, sell, and discover the best deals
            across various categories. Post your ads now and find what you&apos;re
            looking for in just a few clicks!
          </p>
        </div>

        {/* 🔗 Quick Links */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:underline">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* 📞 Contact Us */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-yellow-400" />
              <span>123, Street Name, Mumbai, India</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-yellow-400" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-yellow-400" />
              <span>support@del.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 🌐 Social Media */}
      <div className="mt-8 border-t border-white/25 pt-6 flex flex-col md:flex-row justify-between items-center px-6">
        <p className="text-sm">© {new Date().getFullYear()} DEL. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link
            to="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="w-6 h-6 hover:text-yellow-300 transition duration-300" />
          </Link>
          <Link
            to="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="w-6 h-6 hover:text-yellow-300 transition duration-300" />
          </Link>
          <Link
            to="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="w-6 h-6 hover:text-yellow-300 transition duration-300" />
          </Link>
          <Link
            to="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Youtube className="w-6 h-6 hover:text-yellow-300 transition duration-300" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
