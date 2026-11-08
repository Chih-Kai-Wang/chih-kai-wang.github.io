# Chih-Kai Wang — portfolio

This is the source of my portfolio site and of my GitHub profile README. Both are rendered from one file, `src/data/projects.json`, which holds every project record, its status, the profile text and the six pinned projects. The site lists each record together with the raw JSON it was rendered from, so a visitor can check that the page says what the file says.

The page is presented as a single terminal session: each section is a command that types itself and prints its output. That is a visual choice. The content underneath is ordinary Markdown and JSON.

[Live portfolio](https://chih-kai-wang.github.io/) · [Profile](https://github.com/Chih-Kai-Wang) · [CV](https://chih-kai-wang.github.io/Chih-Kai-Wang-CV.pdf)

## Local development

Use Node 24. Run `npm ci`, then `npm run dev`. `npm run build` checks that the generated files are current, type-checks, and writes the prerendered site to `dist/`; `npm run preview` serves that output. `npm run check` runs the same checks without building.

The stack is Preact, Vite, TypeScript and plain CSS with custom properties; there is no CSS framework. The page follows `prefers-color-scheme`, and `t` or the ◐ button switches the theme and remembers the choice. On the keyboard, `/` or ⌘K opens the command palette, which understands every section prompt as a command, and `j` and `k` move between sections. All motion stops under `prefers-reduced-motion`.

`src/art/films.ts` draws the three ASCII films as pure functions of time. The site plays them live on a canvas, and the README generator renders the same functions into SVG frames, so the two show the same pictures.

## One catalog, several outputs

Edit `src/data/projects.json` (schema version 2) and nothing else, then run:

- `npm run locale` regenerates `src/data/zh-hans.generated.json`.
- `npm run profile` regenerates `public/profile/`: the profile README in three languages and its animated SVGs under `assets/` (hero, pinned-project cards, film players and footer, each in light and dark). Fonts are subset into each SVG from JetBrains Mono and Noto Sans TC/SC, so the images look the same wherever GitHub shows them.
- `npm run profile:sync -- --to ../profile` mirrors `public/profile/` into a checkout of the profile repository, removes images the generator no longer writes, and prints each file's SHA-256.

The terminal output shown on the pinned-project cards lives in `scripts/profile/runs.mjs`. Each block was copied from a real run against the commit it names. When a project changes, re-run the command and paste the new output; do not edit the old one.

`npm run build` fails if either generated output is stale. UI strings live in `src/data/ui.json` and the case-study summaries in `src/data/case-studies.json`, both in English and Traditional Chinese. The case studies themselves and the CV source live in the profile repository. After rendering a new CV, copy it to `public/Chih-Kai-Wang-CV.pdf` and compare its SHA-256 with the source copy.

## Locales

The site ships in English, Traditional Chinese and Simplified Chinese. Traditional Chinese is the source of truth. The Simplified text is produced at build time from the Traditional text with opencc-js through `scripts/zh-cn.mjs`, the same module that produces the profile's `README.zh-CN.md`, and is committed as `src/data/zh-hans.generated.json`. Never edit that file by hand; fix the Traditional source and run `npm run locale`. Status strings, `made` strings, product names, code and the raw records are left exactly as written. Use `?lang=en`, `?lang=zh-Hant` or `?lang=zh-Hans` to pick a language; otherwise the browser language decides.

## Verifying the catalog hash

The hero and the status line print the SHA-256 of `src/data/projects.json`, computed over the file's bytes at build time. Each record shows its raw entry, sliced verbatim from the same file, with a link to the exact lines on GitHub. To check it yourself:

```sh
git clone https://github.com/Chih-Kai-Wang/chih-kai-wang.github.io && cd chih-kai-wang.github.io
shasum -a 256 src/data/projects.json
```

The output should begin with the hash shown on the page.

## Prerendering and requests

`vite build` prerenders the English page into `dist/index.html` through `@preact/preset-vite`, so the content, each record's `<details>` and every link work without JavaScript. Filters, the palette and the theme and language switches need JavaScript and are hidden without it. The client hydrates and then applies the visitor's locale. Fonts (JetBrains Mono, and Noto Sans TC and SC through Fontsource) are self-hosted. The page makes no third-party requests and has no analytics.

The Pages workflow builds on pull requests and deploys the main branch only after a successful build. `public/examples/rigorgraph/` is the static example linked from the RigorGraph record and its case study.
