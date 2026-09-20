# Cyrus AI — Website

Marketing website for Cyrus AI, an AI advisory practice helping SMEs and larger
organisations identify, implement, and scale AI solutions.

## Structure

Plain HTML/CSS/JS — no build step, no dependencies. Works on any static host.

```
index.html               Home — four-phase slide deck
services.html            Services & engagement models
about.html               About / values / who we help
contact.html             Contact form + details
css/style.css            Shared styles
js/main.js               Nav toggle, scroll reveal, slide deck, contact form
assets/logo-icon.png     Icon mark — used in the nav bar and favicon
assets/logo-lockup.png   Icon + wordmark — used in the footer
assets/favicon.png       Favicon (square-padded icon)
```

## Running locally

Any static file server works, e.g.:

```
python3 -m http.server 8080
```

Then open http://localhost:8080

## Deploying

Push this folder to any static host — GitHub Pages, Netlify, Vercel, Cloudflare
Pages — with no build command and `.` (or `/`) as the publish directory.

## Before going live

- Replace the placeholder email `hello@cyrusai.co` in `contact.html`,
  `index.html`, `services.html`, and `about.html` with your real domain email.
- The contact form currently opens the visitor's email client via `mailto:`
  (no backend). To collect submissions directly, wire `js/main.js` up to a
  form backend (e.g. Formspree, a serverless function, or your CRM's API).
- Update social/company links in the footer if you add them.
- The logo artwork was cropped/keyed from a supplied raster image. If you
  later get a vector version, swap `assets/logo-icon.png` and
  `assets/logo-lockup.png` for it to keep edges crisp at large sizes.
