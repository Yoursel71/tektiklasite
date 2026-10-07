import { site } from "../content/site";

export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <p className="mx-auto max-w-5xl px-4 font-mono text-[11px] uppercase tracking-widest sm:px-6">
        © {new Date().getFullYear()} {site.brand} — Trabzon
      </p>
    </footer>
  );
}
