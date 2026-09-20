# Cyrus AI — Website

Marketing website for Cyrus AI, an AI advisory practice helping SMEs and larger
organisations identify, implement, and scale AI solutions.

## Structure

Plain HTML/CSS/JS — no build step, no dependencies. Works on any static host.

```
index.html      Home
services.html   Services & engagement models
about.html      About / values / who we help
contact.html    Contact form + details
css/style.css   Shared styles
js/main.js      Nav toggle, scroll reveal, contact form handling
assets/logo.svg Logo mark (used as favicon)
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
- Swap the testimonial and stats on the home page for real figures once
  available.
- Update social/company links in the footer if you add them.
