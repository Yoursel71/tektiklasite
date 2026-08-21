import { DatabaseSync } from "node:sqlite";
import bcrypt from "bcryptjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "..", "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

export const db = new DatabaseSync(path.join(dataDir, "novaweb.db"));
db.exec("PRAGMA journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS packages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price TEXT NOT NULL,
    period TEXT NOT NULL DEFAULT 'proje başı',
    badge TEXT,
    features TEXT NOT NULL DEFAULT '[]',
    highlighted INTEGER NOT NULL DEFAULT 0,
    sort INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    package_name TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

// Migration: price_amount (kuruş) — Stripe checkout için sayısal fiyat, NULL = online ödeme kapalı
const packageCols = db.prepare("PRAGMA table_info(packages)").all() as { name: string }[];
if (!packageCols.some((c) => c.name === "price_amount")) {
  db.exec("ALTER TABLE packages ADD COLUMN price_amount INTEGER");
  // Mevcut seed verisine geriye dönük doldurma — "+" fiyatlı Kurumsal bilerek NULL kalır
  const backfill = db.prepare(
    "UPDATE packages SET price_amount = ? WHERE name = ? AND price_amount IS NULL"
  );
  backfill.run(390_000, "Başlangıç");
  backfill.run(790_000, "Profesyonel");
}

export function seed(adminUsername: string, adminPassword: string) {
  // Admin kullanıcıyı env'den upsert et — şifre .env'den yönetilir
  const hash = bcrypt.hashSync(adminPassword, 10);
  db.prepare(
    `INSERT INTO users (username, password_hash) VALUES (?, ?)
     ON CONFLICT(username) DO UPDATE SET password_hash = excluded.password_hash`
  ).run(adminUsername, hash);

  // Eski varsayılan fiyatları kullanan mevcut kurulumları güncelle; panelden
  // özelleştirilmiş fiyatlara dokunma.
  const updateDefaultPrice = db.prepare(
    "UPDATE packages SET price = ?, price_amount = ? WHERE name = ? AND price = ?"
  );
  updateDefaultPrice.run("₺3.900", 390_000, "Başlangıç", "₺4.900");
  updateDefaultPrice.run("₺7.900", 790_000, "Profesyonel", "₺9.900");
  updateDefaultPrice.run("₺14.900+", null, "Kurumsal", "₺19.900+");

  const count = db.prepare("SELECT COUNT(*) AS c FROM packages").get() as { c: number };
  if (count.c > 0) return;

  const insert = db.prepare(
    `INSERT INTO packages (name, price, period, badge, features, highlighted, sort, price_amount)
     VALUES (@name, @price, @period, @badge, @features, @highlighted, @sort, @price_amount)`
  );

  const defaults = [
    {
      name: "Başlangıç",
      price: "₺3.900",
      price_amount: 390_000,
      period: "proje başı",
      badge: null,
      features: JSON.stringify([
        "5 sayfaya kadar kurumsal site",
        "Mobil uyumlu özel tasarım",
        "Temel SEO kurulumu",
        "İletişim formu + WhatsApp",
        "SSL + hosting kurulumu",
        "1 ay ücretsiz destek",
      ]),
      highlighted: 0,
      sort: 1,
    },
    {
      name: "Profesyonel",
      price: "₺7.900",
      price_amount: 790_000,
      period: "proje başı",
      badge: "En Popüler",
      features: JSON.stringify([
        "10+ sayfa, markana özel tasarım",
        "Blog / içerik yönetim sistemi",
        "Gelişmiş SEO + hız optimizasyonu",
        "Analytics ve Search Console kurulumu",
        "Çoklu dil altyapısı",
        "3 ay ücretsiz destek",
      ]),
      highlighted: 1,
      sort: 2,
    },
    {
      name: "Kurumsal",
      price: "₺14.900+",
      price_amount: null,
      period: "proje başı",
      badge: null,
      features: JSON.stringify([
        "Full-stack özel yazılım",
        "Admin panel + veritabanı",
        "E-ticaret / ödeme entegrasyonu",
        "Üyelik ve yetkilendirme sistemi",
        "Performans ve güvenlik denetimi",
        "6 ay ücretsiz destek",
      ]),
      highlighted: 0,
      sort: 3,
    },
  ];

  db.exec("BEGIN");
  try {
    for (const p of defaults) insert.run(p);
    db.exec("COMMIT");
  } catch (err) {
    db.exec("ROLLBACK");
    throw err;
  }
}
