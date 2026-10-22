/* =========================================================
   Pooja Saka — Portfolio scripts
   Plain JavaScript, no libraries. Sections:
   1. PROJECTS data  (edit this to update project cards and links)
   2. Project card rendering
   3. Theme toggle
   4. Mobile menu
   5. Active-section highlighting + sticky nav border
   6. Reveal animations
   7. Copy-email button
   8. Hero background animation + editor line highlight
   ========================================================= */

/* ---------- 1. PROJECTS ----------
   To add links: paste the full URL between the quotes, e.g.
     github: "https://github.com/sakapooja/smart-health-pendant",
     demo:   "https://your-demo.netlify.app",
   Leave a link as "" and the card shows a dashed "link coming soon" label instead. */
const PROJECTS = [
  {
    title: "ML Enabled System for Detecting Harmful Speech",
    year: "2025",
    domain: "Machine Learning · NLP",
    problem:
      "Harmful speech needs to be identified quickly so it can be flagged, which is hard to do manually at scale.",
    built: [
      "Developed an NLP-based system that classifies harmful and non-harmful speech using machine learning and real-time speech analysis.",
      "Implemented TF-IDF feature extraction with Logistic Regression and Naive Bayes models to classify harmful and non-harmful speech."
    ],
    tech: ["Python", "Machine Learning", "NLP", "TF-IDF", "Logistic Regression", "Naive Bayes"],
    pipeline: [
      ["Speech input", "real-time analysis"],
      ["Text features", "TF-IDF vectors"],
      ["Classifiers", "Logistic Regression · Naive Bayes"],
      ["Prediction", "harmful / non-harmful"]
    ],
    github: "",
    demo: ""
  },
  {
    title: "Integrated Health Monitoring with Wearable Smart Pendant",
    year: "2025",
    domain: "IoT · Data Analysis",
    problem:
      "Hunger, thirst, falls and health emergencies can go unnoticed when a person is alone, delaying help from caregivers.",
    built: [
      "Designed an IoT-based smart health monitoring pendant for real-time detection of hunger, thirst, fall incidents and health emergencies.",
      "Implemented real-time alert and emergency notification features to support proactive healthcare and caregiver assistance.",
      "Integrated wearable sensors with Bluetooth/Wi-Fi connectivity for continuous health monitoring and remote data transmission."
    ],
    tech: ["IoT", "Wearable Sensors", "Bluetooth", "Wi-Fi", "Data Analysis"],
    pipeline: [
      ["Wearable sensors", "continuous monitoring"],
      ["Bluetooth / Wi-Fi", "remote data transmission"],
      ["Real-time detection", "hunger · thirst · falls · emergencies"],
      ["Caregiver alert", "emergency notification"]
    ],
    github: "",
    demo: ""
  },
  {
    title: "Child Threat Monitoring System Using IoT",
    year: "2024",
    domain: "IoT · Embedded",
    problem:
      "Parents and guardians need to know immediately when a child may be in danger, not after the fact.",
    built: [
      "Developed an IoT-based child safety monitoring system that uses sensors for real-time threat detection.",
      "Integrated alert mechanisms to provide instant notifications during emergencies."
    ],
    tech: ["IoT", "Arduino", "Embedded C / Python", "Sensors"],
    pipeline: [
      ["Sensors", "real-time readings"],
      ["Arduino", "embedded logic"],
      ["Threat detection", "check conditions"],
      ["Instant alert", "emergency notification"]
    ],
    github: "",
    demo: ""
  }
];

/* ---------- 2. Render project cards ---------- */
const ICON_GITHUB =
  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/></svg>';
const ICON_LIVE =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>';

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function linkHTML(url, label, icon, placeholder) {
  if (url && /^https?:\/\//.test(url)) {
    return `<a class="link-btn" href="${escapeHTML(url)}" target="_blank" rel="noopener">${icon}${label}</a>`;
  }
  return `<span class="link-placeholder" title="Add this link in script.js (PROJECTS list)">${placeholder}</span>`;
}

function renderProjects() {
  const list = document.getElementById("project-list");
  if (!list) return;
  list.innerHTML = PROJECTS.map((p, i) => {
    const stages = p.pipeline
      .map(([name, note], s) => {
        const last = s === p.pipeline.length - 1;
        return `<li class="stage${last ? " out" : ""}"><span class="stage-dot">${last ? "✓" : s + 1}</span><span class="stage-text"><b>${escapeHTML(name)}</b><small>${escapeHTML(note)}</small></span></li>`;
      })
      .join("");
    return `
    <article class="project reveal" aria-labelledby="proj-${i}">
      <div class="project-body">
        <div class="project-meta"><span class="project-year">${escapeHTML(p.year)}</span><span class="project-domain">${escapeHTML(p.domain)}</span></div>
        <h3 id="proj-${i}">${escapeHTML(p.title)}</h3>
        <p class="problem"><span>The problem</span>${escapeHTML(p.problem)}</p>
        <div class="group">
          <span class="label">What I built</span>
          <ul class="built">${p.built.map((b) => `<li>${escapeHTML(b)}</li>`).join("")}</ul>
        </div>
        <div class="group">
          <span class="label">Tech used</span>
          <ul class="chips">${p.tech.map((t) => `<li class="chip">${escapeHTML(t)}</li>`).join("")}</ul>
        </div>
        <div class="project-links">
          ${linkHTML(p.github, "View code", ICON_GITHUB, "GitHub repo · link coming soon")}
          ${linkHTML(p.demo, "Live demo", ICON_LIVE, "Live demo · link coming soon")}
        </div>
      </div>
      <div class="pipeline-wrap" aria-label="How it works">
        <span class="pipeline-title">How it works</span>
        <ol class="pipeline" style="list-style:none;margin:0;padding:0">${stages}</ol>
      </div>
    </article>`;
  }).join("");

  // Interactive: spotlight follows the cursor, pipeline steps light up in order on hover / focus
  list.querySelectorAll(".project").forEach((card) => {
    const stages = [...card.querySelectorAll(".stage")];
    let timer = null;
    const run = () => {
      clearInterval(timer);
      let k = 0;
      stages.forEach((s) => s.classList.remove("on"));
      timer = setInterval(() => {
        stages.forEach((s, j) => s.classList.toggle("on", j === k));
        k = (k + 1) % (stages.length + 1);
      }, 520);
    };
    const stop = () => { clearInterval(timer); stages.forEach((s) => s.classList.remove("on")); };
    card.addEventListener("mouseenter", run);
    card.addEventListener("mouseleave", stop);
    card.addEventListener("focusin", run);
    card.addEventListener("focusout", stop);
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });
}

