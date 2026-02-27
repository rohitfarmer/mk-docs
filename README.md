# Documentations by Rohit Farmer 

[![](https://licensebuttons.net/l/by/4.0/88x31.png)](https://creativecommons.org/licenses/by/4.0/)

This repository contains both markdown files in the `content` directory to be compiled by MK Docs and the rendered website in the `docs` directory to be served by GitHub Pages.

MkDocs: [https://www.mkdocs.org/](https://www.mkdocs.org/)  
Theme used: [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)

## To Build the Site Locally

To render the website using `mkdocs`, execute the `build-site.sh` shell script. It first runs `mkdocs` to build the website in the `docs` directory and then copies `.nojekyll` file to the `docs` folder. 

```bash
bash build-site.sh
```
### To Serve the Site Locally

```bash
mkdocs serve
```

## Contributions

If you want to contribute to this repository/website, you can edit the content in the `contents` directory and send me a pull request to incorporate changes and recompile the website. You can also send me your suggestions or content by email at [rohit@rohitfarmer.com](mailto:rohit@rohitfarmer.com). Please note that although I welcome your contributions, I maintain this website as a quick go-to for my personal needs and therefore try to keep it as straightforward as possible for me to maintain. I may decline your request to modify the build system or the hosting platform, if it is not easy for me to maintain. Otherwise, please lurk around and use the content to your heart's desire under CC BY 4.0 license. 

## Changelog

2025-12-11: The website nomore was built and served by Netlify. This was the tutorial to set up an automatic build and serve by Netlify [https://www.starfallprojects.co.uk/projects/deploy-host-docs/deploy-mkdocs-material-netlify/](https://www.starfallprojects.co.uk/projects/deploy-host-docs/deploy-mkdocs-material-netlify/) that I used in the past. 

The last commit with the previous structure: [26c9652542f19aac11a5c7202a5ec6d857eba187](https://github.com/rohitfarmer/mk-docs/tree/26c9652542f19aac11a5c7202a5ec6d857eba187)
