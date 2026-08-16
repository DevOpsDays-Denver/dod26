# DevOpsDays Rockies — Main Conference Site

Static site for `devopsdaysrox.org`, covering the 2026 Denver event: dates, venue,
program shape, speakers/CFP, sponsor tiers, registration, and contact. No backend,
no build step — plain HTML/CSS/JS, ready for GitHub Pages.

## What's inside

```
devopsdaysrox-site/
├── index.html      One-page site: hero, about, program, speakers/CFP, sponsors, register, contact
├── style.css       Visual theme — topo-map palette (aspen gold, pine, alpine sky) with contour-line motifs
├── script.js       Mobile nav toggle
├── CNAME           Tells GitHub Pages this repo serves devopsdaysrox.org
└── README.md       This file
```

## The hidden CTF link

There's a small, low-contrast ▲ icon in the footer next to "Code of Conduct" and
"Privacy" that links to `https://ctf.devopsdaysrox.org` — that's the "Summit
Protocol" CTF from the other repo, tucked in rather than promoted on the main nav.
There's also a one-line HTML comment near it for anyone who views source. If you'd
rather make it easier or harder to find, just move it, restyle `.trail-marker` in
`style.css`, or drop it into a different section.

## Two sites, two repos, two DNS records

You now have two static sites that both live under `devopsdaysrox.org`:

| Site | Domain | Repo | CNAME file contents |
|---|---|---|---|
| Main conference site | `devopsdaysrox.org` (apex) | this repo | `devopsdaysrox.org` |
| Summit Protocol CTF | `ctf.devopsdaysrox.org` (subdomain) | the `ctf-game` repo | `ctf.devopsdaysrox.org` |

Each is its own GitHub repo with GitHub Pages enabled independently — GitHub Pages
serves one site per repo, so keep them separate rather than trying to nest the CTF
folder inside this repo.

### 1. Push each repo and enable Pages

For **this** repo:
1. Push `devopsdaysrox-site/` contents to the repo root of a new GitHub repository.
2. Repo → **Settings → Pages** → Source: your branch (e.g. `main`) and folder `/`.
3. Leave "Custom domain" as `devopsdaysrox.org` (GitHub reads it from the `CNAME`
   file already in the repo, or you can type it in and GitHub will add the file
   for you — don't do both, pick one).

For the **ctf-game** repo, repeat the same steps with `ctf.devopsdaysrox.org` as
the custom domain.

### 2. Point your DNS at GitHub Pages

At your domain registrar / DNS provider for `devopsdaysrox.org`, add:

**For the apex domain** (`devopsdaysrox.org` → main site) — four `A` records, all
on the root/`@` host, pointing at GitHub Pages' IPs:
```
A    @    185.199.108.153
A    @    185.199.109.153
A    @    185.199.110.153
A    @    185.199.111.153
```
(If your DNS provider supports `ALIAS`/`ANAME` records instead, you can use one
of those pointed at `<your-github-username>.github.io` rather than four A
records — either approach works.)

**For the CTF subdomain** (`ctf.devopsdaysrox.org` → CTF site) — one `CNAME`
record:
```
CNAME    ctf    <your-github-username>.github.io
```

**Optional — `www` redirect:** if you also want `www.devopsdaysrox.org` to work,
add `CNAME www <your-github-username>.github.io` and set "Enforce HTTPS" plus a
redirect preference in the main repo's Pages settings.

DNS changes can take anywhere from a few minutes to ~24 hours to propagate. Once
GitHub detects the correct DNS, it issues a free HTTPS certificate automatically —
check the "Enforce HTTPS" box in each repo's Pages settings once that's available
(it's greyed out until DNS resolves correctly).

### 3. Verify

- `https://devopsdaysrox.org` → main conference site
- `https://ctf.devopsdaysrox.org` → Summit Protocol CTF
- Footer ▲ link on the main site → jumps to the CTF

## Design notes

- **This year's theme is blue** — the palette (`--aspen`, `--pine`, `--sky`, etc. in `style.css`) was
  recolored from the original gold/green "topo map" look to a blue-dominant scheme. The variable *names*
  stayed the same to keep the diff small; only the hex values changed.
- **Keynote spotlight** — a dedicated section right after the hero highlights Brent Chapman (this year's
  opening keynote) with a large photo, talk title, and bio, styled after how devopsdays.pe highlights its
  keynote. Update the photo `src`, name, talk title/link, and bio in the `<section class="keynote">` block
  when next year's keynote is announced.
- **Schedule is a live pretalx embed** — `#program` no longer hand-lists sessions. It uses pretalx's
  official embeddable widget (`<pretalx-schedule>` + the widget script), the same approach
  `devopsdays.org/events/2026-denver/program` uses. This means the schedule on this page updates
  automatically whenever the real schedule changes — no manual edits needed here. See "Updating the
  schedule embed" below if you ever need to point it at a different event.
- **Sponsor logos and a few links are hotlinked directly from `devopsdays.org`** (e.g.
  `https://devopsdays.org/sponsors/m/minimus_hu_....webp`), since that event page is confirmed to stay
  live. This means logos update for free if the source updates them, but it also means this site depends
  on that domain staying up and those exact paths not changing. If you'd rather not depend on an external
  host, download the images and swap the `<img src>` paths for local files in a new `assets/` folder.
- **Speaker photos** are pulled directly from each speaker's profile page on the pretalx instance
  (`talks.devopsdays.org`); three speakers (Abby Malson, Rainu Ittycheriah, Sophia Solomon) didn't upload a
  photo, so those cards fall back to initials.
- **Logo** is the Colorado-square graphic from `https://devopsdays.org/events/2025-denver/colorado_square.png`,
  hotlinked in the nav, footer, and favicon.

## Updating the schedule embed

The `<pretalx-schedule>` tag and its widget script both reference this event specifically:

```html
<pretalx-schedule event-url="https://talks.devopsdays.org/dodroxrox26/" locale="en" style="--pretalx-clr-primary: #1c6fac"></pretalx-schedule>
```

`dodroxrox26` is this year's pretalx event slug. Next year, swap that slug (and the noscript fallback link
right below it) for whatever slug next year's event uses — you'll find it in that year's pretalx URL. The
`--pretalx-clr-primary` style variable tints the widget to match the site's blue accent; change it if the
theme changes again.

## Content you'll want to keep current

- **Dates/venue** — hero section and the "At a glance" card in `#about`.
- **Sponsors** — `#sponsors` section, one `<div class="tier">` per level, using real
  sponsor logos hotlinked from `devopsdays.org`. Add new sponsors as `<a class="sponsor-badge">`
  entries; move Platinum/Bronze from "open" to filled in once you sign sponsors there.
- **Speakers** — `#speakers` has the confirmed roster (with talk titles and short bios) plus
  a second group for speakers whose session time isn't on the public schedule yet. Move a
  speaker's card up once their slot is confirmed, and update the CFP panel at the bottom once
  next year's call opens.
- **Schedule** — `#program` now embeds the live pretalx widget, so it stays current automatically.
  Nothing to maintain here unless the event slug changes (see "Updating the schedule embed" above).
- **Registration link** — "Get your ticket" buttons point at the real ticket shop
  (`tickets.devopsdays.org/devopsdays-denver/2026`).
- **Contact email/socials** — `#contact` section; the social links point at the real
  LinkedIn, Twitter/X, YouTube, mailing list, and Slack invite.

## Local preview

No build step needed — open `index.html` directly in a browser, or serve the
folder locally:

```
cd devopsdaysrox-site
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.
