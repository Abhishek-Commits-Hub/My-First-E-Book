// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

// TODO: Replace the following with your app's Firebase project configuration
// You can find this in your Firebase Console -> Project Settings -> General -> Your apps
const firebaseConfig = {
  apiKey: "AIzaSyAlNomjYTozWr_faMZoqSsTXLOdMb_gKcg",
  authDomain: "authentication-50636.firebaseapp.com",
  projectId: "authentication-50636",
  storageBucket: "authentication-50636.firebasestorage.app",
  messagingSenderId: "412091207324",
  appId: "1:412091207324:web:3cb82cc2610b5413d4e759",
  measurementId: "G-K9R30Z09M3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// DOM Logic Hooks
const loginModal = document.getElementById('login-modal');
const openLoginBtn = document.getElementById('open-signin');
const googleBtn = document.getElementById('google-btn');
const authStep1 = document.getElementById('auth-step-1');
const authStep2 = document.getElementById('auth-step-2');
const aliasInput = document.getElementById('alias-input');
const aliasSubmit = document.getElementById('alias-submit');

if (googleBtn) {
  googleBtn.addEventListener('click', () => {
    
    // Animate button feedback
    googleBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> VERIFYING...`;
    
    signInWithPopup(auth, provider)
      .then((result) => {
        // Transition to Step 2 (Username selection)
        authStep1.style.display = 'none';
        authStep2.style.display = 'block';
        aliasInput.focus();
      })
      .catch((error) => {
        console.error(error.message);
        googleBtn.innerHTML = `AUTH_FAILED // RETRY`;
        googleBtn.style.background = 'var(--error-color)';
        setTimeout(() => {
          googleBtn.innerHTML = `<i class="fa-brands fa-google"></i> Sign in with Google`;
          googleBtn.style.background = 'transparent';
        }, 3000);
      });
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
        googleBtn.innerHTML = `<i class="fa-brands fa-google"></i> Sign in with Google`;
        googleBtn.style.background = 'var(--glitch-blue)';
        googleBtn.style.color = '#fff';
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
