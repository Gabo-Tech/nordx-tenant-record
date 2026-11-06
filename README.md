# Mietbericht Nordstrasse 70

Anonymous, bilingual (German and English) record of a former tenancy at **NordX – The NEXT Student Home**, Nordstrasse 70, 8006 Zürich, operated by **NextGen Properties GmbH**. People also search the same operator as NextGen, Next Generation, NextGeneration, Next-Gen, Next Gen, and Nord X.

The record starts with the Airbnb move-in around 19–20 November 2025 and the Untermietvertrag from 1 December 2025 to 30 September 2026. It includes the tenant’s own account of daily life before the August 2026 renovation, kept separate from the dated company emails, then the bathroom works, the hotels, the unanswered registered letter, and the Airbnb payment of EUR 1,817.22 (EUR 4,900 was requested). It is one former tenant’s account. It is not a website of NextGen Properties GmbH.

The page is static. `index.html` at the repository root is the whole site. There is no build step and no package install.

## Run it locally

From the repository root:

```bash
python3 -m http.server 8734
```

Open `http://127.0.0.1:8734/`. The language switch stores `de` or `en` in `localStorage` and accepts `?lang=de` or `?lang=en`.

## GitHub Pages

The site is meant to be served from the **root of branch `main`** (not from a bundler output).

1. Push the `main` branch.
2. In the repository on GitHub: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Set **Branch** to `main` and the folder to **`/ (root)`**. Save.
5. GitHub serves `index.html` at the site root. Unknown paths use `404.html`. `.nojekyll` stops Jekyll from ignoring files that start with `_` or processing the site.

**`/docs` instead of root:** GitHub Pages can also publish a `/docs` folder on `main`. This project keeps the site at the root. To use `/docs`, move `index.html`, `404.html`, `css/`, `js/`, `favicon.svg`, `robots.txt`, `sitemap.xml`, `llms.txt`, `humans.txt`, and `.nojekyll` into `docs/` and choose that folder in the Pages settings. Leave the folder choice on `/ (root)` if the files stay where they are.

After the Pages URL exists, you can replace the root-relative URLs in `sitemap.xml` (`<loc>` and the `hreflang` links) with absolute `https://…` URLs. Do not point them at nextgenproperties.ch. The page script sets the canonical URL and Open Graph URL from the address the browser is actually on.

Project sites (a URL with a repository name after the host) need the files served from that subpath. Root-absolute links such as `/css/site.css` then break. Publishing from a user or organization site, or from a custom domain at the host root, matches this layout.

## What is not on this site

No tenant name, no contact form, no newsletter, no analytics, no comments. The language preference in `localStorage` is the only thing the page writes. Google Fonts, cdnjs, and OpenStreetMap tiles are loaded from those providers; that is disclosed in the footer.

## Files

| File | Role |
| --- | --- |
| `index.html` | The record, German and English |
| `404.html` | Missing-page note |
| `css/site.css` | Layout |
| `js/site.js` | Language switch, map |
| `favicon.svg` | Icon |
| `.nojekyll` | Disables Jekyll on GitHub Pages |
| `robots.txt` | Crawl rules |
| `sitemap.xml` | Sitemap |
| `llms.txt` | Short factual summary for language models |
| `humans.txt` | Colophon |
