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

### NGINX access log

```bash
# Realtime 
tail -f /var/log/nginx/access.log

# Highest count
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -20

# Today
grep "$(date '+%d/%b/%Y:%H')" /var/log/nginx/access.log | awk '{print $1}' | sort | uniq -c | sort -nr | head
```

## Monitoring through additional tools

### Quick “who are they?” (country/ASN)

```bash
sudo apt update && sudo apt install geoip-bin -y

# Lookup top 10 IPs and their location
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -10 | awk '{print $2}' | xargs -I{} geoiplookup {}
```

### Friendly TUI report (GoAccess)

```bash
sudo apt install goaccess -y
goaccess /var/log/nginx/access.log --log-format=COMBINED --ignore-crawlers -a
```