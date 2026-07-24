import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Pencil, Save, X, Mail, Phone, MapPin, Package, Heart } from "lucide-react";
import { Auth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Profile = () => {
  const { currentUser, setCurrentUser, setRegisteredUser, registeredUser } = useContext(Auth);
  const [editing, setEditing] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const saved = localStorage.getItem("currentUser");
    if (saved) {
      const parsed = JSON.parse(saved);
      reset(parsed);
    }
  }, [reset]);

  const DEFAULT_AVATAR = `https://ui-avatars.com/api/?name=${currentUser.fullName}&background=0ea5e9&color=fff&size=256`;

  const onSave = (data) => {
    const updatedData = {
      ...data,
      imageUrl: data.imageUrl?.trim() ? data.imageUrl : DEFAULT_AVATAR,
    };

    const updatedUsers = registeredUser.map((val) => (val.id === currentUser.id ? { ...val, ...updatedData } : val));
    setRegisteredUser(updatedUsers);
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    const updatedCurrentUser = { ...currentUser, ...updatedData };
    setCurrentUser(updatedCurrentUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));

    toast.success("Profile updated!");
    setEditing(false);
  };

  const handleCancle = () => {
    reset(currentUser);
    setEditing(false);
  };

  const stats = [
    { icon: Package, label: "Orders", value: currentUser.orders },
    { icon: Heart, label: "Wishlist", value: currentUser.wishlist.length },
    { icon: MapPin, label: "Location", value: currentUser.location || "—" },
  ];

  return (
    <div className='flex flex-col gap-8 py-12 text-white'>
      <h1 className='text-3xl font-bold'>My Profile</h1>

      <div className='flex flex-col items-center gap-4 rounded-2xl border border-neutral-800 bg-neutral-900 px-8 py-10 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex flex-col items-center gap-4 sm:flex-row'>
          <img
            src={currentUser.imageUrl || DEFAULT_AVATAR}
            alt={currentUser.fullName}
            className='h-20 w-20 rounded-full border border-neutral-800 object-cover'
          />
          <div className='text-center sm:text-left'>
            <h1 className='text-xl font-bold'>{currentUser.fullName}</h1>
            <p className='text-sm text-neutral-400'>{currentUser.bio || "Add a bio"}</p>
          </div>
        </div>

        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className='flex items-center gap-2 rounded-full border border-neutral-700 px-5 py-2.5 text-sm font-medium transition hover:bg-neutral-800'
          >
            <Pencil className='h-4 w-4' strokeWidth={1.75} />
            Edit Profile
          </button>
        )}
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        {stats.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className='flex items-center gap-4 rounded-2xl border border-neutral-800 bg-neutral-900 px-6 py-5'
          >
            <Icon className='h-5 w-5 text-sky-400' strokeWidth={1.75} />
            <div>
              <p className='text-sm font-semibold'>{value}</p>
              <p className='text-xs text-neutral-500'>{label}</p>
            </div>
          </div>
        ))}
      </div>

      {!editing && (
        <div className='flex flex-col gap-4 rounded-2xl border border-neutral-800 bg-neutral-900 px-8 py-8'>
          <h2 className='text-lg font-bold'>Contact Details</h2>
          <div className='flex items-center gap-3 text-sm text-neutral-400'>
            <Mail className='h-4 w-4 text-neutral-500' strokeWidth={1.75} />
            {currentUser.email}
          </div>
          <div className='flex items-center gap-3 text-sm text-neutral-400'>
            <Phone className='h-4 w-4 text-neutral-500' strokeWidth={1.75} />
            {currentUser.phone || "Add Phone no."}
          </div>
        </div>
      )}

      {editing && (
        <form
          onSubmit={handleSubmit(onSave)}
          className='flex flex-col gap-5 rounded-2xl border border-neutral-800 bg-neutral-900 px-8 py-8'
        >
          <h2 className='text-lg font-bold'>Edit Profile</h2>

          <div className='flex flex-col gap-2'>
            <label className='text-xs font-medium text-neutral-400'>Full Name</label>
            <input
              type='text'
              {...register("fullName", { required: "Name is required" })}
              className='rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white outline-none focus:border-sky-400'
            />
            {errors.fullName && <span className='text-xs text-rose-400'>{errors.fullName.message}</span>}
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-xs font-medium text-neutral-400'>Profile Image URL</label>
            <input
              type='url'
              {...register("imageUrl", {
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: "Enter a valid image URL",
                },
              })}
              placeholder='https://example.com/photo.jpg'
              className='rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white outline-none focus:border-sky-400'
            />
            {errors.imageUrl && <span className='text-xs text-rose-400'>{errors.imageUrl.message}</span>}
            {watch("imageUrl") && (
              <img
                src={watch("imageUrl")}
                alt='Preview'
                className='mt-1 h-16 w-16 rounded-full border border-neutral-700 object-cover'
              />
            )}
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-xs font-medium text-neutral-400'>Bio</label>
            <input
              type='text'
              {...register("bio")}
              className='rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white outline-none focus:border-sky-400'
            />
          </div>

          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
            <div className='flex flex-col gap-2'>
              <label className='text-xs font-medium text-neutral-400'>Email</label>
              <input
                type='email'
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email",
                  },
                })}
                className='rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white outline-none focus:border-sky-400'
              />
              {errors.email && <span className='text-xs text-rose-400'>{errors.email.message}</span>}
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-xs font-medium text-neutral-400'>Phone</label>
              <input
                type='tel'
                {...register("phone")}
                className='rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white outline-none focus:border-sky-400'
              />
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-xs font-medium text-neutral-400'>Location</label>
            <input
              type='text'
              {...register("location")}
              className='rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white outline-none focus:border-sky-400'
            />
          </div>

          <div className='mt-2 flex gap-3'>
            <button
              type='submit'
              className='flex items-center gap-2 rounded-full bg-sky-400 px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-sky-300'
            >
              <Save className='h-4 w-4' strokeWidth={2} />
              Save Changes
            </button>
            <button
              type='button'
              onClick={handleCancle}
              className='flex items-center gap-2 rounded-full border border-neutral-700 px-6 py-2.5 text-sm font-medium transition hover:bg-neutral-800'
            >
              <X className='h-4 w-4' strokeWidth={2} />
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
