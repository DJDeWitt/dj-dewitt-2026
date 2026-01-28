import React, { useCallback, useMemo, useState } from "react";

type RGBA = string; // we’ll store colors as css strings like "#RRGGBB" or "transparent"

const GRID = 24;

function key(x: number, y: number) {
  return `${x},${y}`;
}

function parseKey(k: string): { x: number; y: number } {
  const [xs, ys] = k.split(",");
  return { x: Number(xs), y: Number(ys) };
}

/**
 * Optional: compress contiguous pixels into rectangles per row.
 * This keeps output smaller than 576 individual <rect>s.
 */
function compressToRects(pixels: Map<string, RGBA>, background: RGBA) {
  // returns rects as {x,y,w,h,fill?} with fill omitted when using currentColor
  // We compress horizontally per row into runs of same color.
  const rects: Array<{ x: number; y: number; w: number; h: number; fill?: string }> = [];

  for (let y = 0; y < GRID; y++) {
    let x = 0;
    while (x < GRID) {
      const c = pixels.get(key(x, y)) ?? "transparent";
      if (c === "transparent") {
        x++;
        continue;
      }
      // run start
      const start = x;
      let end = x;
      while (end + 1 < GRID) {
        const next = pixels.get(key(end + 1, y)) ?? "transparent";
        if (next !== c) break;
        end++;
      }
      rects.push({
        x: start,
        y,
        w: end - start + 1,
        h: 1,
        fill: c === "currentColor" ? undefined : c,
      });
      x = end + 1;
    }
  }

  // Background rect is handled separately (if not transparent)
  const bg = background && background !== "transparent"
    ? [{ x: 0, y: 0, w: 24, h: 24, fill: background }]
    : [];

  return { backgroundRects: bg, pixelRects: rects };
}

