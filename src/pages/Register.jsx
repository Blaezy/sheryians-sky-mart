import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Auth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { generateId } from "../utils/generateId";

const Register = () => {
  const navigate = useNavigate();

  const { registeredUser, setRegisteredUser } = useContext(Auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const formSubmit = (data) => {
    data = {
      ...data,
      id: generateId(),
      imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.fullName)}&background=0ea5e9&color=fff&size=256`,
      phone: "",
      location: "",
      bio: "",
      wishlist: [],
      cart: [],
      orders: 0,
    };

    const alreadyUser = registeredUser.find((val) => val.email === data.email);

    if (alreadyUser) {
      toast.error("User already exists with this email");
      reset();
      return;
    }

    const arr = [...registeredUser, data];
    setRegisteredUser(arr);
    localStorage.setItem("registeredUsers", JSON.stringify(arr));
    reset();
    navigate("/auth/login");
    toast.success("User registered successfully");
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-neutral-950 px-4'>
      <div className='w-full max-w-md bg-neutral-900 rounded-2xl shadow-xl p-8 border border-neutral-800'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-white'>
            Sky<span className='text-sky-400'>Mart</span>
          </h1>
          <p className='text-neutral-400 mt-2 text-sm'>Create your account</p>
        </div>

        <form onSubmit={()=>{handleSubmit(formSubmit)}} className='space-y-5'>
          <div>
            <label className='block text-sm font-medium text-neutral-300 mb-1'>Full Name</label>
            <input
              type='text'
              {...register("fullName", {
                required: "Name is required",
              })}
              placeholder='John Doe'
              className='w-full px-4 py-2 bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-white'
            />
            {errors.fullName && <p className='text-red-400 text-sm mt-1'>{errors.fullName.message}</p>}
          </div>

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
                required: "password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
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
            Sign Up
          </button>
        </form>

        <p className='text-center text-sm text-neutral-400 mt-6'>
          Already have an account?{" "}
          <span
            onClick={() => {
              navigate("/auth/login");
            }}
            href='/login'
            className='text-sky-400 font-medium hover:underline cursor-pointer'
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
