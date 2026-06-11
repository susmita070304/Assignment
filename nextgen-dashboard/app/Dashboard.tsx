"use client";

import { motion, Variants } from "framer-motion";
import Coursecard from "./TempCard";

interface DashboardProps {
  studentName: string;
  streakCount: number;
  cards: Array<{
    id: string;
    title: string;
    iconName: string;
    progress: number;
    isEnrolled: boolean;
  }>;
  announcements: Array<{
    id: string;
    content: string;
  }>;
  activityDays: boolean[]; // <-- Add this to accept the data array directly from the server
}

export default function DashboardPage({
  studentName,
  streakCount,
  cards,
  announcements,
  activityDays,
}: DashboardProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 115,
        damping: 14,
      },
    },
  };

  const totalActiveDays = activityDays.filter(Boolean).length;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-zinc-950 text-zinc-50 font-sans overflow-x-hidden">
      <motion.aside
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="order-2 md:order-1 w-full md:basis-64 md:w-64 border-r border-zinc-900 bg-zinc-950 p-6 flex-shrink-0"
      >
        <div className="text-xl font-bold tracking-wider text-indigo-400 mb-8">
          Latest Updates
        </div>
        <nav className="space-y-4">
          {announcements.length === 0 ? (
            <div className="text-xs text-zinc-500 italic p-3">
              No recent updates.
            </div>
          ) : (
            announcements.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-zinc-900/50 rounded-xl border border-zinc-800/50 text-xs text-zinc-300 leading-relaxed shadow-sm"
              >
                {item.content}
              </div>
            ))
          )}
        </nav>
      </motion.aside>

      <motion.main
        id="heroSection"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="order-1 md:order-2 relative z-10 flex-1 min-h-screen p-4 sm:p-8 md:p-12 w-full flex-col flex gap-6 max-w-6xl mx-auto"
      >
        <div className="w-full">
          <motion.span
            variants={itemVariants}
            className="text-xs font-semibold tracking-widest text-indigo-400 uppercase bg-indigo-500/10 px-3 py-1 rounded-full"
          >
            Learning Portal
          </motion.span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-start">
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            className="group cursor-pointer relative lg:col-span-2 w-full"
          >
            <motion.div
              variants={{
                hover: { opacity: 1, scale: 1.01 },
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                backgroundPosition: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
              className="absolute -inset-[2px] -z-10 rounded-[13px] bg-[linear-gradient(130deg,#FB5288,#208AAE,#4A0D67,#A8577E,#5E4AE3,#F5D7E3,#AA7DCE,#3B429F)] bg-[length:600%_600%] opacity-0 blur-[15px] transition-opacity duration-300"
            />

            <div
              id="profileCard"
              className="bg-zinc-950 p-6 sm:p-10 rounded-xl border border-zinc-800 w-full min-h-[18rem] md:min-h-[22rem] flex flex-col items-start justify-between text-left transition-colors duration-300 group-hover:border-zinc-700"
            >
              <div className="text-xl sm:text-2xl font-bold text-white">
                Hello!! ,{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {studentName}
                </span>
              </div>

              <div className="mt-auto pt-6 w-full max-w-xs">
                <motion.article
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-4 flex flex-col w-full max-w-xs backdrop-blur-sm"
                >
                  <div className="flex items-center gap-4 bg-zinc-950/50 border border-zinc-800/60 p-4 rounded-2xl w-fit mt-4">
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut",
                      }}
                      className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/20 text-lg"
                    >
                      🔥
                    </motion.div>
                    <div>
                      <div className="text-xs font-medium text-zinc-400">
                        Current Streak
                      </div>
                      <div className="text-sm font-bold text-zinc-100">
                        {streakCount} Days Active
                      </div>
                    </div>
                  </div>
                </motion.article>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-zinc-900/20 rounded-xl border border-zinc-800 p-6 flex flex-col justify-between min-h-[18rem] md:min-h-[22rem] w-full"
          >
            <div className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">
              Activity Tracking
            </div>

            <div className="grid grid-cols-6 gap-2 max-w-[160px] mx-auto my-auto w-full">
              {activityDays.map((wasActive, index) => (
                <div
                  key={index}
                  className={`aspect-square w-full rounded-sm transition-transform hover:scale-125 duration-100 ${
                    wasActive
                      ? "bg-indigo-500"
                      : "bg-zinc-800/40 border border-zinc-900"
                  }`}
                />
              ))}
            </div>

            <div className="text-[10px] text-zinc-400 tracking-wide font-medium">
              Total usage:{" "}
              <span className="text-indigo-400 font-bold">
                {totalActiveDays} days
              </span>{" "}
              out of {activityDays.length} tracked.
            </div>
          </motion.div>

          <div className="lg:col-span-3 pt-4">
            <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              Active Courses
            </div>
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {cards.map((course) => (
              <Coursecard
                key={course.id}
                title={course.title}
                progress={course.progress}
                isEnrolled={course.isEnrolled}
                iconName={course.iconName}
              />
            ))}
          </div>
        </div>
      </motion.main>
    </div>
  );
}
