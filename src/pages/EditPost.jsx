import React, { useEffect } from "react";
import { Container, PostForm } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPost } from "../features/post/postSlice";
import databaseService from "../appwrite/database";
import { motion } from "framer-motion";

function EditPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.currentPost);

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

  return post ? (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-12 bg-slate-50 min-h-screen"
    >
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 border-l-4 border-indigo-600 pl-6">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Edit Your <span className="text-indigo-600">Masterpiece</span>
            </h1>
            <p className="text-slate-500 mt-2 italic">
              Refining the story for the BlogHub community.
            </p>
          </div>
          <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100">
            <PostForm post={post} />
          </div>
        </div>
      </Container>
    </motion.div>
  ) : null;
}

export default EditPost;
