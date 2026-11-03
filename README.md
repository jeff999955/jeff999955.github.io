# jeff999955.github.io

Personal portfolio, served by GitHub Pages at the domain in `CNAME`. No build step: open `index.html`.

- Theme: the Aligned NVS design system from `aligned-sv-nvs-site` (tokens, serif display + Noto Sans text, teal fill, pill buttons, light/auto/dark switch, scroll reveals, compare slider). Colors live as CSS variables at the top of `style.css`; keep both themes at 4.5:1 text contrast.
- Layout: one continuous page with native scrolling (no pinning or snapping): hero with links, about, experience timeline (industry first), research with the featured paper and publication cards, contact. Elements fade in as they enter the viewport; interactive behaviour stays inside components (the compare slider on the featured paper). Content lives in `index.html`; Update it together with `Jeff_CV.pdf`.
- `images/aligned-nvs/` holds the teaser error maps used by the featured paper's slider.
