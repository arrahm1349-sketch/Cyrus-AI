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
- **Set up Formspree for the "book a free consultation" email-capture forms**
  (the quick email field on the home page and the Services/About CTA
  banners): sign up free at https://formspree.io, create a form, and replace
  every `https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID` in `index.html`,
  `services.html`, and `about.html` with your real endpoint. Until you do
  this, submissions gracefully fall back to opening the visitor's own email
  client via `mailto:` — it works, but relies on them hitting send, so real
  leads will go missing. Swapping in the endpoint (2 minutes) fixes that.
- The main contact form (`contact.html`) still uses `mailto:` only. To
  collect those submissions directly too, wire it to Formspree (or another
  backend) the same way.
- Update social/company links in the footer if you add them.
- The logo artwork was cropped/keyed from a supplied raster image. If you
  later get a vector version, swap `assets/logo-icon.png` and
  `assets/logo-lockup.png` for it to keep edges crisp at large sizes.
