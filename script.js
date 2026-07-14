const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- LOADER ---------- */
const loader = document.getElementById('loader');
const pctEl = loader.querySelector('.loader-pct');
let pct = 0;
const loadTimer = setInterval(() => {
  pct += Math.random() * 18 + 6;
  if (pct >= 100) {
    pct = 100;
    clearInterval(loadTimer);
    setTimeout(() => loader.classList.add('done'), 300);
  }
  pctEl.textContent = Math.floor(pct) + '%';
}, 180);

/* ---------- SCROLL REVEAL (slides) ---------- */
const slides = document.querySelectorAll('.slide');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
}, { threshold: 0.25 });
slides.forEach(s => io.observe(s));
document.querySelectorAll('.squad-card').forEach(c => io.observe(c));

/* ---------- TYPEWRITER ---------- */
const twEl = document.getElementById('typewriter');
const twText = 'Team Presentation Dashboard';
if (reduceMotion) {
  twEl.textContent = twText;
} else {
  let i = 0;
  (function type() {
    if (i <= twText.length) {
      twEl.textContent = twText.slice(0, i);
      i++;
      setTimeout(type, 55);
    }
  })();
}

/* ---------- START BUTTON SCROLL ---------- */
document.getElementById('startBtn').addEventListener('click', (e) => {
  document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
});

/* ---------- BUTTON RIPPLE ---------- */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });
});

/* ---------- NAV SCROLL SPY ---------- */
const navLinks = document.querySelectorAll('.nav-link');
const sections = ['hero', 'intro', 'stats', 'programs', 'gallery'].map(id => document.getElementById(id));
const spy = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[data-target="${e.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.5 });
sections.forEach(s => s && spy.observe(s));

/* ---------- CARD TILT + SPOTLIGHT ---------- */
if (!reduceMotion) {
  document.querySelectorAll('.frame').forEach(frame => {
    frame.addEventListener('mousemove', (e) => {
      const rect = frame.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2, cy = rect.height / 2;
      const rotY = ((x - cx) / cx) * 6;
      const rotX = -((y - cy) / cy) * 6;
      frame.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
      frame.style.setProperty('--mx', x + 'px');
      frame.style.setProperty('--my', y + 'px');
    });
    frame.addEventListener('mouseleave', () => {
      frame.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
    });
  });
}

/* ---------- STAT COUNTERS + XP BARS ---------- */
const statCards = document.querySelectorAll('.stat-card');
const statIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const card = entry.target;
    const numEl = card.querySelector('.stat-num');
    const target = parseInt(numEl.dataset.count, 10);
    const fillEl = card.querySelector('.xp-fill');
    fillEl.style.width = fillEl.dataset.fill + '%';

    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const tick = () => {
      cur = Math.min(target, cur + step);
      numEl.textContent = cur;
      if (cur < target) requestAnimationFrame(tick);
    };
    tick();
    statIO.unobserve(card);
  });
}, { threshold: 0.4 });
statCards.forEach(c => statIO.observe(c));

/* ---------- PROGRAMS FILTER ---------- */
const ROSTER = {
  suriya:     { name: 'Surya',       photo: 'images/Surya.jpg' },
  abinov:     { name: 'Abhinav',     photo: 'images/Abhinav.jpg' },
  arun:       { name: 'Arun',        photo: 'images/Arun.jpg' },
  sanju:      { name: 'Sanju',       photo: 'images/Sanju.jpg' },
  nobel:      { name: 'Noble',       photo: 'images/Noble.jpg' },
  sukenya:    { name: 'Sukanya',     photo: 'images/Sukenya.jpg' },
  thrakajith: { name: 'Tharakjith',  photo: 'images/Tharakjith.jpg' },
  athira:     { name: 'Athira',      photo: 'images/Athira.jpg' },
  abish:      { name: 'Abish',       photo: 'images/Abish.jpg' },
  abishek:    { name: 'Abhishek',    photo: 'images/Abhishek.jpg' },
  minna:      { name: 'Minna',       photo: 'images/Minna.jpg' },
  vanthana:   { name: 'Vandana',     photo: 'images/Vandana.jpg' },
  jinu:       { name: 'Jinu',        photo: 'images/Jinu1.jpg' },
  tomwillems: { name: 'Tom Willems', photo: 'images/TomWillems.png' },
  anith:      { name: 'Anith',       photo: 'images/Anith.jpg' },
  ajith:      { name: 'Ajith',       photo: 'images/Ajith.jpg' },
  akhila:     { name: 'Akhila',      photo: 'images/Akhila.jpg' }
};

