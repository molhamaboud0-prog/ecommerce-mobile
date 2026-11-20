# Molham Aboud — Portfolio

Static portfolio site built with Vite + React. English and Arabic (RTL), light and dark.

```bash
npm install
npm run dev      # local dev server
npm run build    # static output in dist/, deployable to any static host
```

## Editing content

All content lives in `src/content.js`:

- `profile`: name, role, headline, email, social links, and `cvFile`, the path to a PDF under `public/`.
- `projects`: one entry per case study. Text fields accept a plain string or `{ en, ar }`. `cover.type` is `phones` (screenshots) or `mock` (placeholder UI). Each entry in `sections` can hold `body`, `steps`, `list`, `gallery`, `wide` (one large desktop screenshot), or `mock`. Empty sections are hidden. Add `framed: true` to a cover or gallery section when the screenshots already include a phone bezel.
- `cv`: about, skills, experience, education, courses. The PDF behind the download button is `public/files/molham-aboud-cv.pdf`.
- `ui`: interface labels in both languages.

Remove `placeholder: true` from a project or from `cv` once real content is in. Put images in `public/images/<project>/` and reference them as `images/<project>/<file>`.

Screenshots in `public/images/`: e-commerce comes from the app's Expo web build, CareVisit from its rendered Figma-preview PNGs, and FlavorHub from its HTML preview.
