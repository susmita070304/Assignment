"use client";

import { motion } from "framer-motion";

interface TempCardProps {
  title: string;
  progress: number;
  isEnrolled: boolean;
  iconName: string;
}

// Map the text keywords from your Supabase table to emojis
const getIconDisplay = (iconName: string) => {
  switch (iconName) {
    case "Atom":
      return "⚛️";
    case "Code":
      return "💛";
    case "Layers":
      return "🎨";
    case "Figma":
      return "✨";
    default:
      return "📘";
  }
};

export default function Coursecard({
  title,
  progress,
  isEnrolled,
  iconName,
}: TempCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="group/card cursor-pointer relative w-full h-full"
    >
      {/* Optional: Glow border effect on hover just like the profile card */}
      <div className="absolute -inset-[1px] -z-10 rounded-[17px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover/card:opacity-100 blur-md transition-opacity duration-300" />

      <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-900 w-full min-h-[14rem] flex flex-col justify-between text-left backdrop-blur-sm transition-all duration-300 group-hover/card:border-zinc-800">
        <div>
          {/* Mapped Database Icon Indicator */}
          <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800/80 text-xl mb-4 shadow-inner group-hover/card:border-zinc-700/80 transition-colors">
            {getIconDisplay(iconName)}
          </div>

          <h3 className="font-bold text-base text-zinc-100 group-hover/card:text-white transition-colors tracking-wide">
            {title}
          </h3>
        </div>

        <div className="mt-6 w-full">
          {isEnrolled ? (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-medium text-zinc-400 px-0.5">
                <span>Progress</span>
                <span className="text-indigo-400 font-semibold">
                  {progress}%
                </span>
              </div>
              {/* Animated Progress Bar Container */}
              <div className="w-full h-1.5 bg-zinc-900/80 rounded-full overflow-hidden border border-zinc-800/50">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
                />
              </div>
            </div>
          ) : (
            <button className="w-full py-2.5 bg-zinc-900 hover:bg-indigo-600/10 text-xs font-semibold text-zinc-400 hover:text-indigo-400 rounded-xl border border-zinc-800/80 hover:border-indigo-500/30 transition-all duration-200 shadow-sm active:scale-[0.98]">
              Explore Course
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
