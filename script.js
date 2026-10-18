/* =========================================================
   Miguel León — landing · i18n + movimiento
   ========================================================= */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function store(key, val) {
    try {
      if (val === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, val);
    } catch (e) { return null; }
  }

  /* ---------------- Traducciones ---------------- */
  // El HTML ya trae el español; aquí se guarda una copia para volver a él.
  var EN = {
    'nav.about': 'About',
    'nav.work': 'Experience',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'hero.status': 'Open to new opportunities',
    'hero.lead': '<strong>Java Backend</strong> developer. I build APIs, batch processes and integrations that <em>don’t fall over</em> — and the frontend when it’s needed.',
    'hero.f1k': 'Now',
    'hero.f2k': 'Stack',
    'hero.f3k': 'Mode',
    'hero.f3v': 'Remote / hybrid',
    'hero.f4k': 'English',
    'hero.scroll': 'scroll',
    'about.statement': 'I work where stability is non-negotiable: batch processes that move thousands of industrial-property files every day, mission-critical SOAP services and a platform that more than five hundred people open every morning. I like to understand why something breaks before I touch a single line.',
    'about.p1': 'At Inetum since March 2025 for the Spanish Patent and Trademark Office (OEPM): first as an intern and, since July, as a junior developer owning migrations and production incidents.',
    'about.p2': 'Outside work I keep building: a music player in Rust, a prediction engine in Python, a job-application tracker in Spring Boot… I use Claude Code daily as a copilot: knowing how to get the most out of AI is part of the craft.',
    'stats.s1': 'daily users on ALTERA WEB',
    'stats.s2': 'batch processing errors',
    'stats.s3': 'faster Oracle queries',
    'stats.s4': 'apps migrated from Java 8 to 17',
    'work.j1.when': 'Jul 2025 — now',
    'work.j1.title': 'Junior Software Developer',
    'work.j1.org': 'Inetum · Miguelturra (hybrid) · Client: OEPM',
    'work.j1.b1': 'Fixed critical incidents in Java/COBOL batch pipelines on Linux that were blocking official notifications: −25% processing errors.',
    'work.j1.b2': 'Led the technical migration of Linux servers from a 2006 distribution to 2025, adding CI/CD practices: +35% stability.',
    'work.j1.b3': 'Migrated 5+ enterprise applications from Java 8 to Java 17 (Maven, deprecated APIs, Spring Boot 3 compatibility).',
    'work.j1.b4': 'Tuned SQL and stored procedures on Oracle: +40% faster response times in production.',
    'work.j1.b5': 'Maintain mission-critical SOAP services (Java 8, Apache CXF, WSDL contracts) with JUnit and SonarQube under Scrum.',
    'work.case.tag': 'Featured project',
    'work.case.intro': 'Document digitisation system replacing the legacy .NET platform. Full-stack, in production, 500+ users a day.',
    'work.case.c1': 'Spring Boot 3.5 + Java 17. REST API with 18+ endpoints: document lifecycle, tasks, full audit trail and bulk upload to the document manager.',
    'work.case.h2': 'Security',
    'work.case.c2': 'Keycloak 26 (OAuth2/JWT) with RBAC for 6 roles, integrated with the corporate Active Directory.',
    'work.case.h3': 'Integrations',
    'work.case.c3': 'SOAP JAX-WS 4 (UCM, Platanot, Platarec), PDF stamping and processing, OCR with tesseract.js and JasperReports.',
    'work.case.c4': 'React 19 + TypeScript, Vite, Tailwind CSS 4 and Radix UI. Scanning, viewing and editing documents in the browser.',
    'work.j2.when': 'Mar 2025 — Jul 2025',
    'work.j2.title': 'Software Developer Intern',
    'work.j2.org': 'Inetum · Remote · Client: OEPM',
    'work.j2.b1': 'Java backend components for SOAP and REST services with 99.9% data integrity in high-availability environments.',
    'work.j2.b2': '25+ JUnit unit test cases and technical-debt tracking with SonarQube.',
    'work.j3.when': 'Sep 2023 — Jun 2025',
    'work.j3.title': 'Higher Diploma in Cross-Platform App Development',
    'projects.title1': 'Things I’ve',
    'projects.title2': 'built',
    'p.hiretrack': 'Production-grade REST API to track job applications, interviews and offers. Born while I was job hunting.',
    'p.bet': 'Statistical football prediction engine (Dixon-Coles, Elo) for Europe’s top 4 leagues, with a visualiser, bankroll tracking and local-AI analysis.',
    'p.rust': 'Winamp-inspired desktop music player: FLAC/MP3/OGG, cover art, playlists that reload themselves.',
    'p.blip': 'Intermediate RESTful API in .NET 10 with a layered (SOLID) architecture, xUnit tests and Render deployment, consumed by a chatbot.',
    'p.crawler': 'A retro “operating system” in the browser: Playwright crawler, music player, live telemetry and charts.',
    'p.paste': 'Minimal static pastebin, published on GitHub Pages.',
    'projects.more': 'Everything on GitHub',
    'stack.label': 'Toolbox',
    'stack.lang': 'Languages',
    'stack.data': 'Data & security',
    'stack.ways': 'How I work',
    'stack.waysv': 'Scrum · code review · TDD · root cause before patch · AI as a copilot',
    'stack.langs': 'Languages spoken',
    'stack.langsv': 'Spanish native · English B2 (Cambridge First, 163)',
    'contact.kicker': 'Have a project or a role in mind?',
    'contact.big': 'Let’s talk',
    'contact.copy': 'copy',
    'contact.copied': 'copied ✓',
    'contact.cv': 'Download CV',
    'footer.made': 'Handmade — with Claude Code as copilot',
    'footer.top': 'Back to top ↑'
  };
  var META = {
    es: { title: 'Miguel León — Desarrollador Backend Java', cv: 'assets/CV_Miguel_Leon_ES.pdf', copied: 'copiado ✓' },
    en: { title: 'Miguel León — Java Backend Developer', cv: 'assets/CV_Miguel_Leon_EN.pdf', copied: EN['contact.copied'] }
  };

  var nodes = document.querySelectorAll('[data-i18n], [data-i18n-html]');
  var ES = {};
  nodes.forEach(function (el) {
    var k = el.getAttribute('data-i18n') || el.getAttribute('data-i18n-html');
    if (!(k in ES)) ES[k] = el.hasAttribute('data-i18n-html') ? el.innerHTML : el.textContent;
  });

  var lang = root.getAttribute('lang') === 'en' ? 'en' : 'es';

  function applyLang(l) {
    lang = l;
    var dict = l === 'en' ? EN : ES;
    nodes.forEach(function (el) {
      var html = el.hasAttribute('data-i18n-html');
      var k = el.getAttribute(html ? 'data-i18n-html' : 'data-i18n');
      if (!(k in dict)) return;
      if (html) el.innerHTML = dict[k];
      else el.textContent = dict[k];
    });
    root.setAttribute('lang', l);
    document.title = META[l].title;
    document.getElementById('cv-link').setAttribute('href', META[l].cv);
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === l));
    });
    splitWords();
  }

  document.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () {
      var l = b.getAttribute('data-lang');
      if (l === lang) return;
      store('ml-lang', l);
      if (reduce) return applyLang(l);
      document.body.classList.add('swapping');
      setTimeout(function () {
        applyLang(l);
        document.body.classList.remove('swapping');
      }, 250);
    });
  });

  /* ---------------- Tema ---------------- */
  document.querySelector('.theme').addEventListener('click', function () {
    var t = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', t);
    store('ml-theme', t);
  });

  /* ---------------- Hero: letras ---------------- */
  document.querySelectorAll('.split').forEach(function (el, li) {
    var text = el.firstChild.nodeValue;
    el.firstChild.remove();
    var frag = document.createDocumentFragment();
    text.split('').forEach(function (c, i) {
      var s = document.createElement('span');
      s.className = 'ch';
      s.textContent = c;
      s.style.animationDelay = (0.15 + li * 0.18 + i * 0.05) + 's';
      frag.appendChild(s);
    });
    el.appendChild(frag);
  });

  /* ---------------- Frase "sobre mí": palabra a palabra ---------------- */
  var statement = document.querySelector('.about__statement');
  function splitWords() {
    var words = statement.textContent.trim().split(/\s+/);
    statement.innerHTML = words.map(function (w) { return '<span class="w">' + w + '</span>'; }).join(' ');
    onScroll();
  }

  /* ---------------- Reveal + contadores ---------------- */
  function countUp(el) {
    var to = +el.getAttribute('data-to');
    if (reduce) { el.textContent = to; return; }
    var t0 = null, dur = 1600;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 4)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        e.target.querySelectorAll('.count').forEach(countUp);
        io.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) {
      // Escalonado dentro de cada grupo
      var sibs = Array.prototype.filter.call(el.parentNode.children, function (c) { return c.classList.contains('reveal'); });
      el.style.setProperty('--d', (sibs.indexOf(el) % 6) * 0.08 + 's');
      io.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------------- Scroll: progreso + palabras ---------------- */
  var bar = document.querySelector('.progress');
  var ticking = false;
  function onScroll() {
    var h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = 'scaleX(' + (h > 0 ? scrollY / h : 0) + ')';
    var r = statement.getBoundingClientRect();
    var p = (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35);
    var ws = statement.querySelectorAll('.w');
    var n = reduce ? ws.length : Math.round(Math.max(0, Math.min(1, p)) * ws.length);
    ws.forEach(function (w, i) { w.classList.toggle('on', i < n); });
    ticking = false;
  }
  addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  addEventListener('resize', onScroll);

  /* ---------------- Cursor ---------------- */
  var cur = document.querySelector('.cursor');
  if (window.matchMedia('(hover: hover)').matches && !reduce) {
    var x = 0, y = 0, cx = 0, cy = 0;
    addEventListener('mousemove', function (e) { x = e.clientX; y = e.clientY; cur.classList.add('is-on'); });
    document.addEventListener('mouseleave', function () { cur.classList.remove('is-on'); });
    (function loop() {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      cur.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';
      requestAnimationFrame(loop);
    })();
    document.addEventListener('mouseover', function (e) {
      cur.classList.toggle('is-big', !!e.target.closest('a, button'));
    });
  }

  /* ---------------- Reloj de Madrid ---------------- */
  var clock = document.getElementById('clock');
  function tick() {
    try {
      clock.textContent = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' });
    } catch (e) { clock.textContent = ''; }
  }
  tick(); setInterval(tick, 15000);

  /* ---------------- Copiar email ---------------- */
  var copyBtn = document.querySelector('.copy');
  copyBtn.addEventListener('click', function () {
    var hint = copyBtn.querySelector('.copy__hint');
    var done = function () {
      hint.textContent = META[lang].copied;
      setTimeout(function () { hint.textContent = lang === 'en' ? EN['contact.copy'] : ES['contact.copy']; }, 1800);
    };
    if (navigator.clipboard) navigator.clipboard.writeText(copyBtn.getAttribute('data-email')).then(done, function () {});
  });

  /* ---------------- Hero: grafo de fondo ---------------- */
  // Nodos que derivan despacio; se unen con aristas cuando están cerca
  // y el ratón atrae ligeramente a los vecinos.
  (function graph() {
    var cv = document.querySelector('.hero__graph');
    if (!cv || !cv.getContext) return;
    var ctx = cv.getContext('2d');
    var hero = cv.parentNode;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, nodes = [], link = 150, rgb = '11,11,11';
    var mouse = { x: -9999, y: -9999 };
    var visible = true, raf = null;

    function readColor() {
      var c = getComputedStyle(root).getPropertyValue('--fg').trim();
      var m = c.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
      if (m) rgb = [m[1], m[2], m[3]].map(function (h) { return parseInt(h, 16); }).join(',');
    }

    function resize() {
      W = hero.clientWidth; H = hero.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      link = W < 600 ? 110 : 160;
      var target = Math.round(Math.min(90, Math.max(28, (W * H) / 16000)));
      while (nodes.length < target) {
        nodes.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
          r: Math.random() < 0.12 ? 2.6 : 1.4 + Math.random()
        });
      }
      nodes.length = target;
      if (reduce) draw();
    }

    function draw(dt) {
      dt = dt || 1; // dt en "frames de 60 fps": misma velocidad en cualquier monitor
      ctx.clearRect(0, 0, W, H);
      var i, j, a, b, dx, dy, d;
      for (i = 0; i < nodes.length; i++) {
        a = nodes[i];
        if (!reduce) {
          // atracción suave hacia el ratón
          dx = mouse.x - a.x; dy = mouse.y - a.y; d = Math.sqrt(dx * dx + dy * dy);
          if (d < 220 && d > 1) { a.vx += (dx / d) * 0.006 * dt; a.vy += (dy / d) * 0.006 * dt; }
          var f = Math.pow(0.995, dt); a.vx *= f; a.vy *= f;
          // velocidad mínima para que nunca se quede quieto
          var s = Math.sqrt(a.vx * a.vx + a.vy * a.vy);
          if (s < 0.08) { var g = Math.pow(1.05, dt); a.vx *= g; a.vy *= g; }
          a.x += a.vx * dt; a.y += a.vy * dt;
          if (a.x < -20) a.x = W + 20; else if (a.x > W + 20) a.x = -20;
          if (a.y < -20) a.y = H + 20; else if (a.y > H + 20) a.y = -20;
        }
        for (j = i + 1; j < nodes.length; j++) {
          b = nodes[j];
          dx = a.x - b.x; dy = a.y - b.y; d = dx * dx + dy * dy;
          if (d < link * link) {
            ctx.strokeStyle = 'rgba(' + rgb + ',' + (1 - Math.sqrt(d) / link) * 0.22 + ')';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      ctx.fillStyle = 'rgba(' + rgb + ',0.55)';
      for (i = 0; i < nodes.length; i++) {
        a = nodes[i];
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
      }
    }

    var last = 0;
    function loop(t) {
      t = t || performance.now();
      var dt = last ? Math.min((t - last) / (1000 / 60), 3) : 1;
      last = t;
      draw(dt);
      raf = visible ? requestAnimationFrame(loop) : null;
      if (!raf) last = 0;
    }

    readColor();
    resize();
    addEventListener('resize', resize);
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    hero.addEventListener('mouseleave', function () { mouse.x = mouse.y = -9999; });
    // Cambio de tema: recoger el nuevo color
    new MutationObserver(function () { readColor(); if (reduce) draw(); })
      .observe(root, { attributes: true, attributeFilter: ['data-theme'] });

    if (reduce) return;
    // No gastar CPU cuando el hero no se ve
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        visible = es[0].isIntersecting;
        if (visible && !raf) loop();
      }).observe(hero);
    }
    loop();
  })();

  applyLang(lang);
})();
