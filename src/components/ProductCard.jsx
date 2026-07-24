import React, { useContext } from "react";
import { Heart, HeartOff, Star, ShoppingCart, Check, Trash2 } from "lucide-react";
import { Auth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { NavLink } from "react-router";

const ProductCard = ({ product }) => {
  const { currentUser, setCurrentUser, registeredUser, setRegisteredUser } = useContext(Auth);

  const liked = currentUser.wishlist.includes(product.uniqueId);
  const inCart = currentUser.cart.some((item) => item.uniqueId === product.uniqueId);

  const updateUser = (updatedUser) => {
    const updateAllUsers = registeredUser.map((user) => (user.id === currentUser.id ? updatedUser : user));

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    localStorage.setItem("registeredUsers", JSON.stringify(updateAllUsers));
    setCurrentUser(updatedUser);
    setRegisteredUser(updateAllUsers);
  };

  const toggleWishlist = (uniqueId) => {
    const alreadyWishlist = currentUser.wishlist.includes(uniqueId);

    const updatedWishlist = alreadyWishlist
      ? currentUser.wishlist.filter((id) => id !== uniqueId)
      : [...currentUser.wishlist, uniqueId];

    updateUser({ ...currentUser, wishlist: updatedWishlist });

    liked
      ? toast("Removed from wishlist", {
          icon: <HeartOff className='w-4 h-4 text-neutral-400' />,
        })
      : toast.success("Added to wishlist", {
          icon: <Heart className='w-4 h-4 text-sky-400 fill-sky-400' />,
        });
  };

  const toggleCart = (uniqueId) => {
    const alreadyInCart = currentUser.cart.some((item) => item.uniqueId === uniqueId);

    const updatedCart = alreadyInCart
      ? currentUser.cart.filter((item) => item.uniqueId !== uniqueId)
      : [...currentUser.cart, { uniqueId, quantity: 1 }];

    updateUser({ ...currentUser, cart: updatedCart });

    inCart
      ? toast("Removed from cart", {
          icon: <Trash2 className='w-4 h-4 text-neutral-400' />,
        })
      : toast.success("Added to cart", {
          icon: <ShoppingCart className='w-4 h-4 text-sky-400' />,
        });
  };

  return (
    <div className='relative bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-sky-400 transition-colors cursor-pointer group'>
      <button
        onClick={() => toggleWishlist(product.uniqueId)}
        className='absolute top-2 right-2 z-10 p-1.5 bg-neutral-950/70 rounded-full hover:bg-neutral-950 transition-colors'
      >
        <Heart
          className={`w-4 h-4 cursor-pointer transition-colors ${
            liked ? "text-sky-400 fill-sky-400" : "text-white hover:text-sky-400"
          }`}
        />
      </button>

      <NavLink to={`/products/${product.uniqueId}`}>
        <div className='bg-neutral-800 h-64 flex items-center justify-center overflow-hidden'>
          <img
            src={product.thumbnail}
            alt={product.title}
            className='w-full h-full object-cover group-hover:scale-105 transition-transform'
          />
        </div>
      </NavLink>

      <div className='p-3'>
        <h3 className='text-sm font-medium text-white truncate'>{product.title}</h3>
        <p className='text-neutral-400 text-xs capitalize mb-2'>{product.category}</p>

        <div className='flex items-center justify-between mb-3'>
          <span className='text-sky-400 font-semibold'>${product.price}</span>
          <span className='flex items-center gap-1 text-xs text-neutral-400'>
            <Star className='w-3.5 h-3.5 fill-yellow-400 text-yellow-400' />
            {product.rating}
          </span>
        </div>

        <button
          onClick={() => toggleCart(product.uniqueId)}
          className={`w-full flex items-center justify-center gap-2 text-sm font-medium py-1.5 rounded-lg transition-colors cursor-pointer ${
            inCart ? "bg-neutral-800 text-sky-400 border border-sky-400" : "bg-sky-400 text-black hover:bg-sky-300"
          }`}
        >
          {inCart ? (
            <>
              <Check className='w-4 h-4' />
              Added
            </>
          ) : (
            <>
              <ShoppingCart className='w-4 h-4' />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
