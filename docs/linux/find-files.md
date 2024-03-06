# Find Files and Folders

## Find files recursively in the current folder
The commands below will produce a list of folder paths that contains the searched files.

```bash
find . -name "filename"
```
Note: replace . with the path to the folder if it's not the current folder.

## Find files recursively in the current folder with a keyword in the file name
The commands below will produce a list of folder paths that contains the searched files.

Case sensitive keyword
```bash
find . -type f -name "*keyword*"
```
Note: replace . with the path to the folder if it's not the current folder.

Case insensitive keyword
```bash
find . -type f -iname "*keyword*"
```