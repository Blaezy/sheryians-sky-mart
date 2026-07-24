import React, { useContext } from "react";
import { useParams, NavLink } from "react-router";
import { Heart, ShoppingCart, Check, Star } from "lucide-react";
import { toast } from "react-toastify";
import { ProductsContext } from "../context/ProductsContext";
import { Auth } from "../context/AuthContext";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { uniqueId } = useParams();
  const { products } = useContext(ProductsContext);
  const { currentUser, setCurrentUser, registeredUser, setRegisteredUser } = useContext(Auth);

  const product = products.find((p) => p.uniqueId === uniqueId);

  const updateUser = (updatedUser) => {
    const updateAllUsers = registeredUser.map((user) => (user.id === currentUser.id ? updatedUser : user));

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    localStorage.setItem("registeredUsers", JSON.stringify(updateAllUsers));
    setCurrentUser(updatedUser);
    setRegisteredUser(updateAllUsers);
  };

  if (!product) {
    return <div className='flex min-h-[50vh] items-center justify-center text-neutral-400'>Product not found</div>;
  }

  const liked = currentUser.wishlist.includes(product.uniqueId);
  const inCart = currentUser.cart.some((item) => item.uniqueId === product.uniqueId);

  const toggleWishlist = () => {
    const updatedWishlist = liked
      ? currentUser.wishlist.filter((id) => id !== product.uniqueId)
      : [...currentUser.wishlist, product.uniqueId];

    updateUser({ ...currentUser, wishlist: updatedWishlist });

    liked
      ? toast("Removed from wishlist", { icon: <Heart className='w-4 h-4 text-neutral-400' /> })
      : toast.success("Added to wishlist", {
          icon: <Heart className='w-4 h-4 text-sky-400 fill-sky-400' />,
        });
  };

  const toggleCart = () => {
    const updatedCart = inCart
      ? currentUser.cart.filter((item) => item.uniqueId !== product.uniqueId)
      : [...currentUser.cart, { uniqueId: product.uniqueId, quantity: 1 }];

    updateUser({ ...currentUser, cart: updatedCart });

    inCart
      ? toast("Removed from cart", { icon: <ShoppingCart className='w-4 h-4 text-neutral-400' /> })
      : toast.success("Added to cart", { icon: <ShoppingCart className='w-4 h-4 text-sky-400' /> });
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.uniqueId !== product.uniqueId)
    .slice(0, 5);

  return (
    <div className='text-white px-6 py-8 max-w-6xl mx-auto'>
      {/* Breadcrumb */}
      <div className='flex items-center gap-2 text-sm text-neutral-500 mb-8'>
        <NavLink to='/products' className='hover:text-sky-400'>
          Products
        </NavLink>
        <span>›</span>
        <NavLink to={`/products?category=${product.category}`} className='hover:text-sky-400 capitalize'>
          {product.category}
        </NavLink>
        <span>›</span>
        <span className='text-neutral-300'>{product.title}</span>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* Image */}
        <div className='relative bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden'>
          <button
            onClick={toggleWishlist}
            className='absolute top-4 right-4 z-10 p-2 bg-neutral-950/70 rounded-full hover:bg-neutral-950 transition-colors'
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                liked ? "text-sky-400 fill-sky-400" : "text-white hover:text-sky-400"
              }`}
            />
          </button>
          <img src={product.thumbnail} alt={product.title} className='w-full h-full object-cover aspect-square' />
        </div>

        {/* Info */}
        <div className='flex flex-col gap-5'>
          <h1 className='text-2xl md:text-3xl font-bold'>{product.title}</h1>

          <div className='flex items-center gap-4'>
            <span className='text-2xl font-semibold text-sky-400'>${product.price}</span>
            {product.rating != null && (
              <span className='flex items-center gap-1 text-sm text-neutral-400'>
                <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                {product.rating}
              </span>
            )}
          </div>

          {product.category && (
            <p className='text-sm text-neutral-400 capitalize'>
              Category: <span className='text-white'>{product.category}</span>
            </p>
          )}

          {product.stock != null && (
            <p className='text-sm text-neutral-400'>
              {product.stock > 0 ? (
                <span className='text-green-400'>{product.stock} in stock</span>
              ) : (
                <span className='text-red-400'>Out of stock</span>
              )}
            </p>
          )}

          {product.description && (
            <div>
              <h3 className='text-sm font-semibold mb-1'>Description</h3>
              <p className='text-sm text-neutral-400 leading-relaxed'>{product.description}</p>
            </div>
          )}

          <button
            onClick={toggleCart}
            className={`mt-2 w-full md:w-fit px-8 flex items-center justify-center gap-2 text-sm font-medium py-3 rounded-full transition-colors ${
              inCart ? "bg-neutral-800 text-sky-400 border border-sky-400" : "bg-sky-400 text-black hover:bg-sky-300"
            }`}
          >
            {inCart ? (
              <>
                <Check className='w-4 h-4' /> Added to Cart
              </>
            ) : (
              <>
                <ShoppingCart className='w-4 h-4' /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className='mt-16'>
          <div className='flex items-center justify-between mb-5'>
            <h2 className='text-xl font-bold'>Related Products</h2>
            <NavLink
              to={`/products?category=${product.category}`}
              className='text-xs font-semibold text-sky-400 underline underline-offset-4 hover:text-sky-300'
            >
              View All
            </NavLink>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5'>
            {relatedProducts.map((p) => (
              <ProductCard key={p.uniqueId} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
