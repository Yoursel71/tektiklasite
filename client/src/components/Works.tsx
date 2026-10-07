import { site } from "../content/site";

export default function Works() {
  return (
    <section id="isler" className="scroll-mt-20 border-b border-line py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-bright sm:text-5xl">İşler</h2>
        <p className="mt-3 text-sm">Hepsi yayında — tıkla, gez.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {site.works.map((w) => (
            <a
              key={w.url}
              href={w.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border border-line bg-surface p-6 transition-colors duration-200 hover:border-lime"
            >
              <p className="font-mono text-[11px] uppercase tracking-widest">{w.kind}</p>
              <h3 className="mt-3 text-xl font-bold text-bright">
                {w.title}
                <span aria-hidden="true" className="ml-2 text-body transition-colors duration-150 group-hover:text-lime">↗</span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed">{w.description}</p>
              <p className="mt-4 font-mono text-xs text-lime">{w.url.replace("https://", "")}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