const PROGRAMS = {
  hackathon: ['anith', 'abinov', 'abishek', 'athira', 'abish', 'ajith', 'jinu'],
  football: ['anith', 'abinov', 'abishek', 'athira', 'abish', 'ajith', 'jinu', 'akhila', 'arun', 'sanju', 'thrakajith', 'suriya', 'nobel'],
  culturals: Object.keys(ROSTER)
};

(function programFilter() {
  const cards = document.querySelectorAll('.program-card');
  const modal = document.getElementById('programModal');
  const backdrop = document.getElementById('programBackdrop');
  const title = document.getElementById('programResultsTitle');
  const grid = document.getElementById('programResultsGrid');
  const closeBtn = document.getElementById('programClose');
  if (!cards.length) return;

  function openModal(key) {
    const ids = PROGRAMS[key] || [];
    title.textContent = key.charAt(0).toUpperCase() + key.slice(1) + ` — ${ids.length} Members`;
    grid.innerHTML = ids.map(id => {
      const m = ROSTER[id];
      if (!m) return '';
      const photoHtml = m.photo
        ? `<div class="pr-photo"><img src="${m.photo}" alt="${m.name}"></div>`
        : `<div class="pr-photo pending">photo<br>pending</div>`;
      return `<div class="pr-card">${photoHtml}<div class="pr-name">${m.name}</div></div>`;
    }).join('');
    modal.classList.add('open');
  }

  function closeModal() {
    modal.classList.remove('open');
  }

  cards.forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.program));
  });

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
})();

/* ---------- STORM INTRO ---------- */
/* Reusable: add a {name, tag} override here, or just add to ROSTER above — nothing else needs to change. */
const MEMBER_META = {
  suriya: { position: 'Team Lead', tag: 'Team Caption' },
  abinov: { position: 'Team Member', tag: 'Wise Caption' },
  arun: { position: 'Team Member', tag: 'Wise Caption' }
};
const members = Object.keys(ROSTER)
  .filter(id => ROSTER[id].photo)
  .map(id => ({
    photo: ROSTER[id].photo,
    name: ROSTER[id].name,
    position: (MEMBER_META[id] && MEMBER_META[id].position) || 'Squad Member',
    tag: (MEMBER_META[id] && MEMBER_META[id].tag) || 'Squad Caption'
  }));

