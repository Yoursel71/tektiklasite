import { site } from "../content/site";

export default function Included() {
  return (
    <section id="dahil" className="scroll-mt-20 border-b border-line py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-bright sm:text-5xl">Neler dahil?</h2>
        <ul className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2">
          {site.included.map((item) => (
            <li key={item.title} className="flex gap-4">
              <span aria-hidden="true" className="mt-0.5 font-bold text-lime">✓</span>
              <div>
                <h3 className="font-bold text-bright">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed">{item.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
