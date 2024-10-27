"use client";

import FlickeringGrid from "@/components/magicui/flickering-grid";
import Ripple from "@/components/magicui/ripple";
import Safari from "@/components/safari";
import Section from "@/components/section";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const features = [
  {
    title: "Adaptive AI Games",
    description:
      "Our platform uses advanced AI to create personalized cognitive games that adapt to each user's abilities and progress.",
    className: "hover:bg-blue-500/10 transition-all duration-500 ease-out",
    content: (
      <>
        <Safari
          src={`/cerebrix-games.png`}
          url="https://cerebrix.ai/games"
          className="-mb-32 mt-4 max-h-64 w-full px-4 select-none drop-shadow-[0_0_28px_rgba(0,0,0,.1)] group-hover:translate-y-[-10px] transition-all duration-300"
        />
      </>
    ),
  },
  {
    title: "Voice-Driven Interface",
    description:
      "Intuitive voice commands make navigation and interaction effortless, enhancing accessibility for users with varying cognitive abilities.",
    className:
      "order-3 xl:order-none hover:bg-green-500/10 transition-all duration-500 ease-out",
    content: (
      <Safari
        src={`/cerebrix-voice.png`}
        url="https://cerebrix.ai/voice"
        className="-mb-32 mt-4 max-h-64 w-full px-4 select-none drop-shadow-[0_0_28px_rgba(0,0,0,.1)] group-hover:translate-y-[-10px] transition-all duration-300"
      />
    ),
  },
  {
    title: "Comprehensive Progress Tracking",
    description:
      "Monitor cognitive health with detailed analytics, providing valuable insights for users, caregivers, and healthcare professionals.",
    className:
      "md:row-span-2 hover:bg-purple-500/10 transition-all duration-500 ease-out",
    content: (
      <>
        <FlickeringGrid
          className="z-0 absolute inset-0 [mask:radial-gradient(circle_at_center,#fff_400px,transparent_0)]"
          squareSize={4}
          gridGap={6}
          color="#000"
          maxOpacity={0.1}
          flickerChance={0.1}
          height={800}
          width={800}
        />
        <Safari
          src={`/cerebrix-analytics.png`}
          url="https://cerebrix.ai/analytics"
          className="-mb-48 ml-12 mt-16 h-full px-4 select-none drop-shadow-[0_0_28px_rgba(0,0,0,.1)] group-hover:translate-x-[-10px] transition-all duration-300"
        />
      </>
    ),
  },
  {
    title: "Personalized Therapy Plans",
    description:
      "Tailored cognitive exercises and activities designed to meet individual needs and preferences, ensuring engaging and effective therapy sessions.",
    className:
      "flex-row order-4 md:col-span-2 md:flex-row xl:order-none hover:bg-orange-500/10 transition-all duration-500 ease-out",
    content: (
      <>
        <Ripple className="absolute -bottom-full" />
        <Safari
          src={`/cerebrix-plans.png`}
          url="https://cerebrix.ai/plans"
          className="-mb-32 mt-4 max-h-64 w-full px-4 select-none drop-shadow-[0_0_28px_rgba(0,0,0,.1)] group-hover:translate-y-[-10px] transition-all duration-300"
        />
      </>
    ),
  },
];

export default function Component() {
  return (
    <Section
      title="Solution"
      subtitle="Empowering Cognitive Health with AI"
      description="Cerebrix offers a unique, AI-driven platform designed to provide engaging and effective cognitive therapy for individuals with dementia."
      className="bg-neutral-100 dark:bg-neutral-900"
    >
      <div className="mx-auto mt-16 grid max-w-sm grid-cols-1 gap-6 text-gray-500 md:max-w-3xl md:grid-cols-2 xl:grid-rows-2 md:grid-rows-3 xl:max-w-6xl xl:auto-rows-fr xl:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={cn(
              "group relative items-start overflow-hidden bg-neutral-50 dark:bg-neutral-800 p-6 rounded-2xl",
              feature.className
            )}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: index * 0.1,
            }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="font-semibold mb-2 text-primary">
                {feature.title}
              </h3>
              <p className="text-foreground">{feature.description}</p>
            </div>
            {feature.content}
            <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-neutral-50 dark:from-neutral-900 pointer-events-none"></div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
