from pathlib import Path
from PIL import Image
root=Path('public/assets/photos')
for source in root.glob('*.jpg'):
    with Image.open(source) as original:
        for width,suffix in [(1280,''),(640,'-640')]:
            im=original.convert('RGB');im.thumbnail((width,width*2))
            im.save(root/(source.stem+suffix+'.webp'),'WEBP',quality=80,method=6)
print('Created full and mobile WebP photographs.')
