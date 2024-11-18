# Syncing Stuff Using rsync

## Tutorials
[How To Use Rsync to Sync Local and Remote Directories](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories)

## To copy files from a remote to a local location over ssh

```bash
# rsync options source destination
rsync -av hpc:/hpcdata/vrc/vrc1_data/douek_lab/farmerr2/sandbox/hiv-rv217/results/czid .
```

Here:

`-a` is to archive. It preserves time stamps and permissions. 
`-v` is for verbose

The `hpc` is the remote location name stored in `~.ssh/config` file. We can also use `username@ip/hostname` instead.


## Enable partial copy and other options

```bash
EXCLUDE_LIST="/home/user/exclude.txt"
LOGFILE="/home/user/rsync.log"
SOURCE="/home/user/documents/"
DESTINATION="/mnt/backup/"

rsync -a -h -v -P --exclude-from=$EXCLUDE_LIST --log-file=$LOGFILE $SOURCE $DESTINATION
```

**Explanation of Options:**

`-a` (archive mode):
This enables recursive copying and preserves symbolic links, permissions, modification times, and other file attributes. It's commonly used for backups.

`-h` (human-readable):
Makes the output more readable by displaying file sizes in human-readable units (e.g., KB, MB, GB).

`-v` (verbose):
Provides detailed output of the synchronization process, showing which files are being transferred or skipped.

`-P` (progress and partial):

Combines two flags:

`--progress`: Displays the progress of each file transfer.
`--partial`: Keeps partially transferred files if the transfer is interrupted, allowing it to resume later.

`--exclude-from=$EXCLUDE_LIST`:
Excludes files and directories listed in the file specified by $EXCLUDE_LIST. Each line in this file represents a pattern to exclude.

`--log-file=$LOGFILE`:
Logs the output of the rsync operation to the file specified by $LOGFILE. This is useful for debugging or keeping a record of what was synced.

`$SOURCE`:
Specifies the source directory or file(s) to synchronize.

`$DESTINATION`:
Specifies the target directory or location to synchronize the source to.

**Key Points:**
* **Safety:** By default, rsync does not delete files in the destination that are not in the source. If you want to delete extraneous files, you would need to add the `--delete` flag.
* **Dry Run:** If you want to preview what will happen without making changes, add the `--dry-run` flag.