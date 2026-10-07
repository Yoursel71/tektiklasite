import { site, whatsappLink } from "../content/site";

export default function Pricing() {
  const p = site.price;
  return (
    <section id="fiyat" className="scroll-mt-20 border-b border-line py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-bright sm:text-5xl">Fiyat</h2>
        <div className="mt-10 max-w-xl border border-line bg-surface p-7 sm:p-9">
          <div className="flex items-baseline gap-4">
            <span className="text-5xl font-bold tracking-tight text-lime sm:text-6xl">{p.now}</span>
            <span className="text-lg text-body line-through">{p.normal}</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed">{p.note}</p>

          <div className="mt-7 border-t border-line pt-6">
            <p className="font-mono text-xs uppercase tracking-widest">{p.yearlyLabel}</p>
            <p className="mt-2 text-2xl font-bold text-bright">
              {p.yearly} <span className="text-sm font-normal text-body">/ yıl</span>
            </p>
            <p className="mt-1 text-sm">{p.yearlyNote}</p>
          </div>

          <a
            href={whatsappLink}
            className="mt-8 inline-block rounded-full bg-lime px-7 py-3.5 text-sm font-bold text-ink transition-transform duration-150 hover:scale-[1.03] active:scale-[0.98]"
          >
            Bu paketi istiyorum →
          </a>
        </div>
      </div>
    </section>
  );
}
