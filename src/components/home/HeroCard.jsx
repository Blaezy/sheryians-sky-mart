import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import slide1 from "../../assets/slide-1.jpg";
import slide2 from "../../assets/slide-2.jpg";
import slide3 from "../../assets/slide-3.jpg";

const slides = [
  {
    badge: "NEW",
    title: "SUMMER TECH ESSENTIALS",
    description: "Noise-cancelling headphones, fast chargers, and everyday carry gear — curated for the season ahead.",
    meta: "Free shipping over $50",
    category: "Electronics",
    cta: "Shop Now",
    image: slide1,
  },
  {
    badge: "UP TO 40% OFF",
    title: "HOME REFRESH SALE",
    description: "Cushions, lighting, and small furniture pieces to make a room feel new again.",
    meta: "Ends this weekend",
    category: "Furniture",
    cta: "Explore Deals",
    image: slide2,
  },
  {
    badge: "TRENDING",
    title: "SPORT & OUTDOOR",
    description: "Gear built for early mornings and long runs — durable, breathable, ready for anything.",
    meta: "Rated 4.8+ by customers",
    category: "Sports",
    cta: "Shop Sport",
    image: slide3,
  },
];

const SLIDE_DURATION = 7000;

const HeroCard = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className='relative w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900'>
      <div
        className='flex transition-transform duration-700 ease-in-out'
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className='flex w-full shrink-0 flex-col md:flex-row md:h-[460px]'>
            <div className='flex flex-col items-start justify-center gap-3 px-8 py-8 md:px-10 md:w-[35%]'>
              <span className='inline-flex w-fit items-center rounded-full border border-sky-400/40 bg-sky-400/10 px-3 py-1 text-xs font-semibold tracking-wide text-sky-400'>
                {slide.badge}
              </span>
              <h2 className='line-clamp-3 text-3xl md:text-4xl font-bold leading-tight tracking-tight text-white'>
                {slide.title}
              </h2>
              <p className='line-clamp-2 max-w-md text-sm text-neutral-400 md:text-base'>{slide.description}</p>
              <p className='text-xs text-neutral-500'>{slide.meta}</p>
              <button
                className='mt-1 w-fit rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-sky-400 cursor-pointer'
                onClick={() => {
                  navigate(`/products?category=${slide.category}`);
                }}
              >
                {slide.cta}
              </button>
            </div>

            <div className='relative hidden md:block md:w-[65%]'>
              <img src={slide.image} alt={slide.title} className='h-full w-full object-cover' />
              <div className='absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-neutral-900 to-transparent' />
            </div>
          </div>
        ))}
      </div>

      <div className='absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2'>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-sky-400" : "w-1.5 bg-neutral-700"} cursor-pointer`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCard;
