"""Regenerate web-sized images and src/content/image-manifest.json.

    python3 scripts/optimize-images.py          # photos + logos + manifest
    python3 scripts/optimize-images.py logos    # logos + manifest only

Needs Pillow (pip install Pillow). Photos in public/assets/photos/*.jpg get a 1280px
and a 640px WebP. Logos get a small WebP sized for how big they appear on screen
(about three times the displayed size, so they stay sharp on phones); the original PNGs
stay for search engines and share previews. The manifest tells the site which file
to load and how big it is, so pages don't jump while images arrive.
"""
import json
import sys
from pathlib import Path
from PIL import Image

PUBLIC = Path('public')
PHOTOS = PUBLIC / 'assets/photos'
MANIFEST = Path('src/content/image-manifest.json')
LOGOS = [('logo-goya-ink.png', 400), ('logo-goya-white.png', 400), ('seal-white.png', 160)]


def photos():
    for source in PHOTOS.glob('*.jpg'):
        with Image.open(source) as original:
            for width, suffix in [(1280, ''), (640, '-640')]:
                im = original.convert('RGB'); im.thumbnail((width, width * 2))
                im.save(PHOTOS / (source.stem + suffix + '.webp'), 'WEBP', quality=80, method=6)
    print('Created full and mobile WebP photographs.')


def logos():
    for name, width in LOGOS:
        with Image.open(PUBLIC / 'assets' / name) as original:
            im = original.convert('RGBA')
            im = im.resize((width, round(im.size[1] * width / im.size[0])), Image.LANCZOS)
            im.save(PUBLIC / 'assets' / name.replace('.png', '.webp'), 'WEBP', lossless=True, method=6)
    print('Created web-sized logo images.')


def size(path):
    with Image.open(PUBLIC / path.lstrip('/')) as im:
        return im.size


def manifest():
    # Start from the existing file so entries keep their order and diffs stay small.
    entries = json.loads(MANIFEST.read_text()) if MANIFEST.exists() else {}
    for source in sorted(PHOTOS.glob('*.jpg')):
        full, small = f'/assets/photos/{source.stem}.webp', f'/assets/photos/{source.stem}-640.webp'
        if not (PUBLIC / full.lstrip('/')).exists():
            continue
        width, height = size(full)
        entries[f'/assets/photos/{source.name}'] = {'src': full, 'small': small, 'width': width, 'height': height, 'smallWidth': size(small)[0]}
    for name, _ in LOGOS:
        src = '/assets/' + name.replace('.png', '.webp')
        width, height = size(src)
        entries['/assets/' + name] = {'src': src, 'width': width, 'height': height}
    for portrait in sorted((PUBLIC / 'assets/team').glob('*.jpg')):
        path = f'/assets/team/{portrait.name}'
        width, height = size(path)
        entries[path] = {'src': path, 'width': width, 'height': height}
    entries['/assets/meander.svg'] = {'src': '/assets/meander.svg', 'width': 30, 'height': 30}
    MANIFEST.write_text(json.dumps(entries, indent=2) + '\n')
    print(f'Wrote {len(entries)} entries to {MANIFEST}.')


if __name__ == '__main__':
    if sys.argv[1:] != ['logos']:
        photos()
    logos()
    manifest()