export default function PixelIconMaker() {
  // default drawing color. If you want icons to inherit CSS color, use "currentColor" as your paint.
  const [paint, setPaint] = useState<RGBA>("currentColor");
  const [background, setBackground] = useState<RGBA>("transparent");

  // store only non-transparent pixels
  const [pixels, setPixels] = useState<Map<string, RGBA>>(() => new Map());

  // mouse painting
  const [isPainting, setIsPainting] = useState(false);
  const [eraseMode, setEraseMode] = useState(false);

  const setPixel = useCallback(
    (x: number, y: number, color: RGBA) => {
      setPixels((prev) => {
        const next = new Map(prev);
        const k = key(x, y);
        if (color === "transparent") next.delete(k);
        else next.set(k, color);
        return next;
      });
    },
    [setPixels]
  );

  const handleCell = useCallback(
    (x: number, y: number) => {
      const color = eraseMode ? "transparent" : paint;
      setPixel(x, y, color);
    },
    [eraseMode, paint, setPixel]
  );

  const clear = useCallback(() => setPixels(new Map()), []);
  const fillAll = useCallback(() => {
    if (paint === "transparent") return;
    const m = new Map<string, RGBA>();
    for (let y = 0; y < GRID; y++) {
      for (let x = 0; x < GRID; x++) {
        m.set(key(x, y), paint);
      }
    }
    setPixels(m);
  }, [paint]);

  const { backgroundRects, pixelRects } = useMemo(
    () => compressToRects(pixels, background),
    [pixels, background]
  );

  const svgString = useMemo(() => {
    const lines: string[] = [];
    lines.push(
      `<svg viewBox="0 0 24 24" class="icon" fill="currentColor" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">`
    );

    // background
    for (const r of backgroundRects) {
      // background should always specify fill explicitly (so it doesn't inherit currentColor unexpectedly)
      lines.push(`  <rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${r.fill}" />`);
    }

    // pixels
    for (const r of pixelRects) {
      if (r.fill) lines.push(`  <rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${r.fill}" />`);
      else lines.push(`  <rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" />`);
    }

    lines.push(`</svg>`);
    return lines.join("\n");
  }, [backgroundRects, pixelRects]);

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(svgString);
  }, [svgString]);

  const isOn = useCallback(
    (x: number, y: number) => pixels.get(key(x, y)) ?? "transparent",
    [pixels]
  );

  return (
    <div className="pixelIconMaker">
      <div className="pixelIconMaker__left">
        <div className="pixelIconMaker__toolbar">
          <label className="pixelIconMaker__field">
            Paint
            <select
              value={paint}
              onChange={(e) => setPaint(e.target.value)}
              className="pixelIconMaker__select"
            >
              <option value="currentColor">currentColor (recommended)</option>
              <option value="#000000">#000000</option>
              <option value="#ffffff">#ffffff</option>
              <option value="#ff0000">#ff0000</option>
              <option value="#00ff00">#00ff00</option>
              <option value="#0000ff">#0000ff</option>
              <option value="transparent">transparent</option>
            </select>
          </label>

          <label className="pixelIconMaker__field">
            Custom color
            <input
              type="color"
              onChange={(e) => setPaint(e.target.value)}
              value={paint.startsWith("#") ? paint : "#000000"}
              className="pixelIconMaker__color"
              title="Pick a custom paint color"
            />
          </label>

          <label className="pixelIconMaker__field">
            Background
            <select
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="pixelIconMaker__select"
            >
              <option value="transparent">transparent</option>
              <option value="#ffffff">#ffffff</option>
              <option value="#000000">#000000</option>
              <option value="#22c55e">green</option>
            </select>
          </label>

          <label className="pixelIconMaker__toggle">
            <input
              type="checkbox"
              checked={eraseMode}
              onChange={(e) => setEraseMode(e.target.checked)}
            />
            Erase
          </label>

          <button className="pixelIconMaker__btn" onClick={clear}>Clear</button>
          <button className="pixelIconMaker__btn" onClick={fillAll}>Fill all</button>
          <button className="pixelIconMaker__btn pixelIconMaker__btnPrimary" onClick={copy}>
            Copy SVG
          </button>

          <div className="pixelIconMaker__hint">
            Tip: click/drag to paint. Hold Shift (or toggle Erase) to erase.
          </div>
        </div>

        <div
          className="pixelIconMaker__grid"
          onMouseDown={(e) => {
            setIsPainting(true);
            // shift = temporary erase
            setEraseMode(e.shiftKey);
          }}
          onMouseUp={() => setIsPainting(false)}
          onMouseLeave={() => setIsPainting(false)}
        >
          {Array.from({ length: GRID * GRID }).map((_, i) => {
            const x = i % GRID;
            const y = Math.floor(i / GRID);
            const c = isOn(x, y);

            // nice checker backdrop for transparency
            const style: React.CSSProperties =
              c === "transparent"
                ? {}
                : c === "currentColor"
                  ? { background: "rgba(0,0,0,0.85)" } // preview currentColor as “ink”
                  : { background: c };

            return (
              <button
                key={`${x}-${y}`}
                type="button"
                className="pixelIconMaker__cell"
                style={style}
                aria-label={`cell ${x},${y}`}
                onMouseDown={() => handleCell(x, y)}
                onMouseEnter={(e) => {
                  if (!isPainting) return;
                  // if user holds shift mid-drag, erase
                  const shift = (e.buttons & 1) === 1 && (window.event as MouseEvent | undefined)?.shiftKey;
                  if (shift) setEraseMode(true);
                  handleCell(x, y);
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setPixel(x, y, "transparent");
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="pixelIconMaker__right">
        <div className="pixelIconMaker__previewCard">
          <div className="pixelIconMaker__previewHeader">
            <div className="pixelIconMaker__previewTitle">Preview</div>
            <div className="pixelIconMaker__previewNote">
              This renders at 24×24 but is scaled up for visibility.
            </div>
          </div>

          <div className="pixelIconMaker__preview">
            <svg
              viewBox="0 0 24 24"
              className="icon"
              fill="currentColor"
              shapeRendering="crispEdges"
              xmlns="http://www.w3.org/2000/svg"
              width="192"
              height="192"
            >
              {background !== "transparent" && (
                <rect x="0" y="0" width="24" height="24" fill={background} />
              )}

              {pixelRects.map((r, idx) => (
                <rect
                  key={idx}
                  x={r.x}
                  y={r.y}
                  width={r.w}
                  height={r.h}
                  {...(r.fill ? { fill: r.fill } : {})}
                />
              ))}
            </svg>
          </div>
        </div>

        <div className="pixelIconMaker__codeCard">
          <div className="pixelIconMaker__codeHeader">
            <div className="pixelIconMaker__codeTitle">SVG output</div>
            <button className="pixelIconMaker__btn" onClick={copy}>Copy</button>
          </div>
          <textarea
            className="pixelIconMaker__textarea"
            value={svgString}
            readOnly
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
