# Tor

## To route everything running in a shell through tor

```bash
install tor
install torsocks

source torsocks on #everything in this particular shell will be routed through tor
```

## Serve a website on Tor network with an Onion URL

### Install Tor

Debian/Ubuntu:

```bash
sudo apt update
sudo apt install -y tor
sudo systemctl enable --now tor
```

### Configure a v3 onion service

Edit Tor config:

```bash
sudo nano /etc/tor/torrc
```

Add:

```conf
HiddenServiceDir /var/lib/tor/yourwebsite_onion/
HiddenServiceVersion 3
HiddenServicePort 80 127.0.0.1:8080
```

Fix permissions + restart Tor:

```bash
sudo mkdir -p /var/lib/tor/yourwebsite_onion
sudo chown -R debian-tor:debian-tor /var/lib/tor/yourwebsite_onion
sudo chmod 700 /var/lib/tor/yourwebsite_onion

sudo systemctl restart tor
```

Get your onion address:

```bash
sudo cat /var/lib/tor/yourwebsite_onion/hostname
```

That value is your `xxxxxxxx....onion`.

### Add an Nginx listener only on localhost:8080

Create a new Nginx config (separate from your 443 certbot one):

```bash
sudo nano /etc/nginx/sites-available/rohitfarmer-onion.conf
```

Paste:

```nginx
server {
    listen 127.0.0.1:8080;
    listen [::1]:8080;

    root /path/to/yourwebsite.com;
    index index.html;
    server_name yourwebsite.com www.yourwebsite.com;

    add_header Onion-Location "http://sdfjslkdfjslkdf.onion$request_uri" always;

    #location ~* ^/(cgi-bin|wp-admin|wp-login\.php|\.env|phpmyadmin|manager|HNAP1)/ { return 444; }

    location / { try_files $uri $uri/ =404; }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php8.2-fpm.sock;
    }

    location ~ /\.ht { deny all; }

    access_log off;
}
```

Enable + reload:

```bash
sudo ln -s /etc/nginx/sites-available/yourwebsite-onion.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Test

From a machine with Tor Browser, open the onion URL you got from the `hostname` file.

On the VM you can also sanity-check the local backend:

```bash
curl -I http://127.0.0.1:8080/
```

### Two common problems (quick fixes)

* If your HTML hardcodes `https://yourwebsite.com/...` for assets/links, onion visitors will get sent to clearnet. Prefer relative URLs (`/css/site.css`) where possible.
* Don’t add redirects in the onion server block that force `https://yourwebsite.com`.

