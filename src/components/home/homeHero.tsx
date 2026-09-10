import GlowButton from "../common/glowButton";

interface HomeHeroProps {
  onEnterMissionControl: () => void;
}

export default function HomeHero({
  onEnterMissionControl,
}: HomeHeroProps) {
  return (
    <section className="flex flex-1 flex-col justify-center">
      {/* Logo / Title */}
      <div>
        <h1
          className="
            text-[clamp(4rem,7vw,7.5rem)]
            font-extralight
            leading-[0.85]
            tracking-[-0.06em]
            text-white
            [text-shadow:0_0_25px_rgba(180,240,255,0.35)]
          "
        >
          POLARIS
        </h1>

        <div className="mt-7 space-y-2">
          <p
            className="
              font-mono
              text-sm
              font-semibold
              uppercase
              tracking-[0.32em]
              text-cyan-400
            "
          >
            POLAR NAVIGATION
          </p>

          <p
            className="
              font-mono
              text-sm
              font-semibold
              uppercase
              tracking-[0.32em]
              text-cyan-400/70
            "
          >
            & ICE RISK INTELLIGENCE
          </p>
        </div>

        {/* Small decorative line */}
        <div className="mt-5 flex items-center gap-5">
          <div className="h-px w-16 bg-cyan-400/40" />

          <div className="h-2 w-2 rounded-full bg-cyan-400/70" />
        </div>
      </div>

      {/* Description */}
      <p
        className="
          mt-10
          max-w-xl
          text-base
          leading-7
          text-slate-400
          sm:text-lg
          sm:leading-8
        "
      >
        AI-powered decision support for safer and fuel-efficient
        Antarctic navigation. Real-time sea-ice forecasting,
        iceberg tracking, and dynamic route optimization.
      </p>

      {/* CTA */}
      <div className="mt-12">
        <GlowButton onClick={onEnterMissionControl}>
          ENTER MISSION CONTROL
        </GlowButton>
      </div>
    </section>
  );
}