import React, { useContext } from "react";
import { NavLink } from "react-router";
import { Heart } from "lucide-react";
import { ProductsContext } from "../context/ProductsContext";
import ProductCard from "../components/ProductCard";
import { Auth } from "../context/AuthContext";

const Wishlist = () => {
  const { products } = useContext(ProductsContext);
  const { currentUser } = useContext(Auth);

  const wishlistedProducts = products.filter((p) =>
    currentUser.wishlist.includes(p.uniqueId)
  );

  if (wishlistedProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center text-white">
        <Heart className="h-12 w-12 text-neutral-600" strokeWidth={1.5} />
        <h1 className="text-2xl font-bold">Your wishlist is empty</h1>
        <p className="max-w-sm text-sm text-neutral-400">
          Save items you love by tapping the heart icon, they'll show up here.
        </p>
        <NavLink
          to="/products"
          className="mt-2 rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-sky-300"
        >
          Browse Products
        </NavLink>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {wishlistedProducts.map((product) => (
          <ProductCard key={product.uniqueId} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;