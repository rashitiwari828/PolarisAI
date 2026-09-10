import { homeStats } from "../../data/homeData";

export default function HomeStats() {
  return (
    <div className="grid grid-cols-2 gap-x-10 gap-y-8 pt-12 sm:grid-cols-4 sm:gap-x-8">
      {homeStats.map((stat) => (
        <div key={stat.value}>
          <p
            className="
              text-2xl
              font-light
              tracking-wide
              text-cyan-400
              sm:text-2xl
            "
          >
            {stat.value}
          </p>

          <p
            className="
              mt-1
              whitespace-nowrap
              font-mono
              text-[9px]
              uppercase
              tracking-widest
              text-slate-500
            "
          >
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}