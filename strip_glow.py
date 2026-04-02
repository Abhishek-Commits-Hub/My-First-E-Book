import re

filepath = r'c:\Users\ABHISHEK KUMAR DUTTA\OneDrive\Desktop\My Website\styles.css'

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if 'text-shadow' in line and 'var(--glitch-red)' not in line:
        continue
    if 'box-shadow' in line:
        continue
    new_lines.append(line)

with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Stripped all standard glow elements from styles.css")
