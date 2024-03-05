# Files and Folders
## List file names in a directory
```R
filenames <- Sys.glob(file.path(selected_data_path,"*.rds"))
```

```R
files <- list.files(file.path(dir), pattern = "*.feather", full.names = TRUE/FALSE)

# full.names is a logical value. If TRUE, the directory path is prepended to the file names to give a relative file path. 
# If FALSE, the file names (rather than paths) are returned. 
```

## Remove file extension
```R
tools::file_path_sans_ext(file.tsv)
```

## Extract the terminal file name and the path leading upto the terminal file name
```R
basename(path)
dirname(path)

# basename removes all of the path up to and including the last path separator (if any).
# dirname returns the part of the path up to but excluding the last path separator, or "." if there is no path separator.
```