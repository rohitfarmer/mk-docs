---
comments: true
---

# Downloading Stuff Using Wget

## Recursively download all webpages and associated files within a folder heirarchy
1. **Basic Recursive Download Command:** 

```bash
wget --recursive --page-requisites --html-extension --convert-links --no-parent [website URL]
```

 
- `--recursive`: This option tells `wget` to follow links and download. 
- `--page-requisites`: Downloads all the files that are necessary to properly display a given HTML page. This includes such things as inlined images, sounds, and referenced stylesheets. 
- `--html-extension`: Saves all the files with `.html` extension. 
- `--convert-links`: After the download is complete, convert the links in the document for local viewing. 
- `--no-parent`: Do not ascend to the parent directory. It's useful for restricting the download to only a portion of the site. 
2. **Limit the Depth of the Recursion:** 
If you want to limit the recursion depth, you can use the `-l` or `--level` option followed by a number. For example, to download up to three levels deep, you can use:

```bash
wget --recursive --level=3 --page-requisites --html-extension --convert-links --no-parent [website URL]
``` 
3. **Avoiding Download Overload:** 
To avoid putting too much load on the server, you can use the `--wait` option to wait a specified amount of time between downloads, and `--random-wait` to vary it between requests:

```bash
wget --recursive --page-requisites --html-extension --convert-links --no-parent --wait=1 --random-wait [website URL]
``` 
4. **Downloading Specific File Types:** 
If you are interested in specific types of files, you can use the `-A` option. For example, to download only `.jpg` and `.png` files, use:

```bash
wget --recursive --no-parent -A jpg,png [website URL]
``` 
5. **Excluding Certain Directories:** 
To exclude certain directories from the download, use the `--exclude-directories` option:

```bash
wget --recursive --page-requisites --html-extension --convert-links --no-parent --exclude-directories=/directory1,/directory2 [website URL]
``` 
6. **Using a User Agent:** 
Some websites block `wget`'s user-agent. You can change the user-agent to mimic a browser:

```bash
wget --recursive --page-requisites --html-extension --convert-links --no-parent --user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3" [website URL]
```

Remember to replace `[website URL]` with the actual URL of the website you want to download. Also, be aware of the website's terms of service and copyright laws when using `wget` to download content. It's important to respect the rules and regulations of the website and to use web scraping and downloading tools responsibly.