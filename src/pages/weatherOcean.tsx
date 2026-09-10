import WeatherMetricCard from "../components/dashboard/weatherOcean/weatherMetricCard";
import WeatherOceanMap from "../components/dashboard/weatherOcean/weatherOceanMap";
import WeatherForecast from "../components/dashboard/weatherOcean/weatherForecast";
import WeatherAlert from "../components/dashboard/weatherOcean/weatherAlert";
import OceanographicPanel from "../components/dashboard/weatherOcean/oceanographicPanel";
import WeatherDataSources from "../components/dashboard/weatherOcean/weatherDataSources";

export default function WeatherOcean() {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#020913] text-slate-100">
      {/* =====================================================
          WEATHER & OCEAN HEADER
      ===================================================== */}

      <header className="flex min-h-[70px] shrink-0 items-center justify-between border-b border-cyan-400/10 bg-[#020b16] px-6">
        <div>
          <h1 className="font-mono text-[17px] tracking-[0.12em] text-slate-100">
            WEATHER & OCEAN
          </h1>

          <p className="mt-1 font-mono text-[10px] tracking-[0.12em] text-slate-500">
            Environmental Intelligence Dashboard
          </p>
        </div>

        <div className="flex items-center gap-8">
          {/* LIVE */}
          <div className="hidden items-center gap-2 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.04] px-4 py-2.5 md:flex">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />

            <span className="font-mono text-[10px] tracking-[0.12em] text-emerald-400">
              LIVE SYSTEM
            </span>
          </div>

          {/* SATELLITE UPDATE */}
          <div className="hidden text-right lg:block">
            <p className="font-mono text-[9px] text-slate-500">
              Satellite updated:
              <span className="ml-2 text-cyan-300">
                08 SEP 2026 • 18:42 UTC
              </span>
            </p>

            <p className="mt-1 font-mono text-[9px] text-slate-600">
              Vessel:
              <span className="ml-2 text-slate-400">
                MV SAGAR KANYA
              </span>
            </p>
          </div>

          {/* ALERT */}
          <button
            type="button"
            className="hidden h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/15 bg-[#061522] text-slate-400 transition hover:border-cyan-400/40 hover:text-cyan-300 sm:flex"
          >
            △
          </button>

          {/* USER */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/[0.08] font-mono text-[10px] text-cyan-200">
            SK
          </div>
        </div>
      </header>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <main className="min-h-0 flex-1 overflow-hidden">
        <div className="flex h-full min-h-0 flex-col xl:flex-row">
          {/* =================================================
              LEFT MAP AREA
          ================================================= */}

          <section className="relative min-h-0 min-w-0 flex-1 overflow-hidden bg-[#020913]">
            {/* WEATHER METRICS */}

            <div className="absolute left-4 top-4 z-30 grid w-[430px] grid-cols-2 gap-2.5">
              <WeatherMetricCard
                icon="🌬"
                label="WIND"
                value="24 kn"
                detail="NE  •  Gusts: 31 kn"
              />

              <WeatherMetricCard
                icon="🌊"
                label="OCEAN CURRENT"
                value="1.2 kn"
                detail="EAST  •  Temp: -1.8°C"
              />

              <WeatherMetricCard
                icon="🌡"
                label="AIR TEMP"
                value="-14°C"
                detail="Dewpoint: -18°C"
                tone="slate"
              />

              <WeatherMetricCard
                icon="🌊"
                label="WAVE HEIGHT"
                value="2.8 m"
                detail="Period: 8.4 s  •  NE swell"
              />

              <WeatherMetricCard
                icon="◉"
                label="VISIBILITY"
                value="8.4 km"
                detail="Clear  •  No fog"
                tone="green"
              />

              <WeatherMetricCard
                icon="▾"
                label="PRESSURE"
                value="988 hPa"
                detail="↓ Falling  •  Low approaching"
                tone="amber"
              />
            </div>

            {/* MAP */}

            <div className="h-full w-full p-0">
              <WeatherOceanMap />
            </div>
          </section>

          {/* =================================================
              RIGHT INTELLIGENCE PANEL
          ================================================= */}

          <aside className="h-full w-full shrink-0 overflow-y-auto border-l border-cyan-400/10 bg-[#020b16] p-3 xl:w-[350px]">
            <div className="space-y-3">
              <WeatherForecast />

              <WeatherAlert />

              <OceanographicPanel />

              <WeatherDataSources />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}