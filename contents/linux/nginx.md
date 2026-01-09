# NGINX Web Server

nginx ("engine x") is an HTTP web server, reverse proxy, content cache, load balancer, TCP/UDP proxy server, and mail proxy server.

Nginx official documentation: https://nginx.org/en/docs/

## Setup NGINX

For a website severved from `/var/www/example.com/`

```bash
sudo apt update
sudo apt install nginx -y

# After installation, confirm it’s running:

systemctl status nginx
```

### Create the Web Root Directory

If you haven’t already:

```bash
sudo mkdir -p /var/www/example.com
```

Add a test index file:

```bash
echo "<h1>Welcome to example.com</h1>" | sudo tee /var/www/example.com/index.html
```

### Set Permissions

Give ownership to your user (assume your user is yourusername):

```bash
sudo chown -R yourusername:yourusername /var/www/example.com

# Set proper permissions:

sudo chmod -R 755 /var/www
```

### Create an Nginx Server Block

Create the config file:

```bash
sudo nano /etc/nginx/sites-available/example.com
```

Paste this configuration:

```bash
server {
    listen 80;
    listen [::]:80;

    server_name example.com www.example.com;

    root /var/www/example.com;
    index index.html index.htm;

    access_log /var/log/nginx/example.com.access.log;
    error_log /var/log/nginx/example.com.error.log;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

Save and exit.

### Enable the Server Block

Create a symlink from sites-available to sites-enabled:

```bash
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
```

Test nginx configuration:

```bash
sudo nginx -t
```

If you see syntax is ok and test is successful, reload nginx:

```bash
sudo systemctl reload nginx
```

### Disable the Default Server Block (optional, recommended)

The default site may conflict with yours. Disable it:

```bash
sudo rm /etc/nginx/sites-enabled/default
sudo systemctl reload nginx
```

### Adjust Firewall (if UFW is enabled)

Check if UFW is installed:

```bash
sudo ufw status
```

If UFW is active, allow Nginx:

```bash
sudo ufw allow 'Nginx Full'
sudo ufw reload
```

### Add HTTPS

If you have a domain pointing to the server, install Certbot:

```bash
sudo apt install certbot python3-certbot-nginx -y
```

Run:

```bash
sudo certbot --nginx -d example.com -d www.example.com
```

Certbot will automatically modify the Nginx config for SSL.

### Quick Files Summary

| Path                                     | Description                 |
| ---------------------------------------- | --------------------------- |
| `/var/www/example.com`                   | Your website root directory |
| `/etc/nginx/sites-available/example.com` | Your nginx config file      |
| `/etc/nginx/sites-enabled/example.com`   | Symlink enabled config      |
| `/var/log/nginx/`                        | Access and error logs       |


### Troubleshooting Tips
If 403 Forbidden:

* Permission issue → ensure directory is owned by correct user
* Check folder has execute permissions:

```bash
sudo chmod 755 /var/www/example.com
```

If 404 Not Found:

* Confirm your index.html file exists
* Check server block root path is correct

```bash
Run nginx -t and reload
```

## Add Support for PHP

### Install PHP-FPM & Extensions

Install PHP, PHP-FPM, and some common extensions:

```bash
sudo apt update
sudo apt install php-fpm php-mysql php-cli php-curl php-xml php-mbstring -y
```

Check PHP-FPM is running:

```bash
systemctl status php-fpm
```

On some Debian versions, the service may be named php8.2-fpm or similar:

```bash
systemctl status php8.2-fpm
```

### Create Nginx Server Block for Static + PHP

Edit or create:

```bash
sudo nano /etc/nginx/sites-available/example.com
```

Use this config:

```bash
server {
    listen 80;
    listen [::]:80;

    server_name example.com www.example.com;

    root /var/www/example.com;
    index index.php index.html index.htm;

    access_log /var/log/nginx/example.com.access.log;
    error_log /var/log/nginx/example.com.error.log;

    # Serve static files directly
    location / {
        try_files $uri $uri/ /index.php?$args;
    }

    # Pass PHP scripts to PHP-FPM
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;

        # Adjust socket path if needed:
        fastcgi_pass unix:/run/php/php-fpm.sock;
        # or on some systems:
        # fastcgi_pass unix:/run/php/php8.2-fpm.sock;
    }

    # Deny access to .ht* files (leftovers from Apache setups)
    location ~ /\.ht {
        deny all;
    }
}
```

**NOTE:** All the other steps are the same as mentioned in the general NGINX setup above.

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

### Calcualte Number of Hits from a Specific Country

```bash
sudo apt update
sudo apt install geoip-bin geoip-database

awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr > /tmp/ip_counts.txt

while read count ip; do
    if geoiplookup "$ip" | grep -q "Singapore"; then
        echo "$count $ip"
    fi
done < /tmp/ip_counts.txt
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

    # Add common scanner libraries
    ~*fasthttp 1;
    ~*go-http-client 1;
    ~*python-requests 1;~~~~
    ~*aiohttp 1;
    ~*okhttp 1;
    ~*scrapy 1;
    ~*zgrab 1;

    # Bad crawlers
    ~*ahrefs 1;
    ~*semrush 1;
    ~*mj12bot 1;
    ~*dotbot 1;
    ~*serpstat 1;
    ~*rogerbot 1;
    ~*linkpadbot 1;

    # AI / LLM scrapers
    ~*amazonbot 1;
    ~*gptbot 1;
    ~*chatgpt 1;
    ~*chatgpt-user 1;
    ~*ccbot 1;
    ~*anthropic 1;
    ~*claudebot 1; 
    ~*bytespider 1;
    ~*commoncrawl 1;

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