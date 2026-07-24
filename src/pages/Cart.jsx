import React, { useContext } from "react";
import { NavLink } from "react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { toast } from "react-toastify";
import { Auth } from "../context/AuthContext";
import { ProductsContext } from "../context/ProductsContext";

const Cart = () => {
  const { currentUser, setCurrentUser, registeredUser, setRegisteredUser } = useContext(Auth);
  const { products } = useContext(ProductsContext);

  const updateUser = (updatedUser) => {
    const updateAllUsers = registeredUser.map((user) => (user.id === currentUser.id ? updatedUser : user));

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    localStorage.setItem("registeredUsers", JSON.stringify(updateAllUsers));
    setCurrentUser(updatedUser);
    setRegisteredUser(updateAllUsers);
  };

  const items = currentUser.cart
    .map((cartItem) => {
      const product = products.find((p) => p.uniqueId === cartItem.uniqueId);
      if (!product) return null;
      return { ...product, quantity: cartItem.quantity };
    })
    .filter(Boolean);

  const updateQuantity = (uniqueId, delta) => {
    const updatedCart = currentUser.cart.map((item) =>
      item.uniqueId === uniqueId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item,
    );

    updateUser({ ...currentUser, cart: updatedCart });
  };

  const removeItem = (uniqueId) => {
    const updatedCart = currentUser.cart.filter((item) => item.uniqueId !== uniqueId);
    updateUser({ ...currentUser, cart: updatedCart });
  };

  const clearCart = () => {
    updateUser({ ...currentUser, cart: [] });
    toast("Cart cleared", { icon: <Trash2 className='w-4 h-4 text-neutral-400' /> });
  };

  const handleCheckout = () => {
    const updatedOrders = (currentUser.orders || 0) + items.length;

    updateUser({ ...currentUser, cart: [], orders: updatedOrders });

    toast.success("Order placed successfully");
  };

  const totalItems = items.length;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 4.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center gap-4 py-24 text-center text-white'>
        <ShoppingBag className='h-12 w-12 text-neutral-600' strokeWidth={1.5} />
        <h1 className='text-2xl font-bold'>Your cart is empty</h1>
        <p className='max-w-sm text-sm text-neutral-400'>
          Looks like you haven't added anything yet. Go find something you like.
        </p>
        <NavLink
          to='/products'
          className='mt-2 rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-sky-300'
        >
          Browse Products
        </NavLink>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-8 py-12 text-white'>
      <h1 className='text-3xl font-bold'>
        Your Cart <span className='text-lg font-normal text-neutral-400'>({totalItems} items)</span>
      </h1>

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
        <div className='flex flex-col gap-4 lg:col-span-2'>
          {items.map((item) => (
            <div
              key={item.uniqueId}
              className='flex items-center gap-4 rounded-2xl border border-neutral-800 bg-neutral-900 px-6 py-5'
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className='h-20 w-16 shrink-0 rounded-lg bg-neutral-800 object-cover'
              />

              <div className='min-w-0 flex-1'>
                <p className='truncate text-sm font-semibold'>{item.title}</p>
                <p className='text-xs text-neutral-500 capitalize'>{item.category}</p>
                <p className='mt-1 text-sm font-semibold text-sky-400'>${item.price.toFixed(2)}</p>
              </div>

              <div className='flex items-center gap-3 rounded-full border border-neutral-700 px-3 py-1.5'>
                <button
                  onClick={() => updateQuantity(item.uniqueId, -1)}
                  className='text-neutral-400 transition hover:text-white cursor-pointer'
                  aria-label='Decrease quantity'
                >
                  <Minus className='h-3.5 w-3.5' strokeWidth={2} />
                </button>
                <span className='w-4 text-center text-sm'>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.uniqueId, 1)}
                  className='text-neutral-400 transition hover:text-white cursor-pointer'
                  aria-label='Increase quantity'
                >
                  <Plus className='h-3.5 w-3.5' strokeWidth={2} />
                </button>
              </div>

              <button
                onClick={() => removeItem(item.uniqueId)}
                className='shrink-0 text-neutral-500 transition hover:text-rose-400 cursor-pointer'
                aria-label='Remove item'
              >
                <Trash2 className='h-4 w-4' strokeWidth={1.75} />
              </button>
            </div>
          ))}
        </div>

        <div className='flex h-fit flex-col gap-4 rounded-2xl border border-neutral-800 bg-neutral-900 px-6 py-6'>
          <h2 className='text-lg font-bold'>Order Summary</h2>

          <div className='flex items-center justify-between text-sm text-neutral-400'>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className='flex items-center justify-between text-sm text-neutral-400'>
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>

          {subtotal < 50 && subtotal > 0 && (
            <p className='text-xs text-neutral-500'>Add ${(50 - subtotal).toFixed(2)} more for free shipping</p>
          )}

          <div className='mt-2 flex items-center justify-between border-t border-neutral-800 pt-4 text-base font-semibold'>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            className='mt-2 w-full rounded-full bg-sky-400 py-3 text-sm font-semibold text-black transition hover:bg-sky-300 cursor-pointer'
          >
            Checkout
          </button>
          <button
            onClick={clearCart}
            className='text-center text-xs text-neutral-500 transition hover:text-rose-400 cursor-pointer'
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
