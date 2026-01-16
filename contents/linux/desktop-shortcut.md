# Creating a Desktop Shortcut Manually

You can reate a shortcut manually by creating a `.desktop` file. Here’s how:

Create a New File `~/Desktop/myapp.desktop` with the following content:

```bash
[Desktop Entry]
Version=1.0
Name=My Application
Exec=/path/to/application
Icon=/path/to/icon.png
Type=Application
Terminal=false
```

Make It Executable:

```bash
chmod +x ~/Desktop/myapp.desktop
```
