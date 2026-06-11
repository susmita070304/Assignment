"use client";

import { motion } from "framer-motion";
import * as Lucide from "lucide-react";
import { Atom, Code, Layers, Sparkles } from "lucide-react";

interface TempCardProps {
  title: string;
  progress: number;
  isEnrolled: boolean;
  iconName: string;
}

export default function Coursecard({
  title,
  progress,
  isEnrolled,
  iconName,
}: TempCardProps) {
  let IconComponent = Lucide.BookOpen;
  if (iconName === "Atom") IconComponent = Atom;
  if (iconName === "Code") IconComponent = Code;
  if (iconName === "Layers") IconComponent = Layers;
  if (iconName === "Sparkles") IconComponent = Sparkles;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover="hover"
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group cursor-pointer relative w-full"
    >
      <motion.div
        variants={{
          hover: { opacity: 0.4, scale: 1.02 },
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          backgroundPosition: {
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        className="absolute -inset-[1px] -z-10 rounded-2xl bg-[linear-gradient(130deg,#FB5288,#208AAE,#4A0D67,#A8577E,#5E4AE3)] bg-[length:400%_400%] opacity-0 blur-md transition-opacity duration-300"
      />

      <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-800 p-5 rounded-2xl flex flex-col justify-between min-h-[12rem] group-hover:border-zinc-700 transition-colors shadow-lg w-full">
        <div className="flex justify-between items-start w-full">
          <div className="w-10 h-10 bg-zinc-950 rounded-xl flex items-center justify-center border border-zinc-800 text-indigo-400">
            <IconComponent size={20} />
          </div>

          {isEnrolled && (
            <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded-md border border-indigo-500/20 font-medium">
              {progress}%
            </span>
          )}
        </div>

        <div className="mt-4 space-y-3 w-full">
          <h3 className="text-sm font-semibold text-zinc-200 tracking-tight">
            {title}
          </h3>

          {isEnrolled ? (
            <div className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden mt-2 border border-zinc-800/50">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
              />
            </div>
          ) : (
            <div className="text-xs text-zinc-500 font-medium transition-colors mt-2 group-hover:text-indigo-400">
              Not Enrolled →
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
