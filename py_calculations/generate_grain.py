"""
Generates a static grain/noise texture for use as a CSS background-image.

Replaces the live feTurbulence SVG filter in the portfolio — which re-executes
on every frame when nearby CSS animations invalidate its compositing layer.
A baked PNG has zero runtime cost: the browser loads it once, tiles it as a bitmap.

Output: ../portfolio/public/grain.png  (512x512 grayscale PNG)
Usage:  python generate_grain.py
Deps:   pip install numpy pillow
"""

import numpy as np
from PIL import Image


def fractal_noise(size: int, octaves: int = 4, base_scale: float = 0.5, seed: int = 42) -> np.ndarray:
    """
    Stack multiple octaves of random noise (similar to SVG feTurbulence fractalNoise).
    Each octave halves in amplitude and doubles in frequency.
    """
    rng = np.random.default_rng(seed)
    result = np.zeros((size, size), dtype=np.float32)
    amplitude = 1.0
    scale = base_scale

    for _ in range(octaves):
        # Resolution for this octave
        oct_size = max(2, int(size * scale))
        raw = rng.standard_normal((oct_size, oct_size)).astype(np.float32)

        # Upsample to full size with bilinear interpolation
        tile = Image.fromarray(raw).resize((size, size), Image.BILINEAR)
        result += np.array(tile) * amplitude

        amplitude *= 0.5
        scale *= 2.0

    # Normalize to [0, 1]
    lo, hi = result.min(), result.max()
    return (result - lo) / (hi - lo)


def main():
    import pathlib

    size = 512
    noise = fractal_noise(size=size, octaves=4, base_scale=0.5, seed=42)

    # Map to 8-bit grayscale
    img_array = (noise * 255).astype(np.uint8)
    img = Image.fromarray(img_array, mode="L")

    out = pathlib.Path(__file__).parent.parent / "portfolio" / "public" / "grain.png"
    out.parent.mkdir(parents=True, exist_ok=True)
    img.save(out, optimize=True)
    print(f"Written: {out}  ({size}x{size}px, {out.stat().st_size // 1024}KB)")


if __name__ == "__main__":
    main()
