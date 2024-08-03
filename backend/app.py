from flask import Flask, request, send_file
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route('/')
def helloWorld():
    return 'Hello, World!'

@app.route('/generate_bill', methods=['POST'])
def generate_bill():
    data = request.json
    print(data)
    items = data['items']
    total = data['total']

    # Generate image
    image = Image.new('RGB', (400, 600), color=(255, 255, 255))
    draw = ImageDraw.Draw(image)
    font = ImageFont.load_default()

    y_text = 20
    for item in items:
        draw.text((20, y_text), f"{item['name']} - {item['price']}", font=font, fill=(0, 0, 0))
        y_text += 20
    draw.text((20, y_text + 20), f"Total: {total}", font=font, fill=(0, 0, 0))

    # Save image to a bytes buffer
    img_io = BytesIO()
    image.save(img_io, 'PNG')
    img_io.seek(0)

    return send_file(img_io, mimetype='image/png', as_attachment=True, download_name='bill.png')

if __name__ == '__main__':
    app.run(debug=True)
