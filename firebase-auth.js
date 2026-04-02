/* LOCAL AUTHENTICATION MODULE */

// DOM Logic Hooks
const loginModal = document.getElementById('login-modal');
const openLoginBtn = document.getElementById('open-signin');
const ghostBtn = document.getElementById('ghost-btn');
const authStep1 = document.getElementById('auth-step-1');
const authStep2 = document.getElementById('auth-step-2');
const aliasInput = document.getElementById('alias-input');
const aliasSubmit = document.getElementById('alias-submit');

// --- LOCAL GHOST PROTOCOL (NO BACKEND) ---
if (ghostBtn) {
  ghostBtn.addEventListener('click', () => {
    ghostBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> INITIATING SECURE LOCAL CONNECTION...`;
    
    setTimeout(() => {
      authStep1.style.display = 'none';
      authStep2.style.display = 'block';
      aliasInput.focus();
      
      // Reset button visually
      ghostBtn.innerHTML = `<i class="fa-solid fa-ghost"></i> Ghost Protocol (Local Access)`;
    }, 600);
  });
}

if (aliasSubmit) {
  aliasSubmit.addEventListener('click', () => {
    const alias = aliasInput.value.trim().toUpperCase() || 'ANONYMOUS';
    
    // Update System UI with the alias
    openLoginBtn.innerHTML = `USER: ${alias}`;
    openLoginBtn.style.color = 'var(--glitch-blue)'; 
    
    // Disable Modal & Reset
    loginModal.classList.remove('active');
    setTimeout(() => {
        authStep1.style.display = 'block';
        authStep2.style.display = 'none';
        aliasInput.value = '';
    }, 500);
  });
}

// Allow pressing ENTER to submit alias
if (aliasInput) {
  aliasInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      aliasSubmit.click();
    }
  });
}
