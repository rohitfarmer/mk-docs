# xRDP

Connect to a remote Linux server from a Windows machine using xRDP to get an interactive GUI. 

## Setup on the Linux (Mint in my case) Server

Open a terminal and install xRDP:

```bash
sudo apt update
sudo apt install xrdp -y
```

Enable and start the service:
```bash
sudo systemctl enable xrdp
sudo systemctl start xrdp
```

Allow RDP through the firewall (if enabled):

```bash
sudo ufw allow 3389
```

Check status:

```bash
systemctl status xrdp
```

### Desktop session fix (important)

Linux Mint uses Cinnamon/MATE/Xfce. To avoid a black screen:

```bash
echo "exec cinnamon-session" > ~/.xsession
```

`(If using Xfce: exec startxfce4)`

Reboot once:

```bash
sudo reboot
```

## On your Windows laptop

1. Press Win + R
2. Type `mstsc`
3. Enter your Mint server IP (e.g. 192.168.1.50)
4. Log in with your Linux username + password