import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import SimulationMap from "../components/dashboard/simulation/simulationMap";
import SimulationStatus from "../components/dashboard/simulation/simulationStatus";
import SimulationControls from "../components/dashboard/simulation/simulationControls";
import SimulationTelemetry from "../components/dashboard/simulation/simulationTelemetry";
import SimulationTimeline from "../components/dashboard/simulation/simulationTimeline";

import {
  ALTERNATIVE_ROUTE,
  INITIAL_TELEMETRY,
  NORMAL_ROUTE,
  OBSTRUCTION,
  interpolateRoute,
  type SimulationPhase,
  type SimulationTelemetry as SimulationTelemetryType,
} from "../data/simulationData";

export default function LiveSimulation() {
  const [phase, setPhase] =
    useState<SimulationPhase>("idle");

  const [running, setRunning] =
    useState(false);

  const [progress, setProgress] =
    useState(0);

  const [simHours, setSimHours] =
    useState(0);

  const [telemetry, setTelemetry] =
    useState<SimulationTelemetryType>(
      INITIAL_TELEMETRY,
    );

  const [demoSeconds, setDemoSeconds] =
    useState(0);

  const intervalRef =
    useRef<number | null>(null);

  /*
   * =========================================================
   * ACTIVE MISSION ROUTE
   *
   * The vessel follows the original mission route until
   * POLARIS determines that the mission must be replanned.
   *
   * After replanning, the vessel follows the new feasible
   * mission route.
   * =========================================================
   */

  const activeRoute = useMemo(() => {
    if (
      phase === "rerouting" ||
      phase === "accepted"
    ) {
      return ALTERNATIVE_ROUTE;
    }

    return NORMAL_ROUTE;
  }, [phase]);

  /*
   * =========================================================
   * VESSEL POSITION
   * =========================================================
   */

  const vesselPosition = useMemo(
    () =>
      interpolateRoute(
        activeRoute,
        progress,
      ),
    [activeRoute, progress],
  );

  /*
   * =========================================================
   * RESET MISSION
   * =========================================================
   */

  const resetSimulation = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(
        intervalRef.current,
      );

      intervalRef.current = null;
    }

    setRunning(false);
    setPhase("idle");
    setProgress(0);
    setSimHours(0);
    setDemoSeconds(0);

    setTelemetry({
      ...INITIAL_TELEMETRY,
    });
  }, []);

  /*
   * =========================================================
   * SENTINEL-1 OBSERVATION
   *
   * Simulates a newly received Sentinel-1 SAR observation
   * that changes the local ice-risk picture.
   * =========================================================
   */

  const triggerObstruction = useCallback(() => {
    setPhase("obstruction");
  }, []);

  /*
   * =========================================================
   * MISSION RE-EVALUATION
   *
   * POLARIS evaluates:
   * - updated Sentinel-1 ice conditions
   * - iceberg trajectory risk
   * - scientific objectives
   * - mandatory waypoint feasibility
   * - arrival window
   * - alternative mission sequence
   *
   * After analysis, a new feasible mission plan is produced.
   * =========================================================
   */

  const analyzeAlternatives = useCallback(() => {
    if (phase !== "obstruction") {
      return;
    }

    setPhase("analyzing");

    window.setTimeout(() => {
      setPhase("rerouting");
    }, 2200);
  }, [phase]);

  /*
   * =========================================================
   * ACCEPT NEW MISSION PLAN
   * =========================================================
   */

  const acceptRoute = useCallback(() => {
    if (phase !== "rerouting") {
      return;
    }

    setPhase("accepted");
  }, [phase]);

  /*
   * =========================================================
   * AUTOMATIC MISSION DEMO
   *
   * 0–4 sec
   *   Normal mission execution
   *
   * 5 sec
   *   New Sentinel-1 observation
   *
   * 9 sec
   *   Mission impact / feasibility analysis
   *
   * 12 sec
   *   New feasible mission plan generated
   *
   * 17 sec
   *   New mission plan accepted
   * =========================================================
   */

  const startAutoDemo = useCallback(() => {
    if (running) {
      return;
    }

    setRunning(true);
    setPhase("running");
    setProgress(0);
    setSimHours(0);
    setDemoSeconds(0);

    setTelemetry({
      ...INITIAL_TELEMETRY,
    });

    if (intervalRef.current !== null) {
      window.clearInterval(
        intervalRef.current,
      );
    }

    intervalRef.current =
      window.setInterval(() => {
        setDemoSeconds((previous) => {
          const next = previous + 1;

          if (next === 5) {
            setPhase("obstruction");
          }

          if (next === 9) {
            setPhase("analyzing");
          }

          if (next === 12) {
            setPhase("rerouting");
          }

          if (next === 17) {
            setPhase("accepted");
          }

          return next;
        });

        /*
         * One real second represents one simulated hour.
         */

        setSimHours(
          (previous) => previous + 1,
        );

        /*
         * Move vessel along the currently active
         * mission route.
         */

        setProgress((previous) => {
          const next =
            previous + 0.008;

          return Math.min(
            next,
            0.96,
          );
        });

        /*
         * =====================================================
         * LIVE TELEMETRY
         *
         * Values are simulated for demonstration purposes.
         * =====================================================
         */

        setTelemetry((previous) => {
          const time =
            Date.now() / 1000;

          const speed =
            12.4 +
            Math.sin(time / 4) * 1.1;

          const windSpeed =
            18 +
            Math.sin(time / 5) * 4;

          const waveHeight =
            2.1 +
            Math.sin(time / 6) * 0.45;

          const fuel =
            Math.max(
              58,
              previous.fuel - 0.035,
            );

          const distance =
            Math.max(
              18,
              previous.distanceRemaining -
                1.2,
            );

          const eta =
            Math.max(
              4,
              previous.etaHours -
                0.09,
            );

          return {
            speed,

            heading:
              phase === "accepted"
                ? 61 +
                  Math.sin(time / 5) * 3
                : 74 +
                  Math.sin(time / 5) * 2,

            fuel,

            windSpeed,

            waveHeight,

            visibility:
              14.8 -
              Math.max(
                0,
                windSpeed - 18,
              ) *
                0.05,

            distanceRemaining:
              distance,

            etaHours:
              eta,
          };
        });
      }, 1000);
  }, [running, phase]);

  /*
   * =========================================================
   * CLEANUP
   * =========================================================
   */

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(
          intervalRef.current,
        );
      }
    };
  }, []);

  /*
   * =========================================================
   * CONTINUE MOVEMENT AFTER NEW PLAN ACCEPTANCE
   *
   * Once the new mission plan is accepted, continue moving
   * the vessel along the replanned route.
   * =========================================================
   */

  useEffect(() => {
    if (!running) {
      return;
    }

    if (phase !== "accepted") {
      return;
    }

    const timer =
      window.setInterval(() => {
        setProgress((previous) => {
          if (previous >= 0.96) {
            return 0.96;
          }

          return previous + 0.002;
        });
      }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [phase, running]);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#020913] text-slate-100">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="flex min-h-[70px] shrink-0 items-center justify-between border-b border-cyan-400/10 bg-[#020b16] px-6">
        <div>
          <h1 className="font-mono text-[17px] tracking-[0.12em] text-slate-100">
            LIVE MISSION SIMULATION
          </h1>

          <p className="mt-1 font-mono text-[10px] tracking-[0.12em] text-slate-500">
            Adaptive Mission-Aware Navigation
          </p>
        </div>

        <div className="flex items-center gap-8">
          {/* LIVE STATUS */}

          <div className="hidden items-center gap-2 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.04] px-4 py-2.5 md:flex">
            <span
              className={`
                h-2.5
                w-2.5
                rounded-full
                ${
                  running
                    ? "bg-emerald-400 shadow-[0_0_12px_#34d399]"
                    : "bg-slate-600"
                }
              `}
            />

            <span className="font-mono text-[10px] tracking-[0.12em] text-emerald-400">
              {running
                ? "LIVE SYSTEM"
                : "STANDBY"}
            </span>
          </div>

          {/* SENTINEL-1 STATUS */}

          <div className="hidden text-right lg:block">
            <p className="font-mono text-[9px] text-slate-500">
              Sentinel-1 updated:
              <span className="ml-2 text-cyan-300">
                10 SEP 2026 • 18:42 UTC
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
            aria-label="Open alerts"
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
              MAP
          ================================================= */}

          <section className="relative min-h-[500px] min-w-0 flex-1 overflow-hidden bg-[#020913]">
            <SimulationMap
              vesselPosition={vesselPosition}
              normalRoute={NORMAL_ROUTE}
              alternativeRoute={ALTERNATIVE_ROUTE}
              obstruction={OBSTRUCTION}
              phase={phase}
            />

            {/* =================================================
                CURRENT MISSION
            ================================================= */}

            <div className="absolute left-5 top-5 z-10 rounded-xl border border-cyan-400/15 bg-[#020b16]/90 px-4 py-3 backdrop-blur-md">
              <p className="font-mono text-[8px] tracking-[0.14em] text-slate-600">
                CURRENT MISSION
              </p>

              <p className="mt-1 font-mono text-[11px] text-slate-200">
                ANTARCTIC SCIENTIFIC SURVEY
              </p>

              <div className="mt-2 flex items-center gap-3">
                <span className="font-mono text-[8px] text-emerald-400">
                  2 MANDATORY
                </span>

                <span className="text-slate-700">
                  •
                </span>

                <span
                  className={`font-mono text-[8px] ${
                    phase === "accepted"
                      ? "text-amber-300"
                      : "text-cyan-300"
                  }`}
                >
                  {phase === "accepted"
                    ? "OPTIONAL WP-03 SKIPPED"
                    : "1 OPTIONAL"}
                </span>
              </div>
            </div>

            {/* =================================================
                SENTINEL-1 OBSERVATION
            ================================================= */}

            {phase === "obstruction" && (
              <div className="absolute inset-x-0 bottom-10 z-20 flex justify-center px-4">
                <div className="w-full max-w-[560px] rounded-2xl border border-amber-400/40 bg-[#1b1204]/95 p-5 shadow-[0_0_45px_rgba(245,158,11,0.12)] backdrop-blur-md">
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-300">
                      !
                    </span>

                    <div>
                      <p className="font-mono text-[9px] tracking-[0.12em] text-amber-300">
                        NEW SENTINEL-1 OBSERVATION
                      </p>

                      <h2 className="mt-1 text-[16px] text-white">
                        ICE CHANGE DETECTED
                      </h2>

                      <p className="mt-2 font-mono text-[9px] leading-5 text-slate-500">
                        Updated SAR observations indicate
                        increased hazard risk near scientific
                        waypoint WP-02. The current mission plan
                        may no longer remain feasible.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <StatusMini
                      label="ICE RISK"
                      value="HIGH"
                      tone="amber"
                    />

                    <StatusMini
                      label="WP-02"
                      value="AT RISK"
                      tone="amber"
                    />

                    <StatusMini
                      label="MISSION"
                      value="IMPACTED"
                      tone="red"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={analyzeAlternatives}
                    className="mt-4 h-11 w-full rounded-xl border border-cyan-400/40 bg-cyan-400/[0.08] font-mono text-[10px] tracking-[0.08em] text-cyan-200 transition hover:bg-cyan-400/[0.15]"
                  >
                    RE-EVALUATE MISSION
                  </button>
                </div>
              </div>
            )}

            {/* =================================================
                MISSION RE-EVALUATION
            ================================================= */}

            {phase === "analyzing" && (
              <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-[#020913]/40 backdrop-blur-[1px]">
                <div className="w-[370px] rounded-2xl border border-cyan-400/30 bg-[#04111d]/95 p-7 text-center shadow-[0_0_50px_rgba(0,200,255,0.12)]">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/40">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400/20 border-t-cyan-400" />
                  </div>

                  <h2 className="mt-5 font-sans text-[18px] font-medium text-slate-200">
                    RE-EVALUATING MISSION
                  </h2>

                  <p className="mt-2 font-mono text-[10px] leading-5 text-slate-500">
                    POLARIS is evaluating mission feasibility
                    against the updated Antarctic risk landscape.
                  </p>

                  <div className="mt-5 space-y-2 text-left">
                    <AnalysisRow text="Sentinel-1 ice change" />
                    <AnalysisRow text="Iceberg trajectory risk" />
                    <AnalysisRow text="Scientific objectives" />
                    <AnalysisRow text="Mandatory waypoint feasibility" />
                    <AnalysisRow text="Arrival window" />
                    <AnalysisRow text="Alternative mission sequence" />
                  </div>
                </div>
              </div>
            )}

            {/* =================================================
                NEW MISSION PLAN
            ================================================= */}

            {phase === "rerouting" && (
              <div className="absolute inset-x-0 bottom-8 z-20 flex justify-center px-4">
                <div className="w-full max-w-[600px] rounded-2xl border border-cyan-400/40 bg-[#04111d]/95 p-5 shadow-[0_0_45px_rgba(0,200,255,0.12)] backdrop-blur-md">
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10 text-emerald-400">
                      ✓
                    </span>

                    <div>
                      <p className="font-mono text-[9px] tracking-[0.12em] text-emerald-400">
                        MISSION PLAN UPDATED
                      </p>

                      <h2 className="mt-1 text-[16px] text-white">
                        NEW FEASIBLE MISSION PLAN
                      </h2>

                      <p className="mt-1 font-mono text-[9px] text-slate-500">
                        POLARIS preserved all mandatory scientific
                        objectives while adapting the mission to the
                        new ice conditions.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                    <MissionDecision
                      label="WP-01"
                      value="PRESERVED"
                      tone="green"
                    />

                    <MissionDecision
                      label="WP-02"
                      value="REROUTED"
                      tone="cyan"
                    />

                    <MissionDecision
                      label="WP-03"
                      value="SKIPPED"
                      tone="amber"
                    />
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <div className="rounded-lg border border-cyan-400/10 bg-[#061522] p-3 text-center">
                      <p className="font-mono text-[8px] text-slate-600">
                        RISK
                      </p>

                      <p className="mt-1 text-[17px] text-emerald-400">
                        ↓ 41%
                      </p>
                    </div>

                    <div className="rounded-lg border border-cyan-400/10 bg-[#061522] p-3 text-center">
                      <p className="font-mono text-[8px] text-slate-600">
                        FUEL
                      </p>

                      <p className="mt-1 text-[17px] text-cyan-300">
                        ↓ 8.6%
                      </p>
                    </div>

                    <div className="rounded-lg border border-cyan-400/10 bg-[#061522] p-3 text-center">
                      <p className="font-mono text-[8px] text-slate-600">
                        ETA
                      </p>

                      <p className="mt-1 text-[17px] text-amber-400">
                        +2h 14m
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.04] px-4 py-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] text-slate-500">
                        MISSION FEASIBILITY
                      </span>

                      <span className="font-mono text-[10px] text-emerald-400">
                        FEASIBLE
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={acceptRoute}
                    className="mt-4 h-11 w-full rounded-xl border border-cyan-400/50 bg-cyan-400/[0.12] font-mono text-[10px] tracking-[0.08em] text-cyan-200 transition hover:bg-cyan-400/[0.2]"
                  >
                    ACCEPT NEW MISSION PLAN
                  </button>
                </div>
              </div>
            )}

            {/* =================================================
                ACCEPTED MISSION PLAN
            ================================================= */}

            {phase === "accepted" && (
              <div className="absolute inset-x-0 bottom-8 z-20 flex justify-center px-4">
                <div className="w-full max-w-[570px] rounded-2xl border border-emerald-400/40 bg-[#031b17]/95 px-6 py-5 shadow-[0_0_40px_rgba(16,185,129,0.12)] backdrop-blur-md">
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-400/50 bg-emerald-400/10 text-emerald-400">
                      ✓
                    </span>

                    <div>
                      <p className="font-mono text-[11px] tracking-[0.08em] text-emerald-400">
                        NEW MISSION PLAN ACCEPTED
                      </p>

                      <p className="mt-1 font-mono text-[9px] leading-5 text-slate-500">
                        Vessel is navigating the updated route.
                        Mandatory scientific objectives remain
                        protected and mission feasibility is restored.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <MissionDecision
                      label="MANDATORY"
                      value="2 / 2"
                      tone="green"
                    />

                    <MissionDecision
                      label="OPTIONAL"
                      value="WP-03 SKIPPED"
                      tone="amber"
                    />

                    <MissionDecision
                      label="STATUS"
                      value="FEASIBLE"
                      tone="green"
                    />
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* =================================================
              RIGHT PANEL
          ================================================= */}

          <aside className="h-full w-full shrink-0 overflow-y-auto border-l border-cyan-400/10 bg-[#020b16] p-3 xl:w-[320px]">
            <div className="space-y-3">
              <SimulationStatus
                phase={phase}
                simHours={simHours}
              />

              <SimulationControls
                phase={phase}
                running={running}
                onStartDemo={startAutoDemo}
                onTriggerObstruction={
                  triggerObstruction
                }
                onAnalyzeAlternatives={
                  analyzeAlternatives
                }
                onAcceptRoute={
                  acceptRoute
                }
                onReset={
                  resetSimulation
                }
              />

              <SimulationTelemetry
                telemetry={telemetry}
              />

              <SimulationTimeline
                phase={phase}
              />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   ANALYSIS ROW
========================================================= */

function AnalysisRow({
  text,
}: {
  text: string;
}) {
  return (
    <p className="flex items-center gap-2 font-mono text-[9px] text-emerald-400">
      <span className="text-emerald-400">
        ✓
      </span>

      {text}
    </p>
  );
}

/* =========================================================
   STATUS MINI
========================================================= */

function StatusMini({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "amber" | "red";
}) {
  return (
    <div className="rounded-lg border border-cyan-400/10 bg-[#061522] p-3 text-center">
      <p className="font-mono text-[8px] text-slate-600">
        {label}
      </p>

      <p
        className={`mt-1 font-mono text-[11px] ${
          tone === "red"
            ? "text-red-400"
            : "text-amber-300"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   MISSION DECISION
========================================================= */

function MissionDecision({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "green" | "cyan" | "amber";
}) {
  const textClass =
    tone === "green"
      ? "text-emerald-400"
      : tone === "cyan"
        ? "text-cyan-300"
        : "text-amber-300";

  return (
    <div className="rounded-lg border border-cyan-400/10 bg-[#061522] p-3 text-center">
      <p className="font-mono text-[8px] text-slate-600">
        {label}
      </p>

      <p
        className={`mt-1 font-mono text-[10px] ${textClass}`}
      >
        {value}
      </p>
    </div>
  );
}