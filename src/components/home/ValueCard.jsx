import React from "react";
import { ShieldCheck, Zap, HeartHandshake, Sparkles } from "lucide-react";

const ValueCard = () => {
  const values = [
    {
      icon: ShieldCheck,
      title: "Quality First",
      description: "Every product is checked before it reaches you.",
      color: "text-sky-400",
    },
    {
      icon: Zap,
      title: "Fast & Reliable",
      description: "Quick delivery, no surprises, no delays.",
      color: "text-lime-400",
    },
    {
      icon: HeartHandshake,
      title: "Honest Pricing",
      description: "No inflated tags, no fake discounts. Just fair prices.",
      color: "text-emerald-400",
    },
    {
      icon: Sparkles,
      title: "Made Simple",
      description: "Shopping should feel effortless, not exhausting.",
      color: "text-fuchsia-400",
    },
  ];
  return (
    <section className='flex flex-col gap-6'>
      <h2 className='text-2xl font-bold md:text-3xl'>What we stand on</h2>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {values.map(({ icon: Icon, title, description, color }) => (
          <div
            key={title}
            className='flex flex-col gap-3 rounded-2xl border border-neutral-800 bg-neutral-900 px-6 py-6 transition hover:border-neutral-700'
          >
            <Icon className={`h-6 w-6 ${color}`} strokeWidth={1.75} />
            <p className='text-sm font-semibold text-white'>{title}</p>
            <p className='text-xs text-neutral-500'>{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValueCard;
