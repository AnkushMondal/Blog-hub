import React, { useEffect } from "react";
import { Container, PostCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../features/post/postSlice";
import databaseService from "../appwrite/database";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await databaseService.getPosts();
        if (response && response.rows) {
          dispatch(setPosts(response.rows));
        }
      } catch (error) {
        console.error("Fetch Posts Error:", error);
      }
    };
    fetchPosts();
  }, [dispatch]);

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  if (!authStatus || !posts || posts.length === 0) {
    return (
      <div className="w-full overflow-hidden">
        <div className="relative bg-[#0F172A] py-24 md:py-40">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-0 right-0 w-125 h-125 bg-indigo-500/10 rounded-full blur-[120px]"
          />

          <Container>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="relative z-10 text-center max-w-4xl mx-auto"
            >
              <motion.span
                variants={fadeInUp}
                className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-indigo-400 uppercase bg-indigo-500/10 rounded-full border border-indigo-500/20"
              >
                Welcome to BlogHub
              </motion.span>
              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-8xl font-black text-white mb-8 leading-tight tracking-tighter"
              >
                Insightful stories for{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400">
                  curious minds.
                </span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto"
              >
                The modern home for writers. Explore deep dives into technology,
                creative arts, and the future of the digital world.
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link
                  to="/signup"
                  className="px-10 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-500/40 hover:scale-105 active:scale-95"
                >
                  Start Writing
                </Link>
                <Link
                  to="/login"
                  className="px-10 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all backdrop-blur-sm"
                >
                  Explore Feed
                </Link>
              </motion.div>
            </motion.div>
          </Container>
        </div>

        <div className="bg-slate-50 py-20">
          <Container>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop"
                alt="Digital Creativity"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent flex items-end p-12">
                <p className="text-white text-2xl font-medium italic">
                  "Connecting the world through the power of words."
                </p>
              </div>
            </motion.div>
          </Container>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#FDFDFD]">
      <div className="bg-white border-b border-slate-100 py-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between"
          >
            <div>
              <h2 className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-3">
                Fresh Perspectives
              </h2>
              <h1 className="text-5xl font-black text-slate-900">
                BlogHub Feed
              </h1>
            </div>
            <Link
              to="/add-post"
              className="mt-6 md:mt-0 group flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-full hover:bg-indigo-600 transition-all"
            >
              <span>Write a Story</span>
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </motion.div>
        </Container>
      </div>

      <div className="py-16">
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
          >
            {posts.map((post) => (
              <motion.div
                key={post.$id || post.slug}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <PostCard {...post} />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </div>

      <div className="py-24">
        <Container>
          <div className="relative bg-slate-900 rounded-[3rem] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=2070&auto=format&fit=crop"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
              alt="Community"
            />
            <div className="relative z-10 px-8 py-20 text-center">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Never miss a beat.
              </h2>
              <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto">
                Join 50,000+ subscribers and get the latest tech and lifestyle
                blogs weekly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto bg-white/10 p-2 rounded-3xl backdrop-blur-md border border-white/20">
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="bg-transparent px-6 py-3 text-white outline-none grow placeholder:text-slate-400"
                />
                <button className="px-8 py-3 bg-white text-slate-900 font-bold rounded-2xl hover:bg-indigo-400 hover:text-white transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Home;
