import React from "react";
import { Zap, Shield, Tag, Truck, RotateCcw, Headphones } from "lucide-react";

const badges = [
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Same-day on select items",
    color: "text-red-400",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "100% encrypted checkout",
    color: "text-sky-400",
  },
  {
    icon: Tag,
    title: "Best Prices",
    description: "Price-match guarantee",
    color: "text-emerald-400",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over £50",
    color: "text-orange-400",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day return window",
    color: "text-fuchsia-400",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Real humans, always on",
    color: "text-yellow-400",
  },
];

const TrustBadges = () => {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {badges.map(({ icon: Icon, title, description, color }) => (
        <div
          key={title}
          className='flex items-center gap-4 rounded-2xl border border-neutral-800 bg-neutral-900 px-6 py-5 transition hover:border-neutral-700'
        >
          <Icon className={`h-6 w-6 shrink-0 ${color}`} strokeWidth={1.75} />
          <div>
            <p className='text-sm font-semibold text-white'>{title}</p>
            <p className='text-xs text-neutral-500'>{description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;
