import { site, whatsappLink } from "../content/site";

export default function Navbar() {
  const dot = site.brand.lastIndexOf(".");
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/90 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="text-lg font-bold tracking-tight text-bright">
          {site.brand.slice(0, dot)}
          <span className="text-lime">{site.brand.slice(dot)}</span>
        </a>
        <a
          href={whatsappLink}
          className="rounded-full bg-lime px-5 py-2 text-xs font-bold uppercase text-ink transition-transform duration-150 hover:scale-[1.04] active:scale-[0.98]"
        >
          WhatsApp
        </a>
      </nav>
    </header>
  );
}
