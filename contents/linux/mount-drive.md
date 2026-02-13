---
comments: true
---

# Mount External Drive

To mount an external HDD **read/write** at `/mnt/gdrive10tb` on **Linux Mint** (works the same on Ubuntu/Debian).

## Identify the external HDD

Plug in the drive, then run:

```bash
lsblk -f
```

You’ll see something like:

```text
sdb
└─sdb1 ext4   GDRIVE10TB  a1b2c3d4-...
```

Take note of:

* **Device**: `/dev/sdb1`
* **Filesystem**: `ext4`, `ntfs`, or `exfat`
* **UUID** (recommended for fstab)

## Create the mount point

```bash
sudo mkdir -p /mnt/gdrive10tb
```

## Test a manual mount (important)

### If the drive is **ext4** (best case)

```bash
sudo mount /dev/sdb1 /mnt/gdrive10tb
```

Check:

```bash
mount | grep gdrive10tb
```

## Fix ownership (for write access without sudo)

If you mounted successfully but can only write as root:

```bash
sudo chown -R $USER:$USER /mnt/gdrive10tb
```

Test:

```bash
touch /mnt/gdrive10tb/testfile
```

## Make it persistent (auto-mount at boot)

### Get the UUID

```bash
blkid /dev/sdb1 # or use lsblk -f
```

Example output:

```text
UUID="a1b2c3d4-5678" TYPE="ext4"
```

### Edit `/etc/fstab`

```bash
sudo vim /etc/fstab
```

### Add one of the following lines

### EXT4 (recommended)

```fstab
UUID=a1b2c3d4-5678  /mnt/gdrive10tb  ext4  defaults,noatime  0  2
```


### NTFS

```fstab
UUID=a1b2c3d4-5678  /mnt/gdrive10tb  ntfs-3g  rw,uid=1000,gid=1000,noatime  0  0
```


### exFAT

```fstab
UUID=a1b2c3d4-5678  /mnt/gdrive10tb  exfat  rw,uid=1000,gid=1000,noatime  0  0
```

(`uid=1000` is your normal user on Linux Mint.)


## Test fstab safely (do NOT reboot yet)

```bash
sudo mount -a
```

## Verify read/write access

```bash
df -h | grep gdrive10tb
touch /mnt/gdrive10tb/works.txt
```


## Common pitfalls (Mint users hit these)

* **NTFS drive mounted read-only**
  → Windows Fast Startup wasn’t disabled
  Fix in Windows:

  ```text
  Control Panel → Power Options → Disable Fast Startup
  ```

* **Permission denied after reboot**
  → You forgot `uid=` / `gid=` on NTFS/exFAT

* **Drive not present at boot**
  → Add `nofail` to fstab:

  ```fstab
  defaults,nofail
  ```

