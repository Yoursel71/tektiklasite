import { site, whatsappLink } from "../content/site";

export default function Hero() {
  return (
    <section className="border-b border-line pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="font-mono text-xs uppercase tracking-widest text-lime">{site.hero.eyebrow}</p>
        <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-bright sm:text-7xl">
          {site.hero.title}<span className="block text-lime">{site.hero.titleAccent}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed sm:text-lg">{site.hero.subtitle}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a
            href={whatsappLink}
            className="rounded-full bg-lime px-7 py-3.5 text-sm font-bold text-ink transition-transform duration-150 hover:scale-[1.03] active:scale-[0.98]"
          >
            WhatsApp'tan yaz →
          </a>
          <a
            href="#fiyat"
            className="rounded-full border border-line px-7 py-3.5 text-sm font-bold text-bright transition-colors duration-150 hover:border-lime hover:text-lime"
          >
            Fiyata bak
          </a>
        </div>
      </div>
    </section>
  );
}
