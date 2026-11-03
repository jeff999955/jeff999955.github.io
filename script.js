// Jeff Tseng portfolio. Behaviour carried over from the Aligned NVS project page: compare slider, theme switch,
// collapsing section nav, scroll reveals, TL;DR word light-up and the hero fade. All motion stops under reduced motion.
var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
function ease(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }

// Compare slider
var sliders = [];
document.querySelectorAll("[data-compare]").forEach(function (el) {
  var input = el.querySelector("input"), after = el.querySelector(".after"), bar = el.querySelector(".bar");
  function set() { var p = input.value; after.style.clipPath = "inset(0 0 0 " + p + "%)"; bar.style.left = p + "%"; }
  input.addEventListener("input", set); set();
  sliders.push({ input: input, set: set });
});

// TL;DR: wrap each word so it can light up
var tldr = document.querySelector("[data-words]"), words = [];
function wrapWords(el) {
  Array.prototype.slice.call(el.childNodes).forEach(function (node) {
    if (node.nodeType === 1 && node.tagName !== "B") { wrapWords(node); return; }
    if (node.nodeType !== 3) return;
    var frag = document.createDocumentFragment();
    node.textContent.split(/(\s+)/).forEach(function (part) {
      if (!part) return;
      if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
      var s = document.createElement("span"); s.className = "w"; s.textContent = part; frag.appendChild(s); words.push(s);
    });
    el.replaceChild(frag, node);
  });
}
if (tldr) wrapWords(tldr);

// Reveal on scroll; stagger children of reveal groups
document.querySelectorAll(".reveal-group").forEach(function (g) {
  Array.prototype.forEach.call(g.children, function (c, i) { c.style.setProperty("--i", i); });
});
var pending = Array.prototype.slice.call(document.querySelectorAll(".reveal, .reveal-group"));

// Theme switch: light | auto | dark. Auto drops data-theme so the CSS follows the device; the choice is remembered per browser.
// It opens on mouse hover or keyboard focus; on touch, the first tap opens it and the second picks a mode.
var themeSwitch = document.querySelector("[data-theme-switch]");
if (themeSwitch) {
  var switchNav = themeSwitch.closest(".localnav"), modes = ["light", "auto", "dark"], lastPointer = "mouse", closeTimer = 0;
  var modeBtns = modes.map(function (m) { return themeSwitch.querySelector('[data-mode="' + m + '"]'); });
  var openSwitch = function (on) { clearTimeout(closeTimer); themeSwitch.classList.toggle("open", on); switchNav.classList.toggle("theme-open", on); };
  var showMode = function (m) {
    modeBtns.forEach(function (b, i) { var on = modes[i] === m; b.setAttribute("aria-checked", on); b.tabIndex = on ? 0 : -1; });
  };
  var setMode = function (m) {
    if (m === "auto") document.documentElement.removeAttribute("data-theme"); else document.documentElement.setAttribute("data-theme", m);
    try { if (m === "auto") localStorage.removeItem("theme"); else localStorage.setItem("theme", m); } catch (e) {}
    showMode(m);
    document.dispatchEvent(new Event("themechange"));
  };
  var currentMode = function () { return document.documentElement.getAttribute("data-theme") || "auto"; };
  showMode(currentMode());

  themeSwitch.addEventListener("pointerdown", function (e) { lastPointer = e.pointerType; });
  themeSwitch.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") openSwitch(true); });
  themeSwitch.addEventListener("pointerleave", function (e) { if (e.pointerType === "mouse") openSwitch(false); });
  themeSwitch.addEventListener("focusin", function (e) { if (e.target.matches(":focus-visible")) openSwitch(true); });
  themeSwitch.addEventListener("focusout", function (e) { if (!themeSwitch.contains(e.relatedTarget)) openSwitch(false); });
  document.addEventListener("pointerdown", function (e) { if (!themeSwitch.contains(e.target)) openSwitch(false); });
  themeSwitch.addEventListener("click", function (e) {
    var b = e.target.closest("[data-mode]");
    if (!b) return;
    if (!themeSwitch.classList.contains("open")) { openSwitch(true); return; }
    setMode(b.getAttribute("data-mode"));
    if (e.detail && lastPointer !== "mouse") closeTimer = setTimeout(function () { openSwitch(false); }, 450);
  });
  themeSwitch.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { openSwitch(false); return; }
    var d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!d) return;
    var i = (modes.indexOf(currentMode()) + d + modes.length) % modes.length;
    setMode(modes[i]); openSwitch(true); modeBtns[i].focus(); e.preventDefault();
  });
}

// Local nav: border once stuck, current section highlighted
var nav = document.querySelector(".localnav"), hero = document.querySelector(".hero");
var navLinks = Array.prototype.slice.call(document.querySelectorAll(".localnav ul a"));
var sections = navLinks.map(function (a) { return document.querySelector(a.getAttribute("href")); });

// Sections menu: fold the links into the three-line button whenever they do not fit on one row.
var navInner = nav.querySelector(".localnav-inner"), menuBtn = nav.querySelector(".menu-toggle"), menuList = nav.querySelector("ul");
function setMenu(open) { nav.classList.toggle("menu-open", open); menuBtn.setAttribute("aria-expanded", open); }
function fitNav() {
  nav.classList.remove("collapsed");
  var collapse = navInner.scrollWidth > navInner.clientWidth;
  nav.classList.toggle("collapsed", collapse);
  if (!collapse) setMenu(false);
}
fitNav();
window.addEventListener("resize", fitNav);
if (document.fonts) document.fonts.ready.then(fitNav);
menuBtn.addEventListener("click", function () { setMenu(!nav.classList.contains("menu-open")); });
menuList.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("pointerdown", function (e) { if (!nav.contains(e.target)) setMenu(false); });
nav.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && nav.classList.contains("menu-open")) { setMenu(false); menuBtn.focus(); }
});

// Scroll-linked effects
var heroInner = document.querySelector("[data-hero]");
var rows = Array.prototype.slice.call(document.querySelectorAll("[data-steps] > li"));
var ticking = false;
function update() {
  ticking = false;
  var vh = window.innerHeight, y = window.scrollY;
  nav.classList.toggle("stuck", y > hero.offsetHeight - 60);
  var current = -1;
  sections.forEach(function (s, i) { if (s && s.getBoundingClientRect().top < vh * 0.4) current = i; });
  navLinks.forEach(function (a, i) { a.setAttribute("aria-current", i === current); });
  pending = pending.filter(function (el) {
    if (el.getBoundingClientRect().top > vh * 0.88) return true;
    el.classList.add("in"); return false;
  });
  if (reduce) return;
  // Hero fades back as it scrolls away
  var hp = clamp(y / hero.offsetHeight);
  heroInner.style.opacity = 1 - ease(hp) * 1.1;
  heroInner.style.transform = "translateY(" + (-hp * 60) + "px) scale(" + (1 - hp * 0.06) + ")";
  // About: words light up as the paragraph rises to the middle of the screen
  if (tldr) {
    var tr = tldr.getBoundingClientRect(), mid = nav.offsetHeight + (vh - nav.offsetHeight - tr.height) / 2 + vh * 0.04;
    var tp = clamp((vh * 0.95 - tr.top) / Math.max(1, vh * 0.95 - mid));
    var lit = Math.round(tp * words.length);
    words.forEach(function (s, i) { s.classList.toggle("on", i < lit); });
  }
  // Timeline rows light in turn
  rows.forEach(function (li) { li.classList.toggle("on", li.getBoundingClientRect().top < vh * 0.8); });
}
function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
update();
