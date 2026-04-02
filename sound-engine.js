/* ═══════════════════════════════════════════
   GLITCHED_CORE // SYNTHETIC SOUND ENGINE
   All sounds generated via Web Audio API.
   Zero external files required.
   ═══════════════════════════════════════════ */

const SoundEngine = (() => {
  let ctx = null;

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  }

  // --- CORE SOUND PRIMITIVES ---

  function playTone(freq, duration, type = 'sine', volume = 0.15) {
    const c = getCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, c.currentTime);
    gain.gain.setValueAtTime(volume, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start();
    osc.stop(c.currentTime + duration);
  }

  // --- SOUND LIBRARY ---

  // Subtle electronic tick on hover
  function hover() {
    playTone(1800, 0.05, 'sine', 0.06);
  }

  // Satisfying confirmation click
  function click() {
    playTone(600, 0.08, 'square', 0.08);
    setTimeout(() => playTone(800, 0.06, 'square', 0.06), 40);
  }

  // Cart add — rising dual-tone
  function cartAdd() {
    playTone(400, 0.12, 'sine', 0.1);
    setTimeout(() => playTone(600, 0.12, 'sine', 0.1), 80);
    setTimeout(() => playTone(900, 0.15, 'sine', 0.08), 160);
  }

  // Modal open — system boot sequence
  function modalOpen() {
    playTone(200, 0.15, 'sawtooth', 0.06);
    setTimeout(() => playTone(400, 0.12, 'sine', 0.08), 100);
    setTimeout(() => playTone(800, 0.2, 'sine', 0.06), 200);
  }

  // Modal close — descending shutdown
  function modalClose() {
    playTone(800, 0.1, 'sine', 0.06);
    setTimeout(() => playTone(400, 0.1, 'sine', 0.06), 80);
    setTimeout(() => playTone(200, 0.15, 'sawtooth', 0.04), 160);
  }

  // Login success — triumphant ascending arpeggio
  function loginSuccess() {
    playTone(523, 0.15, 'sine', 0.1);
    setTimeout(() => playTone(659, 0.15, 'sine', 0.1), 120);
    setTimeout(() => playTone(784, 0.15, 'sine', 0.1), 240);
    setTimeout(() => playTone(1047, 0.3, 'sine', 0.08), 360);
  }

  // Error — harsh buzz
  function error() {
    playTone(150, 0.2, 'sawtooth', 0.1);
    setTimeout(() => playTone(120, 0.25, 'sawtooth', 0.08), 100);
  }

  // Glitch text hover — digital static burst
  function glitchText() {
    const c = getCtx();
    const bufferSize = c.sampleRate * 0.04;
    const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }
    const noise = c.createBufferSource();
    const gain = c.createGain();
    noise.buffer = buffer;
    gain.gain.setValueAtTime(0.04, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.04);
    noise.connect(gain);
    gain.connect(c.destination);
    noise.start();
  }

  // Scroll tick — tiny mechanical click
  function scrollTick() {
    playTone(2400, 0.02, 'sine', 0.03);
  }

  // Data sector scan — sweeping frequency scan
  function dataScan() {
    const c = getCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, c.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, c.currentTime + 0.15);
    gain.gain.setValueAtTime(0.07, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start();
    osc.stop(c.currentTime + 0.2);
  }

  return { hover, click, cartAdd, modalOpen, modalClose, loginSuccess, error, glitchText, scrollTick, dataScan };
})();

/* ═══════════════════════════════════════════
   AUTO-WIRING TO DOM ELEMENTS
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // --- BUTTON HOVER SOUNDS ---
  document.querySelectorAll('.sys-btn, .cta, .nav-links a').forEach(el => {
    el.addEventListener('mouseenter', () => SoundEngine.hover());
  });

  // --- BUTTON CLICK SOUNDS ---
  document.querySelectorAll('.sys-btn, .cta').forEach(el => {
    el.addEventListener('click', () => SoundEngine.click());
  });

  // --- GLITCH TEXT HOVER ---
  document.querySelectorAll('.target-glitch, .glitch').forEach(el => {
    el.addEventListener('mouseenter', () => SoundEngine.glitchText());
  });

  // --- CART ADD SOUND ---
  document.querySelectorAll('.add-to-cart').forEach(el => {
    el.addEventListener('click', () => SoundEngine.cartAdd());
  });

  // --- MODAL SOUNDS ---
  const openLogin = document.getElementById('open-signin');
  const closeModal = document.getElementById('close-modal');
  if (openLogin) openLogin.addEventListener('click', () => SoundEngine.modalOpen());
  if (closeModal) closeModal.addEventListener('click', () => SoundEngine.modalClose());

  // --- SCROLL TICK (throttled) ---
  let lastScrollTick = 0;
  window.addEventListener('scroll', () => {
    const now = Date.now();
    if (now - lastScrollTick > 300) {
      SoundEngine.scrollTick();
      lastScrollTick = now;
    }
  });

  // --- DATA SECTOR CARD HOVER ---
  document.querySelectorAll('.cat-card').forEach(el => {
    el.addEventListener('mouseenter', () => SoundEngine.dataScan());
  });
});
