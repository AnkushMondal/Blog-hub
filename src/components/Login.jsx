import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../features/auth/authSlice";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, seterror] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = async (data) => {
    seterror("");
    setIsLoading(true);
    try {
      const res = await authService.login(data);
      if (res) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin({ userData }));
          navigate("/");
        }
      }
    } catch (error) {
      seterror(
        error.message || "An error occurred during login. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] w-full bg-[#F8FAFC] py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/60 border border-slate-100"
      >
        <div className="hidden md:flex md:w-1/2 bg-slate-900 relative p-12 flex-col justify-between overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop"
            alt="Blogging Inspiration"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-linear-to-br from-indigo-600/40 to-transparent" />

          <div className="relative z-10">
            <Logo width="60px" />
            <h1 className="text-white text-3xl font-black mt-6 tracking-tight">
              Blog<span className="text-indigo-400">Hub</span>
            </h1>
          </div>

          <div className="relative z-10">
            <p className="text-white text-xl font-medium italic">
              "Words are a lens to focus one's mind."
            </p>
            <p className="text-indigo-300 mt-2 text-sm font-bold uppercase tracking-widest">
              Join the Hub
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8 md:hidden flex justify-center">
            <Logo width="80px" />
          </div>

          <h2 className="text-3xl font-black text-slate-900 leading-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-slate-500 font-medium">
            Don&apos;t have an account?&nbsp;
            <Link
              to="/signup"
              className="text-indigo-600 hover:text-indigo-700 transition-colors font-bold"
            >
              Sign Up Free
            </Link>
          </p>

          {error && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-rose-600 mt-6 bg-rose-50 p-3 rounded-xl border border-rose-100 text-sm font-medium"
            >
              {error}
            </motion.p>
          )}

          <form onSubmit={handleSubmit(login)} className="mt-8">
            <div className="space-y-6">
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                className="bg-slate-50 border-slate-200 focus:bg-white transition-all"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value,
                      ) || "Please enter a valid email address",
                  },
                })}
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                className="bg-slate-50 border-slate-200 focus:bg-white transition-all"
                {...register("password", {
                  required: true,
                })}
              />
              <Button
                type="submit"
                className={`w-full py-4 rounded-2xl text-lg font-bold shadow-lg shadow-indigo-200 transition-all ${
                  isLoading
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in to BlogHub"}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
