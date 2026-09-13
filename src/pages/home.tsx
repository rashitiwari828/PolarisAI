import HomeHeader from "../components/home/homeHeader";
import HomeHero from "../components/home/homeHero";
import HomeStats from "../components/home/homeStats";
import AntarcticRadar from "../components/home/antarcticRadar";

interface HomeProps {
  onEnterMissionControl: () => void;
}

export default function Home({
  onEnterMissionControl,
}: HomeProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020914] text-white">

      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div
          className="
            absolute
            inset-0
            bg-[linear-gradient(rgba(55,150,190,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(55,150,190,0.045)_1px,transparent_1px)]
            bg-size-[48px_48px]
          "
        />
      </div>

      {/* Ambient glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-[25%]
          top-[10%]
          h-125
          w-125
          rounded-full
          bg-cyan-500/[0.035]
          blur-[120px]
        "
      />

      {/* MAIN WRAPPER */}
      <div className="relative z-10 min-h-screen px-5 py-5 sm:px-8 sm:py-8 lg:px-10 lg:py-8">

        {/* HEADER */}
        <HomeHeader
          onLogin={onEnterMissionControl}
        />

        {/* MAIN TWO-COLUMN AREA */}
        <section
          className="
            mt-8
            grid
            min-h-[calc(100vh-120px)]
            grid-cols-1
            gap-8
            lg:grid-cols-[0.85fr_1.15fr]
            lg:items-center
            lg:gap-10
          "
        >

          {/* ================= LEFT ================= */}
          <div className="flex min-w-0 flex-col justify-center">

            <HomeHero
              onEnterMissionControl={onEnterMissionControl}
            />

            <HomeStats />

            {/* FOOTER */}
            <div
              className="
                mt-10
                flex
                flex-wrap
                gap-x-10
                gap-y-2
                pb-2
                font-mono
                text-[9px]
                tracking-wider
                text-slate-700
              "
            >
            </div>

          </div>


          {/* ================= RIGHT ================= */}
          <div
            className="
              min-w-0
              w-full
              lg:flex
              lg:items-center
            "
          >
            <div className="w-full min-w-0">
              <AntarcticRadar />
            </div>
          </div>

        </section>

      </div>
    </main>
  );
}