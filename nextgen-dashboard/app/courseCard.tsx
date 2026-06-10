export default function courseCard({ title }) {
  return (
    <div className="group cursor-pointer relative md:w-64 w-full md:h-64 h-20">
      <div className="absolute -inset-[2px] -z-10 animate-glowing rounded-[13px] bg-[linear-gradient(130deg,#FB5288,#208AAE,#4A0D67,#A8577E,#5E4AE3,#F5D7E3,#AA7DCE,#3B429F)] bg-[length:600%] opacity-0 blur-[15px] transition-opacity duration-300 group-hover:opacity-100" />
      <div
        id="courseName"
        className="text-lg font-semibold text-white bg-zinc-950 rounded-xl border border-zinc-800 w-full h-full flex items-center justify-center"
      >
        {title}
      </div>
    </div>
  );
}
