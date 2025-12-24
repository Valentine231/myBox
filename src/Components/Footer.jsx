import React from 'react'
import { Facebook, Twitter, Instagram, Github } from 'lucide-react'
import Logo from './Logo'

const Footer = () => {
  return (
    <footer className="bg-black/80 text-gray-300 py-4 px-6 text-center border-t border-gray-700">
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto gap-3">
        <Logo />
        <p className="text-sm">
          © {new Date().getFullYear()} <span className="text-blue-500 font-semibold">MyBoxOffice</span>. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-blue-500 transition-colors">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-blue-400 transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-pink-500 transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="https://github.com/Valentine231" target="_blank" className="hover:text-gray-100 transition-colors">
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
