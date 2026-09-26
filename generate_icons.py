import os
try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    os.system("python -m pip install pillow")
    from PIL import Image, ImageDraw, ImageFont

def make_icon(size, filename):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    # Create gradient background
    img = Image.new('RGBA', (size, size), (15, 81, 50, 255)) # Emerald Green #0F5132
    draw = ImageDraw.Draw(img)

    # Draw rounded rectangle border in Gold
    margin = int(size * 0.05)
    corner_radius = int(size * 0.18)
    draw.rounded_rectangle([margin, margin, size - margin, size - margin], radius=corner_radius, outline=(245, 158, 11, 255), width=int(size * 0.025))

    # Draw Crescent Moon & Star in Gold #F59E0B
    center_x, center_y = size // 2, size // 2 - int(size * 0.05)
    r = int(size * 0.25)
    
    # Crescent Outer
    draw.ellipse([center_x - r, center_y - r, center_x + r, center_y + r], fill=(245, 158, 11, 255))
    # Crescent Inner Mask
    draw.ellipse([center_x - int(r * 0.65), center_y - int(r * 1.1), center_x + int(r * 1.2), center_y + int(r * 0.8)], fill=(15, 81, 50, 255))

    # Star
    star_x = center_x + int(r * 0.5)
    star_y = center_y - int(r * 0.3)
    sr = int(size * 0.06)
    draw.ellipse([star_x - sr, star_y - sr, star_x + sr, star_y + sr], fill=(251, 191, 36, 255))

    # Subtle text "PRAYER"
    try:
        font = ImageFont.truetype("arial.ttf", int(size * 0.09))
        draw.text((size // 2, int(size * 0.82)), "PRAYER APP", fill=(255, 255, 255, 230), anchor="mm", font=font)
    except Exception:
        pass

    img.save(filename, "PNG")
    print(f"Generated {filename}")

make_icon(192, "icons/icon-192.png")
make_icon(512, "icons/icon-512.png")
