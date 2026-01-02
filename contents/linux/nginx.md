# NGINX

nginx ("engine x") is an HTTP web server, reverse proxy, content cache, load balancer, TCP/UDP proxy server, and mail proxy server.

Nginx official documentation: https://nginx.org/en/docs/

## NGINX Access Log and Monitoring Tools

```bash
# Realtime 
tail -f /var/log/nginx/access.log

# Highest count
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -20

# Today
grep "$(date '+%d/%b/%Y:%H')" /var/log/nginx/access.log | awk '{print $1}' | sort | uniq -c | sort -nr | head
```

### NGINX Specific Fail2Ban Actions

```bash
sudo tail -f /var/log/fail2ban.log | grep --line-buffered -i nginx
```

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

## Block Bad User Agents

Edit or create:

```bash
/etc/nginx/conf.d/bot-blocks.conf
```

Put the following content:

```bash
map $http_user_agent $block_bad_ua {
    default 0;

    # Old / dead Windows
    ~*windows\ nt(?!\ 10\.0|\ 6\.3|\ 6\.2|\ 6\.1) 1;
    ~*windows\ 95 1;
    ~*windows\ 98 1;
    ~*windows\ me 1;
    ~*windows\ xp 1;
    ~*windows\ vista 1;
    ~*windows\ 2000 1;

    # CLI tools
    ~*wget 1;
    ~*curl 1;
    ~*httpie 1;
    ~*powershell 1;
    ~*python-requests 1;
    ~*python-urllib 1;
    ~*perl 1;
    ~*ruby 1;
    ~*go-http-client 1;
    ~*java 1;

    # Scanners & exploit tools
    ~*nmap 1;
    ~*masscan 1;
    ~*nikto 1;
    ~*sqlmap 1;
    ~*acunetix 1;
    ~*nessus 1;
    ~*openvas 1;
    ~*zgrab 1;
    ~*dirbuster 1;
    ~*dirb 1;
    ~*gobuster 1;
    ~*wfuzz 1;

    # Bad crawlers
    ~*ahrefs 1;
    ~*semrush 1;
    ~*mj12bot 1;
    ~*dotbot 1;
    ~*serpstat 1;
    ~*rogerbot 1;
    ~*linkpadbot 1;

    # Generic junk
    ~*bot 1;
    ~*crawler 1;
    ~*scanner 1;
    ~*spider 1;
}
```

### Enable the Block on Your Website

Edit

```bash
/etc/nginx/sites-available/your-site.conf
```

Add near the top of server {}:

```bash
server {
    if ($block_bad_ua) { return 444; }

    ...
}
```

#### Block these exploit paths in Nginx (fast + safe)

Add this to your HTTPS server block (and optionally the HTTP one too) above your normal `location /`:

Common exploit probing paths (drop immediately)

```bash
location ~* ^/(cgi-bin|wp-admin|wp-login\.php|\.env|phpmyadmin|manager|HNAP1)/ {
    return 444;
}
```

### Test It

```bash
sudo nginx -t
sudo systemctl reload nginx

curl -A "wget" http://yourdomain.com
curl -A "Windows NT 4.0" http://yourdomain.com
```