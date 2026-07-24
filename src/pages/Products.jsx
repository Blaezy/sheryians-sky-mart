import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { ChevronDown, X, ArrowUp } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { ProductsContext } from "../context/ProductsContext";
import { useSearchParams } from "react-router";

const categories = ["All", "Electronics", "Clothings", "Furniture", "Home", "Sports", "Accessories"];

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
  { label: "Top Rated", value: "rating-desc" },
  { label: "Lowest Rated", value: "rating-asc" },
];

const Products = () => {
  const { products } = useContext(ProductsContext);
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [category, setCategory] = useState(categoryFromUrl || "All");
  const [sort, setSort] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const sortRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSort("featured");
  };

  const hasActiveFilters = search !== "" || category !== "All" || sort !== "featured";

  let filteredProducts = category === "All" ? products : products.filter((p) => p.category === category);

  filteredProducts = filteredProducts.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating-desc":
        return b.rating - a.rating;
      case "rating-asc":
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  const currentSortLabel = sortOptions.find((s) => s.value === sort)?.label;

  return (
    <div className='min-h-screen text-white px-6 py-8'>
      <h1 className='text-2xl font-bold mb-6'>All Products</h1>

      <div className='flex flex-col md:flex-row md:items-center gap-4 mb-4'>
        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search products...'
          className='w-full md:w-80 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-sky-400'
        />

        <div className='relative' ref={sortRef}>
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className='flex items-center justify-between gap-2 w-full md:w-52 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm hover:border-sky-400 transition-colors'
          >
            {currentSortLabel}
            <ChevronDown className={`w-4 h-4 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
          </button>

          {sortOpen && (
            <div className='absolute z-50 mt-1 w-full md:w-52 bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden shadow-xl'>
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setSort(opt.value);
                    setSortOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    sort === opt.value ? "bg-sky-400 text-black" : "text-neutral-300 hover:bg-neutral-800"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className='flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-neutral-400 border border-neutral-800 hover:border-red-400 hover:text-red-400 transition-colors'
          >
            <X className='w-4 h-4' />
            Clear Filters
          </button>
        )}
      </div>

      <div className='flex flex-wrap gap-2 mb-8'>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm capitalize border transition-colors ${
              category === cat
                ? "bg-sky-400 text-black border-sky-400"
                : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-sky-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 && <p className='text-neutral-500 text-center py-12'>Products Loading...</p>}

      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5'>
        {filteredProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className='fixed bottom-6 right-6 z-40 p-3 bg-sky-400 text-black rounded-full shadow-lg hover:bg-sky-300 transition-colors'
          aria-label='Back to top'
        >
          <ArrowUp className='w-5 h-5' />
        </button>
      )}
    </div>
  );
};

export default Products;
