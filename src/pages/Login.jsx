import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Auth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const { registeredUser, setCurrentUser } = useContext(Auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const formSubmit = (data) => {
    const user = registeredUser.find((val) => val.email === data.email && val.password === data.password);
    if (!user) {
      toast.error("Invalid crediantial or User don't exists")
      return;
    }

    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
    reset();
    navigate("/");
    toast.success("Logged in successfully")
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-neutral-950 px-4'>
      <div className='w-full max-w-md bg-neutral-900 rounded-2xl shadow-xl p-8 border border-neutral-800'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-white'>
            Sky<span className='text-sky-400'>Mart</span>
          </h1>
          <p className='text-neutral-400 mt-2 text-sm'>Log in to your account</p>
        </div>

        <form onClick={handleSubmit(formSubmit)} className='space-y-5'>
          <div>
            <label className='block text-sm font-medium text-neutral-300 mb-1'>Email</label>
            <input
              type='email'
              {...register("email", {
                required: "Email is required",
              })}
              placeholder='you@example.com'
              className='w-full px-4 py-2 bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-white'
            />
            {errors.email && <p className='text-red-400 text-sm mt-1'>{errors.email.message}</p>}
          </div>

          <div>
            <label className='block text-sm font-medium text-neutral-300 mb-1'>Password</label>
            <input
              type='password'
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minmum 6 characters",
                },
              })}
              placeholder='••••••••'
              className='w-full px-4 py-2 bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-white'
            />
            {errors.password && <p className='text-red-400 text-sm mt-1'>{errors.password.message}</p>}
          </div>

          <button
            type='submit'
            className='w-full bg-sky-400 text-black font-medium py-2 rounded-lg hover:bg-sky-300 transition-colors cursor-pointer'
          >
            Log In
          </button>
        </form>

        <p className='text-center text-sm text-neutral-400 mt-6'>
          Don't have an account?{" "}
          <span
            onClick={() => {
              navigate("/auth/register");
            }}
            className='text-sky-400 font-medium hover:underline cursor-pointer'
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
