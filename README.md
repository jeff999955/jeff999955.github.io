# jeff999955.github.io

Personal portfolio, served by GitHub Pages at the domain in `CNAME`. No build step: open `index.html`.

- Theme: the Aligned NVS design system from `aligned-sv-nvs-site` (tokens, serif display + Noto Sans text, teal fill, pill buttons, light/auto/dark switch, scroll reveals, compare slider). Colors live as CSS variables at the top of `style.css`; keep both themes at 4.5:1 text contrast.
- Layout: one continuous page with native scrolling (no pinning or snapping): hero (photo on the left; name, role, links and intro on the right; stacked on phones), about, experience timeline (industry first), research with the featured paper and publication cards, contact. Elements fade in as they enter the viewport; interactive behaviour stays inside components (the compare slider on the featured paper). Content lives in `index.html`; Update it together with `Jeff_CV.pdf`.
- `projects/email-pipeline.html`: write-up of the TravoAI cancellation email pipeline, linked from the TravoAI bullet in Experience. Reuses `style.css` and `script.js` (the script skips the section nav when a page has none). Facts come from `work-history/` in the CV repo; keep to what's verified there. A "Selected work" card section and a harness write-up were tried and removed on 2026-11-05 (owner: not proud of the other items, cards add no visual impact); don't restore them.
- `images/profile.jpg` is the round hero photo (380×380 crop of the GitHub profile photo, shown at up to 260px).
- `images/aligned-nvs/` holds the teaser error maps used by the featured paper's slider.
- `images/papers/` holds the 960×480 cover stills for the publication cards (3DGS-MCMC from its project-page video, PointNeRF++ from its project-page teaser, Orbeez-SLAM from `extrinsic.png` in its code repo). A card shows its image when its cover has class `has-img`; without one it falls back to the plain teal slab.
