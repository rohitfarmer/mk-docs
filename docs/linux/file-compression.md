# File Compression

## Create TAR Archives

```bash
tar --exclude-vcs --exclude-backups --exclude=._* --exclude='Flow_15c' --exclude='h5n1_3.6_new_enet.sif' --exclude=temp* -zcvf h5n1_july_26_2022.tar.gz h5n1
```