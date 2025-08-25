from PIL import Image, ImageDraw, ImageFont

# バリエーションBの画像を作成
width, height = 400, 200
image = Image.new('RGB', (width, height), color='#E74C3C')  # 赤背景

draw = ImageDraw.Draw(image)

try:
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 24)
except:
    font = ImageFont.load_default()

# メインテキスト（レイアウト変更）
draw.text((30, 40), "限定セール実施中", fill='white', font=font)
draw.text((30, 80), "最大70%割引!", fill='yellow', font=font)
draw.text((30, 140), "詳細を見る", fill='white', font=font)

# 保存
image.save('test_banner_b.jpg', 'JPEG', quality=85)
print("テスト画像Bを作成しました: test_banner_b.jpg")
