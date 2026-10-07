"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textClassName?: string;
  /** Morph animasyonu akıcı çalışmazsa bir kez çağrılır */
  onSlow?: () => void;
}

export function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName,
  onSlow
}: GooeyTextProps) {
  const onSlowRef = React.useRef(onSlow);
  onSlowRef.current = onSlow;
  const text1Ref = React.useRef<HTMLSpanElement>(null);
  const text2Ref = React.useRef<HTMLSpanElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const measureRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Initial text setup
    if (text1Ref.current && text2Ref.current) {
      text1Ref.current.textContent = texts[texts.length - 1];
      text2Ref.current.textContent = texts[0];
    }
    // Initial width setup
    if (containerRef.current && measureRef.current) {
      const initialSpan = measureRef.current.children[0] as HTMLSpanElement;
      if (initialSpan) {
        containerRef.current.style.width = `${initialSpan.offsetWidth}px`;
      }
    }

    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;
    let frameId = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let skipSample = false;
    let samples = 0;
    let sampleSum = 0;
    let reported = false;

    const setMorph = (fraction: number) => {
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

        fraction = 1 - fraction;
        text1Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text1Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      }
    };

    const doCooldown = () => {
      morph = 0;
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = "";
        text2Ref.current.style.opacity = "100%";
        text1Ref.current.style.filter = "";
        text1Ref.current.style.opacity = "0%";
      }
    };

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;

      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }

      setMorph(fraction);
    };

    function animate() {
      frameId = requestAnimationFrame(animate);
      const newTime = new Date();
      const shouldIncrementIndex = cooldown > 0;
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;

      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length;
          const nextIndex = (textIndex + 1) % texts.length;
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex];
            text2Ref.current.textContent = texts[nextIndex];
          }
          if (containerRef.current && measureRef.current) {
            const nextSpan = measureRef.current.children[nextIndex] as HTMLSpanElement;
            if (nextSpan) {
              containerRef.current.style.width = `${nextSpan.offsetWidth}px`;
            }
          }
        }
        doMorph();

        // Kare süresi ölçümü (sadece morph sırasında); 45 ms üstü ortalama = akıcı değil
        if (skipSample) {
          skipSample = false;
        } else if (!reported && dt > 0 && dt < 0.25) {
          sampleSum += dt;
          samples += 1;
          if (samples >= 30) {
            reported = true;
            if (sampleSum / samples > 0.045) onSlowRef.current?.();
          }
        }
      } else {
        doCooldown();
        // Kelime beklerken kare üretme: bekleme süresi kadar uyu, sonra morph'a devam et
        cancelAnimationFrame(frameId);
        timer = setTimeout(() => {
          time = new Date(Date.now() - 100);
          cooldown = 0.01;
          skipSample = true;
          animate();
        }, cooldown * 1000);
      }
    }

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      if (timer) clearTimeout(timer);
    };
  }, [texts, morphTime, cooldownTime]);

  return (
    <div 
      ref={containerRef} 
      className={cn("relative inline-block transition-[width] ease-in-out", className)}
      style={{ transitionDuration: `${morphTime}s` }}
    >
      {/* Measurements container for computing widths */}
      <div 
        ref={measureRef} 
        className="absolute top-0 left-0 opacity-0 pointer-events-none select-none whitespace-nowrap"
        aria-hidden="true"
      >
        {texts.map((t, i) => (
          <span key={i} className={cn(textClassName)}>{t}</span>
        ))}
      </div>
      
      {/* Provides baseline and height for the container */}
      <span className={cn("invisible select-none", textClassName)} aria-hidden="true">
        &nbsp;
      </span>

      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ filter: "url(#threshold)" }}
      >
        <span
          ref={text1Ref}
          className={cn(
            "absolute inline-block select-none text-center text-6xl md:text-[60pt]",
            "text-bright",
            textClassName
          )}
        />
        <span
          ref={text2Ref}
          className={cn(
            "absolute inline-block select-none text-center text-6xl md:text-[60pt]",
            "text-bright",
            textClassName
          )}
        />
      </div>
    </div>
  );
}
