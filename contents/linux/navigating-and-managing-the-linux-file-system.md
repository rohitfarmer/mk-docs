---
comments: true
---

# Basics: Navigating and Managing the Linux File System

Linux is built around a [**file system**](https://en.wikipedia.org/wiki/Unix_filesystem). Almost everything in Linux is represented as a file or directory: documents, programs, devices, logs, configuration files, disks, and even system information.

This tutorial covers how to navigate the Linux file system from the command line, work with files and directories, copy and move files, change permissions and groups, and understand when to use each command.

## What Is the Linux File System?

The Linux file system is organized as a single tree starting at:

```bash
/
```

This is called the **root directory**.

Everything is located somewhere under `/`.

Example:

```text
/
├── home
│   └── rohit
│       ├── Documents
│       ├── Downloads
│       └── script.sh
├── etc
├── var
├── usr
└── tmp
```

Unlike Windows, Linux does not use drive letters like `C:\` or `D:\`. Instead, disks and folders are mounted somewhere inside the main tree.

## Important Linux Directories

Here are common directories you will see:

| Directory        | Purpose                                  |
| ---------------- | ---------------------------------------- |
| `/`              | Root of the entire file system           |
| `/home`          | User home directories                    |
| `/home/username` | Your personal files                      |
| `/root`          | Home directory for the root/admin user   |
| `/etc`           | System configuration files               |
| `/var`           | Variable data such as logs, caches, mail |
| `/tmp`           | Temporary files                          |
| `/usr`           | Installed software and system tools      |
| `/bin`           | Essential user commands                  |
| `/sbin`          | Essential system/admin commands          |
| `/lib`, `/lib64` | Shared libraries                         |
| `/dev`           | Device files                             |
| `/proc`          | Live system/kernel information           |
| `/opt`           | Optional third-party software            |
| `/mnt`           | Temporary mount points                   |
| `/media`         | Removable drives such as USB disks       |

You will spend most of your time in:

```bash
/home/your_username
```

You can also refer to your home directory using:

```bash
~
```

Example:

```bash
cd ~
```

## The Terminal and Shell

The **terminal** is the program where you type commands.

The [**shell**](https://www.digitalocean.com/community/tutorials/different-types-of-shells-in-linux) is the command interpreter. Common shells include:

```bash
bash
zsh
sh
fish
```

Most beginner tutorials assume [`bash`](https://en.wikipedia.org/wiki/Bash_(Unix_shell)).

You type commands like this:

```bash
command options arguments
```

Example:

```bash
ls -l /home
```

Here:

```text
ls       command
-l       option
/home    argument
```

## Checking Where You Are

Use `pwd` to print your current directory.

```bash
pwd
```

Example output:

```text
/home/rohit
```

`pwd` means:

```text
print working directory
```

Use it when you are unsure where you are in the file system.

## Listing Files and Directories

Use `ls` to list files.

```bash
ls
```

Example:

```bash
ls
```

Output:

```text
Documents  Downloads  notes.txt
```

### Useful `ls` options

#### Long listing

```bash
ls -l
```

Example output:

```text
-rw-r--r-- 1 rohit staff  2048 Jun  8  notes.txt
drwxr-xr-x 2 rohit staff  4096 Jun  8  Documents
```

This shows permissions, owner, group, size, date, and name.

#### Show hidden files

Hidden files start with a dot:

```bash
.bashrc
.profile
.gitignore
```

To show them:

```bash
ls -a
```

#### Long listing including hidden files

```bash
ls -la
```

This is one of the most commonly used commands.

#### Human-readable file sizes

```bash
ls -lh
```

Example:

```text
-rw-r--r-- 1 rohit staff 2.0K Jun  8 notes.txt
```

#### Sort by newest first

```bash
ls -lt
```

#### Sort by size

```bash
ls -lhS
```

Use `ls` when you need to see what is inside a directory.


## Understanding Paths

A **path** tells Linux where a file or directory is located.

There are two main types:

### Absolute paths

An absolute path starts from `/`.

Example:

```bash
/home/rohit/Documents/report.txt
```

This is the full location.

Use absolute paths when you want to be precise.

### Relative paths

A relative path starts from your current location.

Example:

```bash
Documents/report.txt
```

If you are currently in `/home/rohit`, then this refers to:

```bash
/home/rohit/Documents/report.txt
```

Use relative paths when working inside a project or nearby directory.


## Special Path Symbols

Linux has several shortcut symbols.

| Symbol | Meaning             |
| ------ | ------------------- |
| `.`    | Current directory   |
| `..`   | Parent directory    |
| `~`    | Your home directory |
| `/`    | Root directory      |

Examples:

```bash
cd .
```

Means stay in the current directory.

```bash
cd ..
```

Move up one level.

```bash
cd ~
```

Go to your home directory.

```bash
cd /
```

Go to the root directory.

## Changing Directories

Use `cd` to change directories.

```bash
cd directory_name
```

Example:

```bash
cd Documents
```

Go back up one level:

```bash
cd ..
```

Go to your home directory:

```bash
cd
```

or:

```bash
cd ~
```

Go to an absolute path:

```bash
cd /etc
```

Go back to the previous directory:

```bash
cd -
```

Example:

```bash
cd /var/log
cd -
```

Use `cd` whenever you need to move around the file system.

## Creating Directories

Use `mkdir` to create a directory.

```bash
mkdir projects
```

Create multiple directories:

```bash
mkdir photos videos backups
```

Create nested directories with `-p`:

```bash
mkdir -p projects/linux/tutorials
```

Without `-p`, this may fail if `projects/linux` does not already exist.

Use `mkdir` when organizing files or preparing folders for projects, scripts, downloads, or backups.

## Creating Files

There are many ways to create files.

### Create an empty file with `touch`

```bash
touch notes.txt
```

If the file already exists, `touch` updates its timestamp.

Use `touch` when you need a blank file quickly.

### Create a file using redirection

```bash
echo "Hello Linux" > hello.txt
```

This writes text into a file.

Be careful: `>` overwrites the file.

Append instead with:

```bash
echo "Another line" >> hello.txt
```

Use `>` when creating or replacing a file. Use `>>` when adding to the end.

### Create or edit a file with a text editor

Common terminal editors:

```bash
nano file.txt
vim file.txt
```

For beginners:

```bash
nano notes.txt
```

In `nano`:

```text
Ctrl + O    save
Enter       confirm filename
Ctrl + X    exit
```

Use a text editor when writing scripts, notes, configuration files, or code.

## Viewing File Contents

### Show entire file

```bash
cat file.txt
```

Use `cat` for short files.

### View long files page by page

```bash
less file.txt
```

Inside `less`:

```text
Space       next page
b           previous page
/word       search for word
q           quit
```

Use `less` for logs, configuration files, and large text files.

### Show first lines

```bash
head file.txt
```

Show first 20 lines:

```bash
head -n 20 file.txt
```

### Show last lines

```bash
tail file.txt
```

Show last 50 lines:

```bash
tail -n 50 file.txt
```

### Watch a growing log file

```bash
tail -f /var/log/syslog
```

or on some systems:

```bash
tail -f /var/log/messages
```

Use `tail -f` when monitoring live logs.

## Copying Files and Directories

Use `cp` to copy.

### Copy a file

```bash
cp source.txt copy.txt
```

Example:

```bash
cp notes.txt notes-backup.txt
```

This creates a copy.

### Copy a file into a directory

```bash
cp notes.txt Documents/
```

### Copy and rename at the same time

```bash
cp notes.txt Documents/old-notes.txt
```

### Copy multiple files into a directory

```bash
cp file1.txt file2.txt file3.txt Documents/
```

### Copy a directory

To copy a directory, use `-r`:

```bash
cp -r myfolder backup-folder
```

`-r` means recursive, meaning it copies everything inside.

### Preserve timestamps, ownership, and permissions

```bash
cp -a source backup
```

`-a` means archive mode.

Use `cp -a` for backups because it preserves more metadata.

### Ask before overwriting

```bash
cp -i notes.txt Documents/
```

Use `-i` when you want protection from accidentally replacing files.

### Show what is being copied

```bash
cp -v notes.txt Documents/
```

Use `cp` when you want a duplicate while keeping the original.

## Moving and Renaming Files

Use `mv` to move or rename files.

### Rename a file

```bash
mv oldname.txt newname.txt
```

### Move a file into a directory

```bash
mv notes.txt Documents/
```

### Move and rename at the same time

```bash
mv notes.txt Documents/linux-notes.txt
```

### Move a directory

```bash
mv oldfolder newfolder
```

or:

```bash
mv project1 Projects/
```

### Ask before overwriting

```bash
mv -i file.txt Documents/
```

Use `mv` when you want to relocate something or rename it.

Important difference:

```bash
cp
```

makes a copy.

```bash
mv
```

moves the original.

## “Paste” on the Command Line

In graphical file managers, you copy and paste files.

On the command line, “paste” usually means one of these:

```bash
cp file destination/
```

or:

```bash
mv file destination/
```

Examples:

Copy and “paste” into `Documents`:

```bash
cp notes.txt ~/Documents/
```

Cut and “paste” into `Documents`:

```bash
mv notes.txt ~/Documents/
```

There is no universal separate `paste file` command. You perform the copy/move and destination in one command.

## Removing Files and Directories

Use `rm` to remove files.

### Remove a file

```bash
rm file.txt
```

### Ask before removing

```bash
rm -i file.txt
```

### Remove multiple files

```bash
rm file1.txt file2.txt file3.txt
```

### Remove an empty directory

```bash
rmdir emptyfolder
```

### Remove a directory and everything inside it

```bash
rm -r foldername
```

### Force removal

```bash
rm -rf foldername
```

Be extremely careful with:

```bash
rm -rf
```

It can permanently delete large parts of your system if used incorrectly.

Dangerous example:

```bash
rm -rf /
```

Never run that.

Safer habit:

```bash
rm -ri foldername
```

This asks before deleting each item.

Use `rm` when you truly want to delete files. Unlike a desktop trash bin, command-line deletion is often immediate and hard to undo.

## Finding Files

### Find by name

```bash
find /path/to/search -name "filename"
```

Example:

```bash
find ~ -name "notes.txt"
```

### Find files ending in `.txt`

```bash
find ~ -name "*.txt"
```

### Find directories

```bash
find ~ -type d -name "Projects"
```

### Find files

```bash
find ~ -type f -name "*.sh"
```

### Find recently modified files

Modified in the last 7 days:

```bash
find ~ -type f -mtime -7
```

Modified more than 30 days ago:

```bash
find ~ -type f -mtime +30
```

### Find large files

Files larger than 100 MB:

```bash
find ~ -type f -size +100M
```

Use `find` when you do not know exactly where something is.

## Searching Inside Files

Use `grep` to search for text inside files.

### Search in one file

```bash
grep "error" logfile.txt
```

### Case-insensitive search

```bash
grep -i "error" logfile.txt
```

### Show line numbers

```bash
grep -n "error" logfile.txt
```

### Search recursively inside a directory

```bash
grep -r "database" .
```

### Search recursively with line numbers

```bash
grep -rn "database" .
```

Use `grep` when you know the text you are looking for but not exactly where it appears.

## File Name Wildcards

The shell supports wildcards.

### Match anything

```bash
*.txt
```

Matches:

```text
notes.txt
report.txt
todo.txt
```

Example:

```bash
ls *.txt
```

### Match one character

```bash
file?.txt
```

Matches:

```text
file1.txt
fileA.txt
```

But not:

```text
file10.txt
```

### Match ranges

```bash
file[1-3].txt
```

Matches:

```text
file1.txt
file2.txt
file3.txt
```

Use wildcards when working with many files at once.

Examples:

```bash
cp *.txt Documents/
```

```bash
rm *.tmp
```

Be careful with `rm` and wildcards. Always preview first:

```bash
ls *.tmp
```

Then delete:

```bash
rm *.tmp
```

## File Extensions in Linux

Linux does not rely on file extensions as strictly as Windows.

A file can be executable even if it does not end in `.exe`.

A shell script often ends in:

```text
.sh
```

But it does not have to.

You can check a file type with:

```bash
file filename
```

Example:

```bash
file script.sh
```

Output might be:

```text
script.sh: Bourne-Again shell script, ASCII text executable
```

Use `file` when you are not sure what kind of file something is.

## Hidden Files

Files or directories beginning with `.` are hidden.

Examples:

```text
.bashrc
.ssh
.config
.git
```

Show them with:

```bash
ls -a
```

Common hidden files:

| File/Directory | Purpose                   |
| -------------- | ------------------------- |
| `~/.bashrc`    | Bash shell settings       |
| `~/.profile`   | Login shell settings      |
| `~/.ssh`       | SSH keys and config       |
| `~/.config`    | User application settings |
| `.git`         | Git repository metadata   |

Use hidden files for configuration, application settings, and project metadata.

## Understanding File Permissions

Linux permissions control who can read, write, or execute files.

When you run:

```bash
ls -l
```

You might see:

```text
-rw-r--r-- 1 rohit staff 2048 Jun 8 notes.txt
```

Focus on this part:

```text
-rw-r--r--
```

It has 10 characters.

```text
- rw- r-- r--
```

Breakdown:

| Part  | Meaning            |
| ----- | ------------------ |
| `-`   | File type          |
| `rw-` | Owner permissions  |
| `r--` | Group permissions  |
| `r--` | Others permissions |

### File type character

| Character | Meaning       |
| --------- | ------------- |
| `-`       | Regular file  |
| `d`       | Directory     |
| `l`       | Symbolic link |

Example:

```text
drwxr-xr-x
```

This is a directory.

### Permission characters

| Character | Meaning for files  | Meaning for directories                       |
| --------- | ------------------ | --------------------------------------------- |
| `r`       | Read file contents | List directory contents                       |
| `w`       | Modify file        | Create, delete, rename files inside directory |
| `x`       | Execute file       | Enter/traverse directory                      |

Directory permissions are especially important.

For a directory:

```text
r
```

lets you list names.

```text
x
```

lets you enter the directory.

```text
w
```

lets you create/delete/rename files inside, but usually requires `x` too.

### Permission Groups: Owner, Group, Others

Every file has:

```text
owner
group
others
```

Example:

```bash
ls -l notes.txt
```

Output:

```text
-rw-r--r-- 1 rohit staff 2048 Jun 8 notes.txt
```

Here:

```text
owner = rohit
group = staff
others = everyone else
```

Permissions:

```text
rw-   owner can read and write
r--   group can read
r--   others can read
```

Use permissions when you need to control who can read, modify, or run a file.

### Changing Permissions with `chmod`

Use `chmod` to change file permissions.

```bash
chmod permissions filename
```

There are two common styles:

1. Symbolic mode
2. Numeric mode

#### Symbolic `chmod`

Symbolic mode uses:

| Symbol | Meaning              |
| ------ | -------------------- |
| `u`    | User/owner           |
| `g`    | Group                |
| `o`    | Others               |
| `a`    | All                  |
| `+`    | Add permission       |
| `-`    | Remove permission    |
| `=`    | Set exact permission |
| `r`    | Read                 |
| `w`    | Write                |
| `x`    | Execute              |

### Add execute permission for the owner

```bash
chmod u+x script.sh
```

Use this when making a script executable by you.

Example:

```bash
./script.sh
```

If you get:

```text
Permission denied
```

Then run:

```bash
chmod u+x script.sh
```

### Remove write permission from others

```bash
chmod o-w file.txt
```

Use this when you do not want other users modifying a file.

### Give group write permission

```bash
chmod g+w shared.txt
```

Use this when people in the file’s group should be able to edit it.

### Give everyone read permission

```bash
chmod a+r file.txt
```

Use this when all users need to read a file.

### Set exact permissions

```bash
chmod u=rw,g=r,o= file.txt
```

This means:

```text
owner: read/write
group: read
others: no permissions
```

### Numeric `chmod`

Permissions also have numbers:

| Permission | Number |
| ---------- | ------ |
| read       | 4      |
| write      | 2      |
| execute    | 1      |

Add them together:

| Permissions | Number |
| ----------- | ------ |
| `---`       | 0      |
| `--x`       | 1      |
| `-w-`       | 2      |
| `-wx`       | 3      |
| `r--`       | 4      |
| `r-x`       | 5      |
| `rw-`       | 6      |
| `rwx`       | 7      |

Numeric permissions use three digits:

```text
owner group others
```

### Common permission examples

#### `644`

```bash
chmod 644 file.txt
```

Means:

```text
owner: read/write
group: read
others: read
```

Displayed as:

```text
-rw-r--r--
```

Use `644` for normal text files, documents, and config files.

#### `600`

```bash
chmod 600 private.txt
```

Means:

```text
owner: read/write
group: none
others: none
```

Displayed as:

```text
-rw-------
```

Use `600` for private files such as credentials, secrets, or SSH keys.

#### `755`

```bash
chmod 755 script.sh
```

Means:

```text
owner: read/write/execute
group: read/execute
others: read/execute
```

Displayed as:

```text
-rwxr-xr-x
```

Use `755` for scripts or programs that others can run but only the owner can modify.

#### `700`

```bash
chmod 700 private-folder
```

Means:

```text
owner: full access
group: none
others: none
```

Use `700` for private directories.

#### `775`

```bash
chmod 775 shared-folder
```

Means:

```text
owner: full access
group: full access
others: read/execute
```

Use carefully for shared project folders.

#### `777`

```bash
chmod 777 file
```

Means everyone can read, write, and execute.

Avoid this unless you absolutely understand why. It is often a security risk.


## Changing Ownership with `chown`

Use `chown` to change the owner of a file.

```bash
chown newowner filename
```

Example:

```bash
sudo chown rohit notes.txt
```

Usually, changing ownership requires admin privileges, so you often use `sudo`.

### Change owner and group

```bash
sudo chown rohit:staff notes.txt
```

This sets:

```text
owner = rohit
group = staff
```

### Change only the group using `chown`

```bash
sudo chown :staff notes.txt
```

### Change ownership recursively

```bash
sudo chown -R rohit:staff project-folder
```

`-R` means recursive.

Use `chown` when files are owned by the wrong user.

Common situations:

You used `sudo` accidentally and created root-owned files:

```bash
sudo touch file.txt
```

Now normal editing may fail.

Fix it:

```bash
sudo chown rohit:rohit file.txt
```

Or for a whole project:

```bash
sudo chown -R rohit:rohit project-folder
```

Be careful with recursive ownership changes. Do not run broad commands like this unless you know the path is correct:

```bash
sudo chown -R user:user /
```

That can break the system.


## Changing Groups with `chgrp`

Use `chgrp` to change the group of a file.

```bash
chgrp groupname filename
```

Example:

```bash
sudo chgrp developers app.log
```

Recursive group change:

```bash
sudo chgrp -R developers project-folder
```

Use `chgrp` when a group needs access to a file or directory.

Example:

```bash
sudo chgrp -R researchers shared-data
chmod -R g+rw shared-data
```

This gives the `researchers` group access to the shared data.


## Checking Your User and Groups

Check your username:

```bash
whoami
```

Check your groups:

```bash
groups
```

Check another user’s groups:

```bash
groups username
```

Show user ID and group IDs:

```bash
id
```

Example output:

```text
uid=1000(rohit) gid=1000(rohit) groups=1000(rohit),27(sudo),1001(researchers)
```

Use these commands when troubleshooting permission problems.

## Adding Users to Groups

This usually requires admin privileges.

```bash
sudo usermod -aG groupname username
```

Example:

```bash
sudo usermod -aG developers rohit
```

Important: use `-aG`, not just `-G`.

`-aG` means append to group.

Without `-a`, you may remove the user from other groups.

After changing group membership, the user usually needs to log out and back in.

Use this when you want a user to gain access to group-owned files, shared directories, Docker, admin tools, or project resources.

Example:

```bash
sudo usermod -aG docker rohit
```

This allows the user to run Docker commands without `sudo`, depending on the system configuration.

## Using `sudo`

`sudo` runs a command with administrator privileges.

Example:

```bash
sudo apt update
```

or:

```bash
sudo chown root:root /etc/example.conf
```

Use `sudo` when changing system files, installing packages, managing users, or editing protected directories.

Do not use `sudo` casually. It can modify or damage the system.

If a command says:

```text
Permission denied
```

do not automatically add `sudo`. First ask:

```text
Should I have permission to do this?
Am I editing the right file?
Am I in the right directory?
```

## File Permissions: Common Real-Life Scenarios

### Scenario 1: Make a script executable

You have:

```bash
script.sh
```

You try:

```bash
./script.sh
```

But get:

```text
Permission denied
```

Fix:

```bash
chmod u+x script.sh
```

or:

```bash
chmod 755 script.sh
```

Use this when running your own shell script.

### Scenario 2: Protect a private file

You have a file:

```bash
secrets.txt
```

Set it so only you can read/write it:

```bash
chmod 600 secrets.txt
```

Use this for credentials, tokens, keys, or private notes.

### Scenario 3: Private directory

```bash
chmod 700 private-folder
```

Only the owner can enter, read, write, or delete files in it.

Use this for sensitive folders.

### Scenario 4: Shared team folder

Create a group:

```bash
sudo groupadd projectteam
```

Add users:

```bash
sudo usermod -aG projectteam alice
sudo usermod -aG projectteam bob
```

Set folder group:

```bash
sudo chgrp -R projectteam /shared/project
```

Give group access:

```bash
sudo chmod -R g+rw /shared/project
```

Allow group members to enter directories:

```bash
sudo find /shared/project -type d -exec chmod g+rwx {} \;
```

Allow group members to read/write files:

```bash
sudo find /shared/project -type f -exec chmod g+rw {} \;
```

Use this when multiple users need to collaborate.

## Directory Permissions Matter

Suppose you have:

```text
drwx------ private
```

Only the owner can access it.

Suppose you have:

```text
drwxr-xr-x public
```

Others can enter and read contents, but cannot create or delete files.

Suppose you have:

```text
drwxrwx---
```

Owner and group can fully use it. Others have no access.

A common mistake is giving file permissions but forgetting directory permissions.

Example:

```bash
chmod 644 /shared/report.txt
```

The file is readable, but if the directory `/shared` does not allow access, users still cannot reach the file.

They need execute permission on parent directories.

## Recursive Permission Changes

Recursive changes use `-R`.

Example:

```bash
chmod -R 755 myfolder
```

This changes every file and directory inside.

Be careful.

A better approach is often to set directories and files differently.

Example:

Directories need execute permission:

```bash
find myfolder -type d -exec chmod 755 {} \;
```

Files often do not need execute permission:

```bash
find myfolder -type f -exec chmod 644 {} \;
```

Use recursive permission changes when fixing many files, but avoid broad commands on system directories.

## Symbolic Links

A symbolic link is like a shortcut.

Create one with:

```bash
ln -s target linkname
```

Example:

```bash
ln -s /var/log/syslog system-log
```

Now:

```bash
system-log
```

points to:

```bash
/var/log/syslog
```

Use symbolic links when you want convenient access to a file or directory from another location.

Example:

```bash
ln -s ~/Documents/projects/current ~/current-project
```

Check links with:

```bash
ls -l
```

Example output:

```text
current-project -> /home/rohit/Documents/projects/current
```

Remove a symbolic link:

```bash
rm current-project
```

This removes the link, not the target.

## Hard Links

A hard link is another name for the same file data.

Create one:

```bash
ln original.txt hardlink.txt
```

Both names point to the same file content.

Hard links are less commonly used by beginners.

Use symbolic links most of the time.

## Disk Usage and File Sizes

### Show file and directory sizes

```bash
du -h filename
```

### Show directory total size

```bash
du -sh foldername
```

Example:

```bash
du -sh ~/Downloads
```

### Show disk free space

```bash
df -h
```

Use `du` to find what is using space.

Use `df` to see how full disks or partitions are.

## Copying Between Machines

For remote machines, use `scp` or `rsync`.

### Copy file to remote server

```bash
scp file.txt user@example.com:/home/user/
```

### Copy file from remote server

```bash
scp user@example.com:/home/user/file.txt .
```

### Copy directory to remote server

```bash
scp -r project user@example.com:/home/user/
```

### Use `rsync`

```bash
rsync -av project/ user@example.com:/home/user/project/
```

Useful `rsync` options:

| Option     | Meaning                                |
| ---------- | -------------------------------------- |
| `-a`       | Archive mode                           |
| `-v`       | Verbose                                |
| `-z`       | Compress during transfer               |
| `--delete` | Delete destination files not in source |

Example:

```bash
rsync -avz project/ user@example.com:/home/user/project/
```

Use `scp` for simple copies.

Use `rsync` for backups, repeated syncs, or large directories.

## Moving Around Faster

### Tab completion

Type part of a file or directory name, then press:

```text
Tab
```

Example:

```bash
cd Doc<Tab>
```

May complete to:

```bash
cd Documents/
```

Use Tab completion constantly. It saves time and prevents typos.

### Command history

Press:

```text
Up Arrow
```

to recall previous commands.

Search command history:

```text
Ctrl + R
```

Then type part of an old command.

### Clear the screen

```bash
clear
```

or press:

```text
Ctrl + L
```

## Quoting File Names with Spaces

Linux allows spaces in file names, but they can be annoying.

Example file:

```text
my notes.txt
```

This will fail:

```bash
cat my notes.txt
```

Because the shell sees two arguments:

```text
my
notes.txt
```

Use quotes:

```bash
cat "my notes.txt"
```

or escape the space:

```bash
cat my\ notes.txt
```

Best practice: use names like:

```text
my_notes.txt
my-notes.txt
```

instead of spaces.

## Environment Variables Related to Files

### `$HOME`

Your home directory:

```bash
echo $HOME
```

Example output:

```text
/home/rohit
```

Equivalent to:

```bash
~
```

### `$PATH`

Directories where Linux looks for commands:

```bash
echo $PATH
```

Example:

```text
/usr/local/bin:/usr/bin:/bin
```

When you run:

```bash
ls
```

Linux searches directories in `$PATH` to find the `ls` program.

Use `$PATH` knowledge when installing scripts or troubleshooting “command not found.”

## Running Programs and Scripts

To run a command already in your `$PATH`:

```bash
ls
```

To run a script in the current directory:

```bash
./script.sh
```

The `./` means:

```text
current directory
```

Linux does not automatically run programs from the current directory unless you specify `./`.

If the script is not executable:

```bash
chmod u+x script.sh
./script.sh
```

Or run it through the shell:

```bash
bash script.sh
```

Use `./script.sh` when the script has execute permission.

Use `bash script.sh` when you want Bash to interpret it directly.

## Compressing and Archiving Files

### Create a `.tar` archive

```bash
tar -cf archive.tar folder/
```

### Extract a `.tar` archive

```bash
tar -xf archive.tar
```

### Create a compressed `.tar.gz`

```bash
tar -czf archive.tar.gz folder/
```

### Extract a `.tar.gz`

```bash
tar -xzf archive.tar.gz
```

Options:

| Option | Meaning              |
| ------ | -------------------- |
| `c`    | Create archive       |
| `x`    | Extract archive      |
| `z`    | Use gzip compression |
| `f`    | File name follows    |
| `v`    | Verbose              |

Verbose example:

```bash
tar -czvf backup.tar.gz Documents/
```

Use archives for backups, transfers, packaging, and saving directory structures.

## Comparing Files

### Compare two text files

```bash
diff file1.txt file2.txt
```

### Side-by-side comparison

```bash
diff -y file1.txt file2.txt
```

Use `diff` when checking what changed between two files.

## Counting Lines, Words, and Characters

Use `wc`.

```bash
wc file.txt
```

Output:

```text
10  50  300 file.txt
```

Meaning:

```text
lines words bytes filename
```

Only lines:

```bash
wc -l file.txt
```

Only words:

```bash
wc -w file.txt
```

Use `wc` for quick file statistics.


## Sorting and Removing Duplicates

### Sort lines

```bash
sort names.txt
```

### Save sorted output

```bash
sort names.txt > sorted-names.txt
```

### Remove duplicate adjacent lines

```bash
uniq names.txt
```

Usually combine with sort:

```bash
sort names.txt | uniq
```

Count duplicates:

```bash
sort names.txt | uniq -c
```

Use these when working with lists, logs, or text data.

## Pipes and Redirection

Linux commands become powerful when combined.

### Redirect output to a file

Overwrite:

```bash
ls > files.txt
```

Append:

```bash
ls >> files.txt
```

### Redirect errors

```bash
command 2> errors.txt
```

### Redirect output and errors

```bash
command > output.txt 2>&1
```

### Pipe output into another command

```bash
ls -l | less
```

Search command output:

```bash
ls -l | grep ".txt"
```

Count files:

```bash
ls | wc -l
```

Use pipes when one command’s output should become another command’s input.

## Common Permission Errors

### `Permission denied`

Possible causes:

1. You do not have permission to read/write/execute.
2. The file is owned by another user.
3. A parent directory blocks access.
4. The file is not executable.
5. The file system is mounted read-only.

Troubleshoot:

```bash
ls -l file
```

Check parent directory:

```bash
ls -ld directory
```

Check your identity:

```bash
whoami
id
```

Fix depending on cause:

```bash
chmod u+x script.sh
```

or:

```bash
sudo chown user:user file
```

or:

```bash
sudo chmod g+w file
```

Do not blindly use `sudo`.

## Common Beginner Command Patterns

### Go home

```bash
cd
```

### See where you are

```bash
pwd
```

### List files

```bash
ls -la
```

### Create folder

```bash
mkdir new-folder
```

### Create file

```bash
touch file.txt
```

### Copy file

```bash
cp file.txt backup.txt
```

### Move file

```bash
mv file.txt Documents/
```

### Rename file

```bash
mv old.txt new.txt
```

### Delete file

```bash
rm file.txt
```

### Delete folder

```bash
rm -r folder
```

### Show file

```bash
cat file.txt
```

### Edit file

```bash
nano file.txt
```

### Search inside files

```bash
grep -rn "text" .
```

### Find file

```bash
find ~ -name "file.txt"
```

### Change permissions

```bash
chmod 644 file.txt
```

### Change owner

```bash
sudo chown user:user file.txt
```

## Safer Habits

Use these habits to avoid mistakes:

### Check your location before dangerous commands

```bash
pwd
```

### Preview wildcard matches

Before:

```bash
rm *.txt
```

Run:

```bash
ls *.txt
```

### Use interactive mode

```bash
rm -i file.txt
cp -i file.txt destination/
mv -i file.txt destination/
```

### Be careful with recursive commands

Commands like these can affect many files:

```bash
rm -r
chmod -R
chown -R
cp -r
```

Always verify the path first.

### Prefer specific paths

Risky:

```bash
rm -rf *
```

Safer:

```bash
rm -ri ./temporary-folder
```

### Avoid unnecessary `sudo`

Only use `sudo` when you understand why administrator permissions are needed.

## Quick Reference Table

| Task                      | Command                    |
| ------------------------- | -------------------------- |
| Show current directory    | `pwd`                      |
| List files                | `ls`                       |
| List details              | `ls -l`                    |
| Show hidden files         | `ls -a`                    |
| Change directory          | `cd directory`             |
| Go home                   | `cd`                       |
| Go up one level           | `cd ..`                    |
| Create directory          | `mkdir name`               |
| Create nested directories | `mkdir -p a/b/c`           |
| Create empty file         | `touch file.txt`           |
| View short file           | `cat file.txt`             |
| View long file            | `less file.txt`            |
| Copy file                 | `cp source destination`    |
| Copy directory            | `cp -r source destination` |
| Move file                 | `mv source destination`    |
| Rename file               | `mv old new`               |
| Remove file               | `rm file`                  |
| Remove directory          | `rm -r directory`          |
| Find file                 | `find path -name "name"`   |
| Search text               | `grep "text" file`         |
| Change permissions        | `chmod 644 file`           |
| Change owner              | `sudo chown user file`     |
| Change group              | `sudo chgrp group file`    |
| Show disk usage           | `du -sh folder`            |
| Show disk free space      | `df -h`                    |

## Good Default Permissions

These are common defaults:

| Item                   | Permission | Command                 |
| ---------------------- | ---------: | ----------------------- |
| Normal file            |      `644` | `chmod 644 file.txt`    |
| Private file           |      `600` | `chmod 600 secret.txt`  |
| Executable script      |      `755` | `chmod 755 script.sh`   |
| Private directory      |      `700` | `chmod 700 private-dir` |
| Normal directory       |      `755` | `chmod 755 directory`   |
| Shared group directory |      `775` | `chmod 775 shared-dir`  |

Remember:

For files:

```text
x means executable
```

For directories:

```text
x means you can enter/traverse the directory
```

## Final Mental Model

Think of Linux file management as answering four questions:

1. **Where am I?**

```bash
pwd
```

2. **What is here?**

```bash
ls -la
```

3. **Where do I want to go?**

```bash
cd path
```

4. **What do I want to do with this file?**

```bash
cp
mv
rm
chmod
chown
chgrp
```
