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
