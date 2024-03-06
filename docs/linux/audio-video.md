# Audio Video Editing 

## To Remove EXIF Information from an Image

### Software required
`sudo apt-get install libimage-exiftool-perl`

### View EXIF information
`exiftool image.jpeg`

### Remove all EXIF information from a single file
`exiftool -all= image.jpeg`

### Bulk remove EXIF information (these commands will also create a copy of images with _original extension.
```bash
exiftool -all= *
exiftool -all= *.JPG
```

## To Remove Meta Data from a Video
Exiftool can also be used to fetch and view metadata from a video

### Software required
`sudo apt-get install ffmpeg libimage-exiftool-perl`

### Copy original file to another file with the data stripped out
`ffmpeg -i test.mov -map_metadata -1 -vcodec copy -acodec copy test-nometadata.mov`

## To Remove Meta Data from an Audio File

### FLAC
```bash
metaflac --remove-all file.flac
```