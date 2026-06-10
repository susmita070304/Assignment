import CourseCard from "./courseCard";

export default function DashboardPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-zinc-950 text-zinc-50 font-sans">
      <aside className="order-2 md:order-1 w-full md:basis-64 md:w-64 border-r border-zinc-900 bg-zinc-950 p-6 flex-shrink-0">
        <div className="text-xl font-bold tracking-wider text-indigo-400 mb-8">
          Latest Updates
        </div>

        <nav className="space-y-4">
          <div className="h-10 bg-zinc-900/50 rounded-xl border border-zinc-800/50"></div>
          <div className="h-10 bg-zinc-900/50 rounded-xl border border-zinc-800/50"></div>
          <div className="h-10 bg-zinc-900/50 rounded-xl border border-zinc-800/50"></div>
        </nav>
      </aside>

      <main
        id="heroSection"
        className="order-1 md:order-2 relative z-10 flex-1 min-h-screen flex items-center justify-center p-4 sm:p-8 md:p-12 w-full flex-col gap-6"
      >
        <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase bg-indigo-500/10 px-3 py-1 rounded-full">
          Learning Portal
        </span>
        <div className="group cursor-pointer relative w-full max-w-5xl">
          <div className="absolute -inset-[2px] -z-10 animate-glowing rounded-[13px] bg-[linear-gradient(130deg,#FB5288,#208AAE,#4A0D67,#A8577E,#5E4AE3,#F5D7E3,#AA7DCE,#3B429F)] bg-[length:600%] opacity-0 blur-[15px] transition-opacity duration-300 group-hover:opacity-100" />
          <div
            id="profileCard"
            className="bg-zinc-950 p-6 sm:p-10 rounded-xl border border-zinc-800 w-full min-h-[20rem] md:min-h-[30rem] flex flex-col items-start justify-between text-left"
          >
            <div className="text-xl sm:text-2xl font-bold text-white">
              Hello!! ,{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Developer
              </span>
            </div>
            <div className="mt-auto pt-6 w-full max-w-xs">
              <article className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-4 flex flex-col w-full max-w-xs">
                <div className="flex items-center gap-4 bg-zinc-950/50 border border-zinc-800/60 p-4 rounded-2xl w-fit mt-4">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/20 text-lg">
                    🔥
                  </div>
                  <div>
                    <div className="text-xs font-medium text-zinc-400">
                      Current Streak
                    </div>
                    <div className="text-sm font-bold text-zinc-100">
                      7 Days Active
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <CourseCard title="React Basics" />
          <CourseCard title="JavaScript" />
          <CourseCard title="Tailwind CSS" />
          <CourseCard title="UI/UX Design" />
        </div>
      </main>
    </div>
  );
}
