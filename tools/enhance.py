import sys, os, numpy as np
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

def enhance(path, out, max_edge=2000, q=86):
    im = Image.open(path); im = ImageOps.exif_transpose(im).convert("RGB")
    if max(im.size) > max_edge:
        im.thumbnail((max_edge, max_edge), Image.LANCZOS)
    a = np.asarray(im).astype(np.float32) / 255.0

    # 1) White balance: gray-world on midtones, partial strength so mood lighting survives
    lum = 0.2126*a[...,0] + 0.7152*a[...,1] + 0.0722*a[...,2]
    mask = (lum > 0.12) & (lum < 0.9)
    means = np.array([a[...,c][mask].mean() for c in range(3)])
    target = means.mean()
    gains = target / means
    strength = 0.65
    gains = 1 + (gains - 1) * strength
    gains = np.clip(gains, 0.85, 1.18)
    a = np.clip(a * gains, 0, 1)

    # 2) Tonal stretch on luminance percentiles, same scale for all channels (keeps hue)
    lum = 0.2126*a[...,0] + 0.7152*a[...,1] + 0.0722*a[...,2]
    lo, hi = np.percentile(lum, 0.4), np.percentile(lum, 99.6)
    lo = min(lo, 0.08); hi = max(hi, 0.92)
    a = np.clip((a - lo) / (hi - lo), 0, 1)

    # 3) Gentle lift for dark interiors
    med = np.median(0.2126*a[...,0] + 0.7152*a[...,1] + 0.0722*a[...,2])
    if med < 0.40:
        gamma = 0.88 if med < 0.33 else 0.93
        a = np.power(a, gamma)

    # 4) Soft S-curve for a touch of contrast
    a = a + 0.06 * np.sin(2*np.pi*(a-0.5)) * -1 * -1 * (a*(1-a)*4)**0.5 * 0.5
    a = np.clip(a, 0, 1)

    im = Image.fromarray((a*255+0.5).astype(np.uint8))
    im = ImageEnhance.Color(im).enhance(1.08)
    im = im.filter(ImageFilter.UnsharpMask(radius=1.4, percent=55, threshold=3))
    im.save(out, quality=q, optimize=True, progressive=True)
    return im.size, round(float(med),3), [round(float(g),3) for g in gains]

if __name__ == "__main__":
    src, dst = sys.argv[1], sys.argv[2]
    os.makedirs(dst, exist_ok=True)
    for f in sorted(os.listdir(src)):
        if f.lower().endswith((".jpg",".jpeg")) and not f.startswith("mood-"):
            size, med, gains = enhance(os.path.join(src,f), os.path.join(dst,f))
            print(f"{f:24} {size[0]}x{size[1]} median={med} wb_gains={gains}")
