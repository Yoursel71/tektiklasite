import Reveal from "./Reveal";

interface FreeAuditProps {
  onRequest: (message: string) => void;
}

const checks = [
  {
    no: "01",
    title: "Mobil + hız",
    detail: "Telefonda dağılan alanları ve ziyaretçiyi kaçıran yavaşlıkları buluyoruz.",
  },
  {
    no: "02",
    title: "Google görünürlüğü",
    detail: "Başlık, içerik ve teknik SEO tarafındaki ilk fırsatları çıkarıyoruz.",
  },
  {
    no: "03",
    title: "Müşteri dönüşümü",
    detail: "Arama, teklif veya rezervasyon yolundaki gereksiz engelleri işaretliyoruz.",
  },
] as const;

export default function FreeAudit({ onRequest }: FreeAuditProps) {
  function requestAudit() {
    onRequest(
      "Mevcut sitem için ücretsiz 3 nokta kontrolü istiyorum. Site adresim: "
    );
  }

  return (
    <section id="ucretsiz-kontrol" className="scroll-mt-20 border-b border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="overflow-hidden border border-lime bg-lime text-ink">
            <div className="grid gap-px bg-ink/15 lg:grid-cols-[1.05fr_1.4fr]">
              <div className="bg-lime p-7 sm:p-10">
                <p className="font-mono text-xs font-bold uppercase tracking-widest">
                  Ücretsiz — satış baskısı yok
                </p>
                <h2 className="mt-5 text-4xl font-bold uppercase tracking-tight sm:text-6xl">
                  Siteni 3 noktadan kontrol edelim.
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink/75 sm:text-base">
                  Site adresini gönder; hız, Google görünürlüğü ve müşteri dönüşümü için
                  uygulanabilir üç öneriyi ücretsiz paylaşalım.
                </p>
                <button
                  type="button"
                  onClick={requestAudit}
                  className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-bold uppercase text-lime transition-transform duration-150 hover:scale-[1.03] active:scale-[0.98]"
                >
                  Ücretsiz kontrol iste
                  <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>

              <div className="grid gap-px bg-ink/15 sm:grid-cols-3">
                {checks.map((check) => (
                  <article key={check.no} className="flex flex-col bg-lime p-6 sm:p-7">
                    <span className="font-mono text-xs font-bold text-ink/55">/{check.no}</span>
                    <h3 className="mt-12 text-lg font-bold uppercase">{check.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink/70">{check.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
