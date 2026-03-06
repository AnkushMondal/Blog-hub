import React from "react";
import { Container } from "../components";
import PostForm from "../components/Post/PostForm";
import { motion } from "framer-motion";

const AddPost = () => {
  const containerFade = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageSide = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } },
  };

  return (
    <div className="py-12 bg-[#F8FAFC] min-h-screen">
      <Container>
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <motion.div
            variants={imageSide}
            initial="hidden"
            animate="visible"
            className="hidden lg:block lg:w-1/3 sticky top-28"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 to-purple-600 rounded-4xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-white rounded-4xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1516414447565-b14be0adf13e?q=80&w=1973&auto=format&fit=crop"
                  alt="Creative Workspace"
                  className="w-full h-80 object-cover"
                />
                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Writing Studio
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    "Every secret of a writer's soul, every experience of his
                    life, every quality of his mind, is written large in his
                    works."
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-indigo-600 font-semibold text-xs uppercase tracking-widest">
                    <span className="w-8 h-0.5 bg-indigo-600"></span>
                    BlogHub Creator
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={containerFade}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-2/3"
          >
            <div className="mb-10 text-center md:text-left">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 rounded-full"
              >
                New Story
              </motion.span>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                Craft your{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-violet-600">
                  Masterpiece.
                </span>
              </h1>
              <p className="text-slate-500 mt-4 text-lg">
                Fill in the details below to share your thoughts with the
                BlogHub community.
              </p>
            </div>

            <div className="bg-white p-6 md:p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-50 rounded-full opacity-50"></div>

              <div className="relative z-10">
                <PostForm />
              </div>
            </div>

            <p className="mt-8 text-center text-slate-400 text-sm">
              Your post will be saved to our secure database instantly.
            </p>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default AddPost;
