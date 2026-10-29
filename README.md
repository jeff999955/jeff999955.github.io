# jeff999955.github.io

Personal site of Yang-Che (Jeff) Tseng, built on [al-folio](https://github.com/alshedivat/al-folio) v1.2 and deployed to GitHub Pages by `.github/workflows/deploy.yml` (builds on every push to `main` and publishes to the `gh-pages` branch).

## Where the content lives

| What                         | File                                                                                           |
| ---------------------------- | ---------------------------------------------------------------------------------------------- |
| About text, header links     | `_pages/about.md`                                                                              |
| Experience, education, skills | `_data/cv.yml` (feeds both the home page Experience section and `/cv/`)                       |
| Papers                       | `_bibliography/papers.bib` (`selected`, `abbr`, `preview`, `arxiv`, `code`, `website` fields) |
| Teaser images                | `assets/img/publication_preview/`                                                              |
| CV PDF                       | `assets/pdf/Yang-Che_Tseng_CV.pdf`, copied from `../main.pdf` in the CV-for-work repo          |
| Social links                 | `_data/socials.yml`                                                                            |
| Site name, URL, scholar bolding | `_config.yml`                                                                               |

`_sass/_publications.scss` is a local override of the al_folio_core file (bolds the owner's name in author lists instead of underlining it); it is recorded in `.al-folio-overrides.yml`. After upgrading al-folio gems, run `bundle exec al-folio upgrade overrides audit`.

`images/` and `Jeff_CV.pdf` predate the al-folio site and are kept so old links keep working.

## Local preview

No Docker needed; Homebrew Ruby works:

```bash
export PATH=/opt/homebrew/opt/ruby/bin:$PATH
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll serve   # http://localhost:4000/
```
