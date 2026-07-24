import React from "react";
import { NavLink } from "react-router";
import ValueCard from "../components/home/ValueCard";

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "1,200+", label: "Products Listed" },
  { value: "4.8", label: "Average Rating" },
  { value: "24/7", label: "Customer Support" },
];



const About = () => {
  return (
    <div className='flex flex-col gap-16 py-12 text-white'>
      {/* Hero */}
      <section className='flex flex-col gap-5'>
        <span className='inline-flex w-fit items-center rounded-full border border-sky-400/40 bg-sky-400/10 px-3 py-1 text-xs font-semibold tracking-wide text-sky-400'>
          OUR STORY
        </span>
        <h1 className='max-w-2xl text-4xl font-bold leading-tight tracking-tight md:text-5xl'>
          We built SkyMart because shopping online got tiring.
        </h1>
        <p className='max-w-xl text-sm text-neutral-400 md:text-base'>
          Too many tabs, too many fake sales, too much clutter. SkyMart is our attempt to fix that — a straightforward
          store with real prices, real reviews, and things people actually need.
        </p>
        <div className='mt-2 flex gap-4'>
          <NavLink
            to='/products'
            className='w-fit rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-sky-300'
          >
            Browse Products
          </NavLink>
          <NavLink
            to='/'
            className='w-fit rounded-full border border-neutral-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-900'
          >
            Back to Home
          </NavLink>
        </div>
      </section>

      {/* Stats */}
      <section className='grid grid-cols-2 gap-4 md:grid-cols-4'>
        {stats.map((stat) => (
          <div key={stat.label} className='rounded-2xl border border-neutral-800 bg-neutral-900 px-6 py-6 text-center'>
            <p className='text-2xl font-bold text-sky-400 md:text-3xl'>{stat.value}</p>
            <p className='mt-1 text-xs text-neutral-500'>{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Story */}
      <section className='flex flex-col gap-6 md:flex-row md:items-center md:gap-12'>
        <div className='relative h-64 w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 md:h-80 md:w-2/5'>
          <img
            src='https://imgs.search.brave.com/Fey-IaR8Q4KwXM8bYiyxGYtEgFMjZmAl3TcaegYDRcY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9z/bWlsZXktY29sbGVh/Z3Vlcy10YWtpbmct/c2VsZmllLWJlZm9y/ZS1tZWV0aW5nXzIz/LTIxNDg4MTcwMzku/anBnP3NlbXQ9YWlz/X2h5YnJpZCZ3PTc0/MCZxPTgw'
            alt='Our team packing orders'
            className='h-full w-full object-cover'
          />
        </div>
        <div className='flex flex-col gap-4 md:w-3/5'>
          <h2 className='text-2xl font-bold md:text-3xl'>Started small. Stayed honest.</h2>
          <p className='text-sm text-neutral-400 md:text-base'>
            SkyMart started as a two-person operation packing orders out of a single room. No investors, no shortcuts —
            just a simple idea: sell things people actually want, at prices that make sense.
          </p>
          <p className='text-sm text-neutral-400 md:text-base'>
            Today we work with hundreds of sellers across electronics, fashion, and home goods, but the rule hasn't
            changed. If we wouldn't buy it ourselves, it doesn't go on the site.
          </p>
        </div>
      </section>

      {/* Values */}
      <ValueCard/>
      

      {/* CTA banner */}
      <section className='flex flex-col items-center gap-4 rounded-2xl border border-neutral-800 bg-neutral-900 px-8 py-12 text-center'>
        <h2 className='text-2xl font-bold md:text-3xl'>Ready to shop smarter?</h2>
        <p className='max-w-md text-sm text-neutral-400'>
          Browse everything we've got, from everyday essentials to things you didn't know you needed.
        </p>
        <NavLink
          to='/products'
          className='mt-2 w-fit rounded-full bg-sky-400 px-8 py-3 text-sm font-semibold text-black transition hover:bg-sky-300'
        >
          Start Shopping
        </NavLink>
      </section>
    </div>
  );
};

export default About;