(function stormIntro() {
  const stage = document.getElementById('intro');
  if (!stage || !members.length) return;

  const card = document.getElementById('memberCard');
  const ring = stage.querySelector('.member-ring');
  const frame = document.getElementById('photoFrame');
  const photo = document.getElementById('memberPhoto');
  const tagEl = document.getElementById('memberTag');
  const nameEl = document.getElementById('memberName');
  const posEl = document.getElementById('memberPosition');
  const posText = document.getElementById('posText');
  const flash = document.getElementById('flash');
  const distant = document.getElementById('distantFlash');
  const muteBtn = document.getElementById('muteBtn');

  let muted = false;
  let audioCtx = null;
  const musicEl = document.getElementById('introMusic');
  musicEl.volume = 0.35;
  muteBtn.querySelector('span').textContent = '🔊 Sound On';

  function startMusic() {
    if (reduceMotion) return;
    musicEl.play().catch(() => { /* blocked until user gesture; retried below */ });
  }

  function stopMusic() {
    musicEl.pause();
  }

  muteBtn.addEventListener('click', () => {
    muted = !muted;
    muteBtn.querySelector('span').textContent = muted ? '🔇 Sound Off' : '🔊 Sound On';
    if (muted) stopMusic(); else startMusic();
  });

  /* sound defaults on, but browsers block autoplay until a user gesture */
  startMusic();
  const unlockAudio = () => {
    if (!muted) startMusic();
    document.removeEventListener('click', unlockAudio);
    document.removeEventListener('keydown', unlockAudio);
    document.removeEventListener('touchstart', unlockAudio);
  };
  document.addEventListener('click', unlockAudio, { once: true });
  document.addEventListener('keydown', unlockAudio, { once: true });
  document.addEventListener('touchstart', unlockAudio, { once: true });

  function thunder() {
    if (muted || reduceMotion) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const dur = 0.6;
      const buf = audioCtx.createBuffer(1, audioCtx.sampleRate * dur, audioCtx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
      const src = audioCtx.createBufferSource();
      src.buffer = buf;
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 300;
      const gain = audioCtx.createGain();
      gain.gain.value = 0.5;
      src.connect(filter).connect(gain).connect(audioCtx.destination);
      src.start();
    } catch (e) { /* audio unsupported, ignore */ }
  }

  /* electric particle burst on canvas */
  const canvas = document.getElementById('stormfx');
  const ctx = canvas.getContext('2d');
  function resizeFx() { canvas.width = stage.clientWidth; canvas.height = stage.clientHeight; }
  resizeFx();
  window.addEventListener('resize', resizeFx);

  let sparks = [];
  function burst() {
    const cx = canvas.width / 2, cy = canvas.height / 2;
    const colors = ['0,229,255', '138,43,226', '255,255,255'];
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      sparks.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        life: 1, color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }
  function tickFx() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sparks.forEach(s => {
      s.x += s.vx; s.y += s.vy; s.vx *= 0.96; s.vy *= 0.96; s.life -= 0.02;
      if (s.life > 0) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color},${s.life})`;
        ctx.shadowColor = `rgba(${s.color},1)`;
        ctx.shadowBlur = 8;
        ctx.fill();
      }
    });
    sparks = sparks.filter(s => s.life > 0);
    requestAnimationFrame(tickFx);
  }
  if (!reduceMotion) tickFx();

  function typeName(text) {
    return new Promise(resolve => {
      nameEl.textContent = '';
      nameEl.setAttribute('data-text', text);
      if (reduceMotion) { nameEl.textContent = text; return resolve(); }
      let i = 0;
      (function step() {
        if (i <= text.length) {
          nameEl.textContent = text.slice(0, i);
          nameEl.setAttribute('data-text', text.slice(0, i));
          i++;
          setTimeout(step, 65);
        } else resolve();
      })();
    });
  }

  function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

  async function lightningStrike() {
    stage.classList.add('shake');
    flash.classList.remove('active'); void flash.offsetWidth; flash.classList.add('active');
    thunder();
    burst();
    await wait(400);
    stage.classList.remove('shake');
  }

  function distantFlicker() {
    distant.classList.remove('active'); void distant.offsetWidth; distant.classList.add('active');
  }

  async function playMember(m) {
    card.classList.remove('show');
    frame.classList.remove('reveal', 'hovered');
    ring.classList.remove('reveal');
    ring.style.animationDuration = '10s';
    tagEl.classList.remove('show');
    nameEl.classList.remove('pulse');
    posEl.classList.remove('show');
    photo.src = m.photo;
    photo.alt = m.name;

    /* text first: caption tag -> name -> position */
    card.classList.add('show');
    await wait(200);
    tagEl.textContent = m.tag || '';
    tagEl.classList.add('show');
    await wait(400);
    await typeName(m.name);
    nameEl.classList.add('pulse');
    await wait(200);
    posText.textContent = m.position;
    posEl.classList.add('show');
    await wait(600);

    /* then the photo lands with the thunder strike */
    await lightningStrike();
    frame.classList.add('reveal');
    ring.classList.add('reveal');
    await wait(2400);
  }

  frame.addEventListener('mousemove', (e) => {
    if (reduceMotion) return;
    const rect = frame.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    frame.style.transform = `scale(1.05) rotateX(${(-y / 10)}deg) rotateY(${(x / 10)}deg)`;
    frame.classList.add('hovered');
    ring.style.animationDuration = '2.5s';
  });
  frame.addEventListener('mouseleave', () => {
    frame.style.transform = '';
    frame.classList.remove('hovered');
    ring.style.animationDuration = '6s';
  });

  async function loop() {
    let idx = 0;
    while (true) {
      await playMember(members[idx]);
      card.classList.remove('show');
      await wait(500);
      if (Math.random() < 0.4) distantFlicker();
      idx = (idx + 1) % members.length;
      await wait(400);
    }
  }

  const introIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !stage.dataset.started) {
        stage.dataset.started = '1';
        loop();
      }
    });
  }, { threshold: 0.3 });
  introIO.observe(stage);

  setInterval(() => { if (Math.random() < 0.3) distantFlicker(); }, 5000);
})();

/* ---------- PARTICLES (canvas) ---------- */
if (!reduceMotion) {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let w, h, particles;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  function makeParticles() {
    const count = Math.min(80, Math.floor((w * h) / 18000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      a: Math.random() * 0.5 + 0.2
    }));
  }
  function loop() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,229,255,${p.a})`;
      ctx.shadowColor = 'rgba(0,229,255,0.8)';
      ctx.shadowBlur = 4;
      ctx.fill();
    });
    requestAnimationFrame(loop);
  }
  resize(); makeParticles(); loop();
  window.addEventListener('resize', () => { resize(); makeParticles(); });
}
