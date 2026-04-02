import re

css_path = r'c:\Users\ABHISHEK KUMAR DUTTA\OneDrive\Desktop\My Website\styles.css'
js_path = r'c:\Users\ABHISHEK KUMAR DUTTA\OneDrive\Desktop\My Website\script.js'

with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Update CSS Variables (Cyberpunk Palette)
css = re.sub(
    r':root \{.*?\}',
    ':root {\n  --bg-color: #03040b;\n  --text-main: #f0f4ff;\n  --text-muted: #8b99c7;\n  --glitch-red: #ff2a6d;\n  --glitch-blue: #05d9e8;\n  --glitch-green: #01ffc3;\n  --void-accent: #0f172a;\n  --border: rgba(139, 153, 199, 0.15);\n  --glass: rgba(15, 23, 42, 0.4);\n  --error-color: #ff2a6d;\n}',
    css,
    flags=re.DOTALL
)

# 2. Update Body Background (Animated Gradient Void over Neural Network)
css = re.sub(
    r'@keyframes rgb-chroma.*?(?=body \{)',
    '@keyframes gradient-void {\n  0% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n  100% { background-position: 0% 50%; }\n}\n\n',
    css,
    flags=re.DOTALL
)

body_replacement = """body {
  font-family: 'Space Mono', monospace;
  background-color: var(--bg-color);
  background-image: linear-gradient(45deg, rgba(3, 4, 11, 0.95), rgba(15, 23, 42, 0.8), rgba(46, 21, 64, 0.9)), url('assets/images/neural_network_hack.png');
  background-size: 200% 200%, cover;
  background-position: center, center;
  background-attachment: fixed;
  color: var(--text-main);
  overflow-x: hidden;
  animation: gradient-void 20s ease infinite;
}"""
css = re.sub(r'body \{.*?\}', body_replacement, css, flags=re.DOTALL, count=1)

# Eliminate rgb-chroma targeting structural wrappers
css = re.sub(r'#main-wrapper.*?\}', '', css, flags=re.DOTALL)

# 3. Strip the rigid black 3D text-shadows
css = re.sub(r'text-shadow:.*?(rgba\(0,\s*0,\s*0.*?|var\(--bg-color\)).*?;\n?', '', css)

# 4. Premium Glassmorphism Sys-Cards (Rounded, frosted, glowing, no clip path)
css = css.replace(
    'background: rgba(0, 5, 0, 0.7);',
    'background: var(--glass);'
).replace(
    'backdrop-filter: blur(10px);',
    'backdrop-filter: blur(16px);'
).replace(
    '-webkit-backdrop-filter: blur(10px);',
    '-webkit-backdrop-filter: blur(16px);'
).replace(
    'clip-path: polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%);',
    'box-shadow: 0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1); border-radius: 16px;'
)
css = re.sub(r'\.sys-card::after \{.*?\}', '', css, flags=re.DOTALL)

# Add subtle inner glow to About narrative to make it readable rather than inverted
css = css.replace(
    'background: var(--text-main);',
    'background: transparent; color: var(--glitch-blue); text-shadow: 0 0 10px rgba(5,217,232,0.3);'
)

# 5. Nav Glowing Edge
css = css.replace(
    'border-bottom: 1px solid var(--border);',
    'border-bottom: 1px solid var(--border); box-shadow: 0 4px 30px rgba(5, 217, 232, 0.05);'
)

# 6. Throttle Glitch Animation (Micro Jitter)
css = css.replace('animation: glitch-anim-1 0.2s', 'animation: glitch-anim-1 0.1s')
css = css.replace('animation: glitch-anim-2 0.3s', 'animation: glitch-anim-2 0.15s')
css = css.replace('text-shadow: -3px 0 var(--glitch-red), 3px', 'text-shadow: -1px 0 var(--glitch-red), 1px')
css = css.replace('text-shadow: 3px 0 var(--glitch-blue), -3px', 'text-shadow: 1px 0 var(--glitch-blue), -1px')

# 7. CRT Overlay Subtle Fix (cinematic noise instead of heavy retro lines)
css = css.replace(
    'background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));',
    'background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.05) 50%);'
).replace(
    'background: radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,0.6) 100%);',
    'background: radial-gradient(circle, rgba(0,0,0,0) 70%, rgba(0,0,0,0.4) 100%);'
)

css += "\n.magnetic { display: inline-block; transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); }\n"

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)

# Update Script.js for Magnetic Physics
with open(js_path, 'r', encoding='utf-8') as f:
    js = f.read()

js_magnetic = """
  // --- MAGNETIC BUTTONS (PREMIUM UI) ---
  const magneticEls = document.querySelectorAll('.sys-btn, .cta');
  magneticEls.forEach(btn => {
    btn.classList.add('magnetic');
    
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      // Gentle pull
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = `translate(0px, 0px)`;
    });
  });
"""

# inject right before final listener close
if '});' in js:
    # Reverse split to find last occurrence of `});`
    parts = js.rsplit('});', 1)
    if len(parts) == 2:
        js = parts[0] + js_magnetic + '\n});' + parts[1]

with open(js_path, 'w', encoding='utf-8') as f:
    f.write(js)

print("Apple + Cyberpunk CSS/JS OVERHAUL DEPLOYED")
