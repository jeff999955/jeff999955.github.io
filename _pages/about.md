---
layout: about
title: about
permalink: /
subtitle: ML / Infrastructure Engineer · Taipei, Taiwan

selected_papers: true # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page

announcements:
  enabled: false

latest_posts:
  enabled: false
---

<p class="about-links">
  <a href="https://github.com/jeff999955">GitHub</a> ·
  <a href="https://www.linkedin.com/in/yang-che-tseng-6a9502224">LinkedIn</a> ·
  <a href="https://scholar.google.com/citations?user=1iJfq7YAAAAJ">Google Scholar</a> ·
  <a href="{{ '/assets/pdf/Yang-Che_Tseng_CV.pdf' | relative_url }}">CV (PDF)</a> ·
  <a href="mailto:jeff999955@gmail.com">Email</a>
</p>

I'm an ML engineer with a background in 3D computer vision research. During my M.Sc. at the University of British Columbia, advised by Kwang Moo Yi, I ran 110k+ GPU jobs across three HPC clusters and built the evaluation harness behind my first-author WACV 2027 paper; before that, at GoGoX, I shipped an LLM QA bot and data pipelines. I'm open to software and ML engineering roles in Taipei.

## experience

{% for entry in site.data.cv.cv.sections.Experience %}

<div class="experience-entry">
  <p class="mb-0"><strong>{{ entry.company }}</strong> · {{ entry.position }}</p>
  <p class="mb-0 text-muted"><small>{{ entry.dates }} · {{ entry.location }}</small></p>
  {% if entry.summary %}<p class="mb-0 text-muted"><small>{{ entry.summary }}</small></p>{% endif %}
  <ul>
    {% for item in entry.highlights %}
      <li>{{ item | markdownify | remove: '<p>' | remove: '</p>' }}</li>
    {% endfor %}
  </ul>
</div>
{% endfor %}
