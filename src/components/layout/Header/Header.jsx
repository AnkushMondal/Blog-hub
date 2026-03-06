import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { LogoutButton, Container, Logo } from "../../index";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to track current routing
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", URL: "/", active: true },
    { name: "All Posts", URL: "/all-posts", active: authStatus },
    { name: "Add Post", URL: "/add-post", active: authStatus },
    { name: "Login", URL: "/login", active: !authStatus },
    { name: "Signup", URL: "/signup", active: !authStatus },
  ];

  return (
    <header className="sticky top-0 z-50 w-full py-3 bg-white/70 backdrop-blur-xl border-b border-slate-100 shadow-sm">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo with Animation */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Link to="/" className="flex items-center transition-transform hover:scale-105">
              <Logo width="50px" />
              <span className="hidden sm:block text-2xl font-black tracking-tighter text-slate-900 ml-1">
                Blog<span className="text-indigo-600">Hub</span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center bg-slate-100/50 p-1.5 rounded-full border border-slate-200/50">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="relative">
                  <button
                    onClick={() => navigate(item.URL)}
                    className={`relative z-10 px-5 py-2 text-sm font-semibold transition-colors duration-300 rounded-full ${
                      location.pathname === item.URL ? "text-white" : "text-slate-600 hover:text-indigo-600"
                    }`}
                  >
                    {item.name}
                    
                    {/* Active Route Indicator (The "Field") */}
                    {location.pathname === item.URL && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-indigo-600 rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              ) : null
            )}
          </ul>

          <div className="flex items-center gap-4">
            {authStatus && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="hidden md:block"
              >
                <LogoutButton />
              </motion.div>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden p-2 text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </nav>

        {/* Animated Mobile Nav Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-4 pb-4 flex flex-col gap-2">
                {navItems.map((item) =>
                  item.active ? (
                    <button
                      key={item.name}
                      onClick={() => { navigate(item.URL); setIsOpen(false); }}
                      className={`block w-full text-left px-5 py-3 text-base font-bold rounded-2xl transition-all ${
                        location.pathname === item.URL 
                          ? "bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600" 
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {item.name}
                    </button>
                  ) : null
                )}
                {authStatus && (
                   <div className="pt-2 border-t border-slate-100">
                     <LogoutButton />
                   </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
};

export default Header;