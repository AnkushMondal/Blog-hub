import React, { useEffect } from "react";
import { Container, PostCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../features/post/postSlice";
import databaseService from "../appwrite/database";
import { motion } from "framer-motion";

function AllPosts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await databaseService.getPosts();
        if (response) {
          dispatch(setPosts(response.rows || response.documents));
        }
      } catch (error) {
        console.error("Fetch Posts Error:", error);
      }
    };
    fetchPosts();
  }, [dispatch]);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Each card appears 0.1s after the previous one
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC]">
      <div className="relative w-full h-64 md:h-80 overflow-hidden mb-12">
        <img
          src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop"
          alt="Library"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/60 to-transparent flex items-center">
          <Container>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-xl"
            >
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                The BlogHub <span className="text-indigo-400">Archive</span>
              </h1>
              <p className="text-slate-200 text-lg md:text-xl font-medium">
                Deep dives, tutorials, and stories curated for the modern
                creator.
              </p>
            </motion.div>
          </Container>
        </div>
      </div>

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-20"
        >
          {posts?.map((post) => (
            <motion.div
              key={post.$id || post.slug}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className="h-full"
            >
              <PostCard {...post} />
            </motion.div>
          ))}
        </motion.div>

        {(!posts || posts.length === 0) && (
          <div className="flex flex-col items-center justify-center py-20">
            <img
              src="https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=2070&auto=format&fit=crop"
              alt="Empty Archive"
              className="w-64 h-64 object-contain mb-6 opacity-50 grayscale"
            />
            <h3 className="text-xl font-bold text-slate-400">
              No stories found yet...
            </h3>
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
