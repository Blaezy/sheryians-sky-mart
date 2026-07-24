import { Heart, ShoppingBag, Menu, X, User, LogOut, Home, Package, Info } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import UserDropdown from "./UserDropdown";
import { useContext, useState } from "react";
import { Auth } from "../context/AuthContext";

export default function Navbar() {
  const { currentUser, setCurrentUser } = useContext(Auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = currentUser.cart.length;
  const wishlistCount = currentUser.wishlist.length;

  const DEFAULT_AVATAR = `https://ui-avatars.com/api/?name=${currentUser.fullName}&background=0ea5e9&color=fff&size=256`;

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setMenuOpen(false);
    navigate("/auth/login");
  };

  const mobileLinks = [
    { label: "Home", to: "/", icon: Home },
    { label: "Products", to: "/products", icon: Package },
    { label: "Wishlist", to: "/wishlist", icon: Heart },
    { label: "Cart", to: "/cart", icon: ShoppingBag },
    { label: "Profile", to: "/profile", icon: User },
    { label: "About", to: "/about", icon: Info },
  ];

  return (
    <div className='w-full bg-black text-white relative'>
      <div className='max-w-7xl mx-auto flex items-center justify-between px-6 py-5'>
        <button onClick={() => setMenuOpen(!menuOpen)} className='md:hidden text-white' aria-label='Open menu'>
          {menuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
        </button>

        <div className='flex items-center gap-2 cursor-pointer'>
          <NavLink to={"/"}>
            <h1 className='text-3xl font-bold text-white'>
              Sky<span className='text-sky-400'>Mart</span>
            </h1>
          </NavLink>
        </div>

        <div className='hidden md:flex items-center gap-8 text-sm font-medium'>
          <NavLink to={"/"} className='hover:opacity-60 transition-opacity cursor-pointer'>
            Home
          </NavLink>
          <NavLink
            to={"/products"}
            className='flex items-center gap-1 hover:opacity-60 transition-opacity cursor-pointer'
          >
            Products
          </NavLink>
          <NavLink to={"/about"} className='hover:opacity-60 transition-opacity cursor-pointer'>
            About
          </NavLink>
        </div>

        <div className='flex items-center gap-6'>
          <div className='hidden sm:flex items-center gap-2 text-sm'>
            <img
              src={currentUser.imageUrl || DEFAULT_AVATAR}
              alt='User'
              className='h-6 w-6 rounded-full bg-gray-200 object-cover'
            />
            <UserDropdown name={currentUser.fullName} />
          </div>

          <NavLink to={"/wishlist"} className='relative hover:opacity-60 transition-opacity cursor-pointer'>
            <Heart className='h-5 w-5' strokeWidth={1.5} />
            {wishlistCount > 0 && (
              <span className='absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-sky-400 text-[10px] font-medium text-black'>
                {wishlistCount}
              </span>
            )}
          </NavLink>

          <NavLink to={"/cart"} className='relative hover:opacity-60 transition-opacity cursor-pointer'>
            <ShoppingBag className='h-5 w-5' strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className='absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-sky-400 text-[10px] font-medium text-black'>
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>
      </div>

      {menuOpen && (
        <div className='md:hidden border-t border-neutral-800 bg-black px-6 py-4'>
          <div className='flex items-center gap-3 pb-4 mb-2 border-b border-neutral-800'>
            <img src={currentUser.imageUrl} alt='User' className='h-9 w-9 rounded-full bg-gray-200 object-cover' />
            <span className='text-sm font-medium'>{currentUser.fullName}</span>
          </div>

          <div className='flex flex-col gap-1'>
            {mobileLinks.map(({ label, to, icon: Icon }) => (
              <NavLink
                key={label}
                to={to}
                onClick={() => setMenuOpen(false)}
                className='flex items-center gap-3 py-3 text-sm font-medium hover:text-sky-400 transition-colors'
              >
                <Icon className='h-4 w-4' strokeWidth={1.5} />
                {label}
              </NavLink>
            ))}

            <button
              onClick={handleLogout}
              className='flex items-center gap-3 py-3 text-sm font-medium text-rose-400 hover:text-rose-300 transition-colors text-left mt-2 border-t border-neutral-800 pt-4'
            >
              <LogOut className='h-4 w-4' strokeWidth={1.5} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
