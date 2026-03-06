import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentPost,
  deletePost as deletePostAction,
} from "../features/post/postSlice";
import databaseService from "../appwrite/database";
import storageService from "../appwrite/storage";
import { motion } from "framer-motion";

export default function Post() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.currentPost);
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        navigate("/");
        return;
      }
      try {
        const response = await databaseService.getPost(slug);
        if (response) {
          dispatch(setCurrentPost(response));
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Fetch Post Error:", error);
        navigate("/");
      }
    };
    fetchPost();
  }, [slug, navigate, dispatch]);

  const deletePostHandler = async () => {
    try {
      const status = await databaseService.deletePost(post.$id);
      if (status) {
        await storageService.deleteFile(post.featuredImage);
        dispatch(deletePostAction(post.$id));
        navigate("/");
      }
    } catch (error) {
      console.error("Delete Post Error:", error);
    }
  };

  return post ? (
    <div className="w-full min-h-screen bg-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-[50vh] md:h-[60vh] relative overflow-hidden bg-slate-900"
      >
        <img
          src={storageService.getFilePreview(post.featuredImage)}
          alt={post.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent" />
      </motion.div>

      <Container>
        <div className="max-w-3xl mx-auto -mt-32 relative z-10 pb-20">
          {isAuthor && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex justify-end gap-3 mb-8"
            >
              <Link to={`/edit-post/${post.$id}`}>
                <button className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 transition-all">
                  Edit Post
                </button>
              </Link>
              <button
                onClick={deletePostHandler}
                className="px-6 py-2 bg-rose-500 text-white font-bold rounded-full shadow-lg hover:bg-rose-600 transition-all"
              >
                Delete
              </button>
            </motion.div>
          )}

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100"
          >
            <div className="mb-10">
              <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs">
                BlogHub Story
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 mt-4 leading-tight tracking-tighter">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 mt-8 pt-8 border-t border-slate-100">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                  {userData?.name?.charAt(0) || "A"}
                </div>
                <div>
                  <p className="text-slate-900 font-bold">
                    {userData?.name || "BlogHub Author"}
                  </p>
                  <p className="text-slate-500 text-sm">
                    Published on{" "}
                    {new Date(post.$createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed browser-css">
              {parse(post.content)}
            </div>
          </motion.div>

          <div className="mt-12 rounded-4xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1973&auto=format&fit=crop"
              alt="Writing Inspiration"
              className="w-full h-48 object-cover opacity-80"
            />
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
