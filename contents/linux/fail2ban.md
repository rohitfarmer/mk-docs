# Fail2Ban

## Setup

```bash
sudo apt update
sudo apt install fail2ban -y

sudo systemctl status fail2ban
```

## Configure

Make a copy of `jail.conf` as `jail.local` and edit it to configure. Do not edit `jail.conf` as it will get overwritten when `fail2ban` updates.

```bash
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

sudo vim /etc/fail2ban/jail.local
```

```vim
[sshd]
enabled = true

[nginx-req-limit]
enabled  = true

etc ...
```

After updating `jail.local` file restart fail2ban and check the status.

```bash
sudo systemctl restart fail2ban
sudo systemctl enable fail2ban
sudo fail2ban-client status
```

## Monitor realtime activity

```bash
sudo tail -f /var/log/fail2ban.log
```

