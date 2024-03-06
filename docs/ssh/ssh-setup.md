# SSH Setup

SSH is a secure protocol used as the primary means of connecting to Linux servers remotely. It provides a text-based interface by spawning a remote shell. After connecting, all commands you type in your local terminal are sent to the remote server and executed there.

* [SSH Essentials: Working with SSH Servers, Clients, and Keys](https://www.digitalocean.com/community/tutorials/ssh-essentials-working-with-ssh-servers-clients-and-keys)


## To generate an SSH key
```bash
ssh-keygen
```

### To transfer an SSH key to the remote computer
```bash
ssh-copy-id -i ~/.ssh/mykey user@host
```

### Add key to ssh agent
```bash
GitHub Error
For error:
ERROR: Repository not found.
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.

ssh-add ~/.ssh/mykey
```

## Config file
```bash
Host *
     ServerAliveInterval 120

Host <nick name of the host>
     Hostname <host address>
     User <user name>
     IdentityFile ~/.ssh/
     ForwardX11 yes
     ForwardX11Trusted yes
```

**Note: Always make sure to change .ssh directory permission to 600.**
```bash
chmod -R 600 ~/.ssh/
```

## Allow password login a GCP instance user
This is to enable password login to a non-sudo/root user on a Google cloud instance.

```bash
sudo vi /etc/ssh/sshd_config

Then, change the line: PasswordAuthentication no to PasswordAuthentication yes

sudo service ssh restart
```

## SSHFS
In computing, SSHFS (SSH Filesystem) is a filesystem client to mount and interact with directories and files located on a remote server or workstation over a normal ssh connection. The client interacts with the remote file system via the SSH File Transfer Protocol (SFTP), a network protocol providing file access, file transfer, and file management functionality over any reliable data stream that was designed as an extension of the Secure Shell protocol (SSH) version 2.0.

* [https://github.com/libfuse/sshfs](https://github.com/libfuse/sshfs)
* [How To Use SSHFS to Mount Remote File Systems Over SSH](https://www.digitalocean.com/community/tutorials/how-to-use-sshfs-to-mount-remote-file-systems-over-ssh)

To mount create a mount point (directory) 

```bash
sshfs user@host:/folder/to/mount/ mount/point
```