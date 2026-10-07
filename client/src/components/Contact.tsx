import { site, whatsappLink } from "../content/site";

export default function Contact() {
  return (
    <section id="iletisim" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-4xl font-bold tracking-tight text-bright sm:text-6xl">
          Bir mesaj <span className="text-lime">yeter.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed">
          İşletmenin adını ve ne sattığını yaz, gerisini biz hallederiz.
        </p>
        <a
          href={whatsappLink}
          className="mt-9 inline-block rounded-full bg-lime px-8 py-4 text-sm font-bold text-ink transition-transform duration-150 hover:scale-[1.03] active:scale-[0.98]"
        >
          WhatsApp'tan yaz →
        </a>
        <p className="mt-8 font-mono text-xs">
          <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="transition-colors duration-150 hover:text-lime">
            {site.phone}
          </a>
          <span aria-hidden="true" className="mx-3 text-line">|</span>
          <a href={`mailto:${site.email}`} className="transition-colors duration-150 hover:text-lime">
            {site.email}
          </a>
        </p>
      </div>
    </section>
  );
}
