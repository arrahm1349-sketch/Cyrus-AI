// Cyrus AI — shared site behaviour

document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Phase slide deck (home page)
  const stage = document.querySelector(".slide-stage");
  if (stage) {
    const slides = Array.from(stage.querySelectorAll(".slide"));
    const dots = Array.from(document.querySelectorAll(".slide-dot"));
    const prevBtn = document.querySelector(".slide-arrow.prev");
    const nextBtn = document.querySelector(".slide-arrow.next");
    const counter = document.querySelector(".slide-counter");
    let index = 0;

    function render() {
      slides.forEach((slide, i) => {
        slide.classList.toggle("is-active", i === index);
        slide.classList.toggle("is-prev", i < index);
      });
      dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
      if (counter) counter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
      if (prevBtn) prevBtn.disabled = index === 0;
      if (nextBtn) nextBtn.disabled = index === slides.length - 1;
    }

    function goTo(i) {
      index = Math.max(0, Math.min(slides.length - 1, i));
      render();
    }

    prevBtn?.addEventListener("click", () => goTo(index - 1));
    nextBtn?.addEventListener("click", () => goTo(index + 1));
    dots.forEach((dot, i) => dot.addEventListener("click", () => goTo(i)));

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") goTo(index + 1);
      if (e.key === "ArrowLeft") goTo(index - 1);
    });

    let touchStartX = null;
    stage.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener("touchend", (e) => {
      if (touchStartX === null) return;
      const delta = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) > 40) goTo(delta < 0 ? index + 1 : index - 1);
      touchStartX = null;
    }, { passive: true });

    render();
  }

  // Contact form (static site — no backend, so we confirm client-side
  // and hand off to the visitor's email client via mailto)
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const status = document.getElementById("form-status");
      const data = new FormData(form);
      const name = (data.get("name") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const message = (data.get("message") || "").toString().trim();

      if (!name || !email || !message) {
        showStatus(status, "Please fill in your name, email, and message.", "error", "form-status");
        return;
      }

      const subject = encodeURIComponent(`Enquiry from ${name} — Cyrus AI website`);
      const body = encodeURIComponent(
        `Name: ${name}\nCompany: ${data.get("company") || "-"}\nEmail: ${email}\n\n${message}`
      );

      window.location.href = `mailto:hello@cyrusai.co?subject=${subject}&body=${body}`;
      showStatus(status, "Opening your email client to send this enquiry…", "success", "form-status");
      form.reset();
    });
  }

  // Quick email-capture forms ("book a free consultation" CTAs).
  // Posts to Formspree so leads land in your inbox automatically; if the
  // endpoint isn't set up yet (or fails), falls back to mailto so no lead
  // is lost. Sign up free at https://formspree.io and replace the form
  // action below with your own endpoint to start collecting these directly.
  document.querySelectorAll("[data-consult-form]").forEach((quickForm) => {
    quickForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const status = quickForm.querySelector(".quick-capture-status");
      const submitBtn = quickForm.querySelector("button[type='submit']");
      const email = (new FormData(quickForm).get("email") || "").toString().trim();

      if (!email) {
        showStatus(status, "Please enter your email address.", "error", "quick-capture-status");
        return;
      }

      const originalLabel = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";

      try {
        const res = await fetch(quickForm.action, {
          method: "POST",
          body: new FormData(quickForm),
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error("form endpoint not ready");
        showStatus(status, "Thanks! We'll be in touch within one business day.", "success", "quick-capture-status");
        quickForm.reset();
      } catch (err) {
        const subject = encodeURIComponent("Free consultation request — Cyrus AI website");
        const body = encodeURIComponent(`Email: ${email}\n\nRequesting a free consultation.`);
        window.location.href = `mailto:hello@cyrusai.co?subject=${subject}&body=${body}`;
        showStatus(status, "Opening your email client to confirm your request…", "success", "quick-capture-status");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
    });
  });

  function showStatus(el, msg, type, baseClass) {
    if (!el) return;
    el.textContent = msg;
    el.className = `${baseClass} visible ${type}`;
  }
});
