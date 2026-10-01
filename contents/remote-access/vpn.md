---
comments: true
---

# VPN

## Install OpenVPN

```bash
sudo apt update
sudo apt install openvpn network-manager-openvpn network-manager-openvpn-gnome
```

**Restart network manager**

```bash
sudo systemctl restart NetworkManager
```

### Start a VPN connection using a config file

```bash
sudo openvpn --config ~/OpenVPN-Config.ovpn
```

## Check the IP location

```bash
curl https://ipinfo.io
```


