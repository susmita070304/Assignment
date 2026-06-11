"use client";

import { motion } from "framer-motion";

interface TempCardProps {
  title: string;
}

export default function TempCard({ title }: TempCardProps) {
  return (
    <motion.div
      whileHover="hover"
      className="group cursor-pointer relative w-full h-20 md:w-64 md:h-64"
    >
      <motion.div
        variants={{
          hover: { opacity: 1 },
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          backgroundPosition: { duration: 8, repeat: Infinity, ease: "linear" },
        }}
        className="absolute -inset-[2px] -z-10 rounded-[13px] bg-[linear-gradient(130deg,#FB5288,#208AAE,#4A0D67,#A8577E,#5E4AE3,#F5D7E3,#AA7DCE,#3B429F)] bg-[length:600%_600%] opacity-0 blur-[15px] transition-opacity duration-300"
      />

      <motion.div
        id="courseName"
        variants={{
          hover: { y: -4 },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="text-lg font-semibold text-white bg-zinc-950 rounded-xl border border-zinc-800 w-full h-full flex flex-row items-center justify-start px-6 md:flex-col md:justify-center md:px-0 group-hover:border-zinc-700 transition-colors duration-300"
      >
        {title}
      </motion.div>
    </motion.div>
  );
}
