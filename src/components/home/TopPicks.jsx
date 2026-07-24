import React, { useContext } from "react";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { NavLink } from "react-router";
import { toast } from "react-toastify";
import { ProductsContext } from "../../context/ProductsContext";
import { Auth } from "../../context/AuthContext";

const TopPicks = () => {
  const { products } = useContext(ProductsContext);
  const { currentUser, setCurrentUser, registeredUser, setRegisteredUser } = useContext(Auth);

  const updateUser = (updatedUser) => {
    const updateAllUsers = registeredUser.map((user) => (user.id === currentUser.id ? updatedUser : user));

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    localStorage.setItem("registeredUsers", JSON.stringify(updateAllUsers));
    setCurrentUser(updatedUser);
    setRegisteredUser(updateAllUsers);
  };

  const toggleWishlist = (uniqueId) => {
    const liked = currentUser.wishlist.includes(uniqueId);
    const updatedWishlist = liked
      ? currentUser.wishlist.filter((id) => id !== uniqueId)
      : [...currentUser.wishlist, uniqueId];

    updateUser({ ...currentUser, wishlist: updatedWishlist });

    liked
      ? toast("Removed from wishlist", { icon: <Heart className='w-4 h-4 text-neutral-400' /> })
      : toast.success("Added to wishlist", {
          icon: <Heart className='w-4 h-4 text-sky-400 fill-sky-400' />,
        });
  };

  const toggleCart = (uniqueId) => {
    const inCart = currentUser.cart.some((item) => item.uniqueId === uniqueId);
    const updatedCart = inCart
      ? currentUser.cart.filter((item) => item.uniqueId !== uniqueId)
      : [...currentUser.cart, { uniqueId, quantity: 1 }];

    updateUser({ ...currentUser, cart: updatedCart });

    inCart
      ? toast("Removed from cart", { icon: <ShoppingCart className='w-4 h-4 text-neutral-400' /> })
      : toast.success("Added to cart", {
          icon: <ShoppingCart className='w-4 h-4 text-sky-400' />,
        });
  };

  const topProducts = products.slice(0, 3);

  const wishlistedProducts = products.filter((p) => currentUser.wishlist.includes(p.uniqueId)).slice(0, 3);

  return (
    <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
      <div className='rounded-2xl border border-neutral-800 bg-neutral-900 p-6'>
        <div className='mb-5 flex items-center justify-between'>
          <h2 className='text-lg font-bold'>Top Products</h2>
          <NavLink
            to='/products'
            className='text-xs font-semibold text-sky-400 underline underline-offset-4 hover:text-sky-300'
          >
            View All Products
          </NavLink>
        </div>

        <div className='flex flex-col divide-y divide-neutral-800'>
          {topProducts.map((product) => {
            const inCart = currentUser.cart.some((item) => item.uniqueId === product.uniqueId);

            return (
              <div key={product.uniqueId} className='flex items-center gap-4 py-4 first:pt-0 last:pb-0'>
                <NavLink to={`/products/${product.uniqueId}`} className='flex items-center gap-4 min-w-0 flex-1'>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className='h-16 w-14 shrink-0 rounded-md bg-neutral-800 object-cover'
                  />
                  <div className='min-w-0 flex-1'>
                    <p className='truncate text-sm font-medium hover:text-sky-400 transition-colors'>{product.title}</p>
                    <p className='text-xs text-neutral-500 capitalize'>{product.category}</p>
                    <p className='text-sm font-semibold text-sky-400'>${product.price}</p>
                  </div>
                </NavLink>

                <button
                  onClick={() => toggleCart(product.uniqueId)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                    inCart
                      ? "bg-neutral-800 text-sky-400 border border-sky-400"
                      : "bg-sky-400 text-black hover:bg-sky-300"
                  }`}
                >
                  {inCart ? (
                    <>
                      <Check className='w-3.5 h-3.5' /> Added
                    </>
                  ) : (
                    <>
                      <ShoppingCart className='w-3.5 h-3.5' /> Add
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className='flex flex-col rounded-2xl border border-neutral-800 bg-neutral-900 p-6'>
        <div className='mb-5 flex items-center justify-between'>
          <h2 className='text-lg font-bold'>Wishlist</h2>
          <NavLink
            to='/wishlist'
            className='text-xs font-semibold text-sky-400 underline underline-offset-4 hover:text-sky-300'
          >
            View All
          </NavLink>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className='flex flex-1 flex-col items-center justify-center gap-3 py-8 text-center'>
            <Heart className='h-10 w-10 text-neutral-600' strokeWidth={1.5} />
            <p className='text-sm text-neutral-400'>No items in your wishlist yet</p>
          </div>
        ) : (
          <div className='flex flex-1 flex-col divide-y divide-neutral-800'>
            {wishlistedProducts.map((product) => (
              <div key={product.uniqueId} className='flex items-center gap-4 py-4 first:pt-0 last:pb-0'>
                <NavLink to={`/products/${product.uniqueId}`} className='flex items-center gap-4 min-w-0 flex-1'>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className='h-14 w-12 shrink-0 rounded-md bg-neutral-800 object-cover'
                  />
                  <div className='min-w-0 flex-1'>
                    <p className='truncate text-sm font-medium hover:text-sky-400 transition-colors'>{product.title}</p>
                    <p className='text-sm text-neutral-400'>${product.price}</p>
                  </div>
                </NavLink>

                <button
                  onClick={() => toggleWishlist(product.uniqueId)}
                  className='shrink-0 text-sky-400 hover:text-neutral-400 transition-colors cursor-pointer'
                >
                  <Heart className='h-5 w-5' strokeWidth={1.5} fill='currentColor' />
                </button>
              </div>
            ))}
          </div>
        )}

        <NavLink
          to='/wishlist'
          className='mt-4 rounded-full border border-neutral-700 py-3 text-sm font-medium text-center transition hover:bg-neutral-800'
        >
          Go to Wishlist
        </NavLink>
      </div>
    </div>
  );
};

export default TopPicks;
