import React from "react";
import { useNavigate } from "react-router";
import { Laptop, Shirt, Sofa, Home as HomeIcon, Dumbbell, Watch } from "lucide-react";

const categories = [
  { name: "Electronics", icon: Laptop },
  { name: "Clothings", icon: Shirt },
  { name: "Furniture", icon: Sofa },
  { name: "Home", icon: HomeIcon },
  { name: "Sports", icon: Dumbbell },
  { name: "Accessories", icon: Watch },
];

const ShopByCategory = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (name) => {
    navigate(`/products?category=${name}`);
  };

  return (
    <div className='w-full text-white'>
      <div className='mb-5 flex items-center'>
        <h2 className='text-xl font-bold'>Shop by Category</h2>
      </div>

      <div className='flex gap-5 flex-wrap md:flex-nowrap overflow-x-auto scrollbar-none'>
        {categories.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => handleCategoryClick(name)}
            className='group flex w-24 shrink-0 flex-col items-center gap-3 cursor-pointer'
          >
            <div className='flex h-20 w-20 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 transition group-hover:border-sky-400/50'>
              <Icon className='h-7 w-7 text-white' strokeWidth={1.5} />
            </div>
            <div className='text-center'>
              <p className='text-sm font-medium'>{name}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShopByCategory;