/* ---------- 3. Theme toggle (remembers choice) ---------- */
function initTheme() {
  const root = document.documentElement;
  const btn = document.getElementById("theme-toggle");
  try {
    const saved = localStorage.getItem("ps-theme");
    if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  } catch (e) { /* storage blocked: use default */ }

  const current = () => {
    const attr = root.getAttribute("data-theme");
    if (attr) return attr;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  };
  const label = () => btn && btn.setAttribute("aria-label", current() === "dark" ? "Switch to light theme" : "Switch to dark theme");
  label();
  btn && btn.addEventListener("click", () => {
    const next = current() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("ps-theme", next); } catch (e) {}
    label();
  });
}

/* ---------- 4. Mobile menu ---------- */
function initMenu() {
  const btn = document.getElementById("menu-toggle");
  const links = document.getElementById("nav-links");
  if (!btn || !links) return;
  const setOpen = (open) => {
    links.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  btn.addEventListener("click", () => setOpen(!links.classList.contains("open")));
  links.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && links.classList.contains("open")) { setOpen(false); btn.focus(); } });
  document.addEventListener("click", (e) => { if (!e.target.closest(".nav")) setOpen(false); });
}

/* ---------- 5. Active section + nav border ---------- */
function initScrollSpy() {
  const nav = document.getElementById("nav");
  const navLinks = [...document.querySelectorAll(".nav-links a")];
  const map = new Map(navLinks.map((a) => [a.getAttribute("href").slice(1), a]));
  const sections = [...map.keys()].map((id) => document.getElementById(id)).filter((el) => el && !el.hidden);

  const onScroll = () => {
    nav && nav.classList.toggle("is-scrolled", window.scrollY > 8);
    const line = window.innerHeight * 0.35;
    let active = null;
    for (const s of sections) {
      if (s.getBoundingClientRect().top <= line) active = s.id;
    }
    // At the very bottom, highlight the last section
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) active = sections[sections.length - 1]?.id;
    navLinks.forEach((a) => {
      const on = a === map.get(active);
      a.classList.toggle("active", on);
      if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
}

/* ---------- 6. Reveal (content is visible without JS; this only adds motion) ---------- */
function initReveal() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;
  const items = [...document.querySelectorAll(".reveal")];
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  // Only animate items that start below the fold, so nothing visible ever blinks
  items.forEach((el) => { if (el.getBoundingClientRect().top > window.innerHeight) io.observe(el); });
}

/* ---------- 7. Copy email ---------- */
function toast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove("show"), 2200);
}
function initCopy() {
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const text = btn.getAttribute("data-copy");
      const fallback = () => {
        const el = document.getElementById("email-text");
        if (el) { const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
        toast("Email selected. Press Ctrl+C to copy");
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          btn.textContent = "Copied";
          toast("Email address copied");
          setTimeout(() => (btn.textContent = "Copy"), 1800);
        }).catch(fallback);
      } else fallback();
    });
  });
}

/* ---------- 8. Hero animation: a slow network of nodes (pauses off-screen) ---------- */
function initHeroCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let w = 0, h = 0, dpr = 1, nodes = [], raf = 0, visible = true;

  const color = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "#4d8dff";
  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(70, (w * h) / 18000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.4 + 0.6, v: Math.random() < 0.35
    }));
  };
  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    const blue = color("--blue"), violet = color("--violet");
    const max = 130;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
        if (d < max) {
          ctx.globalAlpha = (1 - d / max) * 0.22;
          ctx.strokeStyle = blue;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    nodes.forEach((n) => {
      ctx.globalAlpha = 0.65;
      ctx.fillStyle = n.v ? violet : blue;
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
    });
    ctx.globalAlpha = 1;
  };
  const step = () => {
    nodes.forEach((n) => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    });
    draw();
    if (visible) raf = requestAnimationFrame(step);
  };

  resize(); draw();
  window.addEventListener("resize", () => { resize(); draw(); });
  if (reduce) return;
  const io = new IntersectionObserver(([en]) => {
    visible = en.isIntersecting;
    cancelAnimationFrame(raf);
    if (visible) raf = requestAnimationFrame(step);
  });
  io.observe(canvas);
  // Re-read colours when the theme changes
  new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
}

/* Editor: gently step a highlight through the code lines */
function initEditor() {
  const lines = [...document.querySelectorAll("#code .ln")];
  if (!lines.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let i = 0;
  setInterval(() => {
    lines.forEach((l, j) => l.classList.toggle("hl", j === i));
    i = (i + 1) % lines.length;
    if (!lines[i].textContent.trim()) i = (i + 1) % lines.length;
  }, 1400);
}

/* ---------- Start ---------- */
function start() {
  renderProjects();
  initTheme();
  initMenu();
  initScrollSpy();
  initReveal();
  initCopy();
  initHeroCanvas();
  initEditor();
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
else start();
