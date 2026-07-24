import React, { useContext, useEffect, useRef, useState } from "react";
import { Home, CircleUser, LogOut } from "lucide-react";
import { NavLink } from "react-router";
import { Auth } from "../context/AuthContext";
import { toast } from "react-toastify";

const UserDropdown = ({ name }) => {
  const { setCurrentUser } = useContext(Auth);

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className='relative'>
      <h3 onClick={() => setOpen((prev) => !prev)} className='cursor-pointer select-none hover:opacity-60'>
        {name}
      </h3>

      {open && (
        <div className='absolute right-0 top-full z-50 mt-3 w-48 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 shadow-lg'>
          <NavLink
            to='/'
            onClick={() => setOpen(false)}
            className='flex items-center gap-3 px-4 py-3 text-sm text-white transition hover:bg-neutral-800'
          >
            <Home className='h-4 w-4' strokeWidth={1.75} />
            Home
          </NavLink>

          <NavLink
            to='/profile'
            onClick={() => setOpen(false)}
            className='flex items-center gap-3 px-4 py-3 text-sm text-white transition hover:bg-neutral-800'
          >
            <CircleUser className='h-4 w-4' strokeWidth={1.75} />
            Profile
          </NavLink>

          <button
            onClick={() => {
              setOpen(false);
              localStorage.removeItem("currentUser");
              setCurrentUser(null);
              toast.warning("User logged out");
            }}
            className='flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-rose-400 transition hover:bg-neutral-800'
          >
            <LogOut className='h-4 w-4' strokeWidth={1.75} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
