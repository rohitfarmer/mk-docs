---
comments: true
---

# Embedding Images

## Enable Lightbox Effect

Website wide.

```yaml
format:
  html:
    lightbox:
      match: auto
      effect: zoom
      desc-position: bottom
```
## Multiple Images in a Gallery

The code below will insert two images side by side in a 1x2 gallery. Both images will be in the same group, so if the lightbox is enabled, they can slide using the arrow buttons.

```R
::: {layout-ncol=2}

![](image5.webp){group="rock-balancing"}

![](image6.webp){group="rock-balancing"}

:::
```

