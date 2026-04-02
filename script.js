document.addEventListener('DOMContentLoaded', () => {

  // --- CUSTOM CURSOR ---
  const cursor = document.getElementById('cursor');
  document.addEventListener('mousemove', (e) => {
    // Adding slight lag/jitter to cursor position mathematically
    const jitterX = Math.random() < 0.1 ? (Math.random() - 0.5) * 10 : 0;
    const jitterY = Math.random() < 0.1 ? (Math.random() - 0.5) * 10 : 0;
    cursor.style.transform = `translate(${e.clientX - 10 + jitterX}px, ${e.clientY - 10 + jitterY}px)`;
  });

  const interactables = document.querySelectorAll('a, button, input, textarea');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });

  // --- THEME TOGGLE ---
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  if (localStorage.getItem('sys-theme') === 'light') {
    body.classList.add('light-theme');
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    
    // Add a jarring flash effect on switch
    document.body.style.filter = "invert(100%)";
    setTimeout(() => {
       document.body.style.filter = "";
    }, 150);

    if (body.classList.contains('light-theme')) {
      localStorage.setItem('sys-theme', 'light');
    } else {
      localStorage.setItem('sys-theme', 'dark');
    }
  });

  // --- RANDOM TEXT GLITCHER (SYSTEM EVENTS) ---
  const glitchTargets = document.querySelectorAll('.target-glitch');
  const glitchChars = '!<>-_\\/[]{}—=+*^?#_';
  
  setInterval(() => {
    // 30% chance to glitch a random element every 2 seconds
    if(Math.random() > 0.3) {
      const el = glitchTargets[Math.floor(Math.random() * glitchTargets.length)];
      if(!el.dataset.original) {
        el.dataset.original = el.innerText;
      }
      
      const original = el.dataset.original;
      let scrambled = original.split('').map(c => {
         return (Math.random() < 0.1 && c !== ' ') ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : c;
      }).join('');
      
      el.innerText = scrambled;
      el.classList.add('jitter');
      
      // Fix it fast
      setTimeout(() => {
        el.innerText = original;
        el.classList.remove('jitter');
      }, 100 + Math.random() * 200);
    }
  }, 2000);

  // --- SCROLL DISTORTION ---
  const distortTarget = document.getElementById('scroll-distort-target');
  let currentScroll = 0;
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const diff = scrollY - currentScroll;
    currentScroll = scrollY;
    
    // Distort based on scroll velocity (capped)
    const skew = Math.max(-5, Math.min(5, diff * 0.1));
    distortTarget.style.transform = `skewY(${skew}deg)`;
    
    // Snap back
    clearTimeout(window.scrollSnapBack);
    window.scrollSnapBack = setTimeout(() => {
      distortTarget.style.transform = `skewY(0deg)`;
    }, 150);

    // Navbar sticky styling
    const navbar = document.getElementById('navbar');
    if (scrollY > 50) {
      navbar.style.background = 'rgba(0,0,0,0.8)';
      navbar.style.borderBottom = '1px solid var(--glitch-red)';
    } else {
      navbar.style.background = 'transparent';
      navbar.style.borderBottom = '1px solid var(--border)';
    }

    // Scroll Top Button
    const scrollTop = document.getElementById('scroll-top');
    if(scrollY > 400) scrollTop.classList.add('show');
    else scrollTop.classList.remove('show');
  });

  document.getElementById('scroll-top').addEventListener('click', () => {
    window.scrollTo({top:0, behavior:'smooth'});
  });

  // --- CART LOGIC ---
  let cart = [];
  const cartCounter = document.getElementById('cart-count');
  const addCartBtn = document.querySelector('.add-to-cart');
  const cartBtnNav = document.getElementById('cart-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const closeCartBtn = document.getElementById('close-cart');
  const cartItemsList = document.getElementById('cart-items-list');
  const cartTotalEl = document.getElementById('cart-total');

  function renderCart() {
    cartItemsList.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
      total += item.price;
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
        <div class="cart-item-info">
          <span class="cart-item-title">${item.title}</span>
          <span class="cart-item-price">$${item.price.toFixed(2)}</span>
        </div>
        <button class="remove-btn" style="position:relative; z-index:99999;" data-index="${index}">REMOVE</button>
      `;
      cartItemsList.appendChild(li);
    });

    cartTotalEl.textContent = total.toFixed(2);
    cartCounter.textContent = cart.length;

    // Attach remove listeners
    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        cart.splice(idx, 1);
        renderCart();
      });
    });
  }

  // Toggle Cart Drawer
  cartBtnNav.addEventListener('click', () => {
    cartDrawer.classList.toggle('open');
    document.body.classList.toggle('cart-open');
  });
  closeCartBtn.addEventListener('click', () => {
    cartDrawer.classList.remove('open');
    document.body.classList.remove('cart-open');
  });

  addCartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Push new item state
    cart.push({ title: "GlitchMyNeuron", price: 1.00 });
    renderCart();
    
    // Auto-open Cart Drawer (Split screen mapping)
    cartDrawer.classList.add('open');
    document.body.classList.add('cart-open');
    
    // Add visual disturbance
    const originalText = addCartBtn.innerText;
    addCartBtn.innerText = "OVERWRITING...";
    addCartBtn.style.background = "var(--glitch-red)";
    addCartBtn.style.color = "white";
    
    // Shake screen briefly
    document.body.style.transform = "translate(5px, -5px)";
    setTimeout(() => {
      document.body.style.transform = "translate(-5px, 5px)";
      setTimeout(() => document.body.style.transform = "", 50);
    }, 50);

    setTimeout(() => {
      addCartBtn.innerText = "ADDED_TO_LOG";
      addCartBtn.style.background = "transparent";
      addCartBtn.style.color = "var(--text-main)";
    }, 1000);
  });

  // --- MODAL LOGIC ---
  const loginModal = document.getElementById('login-modal');
  const openLogin = document.getElementById('open-signin');
  const closeLogin = document.getElementById('close-modal');

  openLogin.addEventListener('click', () => loginModal.classList.add('active'));
  closeLogin.addEventListener('click', () => loginModal.classList.remove('active'));

  // NOTE: Authentication login logic has been physically migrated to the secure firebase-auth.js modular component

  // --- FORM VALIDATION (CONTACT) ---
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    
    const email = document.getElementById('contact-email');
    const msg = document.getElementById('contact-message');
    const emailErr = document.getElementById('email-err');
    const msgErr = document.getElementById('msg-err');

    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      emailErr.style.display = "block";
      email.style.borderColor = "var(--error-color)";
      valid = false;
    } else {
      emailErr.style.display = "none";
      email.style.borderColor = "var(--border)";
    }

    if(msg.value.trim() === "") {
      msgErr.style.display = "block";
      msg.style.borderColor = "var(--error-color)";
      valid = false;
    } else {
      msgErr.style.display = "none";
      msg.style.borderColor = "var(--border)";
    }

    if(valid) {
      const btn = contactForm.querySelector('button');
      btn.innerText = "UPLOADING...";
      
      const userName = document.getElementById('contact-name').value;
      const userMsg = document.getElementById('contact-message').value;
      const subject = encodeURIComponent(`Terminal Message from ${userName}`);
      const bodyText = encodeURIComponent(`Incoming transmission:\n\n${userMsg}`);
      
      setTimeout(() => {
        btn.innerText = "TRANSMIT";
        contactForm.reset();
        document.getElementById('form-feedback').style.display = 'block';
        
        // Redirect to Gmail web draft
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=abhishekdutta.contact@gmail.com&su=${subject}&body=${bodyText}`;
        window.open(gmailUrl, '_blank');
        
        setTimeout(() => document.getElementById('form-feedback').style.display='none', 3000);
      }, 1500);
    }
  });

  // Mobile Nav Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
  });



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

});
