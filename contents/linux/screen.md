# Screen

The `screen` command in Linux is a terminal multiplexer that allows you to manage multiple terminal sessions within a single window. It is particularly useful for long-running processes, remote sessions, and multitasking in the terminal.

To configure `screen` create a `~/.screenrc` file in your home folder and include the following configuration. This file includes tab navigation, status bar customization, and easy shortcuts for creating and switching between windows.

```bash
# Enable the status line at the bottom
hardstatus alwayslastline
hardstatus string "%{= kw}%-w%{= bw}%n %t%{-}%+w %=%{= kw}[%d/%m %H:%M]"

# Keybindings for navigation
# Use Ctrl-a [n] to switch to the next window
bind n next

# Use Ctrl-a [p] to switch to the previous window
bind p prev

# Use Ctrl-a [0-9] to switch directly to windows 0-9
bind 0 select 0
bind 1 select 1
bind 2 select 2
bind 3 select 3
bind 4 select 4
bind 5 select 5
bind 6 select 6
bind 7 select 7
bind 8 select 8
bind 9 select 9

# Easy tab creation and renaming
bind c screen   # Create a new window
bind A title    # Rename the current window

# Split windows (panes)
bind | split -v # Split vertically (Ctrl-a |)
bind _ split -h # Split horizontally (Ctrl-a _)

# Move between panes
bind Tab focus  # Move between split panes

# Resize panes
bind > resize +1 # Increase the size of the current pane
bind < resize -1 # Decrease the size of the current pane

# Logging
logfile ~/screen.log   # Set the log file path
logfile flush 1        # Flush log every second

# Start with multiple named tabs (optional)
screen -t shell1       # Tab 0: shell1
screen -t shell2       # Tab 1: shell2
```

**Save and Use:**

1. Save the file: Save this configuration to your home directory as `~/.screenrc`.

2. Start GNU Screen: Launch Screen with the custom configuration:

    `screen`

3. Key Bindings:
    * Create a new tab: `Ctrl-a c`
    * Rename the current tab: `Ctrl-a A`
    * Switch tabs: `Ctrl-a n` (next), `Ctrl-a p` (previous)
    * Direct switch: `Ctrl-a [0-9]`
    * Split panes: `Ctrl-a |` (vertical), `Ctrl-a _` (horizontal)
    * Navigate panes: `Ctrl-a Tab`
