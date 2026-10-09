import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

const COLOR_THEMES = {
  pink: {
    "--primary": "333 71% 45%",
    "--primary-foreground": "327 73% 97%",
    "--accent": "355 100% 97%",
    "--accent-foreground": "345 80% 40%",
    "--ring": "333 71% 45%",
    "--soft-pink": "340 50% 88%",
    "--pair": "150 55% 72%",
    "--primary-ink": "333 71% 40%",
  },
  lime: {
    "--primary": "82 85% 45%",
    "--primary-foreground": "82 20% 10%",
    "--accent": "82 60% 95%",
    "--accent-foreground": "82 85% 24%",
    "--ring": "82 85% 45%",
    "--soft-pink": "82 40% 85%",
    "--pair": "330 85% 80%",
    "--primary-ink": "82 85% 24%",
  },
  lavender: {
    "--primary": "270 60% 55%",
    "--primary-foreground": "270 80% 97%",
    "--accent": "270 60% 95%",
    "--accent-foreground": "270 60% 45%",
    "--ring": "270 60% 55%",
    "--soft-pink": "270 40% 85%",
    "--pair": "45 95% 70%",
    "--primary-ink": "270 60% 45%",
  },
  yellow: {
    "--primary": "45 95% 50%",
    "--primary-foreground": "45 20% 10%",
    "--accent": "45 90% 95%",
    "--accent-foreground": "38 95% 28%",
    "--ring": "45 95% 50%",
    "--soft-pink": "45 50% 85%",
    "--pair": "265 75% 80%",
    "--primary-ink": "38 95% 28%",
  },
} as const;

const DARK_COLOR_THEMES = {
  pink: {
    "--primary": "328 85% 65%",
    "--primary-foreground": "336 83% 10%",
    "--accent": "343 87% 15%",
    "--accent-foreground": "351 94% 71%",
    "--ring": "328 85% 65%",
    "--soft-pink": "340 40% 40%",
    "--pair": "150 45% 55%",
    "--primary-ink": "328 85% 65%",
  },
  lime: {
    "--primary": "82 85% 55%",
    "--primary-foreground": "82 20% 10%",
    "--accent": "82 50% 15%",
    "--accent-foreground": "82 85% 55%",
    "--ring": "82 85% 55%",
    "--soft-pink": "82 35% 35%",
    "--pair": "330 75% 72%",
    "--primary-ink": "82 85% 55%",
  },
  lavender: {
    "--primary": "270 70% 70%",
    "--primary-foreground": "270 20% 10%",
    "--accent": "270 50% 15%",
    "--accent-foreground": "270 70% 70%",
    "--ring": "270 70% 70%",
    "--soft-pink": "270 35% 35%",
    "--pair": "45 90% 62%",
    "--primary-ink": "270 70% 70%",
  },
  yellow: {
    "--primary": "45 90% 60%",
    "--primary-foreground": "45 20% 10%",
    "--accent": "45 50% 15%",
    "--accent-foreground": "45 90% 60%",
    "--ring": "45 90% 60%",
    "--soft-pink": "45 35% 35%",
    "--pair": "265 65% 72%",
    "--primary-ink": "45 90% 60%",
  },
} as const;

export const HEART_EMOJI: Record<string, string> = {
  pink: "🩷",
  lime: "💚",
  lavender: "💜",
  yellow: "💛",
};

type ColorKey = keyof typeof COLOR_THEMES;

export function usePageColor(): ColorKey {
  const { pathname } = useLocation();

  const colorKey = useMemo<ColorKey>(() => {
    const keys = Object.keys(COLOR_THEMES) as ColorKey[];
    return keys[Math.floor(Math.random() * keys.length)];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;
    const apply = () => {
      const isDark = root.classList.contains("dark");
      const theme = isDark ? DARK_COLOR_THEMES[colorKey] : COLOR_THEMES[colorKey];
      Object.entries(theme).forEach(([prop, value]) => {
        root.style.setProperty(prop, value);
      });
    };
    apply();

    const observer = new MutationObserver(apply);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [colorKey]);

  return colorKey;
}
