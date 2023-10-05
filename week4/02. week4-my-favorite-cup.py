from PIL import Image, ImageDraw
import random

# Define the size of the image
width, height = 800, 800

# Create a new image with white background
img = Image.new('RGB', (width, height), 'white')
d = ImageDraw.Draw(img)

# Draw circles of different sizes on the image in black color
for _ in range(100):
    radius = random.randint(10, 50)
    color = 'black'
    upper_left_corner = (random.randint(0, width - radius), random.randint(0, height - radius))
    lower_right_corner = (upper_left_corner[0] + radius * 2, upper_left_corner[1] + radius * 2)
    d.ellipse([upper_left_corner, lower_right_corner], fill=color)

# Save the image to a file
img.save('abstract_pattern_black.png')
