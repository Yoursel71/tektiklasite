import { site } from "../content/site";

export default function Faq() {
  return (
    <section id="sss" className="scroll-mt-20 border-b border-line py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-bright sm:text-5xl">Sık sorulanlar</h2>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {site.faq.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-bright">
                {item.q}
                <span aria-hidden="true" className="text-lime transition-transform duration-150 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
