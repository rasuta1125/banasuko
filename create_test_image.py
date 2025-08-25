from PIL import Image, ImageDraw, ImageFont
import os

# 簡単なバナー画像を作成
width, height = 400, 200
image = Image.new('RGB', (width, height), color='#4A90E2')

draw = ImageDraw.Draw(image)

# テキストを描画
try:
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 24)
except:
    font = ImageFont.load_default()

# メインテキスト
draw.text((50, 50), "特別セール開催中!", fill='white', font=font)
draw.text((50, 90), "今なら50%OFF!", fill='yellow', font=font)
draw.text((50, 130), "今すぐ購入", fill='white', font=font)

# 保存
image.save('test_banner.jpg', 'JPEG', quality=85)
print("テスト画像を作成しました: test_banner.jpg")
