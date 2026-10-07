import { useEffect, useState } from "react";

// Telefon / tablet / dokunmatik ekran: animasyonlar çalışır ama düşük güç modunda (dpr 1, 30 fps)
const QUERY = "(max-width: 767px), (pointer: coarse)";

export function useSmallDevice() {
  const [small, setSmall] = useState(() => window.matchMedia(QUERY).matches);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => setSmall(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return small;
}
