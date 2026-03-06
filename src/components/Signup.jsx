import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../features/auth/authSlice";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, seterror] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const create = async (data) => {
    seterror("");
    setIsLoading(true);
    try {
      const res = await authService.createAccount(data);
      if (res) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin({ userData }));
          navigate("/");
        }
      }
    } catch (error) {
      seterror(
        error.message || "An error occurred during signup. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[85vh] w-full bg-[#F8FAFC] py-12 px-4 items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto w-full max-w-5xl flex flex-col md:flex-row bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/60 border border-slate-100"
      >
      
        <div className="hidden md:flex md:w-5/12 bg-slate-900 relative p-12 flex-col justify-between overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1973&auto=format&fit=crop"
            alt="Writing Growth"
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-linear-to-tr from-indigo-700/50 to-transparent" />

          <div className="relative z-10">
            <Logo width="60px" />
            <h1 className="text-white text-3xl font-black mt-6 tracking-tight leading-tight">
              Start your <br />
              <span className="text-indigo-400">writing journey.</span>
            </h1>
          </div>

          
        </div>

        
        <div className="w-full md:w-7/12 p-8 md:p-14 flex flex-col justify-center bg-white">
          <div className="mb-8 md:hidden flex justify-center">
            <Logo width="80px" />
          </div>

          <h2 className="text-4xl font-black text-slate-900 leading-tight">
            Create Account
          </h2>
          <p className="mt-3 text-slate-500 font-medium">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-700 transition-colors font-bold"
            >
              Sign In
            </Link>
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-rose-600 mt-6 bg-rose-50 p-4 rounded-2xl border border-rose-100 text-sm font-semibold flex items-center gap-3"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit(create)} className="mt-10">
            <div className="space-y-6">
              <Input
                label="Full Name"
                placeholder="Ankush"
                className="bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl py-3"
                {...register("name", { required: true })}
              />
              <Input
                label="Email Address"
                placeholder="ankush@example.com"
                type="email"
                className="bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl py-3"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value,
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Create a strong password"
                className="bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl py-3"
                {...register("password", { required: true })}
              />
              <div className="pt-2">
                <Button
                  type="submit"
                  className={`w-full py-4 rounded-2xl text-lg font-bold shadow-xl shadow-indigo-100 transition-all ${
                    isLoading
                      ? "bg-indigo-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]"
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Join BlogHub"}
                </Button>
              </div>
            </div>
          </form>

          
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
