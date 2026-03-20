import { useLayoutEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

const COLOR_THEMES = {
  pink: {
    "--primary": "333 71% 50%",
    "--primary-foreground": "327 73% 97%",
    "--accent": "355 100% 97%",
    "--accent-foreground": "349 89% 60%",
    "--ring": "333 71% 50%",
    "--soft-pink": "340 50% 88%",
  },
  lime: {
    "--primary": "82 85% 45%",
    "--primary-foreground": "82 20% 10%",
    "--accent": "82 60% 95%",
    "--accent-foreground": "82 85% 35%",
    "--ring": "82 85% 45%",
    "--soft-pink": "82 40% 85%",
  },
  lavender: {
    "--primary": "270 60% 55%",
    "--primary-foreground": "270 80% 97%",
    "--accent": "270 60% 95%",
    "--accent-foreground": "270 60% 45%",
    "--ring": "270 60% 55%",
    "--soft-pink": "270 40% 85%",
  },
  yellow: {
    "--primary": "45 95% 50%",
    "--primary-foreground": "45 20% 10%",
    "--accent": "45 90% 95%",
    "--accent-foreground": "45 95% 40%",
    "--ring": "45 95% 50%",
    "--soft-pink": "45 50% 85%",
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
  },
  lime: {
    "--primary": "82 85% 55%",
    "--primary-foreground": "82 20% 10%",
    "--accent": "82 50% 15%",
    "--accent-foreground": "82 85% 55%",
    "--ring": "82 85% 55%",
    "--soft-pink": "82 35% 35%",
  },
  lavender: {
    "--primary": "270 70% 70%",
    "--primary-foreground": "270 20% 10%",
    "--accent": "270 50% 15%",
    "--accent-foreground": "270 70% 70%",
    "--ring": "270 70% 70%",
    "--soft-pink": "270 35% 35%",
  },
  yellow: {
    "--primary": "45 90% 60%",
    "--primary-foreground": "45 20% 10%",
    "--accent": "45 50% 15%",
    "--accent-foreground": "45 90% 60%",
    "--ring": "45 90% 60%",
    "--soft-pink": "45 35% 35%",
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

  useLayoutEffect(() => {
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
