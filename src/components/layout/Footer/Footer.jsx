import React from "react";
import { Link } from "react-router-dom";
import { Container, Logo } from "../../index";
import { motion } from "framer-motion";

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <footer className="relative bg-[#0F172A] text-slate-400 overflow-hidden border-t border-slate-800">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-indigo-500 to-transparent opacity-30"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 relative z-10"
      >
        <motion.div variants={footerVariants} className="space-y-6">
          <div className="inline-flex items-center group">
            <div className="p-2 bg-white/5 rounded-xl border border-white/10 group-hover:border-indigo-500/50 transition-colors">
              <Logo width="50px" />
            </div>
            <span className="ml-3 text-2xl font-black text-white tracking-tighter">
              Blog<span className="text-indigo-500">Hub</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            Empowering voices and connecting minds through the art of modern
            storytelling. 
          </p>
          <p className="text-xs text-slate-500 font-medium tracking-wide">
            &copy; {new Date().getFullYear()} BlogHub Studio.
          </p>
        </motion.div>

        <motion.div variants={footerVariants}>
          <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400">
            Company
          </h3>
          <ul className="space-y-4">
            {["Features", "Pricing", "Affiliate Program", "Press Kit"].map(
              (link) => (
                <li key={link}>
                  <Link
                    to="/"
                    className="text-sm hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </motion.div>

        <motion.div variants={footerVariants}>
          <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400">
            Support
          </h3>
          <ul className="space-y-4">
            {["Account", "Help", "Contact Us", "Customer Support"].map(
              (link) => (
                <li key={link}>
                  <Link
                    to="/"
                    className="text-sm hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </motion.div>

        <motion.div variants={footerVariants}>
          <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400">
            Legals
          </h3>
          <ul className="space-y-4">
            {["Terms & Conditions", "Privacy Policy", "Licensing"].map(
              (link) => (
                <li key={link}>
                  <Link
                    to="/"
                    className="text-sm hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </motion.div>
      </motion.div>

      <div className="border-t border-slate-800/50 py-8 bg-black/20">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
            <div className="flex gap-6">
              <a href="#" className="hover:text-indigo-400 transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-indigo-400 transition-colors">
                LinkedIn
              </a>
              <a href="#" className="hover:text-indigo-400 transition-colors">
                GitHub
              </a>
            </div>
            <p>Made with ❤️ for the Developer Community</p>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
