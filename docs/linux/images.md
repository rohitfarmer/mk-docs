# Image Manipulation in Linux and Mac

## Convert an image to WebP format

Install webp utility using Linux package manager or Homebrew in Mac.

```bash
cwebp -q quality (optional) input-image.jpg -o output-image.webp

# where quality is between 0 (poor) to 100 (very good).
# Typical value is around 80.
```

## Convert an SVG to PNG format

Using `convert` function from [ImageMagick](https://imagemagick.org/index.php)

```bash
# 300 dpi and 100% quality
convert -density 300 input.svg -quality 100 output.png
```

**Density (`-density`)**
* **Definition**: The `-density` option specifies the resolution of the output image in dots per inch (DPI). It affects how the image is rendered, particularly for vector formats like SVG.
* **Usage**: When you set `-density 300`, you are telling ImageMagick to render the SVG at a resolution of 300 DPI. This is particularly important for print quality, as higher DPI values result in more detail and sharper images.
* **Impact**: A higher density value will generally produce a larger file size and better quality image, while a lower value may result in a smaller file size but lower quality.

**Quality (`-quality`)**
* **Definition**: The `-quality` option specifies the compression level for the output image, particularly for formats like JPEG and PNG. It is a value between 0 and 100.
* **Usage**: When you set `-quality 100`, you are indicating that you want the highest quality output. For PNG files, this means lossless compression, preserving all the image data.
* **Impact**: A higher quality value results in better image fidelity but may increase the file size. Conversely, a lower quality value can reduce the file size but may introduce artifacts or reduce detail in the image.
