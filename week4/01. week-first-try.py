from PIL import Image, ImageDraw
import random

# Define the size of the image
width, height = 800, 800

# Create a new image with white background
img = Image.new('RGB', (width, height), 'blue')
d = ImageDraw.Draw(img)

# Define color palette
color_palette = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']

# Draw circles of different colors and sizes on the image
for _ in range(400):
    radius = random.randint(10, 40)
    color = random.choice(color_palette)
    upper_left_corner = (random.randint(0, width - radius), random.randint(0, height - radius))
    lower_right_corner = (upper_left_corner[0] + radius * 2, upper_left_corner[1] + radius * 2)
    d.ellipse([upper_left_corner, lower_right_corner], fill=color)

# Save the image to a file
img.save('abstract_pattern.png')