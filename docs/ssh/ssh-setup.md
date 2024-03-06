# SSH Setup

## To generate an SSH key.
`ssh-keygen`

### To transfer an SSH key to the remote computer. 
`ssh-copy-id -i ~/.ssh/mykey user@host`

### Add key to ssh agent.
For error:
ERROR: Repository not found.
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.

`ssh-add ~/.ssh/mykey`

## Config File
```bash
Host *
     ServerAliveInterval 120

Host comet
     Hostname comet.sdsc.xsede.org
     User 
     IdentityFile ~/.ssh/

Host comet.sdsc.xsede.org
     Hostname comet.sdsc.xsede.org
     User 
     IdentityFile ~/.ssh/

Host bridges
     Hostname bridges.psc.xsede.org
     User 

Host chpc
     Hostname login.chpc.wustl.edu
     User 

Host swami
    Hostname swamicompute.wustl.edu
    User 
    IdentityFile ~/.ssh/
```

Change config file permission to `chmod 600 ~/.ssh/config`

## Allow password login a GCP instance user
This is to enable password login to a non-sudo/root user on a Google cloud instance.
```bash
sudo vi /etc/ssh/sshd_config

Then, change the line: PasswordAuthentication no to PasswordAuthentication yes

sudo service ssh restart
```

## SSHFS
To mount create a mount point (directory) `sshfs user@host:/folder/to/mount/ mount/point`