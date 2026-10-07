import { useEffect, useState } from "react";

// Telefon / tablet / dokunmatik ekran ya da "hareketi azalt" tercihi: ağır animasyonlar kapanır
const QUERY = "(max-width: 767px), (hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)";

export function useLiteMotion() {
  const [lite, setLite] = useState(() => window.matchMedia(QUERY).matches);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => setLite(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return lite;
}
