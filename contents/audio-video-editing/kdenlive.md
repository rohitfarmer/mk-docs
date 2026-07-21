---
comments: true
---

# Kdenlive

Kdenlive is the acronym for KDE Non-Linear Video Editor. It works on Linux, Windows, macOS, and BSD.

[Official Website](https://kdenlive.org/)

[Kdenlive YouTube Tutorials](https://youtube.com/playlist?list=PLrivxE_nvl7cnSPFOIBCQ7w4Ju1Pp6ekM&si=lEW5VAVcgnNspTtA)

## Plugins

Some publically available audio and video plugins for Kdenlive.

```bash
sudo apt update
sudo apt install frei0r-plugins swh-plugins tap-plugins cmt ladspa-sdk
```

## Apply Luts

[Official Docs](https://docs.kdenlive.org/en/effects_and_filters/video_effects/color_image_correction/applylut.html)

**LUT** means **Look-Up Table**. In video editing, it is a small file that tells Kdenlive: “when you see this color, change it to that color.”

Think of it like a **color preset**, but more technical and predictable.

For example:

```text
Input color:  dull blue-gray
Output color: richer teal-blue

Input color:  flat skin tone
Output color: warmer skin tone

Input color:  low-contrast shadow
Output color: deeper, more cinematic shadow
```

A LUT does **not** usually edit your cut, audio, titles, or effects. It changes the **color and tone** of the image.

### What LUTs are used for

There are two main uses:

#### 1. Technical correction LUTs

These convert footage from one color space or camera profile to another.

Example:

```text
Camera Log footage → Rec.709 normal-looking footage
```

Many cameras shoot in a flat-looking mode called **Log**. It looks gray and washed out on purpose, because it saves more highlight and shadow information. A technical LUT can convert that flat image into a normal contrasty image.

#### 2. Creative / stylistic LUTs

These give your video a look.

Examples:

```text
cinematic teal-and-orange
warm vlog look
moody dark look
bright travel look
film emulation
black-and-white style
```

These are useful for YouTube because they help make your videos look consistent from episode to episode.

Most modern video LUTs are **3D LUTs**, which means they transform red, green, and blue together. That lets the LUT change color relationships in a more complex way than a simple brightness or contrast filter.

### In Kdenlive

Kdenlive has an **Apply LUT** effect under **Color and Image Correction**. You add the effect to a clip, choose a LUT file, and Kdenlive applies that color transform to the clip. Kdenlive’s manual lists common supported LUT formats including `.cube`, `.3dl`, `.dat`, and `.m3d`.

A common workflow is:

```text
1. Put your clip on the timeline.
2. Open Effects.
3. Go to Color and Image Correction.
4. Add Apply LUT.
5. Choose your .cube LUT file.
6. Adjust the effect strength if needed.
7. Do final color tweaks with contrast, brightness, saturation, or color wheels.
```

The biggest mistake is applying a LUT at **100% strength** and leaving it there. Many LUTs look better around **20–60% intensity**, depending on the footage.

### Manually Adding Custom LUTs

If you purchased or downloaded your own LUT files from elsewhere, you can manually drop them into Kdenlive's system folders.

1. Locate your Kdenlive LUTS folder (create a LUTs folder if it doesn't exist):
    * Windows: `%AppData%\kdenlive\luts`
    * Linux: `~/.local/share/kdenlive/luts` (or `~/.var/app/org.kde.kdenlive/data/kdenlive/luts` if using Flatpak)
    * macOS: `~/Library/Application Support/kdenlive/luts`
2. Copy and paste your `.cube` or `.3dl` files into this directory.
3. Restart Kdenlive, and your new LUTs will appear in the LUT file dropdown menu.