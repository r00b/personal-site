# AGENTS.md

## Project Snapshot

- Personal portfolio site built with Gatsby 3 and React 17.
- The active homepage is a simple static landing page assembled from `Layout`, `Seo`, `Header`, and `Avatar`.
- The `Aircraft` live-flight widget still exists in the codebase but is commented out in [`src/pages/index.jsx`](/Users/rsteilberg/Developer/Repositories/personal-site/src/pages/index.jsx). This is intentional because the flight-tracker Raspberry Pi at the house is not currently running. Treat it as dormant infrastructure, not a broken homepage feature.

## Tooling And Runtime

- Package manager: `npm` with lockfile committed as `package-lock.json`.
- Pinned runtime via Volta in [`package.json`](/Users/rsteilberg/Developer/Repositories/personal-site/package.json):
  - Node `16.13.0`
  - npm `8.1.4`
- Main scripts:
  - `npm run dev`
  - `npm run build`
  - `npm run serve`
  - `npm run clean`
  - `npm run format`

## Important Structure

- [`gatsby-config.js`](/Users/rsteilberg/Developer/Repositories/personal-site/gatsby-config.js): site metadata and plugin setup.
- [`gatsby-browser.js`](/Users/rsteilberg/Developer/Repositories/personal-site/gatsby-browser.js): imports global styles.
- [`src/pages/index.jsx`](/Users/rsteilberg/Developer/Repositories/personal-site/src/pages/index.jsx): homepage composition.
- [`src/components/layout.jsx`](/Users/rsteilberg/Developer/Repositories/personal-site/src/components/layout.jsx): full-screen background image wrapper using `gatsby-background-image`.
- [`src/components/avatar.jsx`](/Users/rsteilberg/Developer/Repositories/personal-site/src/components/avatar.jsx): portrait image using deprecated `gatsby-image`.
- [`src/components/seo.jsx`](/Users/rsteilberg/Developer/Repositories/personal-site/src/components/seo.jsx): `react-helmet` metadata and canonical URL logic.
- [`src/components/aircraft.jsx`](/Users/rsteilberg/Developer/Repositories/personal-site/src/components/aircraft.jsx): dormant WebSocket-driven live aircraft feed.
- [`src/styles`](/Users/rsteilberg/Developer/Repositories/personal-site/src/styles): Sass plus Tailwind 2 utilities.

## Repo-Specific Gotchas

- The README is stale. It still describes the aircraft tracker as homepage behavior even though that component is currently disabled on purpose while the Raspberry Pi feed is offline.
- Image handling is on deprecated Gatsby APIs:
  - `gatsby-image`
  - `gatsby-background-image`
  - GraphQL `fluid` fragments
- Sass is wired through `gatsby-plugin-sass` with `implementation: require("node-sass")`. `node-sass` is legacy and will likely need replacement with `sass` during major upgrades.
- `Layout` adds a `resize` listener directly during render-time browser checks and never removes it. If touching that file, prefer moving the viewport-height logic into an effect with cleanup.
- `Seo` mutates `siteMetadata` at runtime when `siteUrl` is empty. This works, but it is a little brittle and worth simplifying if SEO work happens.
- `Aircraft` depends on `GATSBY_SERVE1090_URL` and `GATSBY_SERVE1090_TOKEN` environment variables. Those are only relevant if the widget is re-enabled.

## Verification

- For routine UI edits, run:
  - `npm run build`
- For local manual review, run:
  - `npm run dev`
- If you re-enable or modify `Aircraft`, verify:
  - the site still builds without SSR errors
  - the browser does not crash when the WebSocket env vars are absent
  - the loadable `react-text-transition` path still hydrates correctly

## Upgrade Risk Areas

- Gatsby 3 -> latest Gatsby is not a simple version bump here.
- Expect follow-up work around:
  - Node 16 -> newer supported Node
  - React 17 -> React 18
  - `gatsby-image` -> `gatsby-plugin-image`
  - `gatsby-background-image` replacement or removal
  - `node-sass` -> `sass`
  - Tailwind 2/PostCSS config updates if the dependency refresh is broad

## Editing Guidance

- Keep changes minimal unless the task is explicitly a modernization pass.
- Preserve the current visual feel unless asked to redesign it.
- If you are touching old Gatsby/image code, check whether a small cleanup is safer than preserving deprecated APIs.
