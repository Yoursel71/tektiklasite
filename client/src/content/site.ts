// Tüm site içeriği tek yerde — metin ve fiyat değişiklikleri buradan
export const site = {
  brand: "tektiklasite.com",
  phone: "+90 530 842 00 61",
  whatsapp: "905308420061",
  whatsappText: "Merhaba, web sitesi yaptırmak istiyorum.",
  email: "tektiklasite@gmail.com",

  hero: {
    eyebrow: "Esnaf ve restoranlar için web sitesi",
    title: "Tek tıkla site.",
    titleAccent: "Gerisi bizde.",
    subtitle:
      "Telefonda düzgün açılan, Google'da bulunan sade bir site. Tasarım, yayın, hosting ve bakım tek elden — sen sadece WhatsApp'tan yaz.",
  },

  included: [
    { title: "Mobil uyumlu özel tasarım", detail: "Şablon değil, işine göre hazırlanır." },
    { title: "Teknik SEO altyapısı", detail: "Başlık, açıklama, harita, sitemap ve Google için işletme bilgisi." },
    { title: "Yayın ve kurulum", detail: "Alan adı bağlantısı, hosting, SSL ve işletme e-postası." },
    { title: "Sınırsız düzenleme", detail: "Menü, fiyat, fotoğraf ve metin değişiklikleri." },
    { title: "Hızlı iletişim", detail: "WhatsApp, arama, yol tarifi ve Google yorum butonları." },
    { title: "Hızlı yüklenir", detail: "Optimize görseller, sıkıştırma ve önbellek." },
  ],

  price: {
    now: "7.500 ₺",
    normal: "12.000 ₺",
    note: "Site başı. Teknik SEO ve sınırsız bakım/düzenleme fiyata dahil.",
    yearlyLabel: "Yayından sonra yalnızca yıllık sunucu ücreti",
    yearly: "2.000 ₺",
    yearlyNote: "Hosting ve SSL dahil.",
  },

  works: [
    {
      title: "King Chefs",
      kind: "Restoran · Beşikdüzü",
      description: "Menü, fiyatlar, WhatsApp sipariş ve Google yorum butonları.",
      url: "https://kingchefs.com.tr",
    },
    {
      title: "Ege Pide & Köfte",
      kind: "Restoran · Beşikdüzü",
      description: "Pide, lahmacun ve köfte menüsü; paket servis ve sipariş bağlantıları.",
      url: "https://egepidekofte.com",
    },
    {
      title: "Modatepe Resort",
      kind: "Restoran ve butik otel · Trabzon",
      description: "Tanıtım ve rezervasyon sitesi, 3 dil desteği.",
      url: "https://modateperesort.com",
    },
    {
      title: "WhiteMedia",
      kind: "Dijital pazarlama ajansı",
      description: "Kurumsal vitrin ve teklif kanalı.",
      url: "https://whitemedia.com.tr",
    },
  ],

  faq: [
    {
      q: "Ne kadar sürede teslim ediyorsunuz?",
      a: "Tek sayfalık sitelerde genelde 1 hafta. Net takvimi ilk görüşmede söyleriz.",
    },
    {
      q: "Ödeme nasıl işliyor?",
      a: "Başta %50, teslimde %50. Teslim etmeden ikinci yarıyı istemiyoruz.",
    },
    {
      q: "Bakım gerçekten sınırsız mı?",
      a: "Menü, fiyat, fotoğraf ve metin değişiklikleri sınırsız. Yeni bölüm eklemek ya da baştan tasarım gibi büyük işler ayrıca konuşulur.",
    },
    {
      q: "Hosting ve alan adı kimde olur?",
      a: "İstersen senin adına alıp kuruyoruz, istersen mevcut altyapına teslim ediyoruz. İki durumda da kurulum bizde.",
    },
  ],
} as const;

export const whatsappLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappText)}`;
