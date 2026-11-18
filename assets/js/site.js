(function () {
  "use strict";

  // Draft content (marked data-draft) is hidden by default in CSS.
  // It only shows away from the live domain, so placeholders never reach visitors.
  if (!/(^|\.)waruinduati\.com$/.test(location.hostname)) {
    document.documentElement.classList.add("show-drafts");
  }

  // Year in the footer
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile menu
  var toggle = document.querySelector(".nav-toggle");
  var list = document.getElementById("nav-list");
  if (toggle && list) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Close" : "Menu";
      list.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    list.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  // Portfolio preview: swipe or scroll sideways, or use the buttons.
  var track = document.getElementById("viewer-track");
  if (track) {
    var slides = Array.prototype.slice.call(track.children);
    var countEl = document.getElementById("viewer-count");
    var labelEl = document.getElementById("viewer-label");
    var prevBtn = document.querySelector('.viewer-btn[data-dir="-1"]');
    var nextBtn = document.querySelector('.viewer-btn[data-dir="1"]');
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var index = 0, ticking = false;

    var nearest = function () {
      var x = track.scrollLeft, best = 0, bestDist = Infinity;
      slides.forEach(function (s, i) {
        var d = Math.abs(s.offsetLeft - x);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      // At the far end the last slides may never reach the left edge
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 2) best = slides.length - 1;
      return best;
    };
    var render = function () {
      index = nearest();
      countEl.textContent = (index + 1) + " of " + slides.length;
      labelEl.textContent = slides[index].getAttribute("data-label") || "";
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === slides.length - 1;
    };
    var go = function (i) {
      i = Math.max(0, Math.min(slides.length - 1, i));
      track.scrollTo({ left: slides[i].offsetLeft, behavior: reduce ? "auto" : "smooth" });
    };
    [prevBtn, nextBtn].forEach(function (b) {
      b.addEventListener("click", function () { go(index + Number(b.getAttribute("data-dir"))); });
    });
    track.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () { render(); ticking = false; });
    }, { passive: true });
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1); }
    });
    render();
  }

  // Contact form: validate, then send in the background so visitors stay on the page.
  // Messages are delivered by FormSubmit to consult@waruinduati.com.
  var form = document.getElementById("contact-form");
  if (!form) return;

  var status = form.querySelector(".form-status");
  var button = form.querySelector('button[type="submit"]');
  var fallback = 'Your message didn’t send. Please try again, or email <a href="mailto:consult@waruinduati.com">consult@waruinduati.com</a>.';

  var checks = [
    { id: "f-name", test: function (v) { return v.trim().length > 0; } },
    { id: "f-email", test: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); } },
    { id: "f-message", test: function (v) { return v.trim().length > 0; } }
  ];

  function validate() {
    var firstBad = null;
    checks.forEach(function (c) {
      var field = document.getElementById(c.id);
      var error = document.getElementById(c.id + "-error");
      var ok = c.test(field.value);
      field.setAttribute("aria-invalid", ok ? "false" : "true");
      if (error) {
        error.hidden = ok;
        if (ok) field.removeAttribute("aria-describedby");
        else field.setAttribute("aria-describedby", error.id);
      }
      if (!ok && !firstBad) firstBad = field;
    });
    if (firstBad) firstBad.focus();
    return !firstBad;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.textContent = "";
    if (!validate()) return;

    var data = {};
    new FormData(form).forEach(function (value, key) { data[key] = value; });

    button.disabled = true;
    button.textContent = "Sending…";

    fetch("https://formsubmit.co/ajax/consult@waruinduati.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(data)
    })
      .then(function (res) { return res.json().then(function (body) { return { ok: res.ok, body: body }; }); })
      .then(function (r) {
        if (r.ok && String(r.body.success) === "true") {
          form.reset();
          status.textContent = "Thank you. Your message is on its way, and I’ll be in touch soon.";
        } else {
          status.innerHTML = fallback;
        }
      })
      .catch(function () { status.innerHTML = fallback; })
      .then(function () {
        button.disabled = false;
        button.textContent = "Send message";
      });
  });
})();
