# Documentations by Rohit Farmer 

[![](https://licensebuttons.net/l/by/4.0/88x31.png)](https://creativecommons.org/licenses/by/4.0/)

MkDocs: [https://www.mkdocs.org/](https://www.mkdocs.org/)  
Theme used: [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)

## Contributions

If you’d like to contribute to this repository/website, you can edit files in the `contents` directory and submit a pull request. I’ll review your changes and, if approved, rebuild the site.

This repository intentionally uses a non-default structure for `Material for MkDocs`. Instead of storing Markdown files in `docs/` and the rendered site in `site/`, the source content lives in `contents/` and the compiled site is placed in `docs/` so it can be served directly by GitHub Pages. GitHub Pages looks for static files either in the repository `root` or in the `docs/` folder of the main branch, which is why this layout is used. I'm aware that GitHub Actions could automate builds and deploy from a separate branch, but I prefer to keep things simple and avoid the extra maintenance overhead.

You’re also welcome to send suggestions or content by email at [rohit@rohitfarmer.com](mailto:rohit@rohitfarmer.com).

**Please note:** while contributions are appreciated, this site primarily serves as a personal reference, so I aim to keep the setup straightforward and easy for me to maintain. I may decline proposals that significantly change the build system or hosting approach if they add complexity. Otherwise, feel free to explore and use the content under the CC BY 4.0 license.

## Markdown Template

```markdown

---
comments: true
---

# Title

```

### Math Equations

Math equations are rendered by `KaTex` JavaScript. Please see the format here [https://squidfunk.github.io/mkdocs-material/reference/math/#usage](https://squidfunk.github.io/mkdocs-material/reference/math/#usage).

## To Build the Site Locally

To render the website using `mkdocs`, execute the `build-site.sh` shell script. It first runs `mkdocs` to build the website and then copies `.nojekyll` file to the `docs` folder. 

```bash
bash build-site.sh
```
### To Serve the Site Locally

```bash
mkdocs serve
```

## Changelog

2025-12-11: The website nomore was built and served by Netlify. This was the tutorial to set up an automatic build and serve by Netlify [https://www.starfallprojects.co.uk/projects/deploy-host-docs/deploy-mkdocs-material-netlify/](https://www.starfallprojects.co.uk/projects/deploy-host-docs/deploy-mkdocs-material-netlify/) that I used in the past. 

The last commit with the previous structure: [26c9652542f19aac11a5c7202a5ec6d857eba187](https://github.com/rohitfarmer/mk-docs/tree/26c9652542f19aac11a5c7202a5ec6d857eba187)
