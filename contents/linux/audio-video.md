---
comments: true
---

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

## Shell script to fetch metadata from all the files in a folder and copy them to text files

`fetch-exif.sh`

```bash
#!/bin/bash

# Check if the correct number of arguments is provided
if [ "$#" -ne 2 ]; then
  echo "Usage: $0 SOURCE_DIR PROCESSED_DIR"
  exit 1
fi

# Directories from command line arguments
SOURCE_DIR="$1"
PROCESSED_DIR="$2"

# Create the processed directory if it doesn't exist
mkdir -p "$PROCESSED_DIR"

# Function to fetch and save metadata
fetch_metadata() {
  local filetype=$1
  for file in "$SOURCE_DIR"/*.$filetype; do
    if [ -f "$file" ]; then
      # Generate a file name for the metadata file
      base_filename=$(basename "$file" .$filetype)
      metadata_file="$PROCESSED_DIR/${base_filename}_metadata.txt"
      # Fetch metadata and save to the metadata file
      exiftool "$file" > "$metadata_file"
    fi
  done
}

# Fetch metadata for JPG files
fetch_metadata "jpg"

# Fetch metadata for MP4 files
fetch_metadata "mp4"

echo "Metadata fetching complete. Metadata saved in $PROCESSED_DIR"

```

## Shell script to remove metadata from all JPG and MP4 files in the source folder and copy the cleaned files with a random file name to an output folder

`delexif.sh`

```bash
#!/bin/bash

# Check if the correct number of arguments is provided
if [ "$#" -ne 2 ]; then
  echo "Usage: $0 SOURCE_DIR PROCESSED_DIR"
  exit 1
fi

# Directories from command line arguments
SOURCE_DIR="$1"
PROCESSED_DIR="$2"

# Create the processed directory if it doesn't exist
mkdir -p "$PROCESSED_DIR"

# Function to process files
process_files() {
  local filetype=$1
  for file in "$SOURCE_DIR"/*.$filetype; do
    if [ -f "$file" ]; then
      # Generate a random file name
      new_filename=$(uuidgen)
      # Remove most metadata but keep ICC profile and copy to the processed directory with a random file name
      if [ "$filetype" == "jpg" ]; then
        exiftool -all= --icc_profile:all "$file" -o "$PROCESSED_DIR/$new_filename.$filetype"
      elif [ "$filetype" == "mp4" ]; then
        exiftool -all= "$file" -o "$PROCESSED_DIR/$new_filename.$filetype"
      fi
    fi
  done
}

# Process JPG files
process_files "jpg"

# Process MP4 files
process_files "mp4"

echo "Processing complete. Files saved in $PROCESSED_DIR"

```

## Shell script to convert an MP4 file to a GIF with a provided frame rate

`mp4-to-gif.sh`

```bash
#!/bin/bash

# Check if the correct number of arguments is provided
if [ "$#" -ne 3 ]; then
    echo "Usage: $0 input_video.mp4 output_gif.gif framerate"
    exit 1
fi

# Input and output file names
input_video=$1
output_gif=$2
frame_rate=$3

# Convert MP4 to GIF with specified frame rate
ffmpeg -i "$input_video" -vf "fps=$frame_rate,scale=320:-1:flags=lanczos" -c:v pam -f image2pipe - | \
    convert -delay $(echo "100/$frame_rate" | bc -l) - -loop 0 "$output_gif"

echo "Conversion complete: $output_gif"

```

## To Remove Meta Data from an Audio File

### FLAC
```bash
metaflac --remove-all file.flac
```