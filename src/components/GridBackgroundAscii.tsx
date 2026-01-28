import React, { useEffect, useMemo, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";

type Palette = Record<string, string>;

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
/** Proper modulo for negatives */
function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export function GridBackgroundAscii() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDark, setIsDark] = React.useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  const cameraRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: -9999, y: -9999, inside: false });
  const revealRef = useRef<Map<string, { a: number; target: number }>>(
    new Map()
  );

  const config = useMemo(
    () => ({
      cellSize: 16,
      lineWidth: 1,
      gridColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
      backgroundFill: isDark ? "rgba(12,12,12,1)" : "rgba(255,255,255,1)",

      // 0 = only hovered cell, 1–2 = soft halo
      revealRadiusCells: 1,

      // Fade speeds (per second)
      fadeInSpeed: 10,
      fadeOutSpeed: 3,

      // If true: revealed colored cells stay on permanently (no fade out)
      // If false: default behavior (fade out)
      persistentReveal: true,

      // Only relevant when persistentReveal is false
      // How quickly the "target" decays toward 0 each frame
      targetDecaySpeed: 3,

      scrollParallax: 0.35,

      // If persistentReveal is true, you'll usually want this high
      // (or implement a smarter cap strategy—see note below)
      maxRevealCells: 4000,
    }),
    [isDark]
  );

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const getTheme = () =>
      root.getAttribute("data-theme") ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    setIsDark(getTheme() === "dark");

    const observer = new MutationObserver(() => {
      setIsDark(getTheme() === "dark");
    });
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  /**
   * Palette mapping:
   * '.' or ' ' will be treated as empty by default
   * Any other char can map to a color
   */
  const palette: Palette = useMemo(
    () => ({
      D: "rgba(18,91,251,0.9)",  // blue
      K: "rgba(0,0,0,0.6)",      // dark accent
      P: "rgba(69, 12, 174, 1)",     // subtle gray fill
      O: "rgba(255,149,0,0.85)", // warm accent
      R: "#F47D3F", // red
      G: "#58D68D", // green
      B: "rgba(63, 167, 214, 1)", // blue
      Y: "#F4D03F", // yellow
    }),
    []
  );

  /**
   * Your ASCII sprite (edit this):
   * - Each string is a row
   * - All rows should be the same length
   * - '.' (or space) = empty
   */
  const asciiSprite = useMemo(() => {
    const segment = pathname.split("/").filter(Boolean)[0] ?? "default";

    if (segment === "software") {
      return [
      "RRRRRRRRRRRRRRRR",
      "RRRRRRRRRRRRRRRR",
      "RRRRRRRRRRRRRRRR",
      "RRRRRRRRRRRRRRRR",
      "RRRRRRRRRRRRRRRR",
      "RRRRRRRRRRRRRRRR",
      "RRRRRRRRRRRRRRRR",
      "RRRRRRRRRRRRRRRR",
      "RRRRRRRRRRRRRRRR",
      "RRRRRRRRRRRRRRRR",
      "RRRRRRRRRRRRRRRR",
      "RRRRRRRRRRRRRRRR",
      "RRRRRRRRRRRRRRRR",
      "RRRRRRRRRRRRRRRR",
      "RRRRRRRRRRRRRRRR",
      "RRRRRRRRRRRRRRRR",
    ];
    }

    if (segment === "games") {
      return [
        "GGGGGGGGGGGGGGGG",
        "GGGGGGGGGGGGGGGG",
        "GGGGGGGGGGGGGGGG",
        "GGGGGGGGGGGGGGGG",
        "GGGGGGGGGGGGGGGG",
        "GGGGGGGGGGGGGGGG",
        "GGGGGGGGGGGGGGGG",
        "GGGGGGGGGGGGGGGG",
        "GGGGGGGGGGGGGGGG",
        "GGGGGGGGGGGGGGGG",
        "GGGGGGGGGGGGGGGG",
        "GGGGGGGGGGGGGGGG",
        "GGGGGGGGGGGGGGGG",
        "GGGGGGGGGGGGGGGG",
        "GGGGGGGGGGGGGGGG",
        "GGGGGGGGGGGGGGGG",
      ];
    }

    if (segment === "writing") {
      return [
        "BBBBBBBBBBBBBBBB",
        "BBBBBBBBBBBBBBBB",
        "BBBBBBBBBBBBBBBB",
        "BBBBBBBBBBBBBBBB",
        "BBBBBBBBBBBBBBBB",
        "BBBBBBBBBBBBBBBB",
        "BBBBBBBBBBBBBBBB",
        "BBBBBBBBBBBBBBBB",
        "BBBBBBBBBBBBBBBB",
        "BBBBBBBBBBBBBBBB",
        "BBBBBBBBBBBBBBBB",
        "BBBBBBBBBBBBBBBB",
        "BBBBBBBBBBBBBBBB",
        "BBBBBBBBBBBBBBBB",
        "BBBBBBBBBBBBBBBB",
        "BBBBBBBBBBBBBBBB",
      ];
    }

    if (segment === "about") {
      return [
        "B....K....G....O",
        ".B....K....G....",
        "..B....K....G...",
        "...B....K....G..",
        "O....G....K....B",
        ".O....G....K....",
        "..O....G....K...",
        "...O....G....K..",
        "B....K....G....O",
        ".B....K....G....",
        "..B....K....G...",
        "...B....K....G..",
        "O....G....K....B",
        ".O....G....K....",
        "..O....G....K...",
        "...O....G....K..",
      ];
    }

    return [
      "BKGOBKGOBKGOBKGO",
      "KGOOBBBBBKGOBKGO",
      "OBBKBKBBKGOOBKGO",
      "GOBBBBBBBKGOBKGO",
      "OBBKGOBBKGOOBKGO",
      "KGOOBBBBBKGOBKGO",
      "BKGOBKGOBKGOBKGO",
      "KGOOBKGOBKGOBKGO",
      "OBKGOBKGOBGGOBKG",
      "OBKGOBKGOBGGOBKG",
      "KGOOBKGOBKGOBKGO",
      "OBKGOBKGOBKGOBKG",
      "KGOOBKGKOBKGBKGO",
      "OBKGOBKGOBKGOBKG",
      "GOBKOBKGOBKGOBKG",
      "KGOOBKGOBKGOBKGO",
    ];
  }, [pathname]);

  const sprite = useMemo(() => {
    const rows = asciiSprite;
    const h = rows.length;
    const w = rows[0]?.length ?? 0;

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].length !== w) {
        console.warn(
          `[GridBackgroundAscii] Row ${i} has length ${rows[i].length} but expected ${w}.`
        );
      }
    }

    return { rows, w, h };
  }, [asciiSprite]);

  function spriteCharAtWorldCell(cx: number, cy: number): string {
    if (!sprite.w || !sprite.h) return ".";
    const sx = mod(cx, sprite.w);
    const sy = mod(cy, sprite.h);
    return sprite.rows[sy][sx] ?? ".";
  }

  function colorForChar(ch: string): string | null {
    if (ch === "." || ch === " ") return null;
    return palette[ch] ?? null;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let last = performance.now();

    const resize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.inside = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.inside = false;
    };

    const onScroll = () => {
      cameraRef.current.y = window.scrollY * config.scrollParallax;
      cameraRef.current.x = window.scrollX * config.scrollParallax;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("blur", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    resize();
    onScroll();

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const cell = config.cellSize;

      // Clear
      ctx.fillStyle = config.backgroundFill;
      ctx.fillRect(0, 0, w, h);

      const camX = cameraRef.current.x;
      const camY = cameraRef.current.y;

      // Grid lines (infinite)
      const startX = -mod(camX, cell);
      const startY = -mod(camY, cell);

      ctx.lineWidth = config.lineWidth;
      ctx.strokeStyle = config.gridColor;

      ctx.beginPath();
      for (let x = startX; x <= w; x += cell) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, h);
      }
      for (let y = startY; y <= h; y += cell) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(w, y + 0.5);
      }
      ctx.stroke();

      // Reveal near mouse
      if (mouseRef.current.inside) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        const worldX = mx + camX;
        const worldY = my + camY;

        const cx = Math.floor(worldX / cell);
        const cy = Math.floor(worldY / cell);

        const r = config.revealRadiusCells;

        for (let dy = -r; dy <= r; dy++) {
          for (let dx = -r; dx <= r; dx++) {
            const wcx = cx + dx;
            const wcy = cy + dy;

            const ch = spriteCharAtWorldCell(wcx, wcy);
            const color = colorForChar(ch);
            if (!color) continue;

            const dist = Math.sqrt(dx * dx + dy * dy);
            const influence = clamp01(1 - dist / (r + 0.001));

            const key = `${wcx},${wcy}`;
            const entry = revealRef.current.get(key) ?? { a: 0, target: 0 };

            if (config.persistentReveal) {
              // once touched, it should become fully on
              entry.target = 1;
            } else {
              // normal behavior: stronger influence closer to cursor
              entry.target = Math.max(entry.target, influence);
            }

            revealRef.current.set(key, entry);
          }
        }
      }

      // Prune (important if persistentReveal is true)
      if (revealRef.current.size > config.maxRevealCells) {
        // Drop lowest alpha entries first
        const items = Array.from(revealRef.current.entries());
        items.sort((a, b) => a[1].a - b[1].a);
        const drop = items.slice(0, items.length - config.maxRevealCells);
        for (const [k] of drop) revealRef.current.delete(k);
      }

      // Draw revealed cells
      for (const [key, v] of revealRef.current.entries()) {
        // alpha moves toward target
        v.a = lerp(v.a, v.target, 1 - Math.exp(-config.fadeInSpeed * dt));

        if (!config.persistentReveal) {
          // decay target unless mouse keeps touching it
          v.target = lerp(v.target, 0, 1 - Math.exp(-config.targetDecaySpeed * dt));

          // fade out alpha when target drops
          if (v.target < v.a) {
            v.a = lerp(v.a, v.target, 1 - Math.exp(-config.fadeOutSpeed * dt));
          }

          if (v.a < 0.01 && v.target < 0.01) {
            revealRef.current.delete(key);
            continue;
          }
        } else {
          // persistent: once basically on, keep it on
          v.a = Math.min(1, v.a);
          v.target = 1;
        }

        const [cxStr, cyStr] = key.split(",");
        const cx = Number(cxStr);
        const cy = Number(cyStr);

        const ch = spriteCharAtWorldCell(cx, cy);
        const color = colorForChar(ch);
        if (!color) continue;

        const x = cx * cell - camX;
        const y = cy * cell - camY;

        if (x + cell < 0 || y + cell < 0 || x > w || y > h) continue;

        ctx.save();
        ctx.globalAlpha = easeOutCubic(clamp01(v.a));
        ctx.fillStyle = color;
        ctx.fillRect(Math.floor(x), Math.floor(y), cell, cell);
        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("blur", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [config, palette, sprite.w, sprite.h, spriteCharAtWorldCell]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
