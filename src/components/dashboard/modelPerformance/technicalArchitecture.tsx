import { technicalArchitecture } from "../../../data/modelPerformance";

export default function TechnicalArchitecture() {
  return (
    <section className="rounded-xl border border-cyan-400/15 bg-[#04111d] p-6">
      <h2 className="text-[14px] font-medium tracking-wide text-slate-100">
        TECHNICAL ARCHITECTURE
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {technicalArchitecture.map((item) => (
          <article
            key={item.title}
            className="rounded-xl border border-cyan-400/10 bg-[#061522] p-5"
          >
            <h3 className="text-[13px] font-medium text-slate-200">
              {item.title}
            </h3>

            <p className="mt-3 font-mono text-[11px] text-cyan-300">
              {item.model}
            </p>

            <p className="mt-3 font-mono text-[9px] leading-5 text-slate-500">
              Input: {item.input}
            </p>

            <p className="mt-1 font-mono text-[9px] leading-5 text-slate-500">
              Output: {item.output}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}