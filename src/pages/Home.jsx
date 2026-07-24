import React from "react";
import HeroCard from "../components/home/HeroCard";
import ShopByCategory from "../components/home/ShopByCategory";
import TrustBadges from "../components/home/TrustBadges";
import ValueCard from "../components/home/ValueCard";
import TopPicks from "../components/home/TopPicks";

const Home = () => {
  return (
    <div className='flex flex-col gap-12 py-8 text-white '>
      <HeroCard />
      <ValueCard/>
      <ShopByCategory />
      <TopPicks />
      <TrustBadges />
    </div>
  );
};

export default Home;
