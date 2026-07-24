import React from "react";
import { NavLink } from "react-router";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import { Mail } from "lucide-react";

const linkGroups = [
  {
    title: "Shop",
    links: [
      { label: "Electronics", to: "/products?category=Electronics" },
      { label: "Clothing", to: "/products?category=Clothings" },
      { label: "Furniture", to: "/products?category=Furniture" },
      { label: "All Products", to: "/products" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Track Order", to: "/" },
      { label: "Returns & Exchanges", to: "/" },
      { label: "Shipping Info", to: "/" },
      { label: "Contact Us", to: "/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Careers", to: "/" },
      { label: "Privacy Policy", to: "/" },
      { label: "Terms of Service", to: "/" },
    ],
  },
];

const socials = [
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaFacebook, href: "#", label: "Facebook" },
];

const Footer = () => {
  return (
    <footer className='w-full border-t border-neutral-800 bg-black text-white mt-12'>
      <div className='mx-auto max-w-7xl px-6 py-14'>
        <div className='grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]'>
          <div className='flex flex-col gap-4'>
            <h2 className='text-xl font-semibold uppercase tracking-widest'>SkyMart</h2>
            <p className='max-w-xs text-sm text-neutral-400'>
              Everyday essentials, delivered fast. Curated products, honest prices.
            </p>
            <div className='mt-2 flex items-center gap-2'>
              <div className='flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-4 py-2.5'>
                <Mail className='h-4 w-4 text-neutral-500' strokeWidth={1.5} />
                <input
                  type='email'
                  placeholder='Your email'
                  className='w-full bg-transparent text-sm text-white placeholder-neutral-500 outline-none'
                />
              </div>
              <button className='shrink-0 rounded-full bg-sky-400 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-sky-300'>
                Join
              </button>
            </div>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title} className='flex flex-col gap-3'>
              <h3 className='text-sm font-semibold text-white'>{group.title}</h3>
              {group.links.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  className='w-fit text-sm text-neutral-400 transition hover:text-sky-400'
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          ))}
        </div>

        <div className='mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-6 sm:flex-row'>
          <p className='text-xs text-neutral-500'>© {new Date().getFullYear()} SkyMart. All rights reserved.</p>
          <div className='flex items-center gap-4'>
            {socials.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} aria-label={label} className='text-neutral-500 transition hover:text-sky-400'>
                <Icon className='h-4 w-4' strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
