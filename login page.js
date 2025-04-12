// Toggle password visibility for Sign In and monkey eyes
document.getElementById('signin-toggle-password').addEventListener('change', function () {
    var passwordInput = document.getElementById('signin-password');
    passwordInput.type = this.checked ? 'text' : 'password';
    
    // Toggle monkey eyes state
    document.getElementById('avatar-checkbox').checked = this.checked;
    toggleMonkeyEyes(this.checked);
});

// Toggle password visibility for Sign Up
document.getElementById('signup-toggle-password').addEventListener('change', function () {
    var passwordInput = document.getElementById('signup-password');
    passwordInput.type = this.checked ? 'text' : 'password';
});

// Toggle monkey avatar animation
document.getElementById('avatar-checkbox').addEventListener('change', function() {
    toggleMonkeyEyes(this.checked);
});

function toggleMonkeyEyes(shouldHide) {
    const monkeyEyes = document.querySelectorAll('.monkey-eye-r, .monkey-eye-l');
    monkeyEyes.forEach(eye => {
        if (shouldHide) {
            eye.setAttribute('ry', '0.5');
            eye.setAttribute('cy', '30');
        } else {
            eye.setAttribute('ry', '4.5');
            eye.setAttribute('cy', '31.7');
        }
    });
    
    const monkeyHands = document.getElementById('monkey-hands');
    if (shouldHide) {
        monkeyHands.style.transform = 'translate3d(0, 0, 0) rotateX(0deg)';
    } else {
        monkeyHands.style.transform = 'translateY(calc(var(--sz-avatar) / 1.25)) rotateX(-21deg)';
    }
    
    const monkeyMouth = document.querySelector('.avatar::before');
    if (monkeyMouth) {
        const svgSize = 90; // --sz-svg value
        if (shouldHide) {
            monkeyMouth.style.width = `${svgSize * 0.09}px`;
            monkeyMouth.style.height = '0';
            monkeyMouth.style.borderRadius = '50%';
            monkeyMouth.style.borderBottom = `${svgSize * 0.1}px solid #3c302a`;
        } else {
            monkeyMouth.style.width = `${svgSize / 3.889}px`;
            monkeyMouth.style.height = `${svgSize / 5.833}px`;
            monkeyMouth.style.borderBottom = `${svgSize * 0.04}px solid #3c302a`;
        }
    }
}