# Veritas Organisation — Company Website

> **Truth, Delivered.**  
> Official web presence for Veritas Organisation Pte. Ltd. — a performance-driven B2B/B2C sales company based in Singapore, specialising in energy, utilities, telecommunications, and facilities management.

---

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white&labelColor=20232A)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=flat-square&logo=reactrouter&logoColor=white)

---

## Overview

The Veritas Organisation website is a modern, responsive marketing site built with React and Tailwind CSS v4. It features a scroll-aware glassmorphism header, a full-screen hero section with device-specific imagery, and a clean corporate design language anchored in deep purple and white.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| UI Framework | React | 19 |
| Language | TypeScript | ~6.0 |
| Build Tool | Vite | 8 |
| Styling | Tailwind CSS | 4 |
| Routing | React Router DOM | 7 |
| Linter | oxlint | latest |

---

## Project Structure

```
veritas/
├── public/
├── src/
│   ├── assets/
│   │   └── images/
│   │       ├── veritas_landscape_logo.png        # Standard logo
│   │       ├── veritas_landscape_logo_white.png  # White logo (used in header)
│   │       ├── veritas-logo-square.jfif          # Square variant
│   │       ├── hero_web.jpg                      # Desktop hero image
│   │       └── hero_web_mobile.jpg               # Mobile hero image
│   ├── pages/
│   │   ├── components/
│   │   │   ├── Header.tsx                        # Scroll-aware glassmorphism header
│   │   │   └── Footer.tsx                        # Site footer
│   │   └── Home.tsx                              # Home page
│   ├── App.tsx                                   # Router root
│   ├── App.css
│   ├── index.css                                 # Tailwind import + global font
│   └── main.tsx                                  # React entry point
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js `v18+`
- npm or any compatible package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd veritas

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

The dev server starts at `http://localhost:5173` with hot module replacement.

### Build

```bash
npm run build
```

Output is placed in `dist/`. Preview the production build with:

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Pages

### `/` — Home

The landing page. Composed of:

- **Hero Section** — Full-screen, device-aware background image with a dark overlay gradient, headline, body copy, dual CTA buttons, and a stats strip.
- **Card Section** — Placeholder two-column layout reserved for upcoming content.

---

## Components

### `Header`

A fixed, scroll-aware navigation bar.

- **Stationary state** — Fully transparent background; white logo with drop shadow for contrast over the hero image.
- **Scrolled state** — Dark glassmorphism (`bg-black/50 backdrop-blur-2xl`) activates after `24px` of scroll with a subtle bottom border and shadow.
- **Mobile menu** — Hamburger icon animates to an X; dropdown panel inherits the same glass background. Opening the menu also activates the glass state on the bar itself.
- **CTA button** — Solid purple, square-cornered, consistent with the design system.

### `Footer`

Standard site footer with logo and navigation links. Awaiting full design treatment.

---

## Design System

| Token | Value | Usage |
|---|---|---|
| Primary accent | `purple-700` `#7C3AED` | Buttons, highlights |
| Gradient | `purple-400 → fuchsia-400` | Headline accent |
| Background | Transparent / `black/50` | Header states |
| Body font | Google Sans | All text |
| Text primary | `white` | Headings, nav |
| Text secondary | `white/60` | Body copy, labels |
| Border subtle | `white/10` | Dividers, glass edges |

**Glass morphism recipe:**
```css
background: rgba(0, 0, 0, 0.50);
backdrop-filter: blur(24px);
border-bottom: 1px solid rgba(255, 255, 255, 0.10);
```

---

## Responsive Breakpoints

| Breakpoint | Width | Notes |
|---|---|---|
| `default` (mobile) | `< 768px` | Single column, bottom-anchored hero content, `hero_web_mobile.jpg` |
| `md` | `≥ 768px` | Two-column layout, `hero_web.jpg`, full desktop nav |
| `lg` | `≥ 1024px` | Wider padding (`px-10`) |
| `xl` | `≥ 1280px` | Larger headline (`text-[3.6rem]`) |

---

## Roadmap

- [ ] Footer — full redesign to match header design language
- [ ] Products page
- [ ] Careers page
- [ ] About Us page
- [ ] Contact page / form
- [ ] Hero left-column content (reserved in current layout)
- [ ] Scroll-reveal animations on sections

---

## License

Private. All rights reserved — Veritas Organisation Pte. Ltd.
