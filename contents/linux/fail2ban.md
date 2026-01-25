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

## Monitor Realtime Activity

```bash
sudo tail -f /var/log/fail2ban.log
```

### SSHD Specific Fail2Ban Actions

```bash
sudo tail -f /var/log/fail2ban.log | grep --line-buffered -i sshd
```

## Strong Setup for SSHD

Create or edit `/etc/fail2ban/jail.local`:

The settings below will ban an IP permanently after 3 failed `ssh` login attempts within a 10-minute window. 

```bash
[sshd]

# To use more aggressive sshd modes set filter parameter "mode" in jail.local:
# normal (default), ddos, extra or aggressive (combines all).
# See "tests/files/logs/sshd" or "filter.d/sshd.conf" for usage example and details.
mode   = aggressive
port    = ssh
logpath = %(sshd_log)s
backend = %(sshd_backend)s
findtime = 600
maxretry = 3
bantime = -1
```

## Strong Setup for NGINX

The settings below will ban an IP for a week after 5 failed tries within a 10-minute window.

```bash
[nginx-limit-req]

enabled  = true
port    = http,https
logpath = %(nginx_error_log)s
findtime = 600
maxretry = 5
bantime  = 604800

[nginx-botsearch]

enabled  = true
port     = http,https
logpath = %(nginx_access_log)s
findtime = 600
maxretry = 5
bantime = 604800

[nginx-bad-request]

enabled  = true
port    = http,https
logpath = %(nginx_access_log)s
findtime = 600
maxretry = 5
bantime = 604800
```