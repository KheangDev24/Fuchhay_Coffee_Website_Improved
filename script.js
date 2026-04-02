const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

function animateCursor() {
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  dot.style.left = mx + 'px';
  dot.style.top = my + 'px';
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .menu-card, .about-card, .gallery-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.transform = 'translate(-50%,-50%) scale(1.8)';
    ring.style.opacity = '0.4';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.opacity = '0.6';
  });
});


window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(r => observer.observe(r));

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.menu-card').forEach(card => {
      if (card.dataset.cat === filter) {
        card.classList.add('visible');
        card.style.display = 'block';
      } else {
        card.classList.remove('visible');
        card.style.display = 'none';
      }
    });
  });
});

// ── ADD TO CART ──
document.querySelectorAll('.menu-order-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.closest('.menu-card').querySelector('.menu-card-name').textContent;
    showToast('☕ ' + name + ' added!');
    btn.textContent = '✓';
    btn.style.background = 'var(--sage)';
    setTimeout(() => {
      btn.textContent = '+';
      btn.style.background = '';
    }, 2000);
  });
});


function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function sendMessage() {
  showToast("☕ Message sent! We'll be in touch soon.");
}
