# Documentations by Rohit Farmer 

This repository contains both markdown files in the `content` directory to be compiled by MK Docs and the rendered website in the `docs` directory to be served by GitHub Pages.

MkDocs: [https://www.mkdocs.org/](https://www.mkdocs.org/)  
Theme used: [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)

## To Build the Site Locally

To render the website using `mkdocs`, execute the `build-site.sh` shell script. It first runs `mkdocs` to build the website in the `docs` directory and then copies `.nojekyll` file to the `docs` folder. 

```bash
bash build-site.sh
```
## To Serve the Site Locally

```bash
cd docs
mkdocs serve
```

## Changelog

2025-12-11: The website nomore was built and served by Netlify. This was the tutorial to set up an automatic build and serve by Netlify [https://www.starfallprojects.co.uk/projects/deploy-host-docs/deploy-mkdocs-material-netlify/](https://www.starfallprojects.co.uk/projects/deploy-host-docs/deploy-mkdocs-material-netlify/) in the past. 

The last commit with the previous structure: [26c9652542f19aac11a5c7202a5ec6d857eba187](https://github.com/rohitfarmer/mk-docs/tree/26c9652542f19aac11a5c7202a5ec6d857eba187)
