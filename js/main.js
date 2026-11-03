/* =========================================================
   Emily Chiam portfolio: main.js
   1  Data (links and projects)          9  Carousel inside a step
   2  Theme: day / night                10  Screenshot viewer (lightbox)
   3  Sky: mouse easing                 11  Contact links, copy email
   4  Sparkles                           -  Music
   5  Layers that arrive one at a time  12  Header, progress, back to top
   6  Typing line                        -  Mobile menu
   7  The staircase of steps            13  Nav highlight
   8  The scroll line                   14  Year
   ========================================================= */
(() => {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;
  root.classList.add('js');

  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mouseUser = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const smooth = (v) => v * v * (3 - 2 * v);
  const pad2 = (n) => String(n).padStart(2, '0');
  const ASSETS = 'assets/projects/';


  /* =========================================================
     1. DATA. Everything you will want to edit is in this block.
     ========================================================= */

  /* Your links. */
  const PROFILE = {
    email: '104000@siswa.unimas.my',
    github: 'https://github.com/EmilyC00',
    linkedin: 'https://www.linkedin.com/in/emily-chaim-ee-wen'
  };

  /* Lines for the typing effect on the home page. */
  const ROLES = [
    'exploring creative ideas',
    'building interactive projects',
    'creating things that inspire',
    'bringing imagination to life'
  ];

  /* Projects. */
  const projects = [
    { id: 'sdg3', cat: 'desktop', title: 'SDG 3 Wellness Engine',
      sub: 'A Java Swing learning app for UN Sustainable Development Goal 3',
      desc: 'Type your name and the session belongs to you. Read the SDG 3 targets, work through a learning module, take a timed twenty-question quiz with stars and badges, then revise with flash cards. Results feed a leaderboard, so a whole class can play it together.',
      points: ['Name entry that carries through to the results and the leaderboard', 'Home hub: Learning Unit, Quiz and Flash Cards', 'Scrolling overview of the SDG 3 targets, such as Target 3.1 on maternal mortality', 'Paged learning modules with Previous and Next', 'Timed 20-question quiz with multiple-choice and true/false questions', 'Results with stars and badges, plus a leaderboard saved to a file', 'Ten flash cards with Show Answer and Hide Answer'],
      tags: ['Java', 'Swing', 'Interfaces', 'File I/O'], type: 'Desktop app', tools: 'Java, Swing',
      link: 'https://github.com/EmilyC00/SDG3-WellnessEngine',
      folder: 'sdg3-quiz-app',
      shots: ['Welcome screen: enter your name to begin', 'Home hub with Learning Unit, Quiz and Flash Cards', 'SDG 3 targets overview with a card on maternal mortality', 'Learning module with page controls', 'Timed quiz question with four answers and a countdown', 'Results: 19 out of 20, five stars and the Master Scholar badge', 'Leaderboard', 'Flash card, question side', 'Flash card, answer side'] },

    { id: 'art1', cat: 'ui-ux', title: 'Sarawak ART App, Ver 1',
      sub: 'Public transport mobile app, UI/UX case study',
      desc: 'A mobile app concept for Kuching’s ART (Autonomous Rapid Transit). It follows a rider from first launch to boarding: setting up an account, finding a route, buying a ticket and getting help on the way.',
      points: ['Account flow: welcome, register, forgot password with an OTP code, new password and confirmation', 'Location permission screen with Allow and Ask me later', 'Home screen with a search box and bottom navigation for Home, Route, Tickets and Profile', 'Route search with suggested options showing time and price, then step-by-step navigation', 'Line overview with next train times and a full station timetable', 'Ticket purchase with a QR e-ticket that can be saved or shared', 'Profile, settings, accessibility options and an Emergency SOS button'],
      tags: ['UI/UX', 'User flows', 'Prototype', 'Accessibility'], type: 'Mobile app design', tools: 'Figma',
      figma: 'https://www.figma.com/proto/sLASCgrWv1hvTqHsthE08s/TMT-2713-Human-Computer-Interaction---Assignment-3?node-id=212-159&p=f&viewport=-4907%2C197%2C0.33&t=4hwBVGJ6UtweWMsI-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=212%3A159&show-proto-sidebar=1&page-id=0%3A1',
      folder: 'art-app-v1',
      shots: ['Account setup and password reset: eight app screens', 'Home map, route search and live navigation', 'Line map, line details and station timetable', 'Ticket selection, passenger details, payment and the QR e-ticket', 'Profile, settings and the Emergency SOS button'] },

    { id: 'art2', cat: 'ui-ux', title: 'Sarawak ART App, Ver 2',
      sub: 'A second take with a gold theme, built around the map',
      desc: 'A redesign of the same app that puts an interactive map at the centre. Riders can see the Red, Green and Blue ART lines, filter nearby places, find the closest station and book a ticket.',
      points: ['Interactive map with the three ART lines and station markers', 'Place filters for malls, markets, attractions, hospitals and schools', 'Search results that list stations and places with distance labels', 'Nearest-station suggestion with walking time and which line to take', 'Ticket booking with the fare, then a digital ticket', 'Accessibility settings: high contrast, text size, voice navigation and colour-blind modes'],
      tags: ['UI/UX', 'Interactive map', 'Gold theme', 'Accessibility'], type: 'Mobile app design', tools: 'Figma',
      figma: 'https://www.figma.com/proto/hPwjDmrZ3k6cUIwG5VZcGQ/TMT-2073---Project?node-id=154-197&viewport=-1070%2C197%2C0.53&t=AnwRQW40sjtpvAOM-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=154%3A197&show-proto-sidebar=1&page-id=0%3A1',
      folder: 'art-app-v2',
      shots: ['Welcome, location permission and the home map', 'Side menu and category filters on the map', 'Place and station details', 'Line maps and line information for Red, Green and Blue', 'Search and route suggestions', 'Ticket booking and the digital ticket', 'Accessibility settings in light and dark'] },

    { id: 'deepsea', cat: 'graphics', title: 'Deep Sea Cleaner',
      sub: 'An underwater submarine shooter about cleaning up the ocean',
      desc: 'Steer a submarine with the arrow keys, fire torpedoes with Space and clear the sea of trash without harming marine life. Two levels rise in difficulty, and the music can be toggled and the volume adjusted.',
      points: ['Instruction screen with the controls, the mission and the levels', 'Arrow keys to move, Space to fire, P to pause, ESC for the menu, Q to quit', 'Level 1 Shallow Waters (15 trash) and Level 2 Deep Ocean (30 trash)', 'Music toggle on M and volume on + and −, shown in the status line', 'On-screen score, level and trash counter'],
      tags: ['C++', 'OpenGL', 'GLUT', 'SDL2_mixer'], type: 'Game', tools: 'C++, OpenGL, GLUT, SDL2_mixer',
      link: 'https://github.com/EmilyC00/DeepSeaCleaner',
      folder: 'deep-sea-cleaner',
      shots: ['Instruction screen: controls, mission and levels', 'Gameplay: a submarine clearing floating trash'] },

    { id: 'collab', cat: 'cli', title: 'Smart Student Team Platform',
      sub: 'A role-based team collaboration system for the command line',
      desc: 'Students, team leaders and lecturers each log in to their own numbered menu. Team leaders manage teams, tasks, discussions and meetings, give feedback and generate a team report.',
      points: ['Login and register menu with demo accounts for a student, a team leader and a lecturer', 'Team leader dashboard with eight options', 'Team management: view teams, track progress, create a team, invite and remove members', 'Task management: view tasks, update status, add comments and file attachments', 'Discussions and meetings: view and send messages, schedule meetings', 'Generated team report with overall progress and each member’s contribution'],
      tags: ['Python', 'Inheritance', 'Polymorphism', 'Encapsulation'], type: 'Command-line system', tools: 'Python, OOP',
      link: 'https://github.com/EmilyC00/SmartStudentTeamCollaborationPlatform',
      folder: 'smart-student-team',
      shots: ['Main menu and login', 'Team leader dashboard', 'Team management', 'Team discussions', 'Task management', 'Meetings', 'Generated team report'] },

    { id: 'paint', cat: 'graphics', title: 'Simple Paint Program',
      sub: '2D drawing program with OpenGL and GLUT, TMT2033 Assignment 1',
      desc: 'A drawing application controlled from a right-click menu. Choose a drawing mode, a colour, a point size and a line width, then draw, undo, redo or clear. A status bar always shows the current settings.',
      points: ['Modes: point, line, line loop, triangle, rectangle and circle, wireframe or filled', 'Eight colours, with a swatch showing the current one', 'Adjustable point size and line width', 'Shortcuts: C to clear, Z to undo, Y to redo, X to exit', 'Status bar with the latest action, point size and line width'],
      tags: ['C++', 'OpenGL', 'GLUT', 'Undo / redo'], type: 'Drawing program', tools: 'C++, OpenGL, GLUT',
      link: 'https://github.com/EmilyC00/SimplePaintProgram',
      folder: 'simple-paint',
      shots: ['A drawing made in the program', 'Drawing modes and shapes', 'Colour menu', 'Point size', 'Line width'] },

    { id: 'cipher', cat: 'desktop', title: 'String Encoder',
      sub: 'A Java Swing text encoder, group assignment',
      desc: 'Type some text and the program counts the non-space characters, works out a shift from a hidden group key and shows the encoded result. Letters wrap around the alphabet, digits wrap from 0 to 9 and spaces are left alone.',
      points: ['Shift derived from a hash of a group identifier plus the number of non-space characters', 'Letters and digits wrap separately; spaces stay unchanged', 'Input validation, an Encode button and a Clear button', 'Result panel with the character count, the final shift and the encoded text'],
      tags: ['Java', 'Swing', 'String processing', 'hashCode()'], type: 'Desktop app', tools: 'Java, Swing',
      link: 'https://github.com/EmilyC00/StringEncoder',
      folder: 'string-encoder',
      shots: ['The encoder window with its result panel'] }
  ];

  const FILTERS = [['all', 'All'], ['ui-ux', 'UI / UX'], ['desktop', 'Desktop'], ['graphics', 'Graphics'], ['cli', 'CLI']];


  /* =========================================================
     2. Theme: day / night
     ========================================================= */
  const themeBtn = $('#themeBtn');

  function setTheme(mode) {
    root.dataset.theme = mode;
    themeBtn.setAttribute('aria-label', mode === 'night' ? 'Switch to day mode' : 'Switch to night mode');
    $('meta[name="theme-color"]').setAttribute('content', mode === 'night' ? '#171e46' : '#cfe0f2');
    try { localStorage.setItem('ec-theme', mode); } catch (e) { /* storage blocked: fine */ }
  }
  let savedTheme = 'day';
  try { savedTheme = localStorage.getItem('ec-theme') || 'day'; } catch (e) { /* storage blocked: fine */ }
  setTheme(savedTheme === 'night' ? 'night' : 'day');
  themeBtn.addEventListener('click', () => setTheme(root.dataset.theme === 'night' ? 'day' : 'night'));


  /* =========================================================
     3. Sky: mouse easing
     ========================================================= */
  const sky = $('#sky');
  const hero = $('#home');
  const motion = { x: 0, y: 0, tx: 0, ty: 0, running: false };

  function paintMouse() {
    motion.x += (motion.tx - motion.x) * 0.07;
    motion.y += (motion.ty - motion.y) * 0.07;
    const mx = motion.x.toFixed(3);
    const my = motion.y.toFixed(3);
    [sky, hero].forEach((el) => { el.style.setProperty('--mx', mx); el.style.setProperty('--my', my); });
    if (Math.abs(motion.tx - motion.x) > 0.001 || Math.abs(motion.ty - motion.y) > 0.001) requestAnimationFrame(paintMouse);
    else motion.running = false;
  }
  function wake() { if (!motion.running) { motion.running = true; requestAnimationFrame(paintMouse); } }

  if (mouseUser && !calm) {
    addEventListener('mousemove', (e) => {
      motion.tx = (e.clientX / innerWidth - 0.5) * 2;
      motion.ty = (e.clientY / innerHeight - 0.5) * 2;
      wake();
    }, { passive: true });
    document.addEventListener('mouseleave', () => { motion.tx = 0; motion.ty = 0; wake(); });
  }

 /* =========================================================
     Sheep: a little bounce when you tap one          ← 插入这里
     ========================================================= */
  const sheepEls = $$('.sheep');
  sheepEls.forEach((sheep) => {
    const trigger = () => {
      sheep.classList.remove('is-bouncing');
      void sheep.offsetWidth;
      sheep.classList.add('is-bouncing');
    };
    sheep.addEventListener('click', trigger);
    sheep.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger();
      }
    });
    sheep.addEventListener('animationend', () => {
      sheep.classList.remove('is-bouncing');
    });
  });

  /* =========================================================
     4. Sparkles: a few slow stars drifting over the sky
     ========================================================= */
  (function sparkles() {
    const box = $('#sparkles');
    if (!box || calm) return;
    const marks = ['✦', '✧', '·', '✦', '✧'];
    for (let i = 0; i < 30; i++) {
      const s = document.createElement('span');
      s.className = 'sparkle';
      s.textContent = marks[i % marks.length];
      s.style.left = `${(i * 37 + (i % 5) * 11) % 97}%`;
      s.style.top = `${(i * 53 + (i % 7) * 13) % 94}%`;
      s.style.fontSize = `${7 + (i % 4) * 5}px`;
      s.style.setProperty('--dur', `${6 + (i % 8) * 1.4}s`);
      s.style.setProperty('--delay', `${-(i * 1.7) % 9}s`);
      s.style.setProperty('--peak', String(0.35 + (i % 4) * 0.16));
      box.appendChild(s);
    }
  })();


  /* =========================================================
     5. Layers that arrive one at a time (the About details)
     ========================================================= */
  const rvItems = $$('[data-rv]').map((el) => ({
    el,
    lag: (Number(getComputedStyle(el).getPropertyValue('--i')) || 0) * 0.006
  }));

  function updateLayers() {
    const vh = innerHeight;
    const line = vh * 1.2;
    rvItems.forEach(({ el, lag }, i) => {
      const top = rvBox[i] - scrollY;
      if (top === undefined) return;
      const p = clamp((line - top - lag * vh) / (vh * 0.46), 0, 1);
      el.style.setProperty('--p', smooth(p).toFixed(3));
    });
  }


  /* =========================================================
     6. Typing line
     ========================================================= */
  const typed = $('#typed');
  if (typed && !calm) {
    let word = 0, chars = 0, deleting = false;
    const tick = () => {
      const text = ROLES[word];
      chars += deleting ? -1 : 1;
      typed.textContent = text.slice(0, chars);
      let wait = deleting ? 36 : 70;
      if (!deleting && chars === text.length) { deleting = true; wait = 1600; }
      else if (deleting && chars === 0) { deleting = false; word = (word + 1) % ROLES.length; wait = 280; }
      setTimeout(tick, wait);
    };
    setTimeout(tick, 700);
  }

  // the web fonts arrive after the first paint and move the text around
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => { measure(); onScroll(); });
  }


  /* =========================================================
     7. The staircase of steps
     ========================================================= */
  const worksBox = $('#works');
  const filterBox = $('#filters');
  const emptyMsg = $('#workEmpty');

  const repoUrl = (p) => p.link || '';

  function stepHTML(p, k) {
    const base = `${ASSETS}${p.folder}`;
    const id = `work-${p.id}`;
    const drift = k <= 3 ? k * 14 : (6 - k) * 14;
    const thumbs = p.shots.map((cap, i) => `
        <button class="shot" type="button" data-i="${i + 1}" aria-label="Show screenshot ${i + 1}: ${cap}">
          <img src="${base}/${pad2(i + 1)}.webp" alt="" loading="lazy" decoding="async"><span>${pad2(i + 1)}</span>
        </button>`).join('');
    const dots = p.shots.map((cap, i) => `<button class="carousel__dot" type="button" data-i="${i + 1}" aria-label="Screenshot ${i + 1}"></button>`).join('');
    const facts = [['Type', p.type], ['Tools', p.tools], p.role ? ['Role', p.role] : null].filter(Boolean)
      .map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('');
    const figma = p.figma
      ? `<a class="btn" href="${p.figma}" target="_blank" rel="noopener noreferrer"><svg class="ico" aria-hidden="true"><use href="#i-figma"/></svg> View Figma prototype <span aria-hidden="true">↗</span><span class="sr-only">(opens in a new tab)</span></a>`
      : '';
    const github = repoUrl(p)
      ? `<a class="btn" href="${repoUrl(p)}" target="_blank" rel="noopener noreferrer"><svg class="ico" aria-hidden="true"><use href="#i-github"/></svg> View code on GitHub <span aria-hidden="true">↗</span><span class="sr-only">(opens in a new tab)</span></a>`
      : '';
    return `
      <div class="step ${k % 2 === 0 ? 'step--left' : 'step--right'}" data-k="${k}" data-cat="${p.cat}" id="${id}" style="--drift:${drift}px">
        <button class="step__star" type="button" data-go="${k}" aria-label="Jump to ${p.title}" title="${p.title}">✦</button>
        <article class="work">
          <h3 class="w-h">
            <button class="work__toggle" type="button" aria-expanded="false" aria-controls="${id}-body">
              <span class="w-no" aria-hidden="true">${pad2(k + 1)}</span>
              <span class="w-thumb"><img src="${base}/cover.webp" alt="" loading="lazy" decoding="async"></span>
              <span class="w-copy"><span class="w-title">${p.title}</span><span class="w-sub">${p.sub}</span><span class="w-meta">${p.type} · ${p.tools}</span></span>
              <span class="w-plus" aria-hidden="true"></span>
            </button>
          </h3>
          <div class="work__drop" id="${id}-body"><div class="work__clip"><div class="work__pad">
            <div class="w-media">
              <div class="carousel" data-project="${p.id}">
                <div class="carousel__stage">
                  <img class="carousel__img" src="${base}/cover.webp" alt="Cover of ${p.title}" loading="lazy" decoding="async">
                  <button class="carousel__zoom" type="button" aria-label="Open ${p.title} screenshot in the full screen viewer"><svg class="ico" aria-hidden="true"><use href="#i-zoom"/></svg></button>
                  <button class="carousel__nav carousel__nav--prev" type="button" aria-label="Previous screen">‹</button>
                  <button class="carousel__nav carousel__nav--next" type="button" aria-label="Next screen">›</button>
                  <span class="carousel__count">1 / ${p.shots.length + 1}</span>
                </div>
                <div class="carousel__dots" role="group" aria-label="Choose a screen">${dots}</div>
                <p class="carousel__cap">Cover of ${p.title}</p>
                <div class="strip" role="group" aria-label="Screens from ${p.title}">${thumbs}</div>
              </div>
            </div>
            <div class="w-text">
              <p>${p.desc}</p>
              <p class="w-what">What it does</p>
              <ul class="leaf">${p.points.map((t) => `<li>${t}</li>`).join('')}</ul>
              <ul class="tags">${p.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
              <dl class="w-facts">${facts}</dl>
              ${figma || github ? `<div class="w-links">${figma}${github}</div>` : ''}
            </div>
          </div></div></div>
        </article>
      </div>`;
  }

  worksBox.innerHTML = projects.map(stepHTML).join('');
  const steps = $$('.step', worksBox);

  $$('.work__clip', worksBox).forEach((clip) => { clip.inert = true; });

  function setOpen(work, open) {
    work.classList.toggle('is-open', open);
    $('.work__toggle', work).setAttribute('aria-expanded', String(open));
    $('.work__clip', work).inert = !open;
    requestAnimationFrame(measure);
  }

  function scrollToStep(step) {
    if (!step) return;
    const r = step.getBoundingClientRect();
    const anchorOffset = Math.min(r.height * 0.35, 150);
    const target = Math.max(0, scrollY + r.top + anchorOffset - innerHeight * 0.62);
    scrollTo({ top: target, behavior: calm ? 'auto' : 'smooth' });
  }

  worksBox.addEventListener('click', (e) => {
    const toggle = e.target.closest('.work__toggle');
    if (toggle) {
      const work = toggle.closest('.work');
      setOpen(work, !work.classList.contains('is-open'));
      return;
    }
    const star = e.target.closest('.step__star');
    if (star) scrollToStep(steps[Number(star.dataset.go)]);
  });

  // category filter
  FILTERS.forEach(([key, label], i) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip';
    chip.dataset.filter = key;
    chip.textContent = label;
    chip.setAttribute('aria-pressed', String(i === 0));
    filterBox.appendChild(chip);
  });
  filterBox.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    $$('.chip', filterBox).forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
    let shown = 0;
    steps.forEach((s) => {
      const hit = chip.dataset.filter === 'all' || s.dataset.cat === chip.dataset.filter;
      s.hidden = !hit;
      if (hit) shown++;
    });
    emptyMsg.hidden = shown > 0;
    requestAnimationFrame(measure);
  });

  // open a row from the address, e.g. index.html#work-sdg3
  function openFromHash() {
    const target = location.hash ? document.getElementById(location.hash.slice(1)) : null;
    const work = target && target.querySelector('.work');
    if (work) setOpen(work, true);
  }
  openFromHash();
  addEventListener('hashchange', openFromHash);


  /* =========================================================
     8. The scroll line: the steps rise and fold away with the scroll
     ========================================================= */
  let litStep = -1;
  let stepBox = [];
  let rvBox = [];

  function measure() {
    stepBox = steps.map((s) => {
      if (s.hidden) return null;
      const r = s.getBoundingClientRect();
      return { top: r.top + scrollY, h: r.height };
    });
    rvBox = rvItems.map(({ el }) => el.getBoundingClientRect().top + scrollY);
  }

  function updateSteps() {
    const vh = innerHeight;
    const line = vh * 0.2;
    const span = vh * 2.0;
    let best = -1, bestP = 0;

    steps.forEach((step, i) => {
      const m = stepBox[i];
      if (!m) return;
      const anchor = m.top - scrollY + Math.min(m.h * 0.35, 150);
      const p = Math.pow(smooth(clamp(1 - Math.abs(anchor - line) / span, 0, 1)), 0.78);
      step.style.setProperty('--p', p.toFixed(3));
      step.style.setProperty('--sp', clamp(1 - Math.abs(anchor - line) / (span * 2.8), 0, 1).toFixed(3));
      if (p > bestP) { bestP = p; best = i; }
    });

    if (best !== litStep) {
      litStep = best;
      steps.forEach((s, i) => s.classList.toggle('is-lit', i === best));
    }
  }


  /* =========================================================
     9. Carousel inside a step: arrows, dots, swipe, keyboard
     ========================================================= */
  const carousels = new Map();

  function slideList(p) {
    const base = `${ASSETS}${p.folder}`;
    return [{ src: `${base}/cover.webp`, cap: `Cover of ${p.title}` },
      ...p.shots.map((cap, i) => ({ src: `${base}/${pad2(i + 1)}.webp`, cap }))];
  }

  function setSlide(box, i) {
    const state = carousels.get(box);
    const n = state.slides.length;
    const at = (i + n) % n;
    const s = state.slides[at];
    state.at = at;
    $('.carousel__img', box).src = s.src;
    $('.carousel__img', box).alt = s.cap;
    $('.carousel__count', box).textContent = `${at + 1} / ${n}`;
    $('.carousel__cap', box).textContent = s.cap;
    $$('.carousel__dot', box).forEach((d, di) => d.classList.toggle('is-on', di === at));
    $$('.shot', box).forEach((t, ti) => t.classList.toggle('is-on', ti + 1 === at));
  }

  $$('.carousel', worksBox).forEach((box) => {
    const p = projects.find((x) => x.id === box.dataset.project);
    carousels.set(box, { slides: slideList(p), at: 0, project: p });
    $('.carousel__dots', box).insertAdjacentHTML('afterbegin',
      '<button class="carousel__dot is-on" type="button" data-i="0" aria-label="Cover"></button>');
    setSlide(box, 0);
  });

  worksBox.addEventListener('click', (e) => {
    const box = e.target.closest('.carousel');
    if (!box) return;
    const state = carousels.get(box);
    const nav = e.target.closest('.carousel__nav');
    const picked = e.target.closest('.carousel__dot, .shot');

    if (nav) setSlide(box, state.at + (nav.classList.contains('carousel__nav--next') ? 1 : -1));
    else if (picked) setSlide(box, Number(picked.dataset.i));
    else if (e.target.closest('.carousel__stage')) openLb(state.project, state.at, $('.carousel__zoom', box));
  });

  worksBox.addEventListener('keydown', (e) => {
    const box = e.target.closest('.carousel');
    if (!box || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return;
    e.preventDefault();
    setSlide(box, carousels.get(box).at + (e.key === 'ArrowRight' ? 1 : -1));
  });

  let swipeX = null;
  let swipeY = null;
  worksBox.addEventListener('touchstart', (e) => {
    if (!e.target.closest('.carousel__stage')) return;
    swipeX = e.touches[0].clientX;
    swipeY = e.touches[0].clientY;
  }, { passive: true });
  worksBox.addEventListener('touchmove', (e) => {
    if (swipeX === null) return;
    const dx = e.touches[0].clientX - swipeX;
    const dy = e.touches[0].clientY - swipeY;
    if (Math.abs(dy) > Math.abs(dx)) swipeX = null;
  }, { passive: true });
  worksBox.addEventListener('touchend', (e) => {
    if (swipeX === null) return;
    const startX = swipeX;
    swipeX = null;
    swipeY = null;
    const box = e.target.closest('.carousel');
    if (!box) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 48) setSlide(box, carousels.get(box).at + (dx < 0 ? 1 : -1));
  }, { passive: true });


  /* =========================================================
     10. Screenshot viewer (lightbox)
     ========================================================= */
  const lb = $('#lb');
  const lbImg = $('#lbImg');
  let lbSlides = [];
  let lbAt = 0;
  let lastTrigger = null;
  let lbTimer = null;

  function showSlide(i) {
    lbAt = (i + lbSlides.length) % lbSlides.length;
    lbImg.src = lbSlides[lbAt].src;
    lbImg.alt = lbSlides[lbAt].cap;
    $('#lbCap').textContent = lbSlides[lbAt].cap;
    $('#lbCount').textContent = `${lbAt + 1} / ${lbSlides.length}`;
    $('#lbPrev').hidden = $('#lbNext').hidden = lbSlides.length < 2;
  }
  function openLb(project, index, trigger) {
    lbSlides = slideList(project);
    lastTrigger = trigger;
    showSlide(index);
    clearTimeout(lbTimer);
    lb.hidden = false;
    requestAnimationFrame(() => lb.classList.add('open'));
    document.body.style.overflow = 'hidden';
    $('#lbClose').focus();
  }
  function closeLb() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    lbTimer = setTimeout(() => { lb.hidden = true; }, 340);
    if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus();
    lastTrigger = null;
  }
  $('#lbClose').addEventListener('click', closeLb);
  $('#lbPrev').addEventListener('click', () => showSlide(lbAt - 1));
  $('#lbNext').addEventListener('click', () => showSlide(lbAt + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') { closeLb(); return; }
    if (e.key === 'ArrowLeft') { showSlide(lbAt - 1); return; }
    if (e.key === 'ArrowRight') { showSlide(lbAt + 1); return; }
    if (e.key !== 'Tab') return;
    const items = $$('button', lb).filter((b) => b.offsetParent !== null);
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  let touchX = null;
  lb.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 55) showSlide(lbAt + (dx < 0 ? 1 : -1));
    touchX = null;
  }, { passive: true });


  /* =========================================================
     11. Contact links, copy email and toast
     ========================================================= */
  const toast = $('#toast');
  let toastTimer = null;
  function say(msg) {
    toast.textContent = msg;
    toast.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('on'), 2200);
  }
  $('#emailLink').href = `mailto:${PROFILE.email}`;
  const ghLink = $('#githubLink');
  if (PROFILE.github) { ghLink.href = PROFILE.github; ghLink.hidden = false; }
  const liLink = $('#linkedinLink');
  if (PROFILE.linkedin) liLink.href = PROFILE.linkedin; else liLink.parentElement.hidden = true;

  $('#copyBtn').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(PROFILE.email); say('Address copied'); }
    catch (err) { say(PROFILE.email); }
  });


  /* =========================================================
     Music: starts only when the visitor presses the button
     ========================================================= */
  const bgm = $('#bgm');
  const musicBtn = $('#musicBtn');
  bgm.volume = 0.35;

  musicBtn.addEventListener('click', async () => {
    const turnOn = bgm.paused;
    try {
      if (turnOn) await bgm.play(); else bgm.pause();
    } catch (err) {
      say('Music could not be played');
      return;
    }
    musicBtn.classList.toggle('is-on', turnOn);
    musicBtn.setAttribute('aria-pressed', String(turnOn));
    musicBtn.setAttribute('aria-label', turnOn ? 'Pause background music' : 'Play background music');
  });


  /* =========================================================
     12. Header, progress, back to top — and the scroll numbers
     ========================================================= */
  const header = $('#top');
  const bar = $('#progress');
  const toTop = $('#toTop');
  let queued = false;
  let lastY = scrollY;
  let velocity = 0;
  let velRAF = 0;

  function settle() {
    velocity *= 0.9;
    if (Math.abs(velocity) < 0.0025) {
      velocity = 0;
      velRAF = 0;
      sky.style.setProperty('--sv', '0');
      return;
    }
    sky.style.setProperty('--sv', velocity.toFixed(3));
    velRAF = requestAnimationFrame(settle);
  }

  function onScroll() {
    queued = false;
    const max = root.scrollHeight - innerHeight;
    bar.style.width = `${((max > 0 ? clamp(scrollY / max, 0, 1) : 0) * 100).toFixed(2)}%`;
    header.classList.toggle('is-stuck', scrollY > 40);
    toTop.classList.toggle('on', scrollY > innerHeight * 0.7);
    if (!calm) {
      sky.style.setProperty('--sp', clamp(scrollY / innerHeight, 0, 1).toFixed(4));
      velocity = velocity * 0.84 + clamp((scrollY - lastY) / 80, -1, 1) * 0.16;
      lastY = scrollY;
      sky.style.setProperty('--sv', velocity.toFixed(3));
      if (!velRAF) velRAF = requestAnimationFrame(settle);
    }
    updateSteps();
    updateLayers();
  }
  addEventListener('scroll', () => {
    if (!queued) { queued = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  addEventListener('resize', () => { measure(); onScroll(); });
  addEventListener('load', () => { measure(); onScroll(); });
  toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: calm ? 'auto' : 'smooth' }));


  /* =========================================================
     Mobile menu: the burger opens the nav as a dropdown
     ========================================================= */
  const burger = $('#burger');
  const nav = $('#nav');

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  burger.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  addEventListener('resize', () => { if (innerWidth > 720) setMenu(false); });


  /* =========================================================
     13. Nav highlight
     ========================================================= */
  const links = $$('.nav a');
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => {
          if (a.getAttribute('href') === `#${entry.target.id}`) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach((s) => spy.observe(s));
  }


  /* 14. Year */
  $('#year').textContent = new Date().getFullYear();

  /* draw the first frame straight away */
  measure();
  onScroll();
})();