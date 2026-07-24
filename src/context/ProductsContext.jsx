import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductsContext = createContext();

const product_api = "https://dummyjson.com/products/category/";

const categoryMap = {
  Electronics: ["smartphones", "laptops", "mobile-accessories", "tablets"],
  Clothings: ["tops", "womens-dresses", "mens-shirts", "mens-shoes", "womens-shoes"],
  Furniture: ["furniture"],
  Home: ["home-decoration", "kitchen-accessories"],
  Sports: ["sports-accessories"],
  Accessories: ["sunglasses", "womens-bags", "womens-jewellery", "mens-watches", "womens-watches"],
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const allSlugs = Object.values(categoryMap).flat();
        const requests = allSlugs.map((slug) => axios.get(`${product_api}${slug}`));
        const responses = await Promise.all(requests);

        let allProducts = [];
        responses.forEach((res, i) => {
          const slug = allSlugs[i];
          const bucket = Object.keys(categoryMap).find((key) => categoryMap[key].includes(slug));

          const tagged = res.data.products.map((p) => ({
            ...p,
            category: bucket,
            uniqueId: `${bucket}-${slug}-${p.id}`,
          }));

          allProducts = [...allProducts, ...tagged];
        });

        setProducts(allProducts);
      } catch (err) {
        console.log(err);
      }
    };

    getProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};