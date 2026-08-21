import type { Package } from "../types";

// API bağlı değilse de paketler görünür kalır. Online ödeme yalnızca API'den
// sayısal fiyat geldiğinde açılır; böylece statik yayında bozuk ödeme butonu çıkmaz.
export const fallbackPackages: Package[] = [
  {
    id: -1,
    name: "Başlangıç",
    price: "₺3.900",
    period: "proje başı",
    badge: null,
    features: [
      "5 sayfaya kadar kurumsal site",
      "Mobil uyumlu özel tasarım",
      "Temel SEO kurulumu",
      "İletişim formu + WhatsApp",
      "SSL + hosting kurulumu",
      "1 ay ücretsiz destek",
    ],
    highlighted: false,
    priceAmount: null,
  },
  {
    id: -2,
    name: "Profesyonel",
    price: "₺7.900",
    period: "proje başı",
    badge: "En Popüler",
    features: [
      "10+ sayfa, markana özel tasarım",
      "Blog / içerik yönetim sistemi",
      "Gelişmiş SEO + hız optimizasyonu",
      "Analytics ve Search Console kurulumu",
      "Çoklu dil altyapısı",
      "3 ay ücretsiz destek",
    ],
    highlighted: true,
    priceAmount: null,
  },
  {
    id: -3,
    name: "Kurumsal",
    price: "₺14.900+",
    period: "proje başı",
    badge: null,
    features: [
      "Full-stack özel yazılım",
      "Admin panel + veritabanı",
      "E-ticaret / ödeme entegrasyonu",
      "Üyelik ve yetkilendirme sistemi",
      "Performans ve güvenlik denetimi",
      "6 ay ücretsiz destek",
    ],
    highlighted: false,
    priceAmount: null,
  },
];
