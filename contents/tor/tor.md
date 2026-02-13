---
comments: true
---

# Tor

> Attention: The documentation presented under the Tor category is intended exclusively for educational, hobbyist, and research purposes. It represents personal notes and experiences and is not suitable as guidance for individuals in vulnerable or high-risk situations.

[Tor (short for The Onion Router)](https://www.torproject.org/) is a privacy-focused network designed to let people access the internet without easily revealing who they are or where they are connecting from. Instead of sending traffic directly from your computer to a website, Tor routes it through multiple volunteer-run servers (called relays) around the world. Each relay only knows the step immediately before and after it, not the full path—hence the “onion” metaphor, with layers of encryption peeled away at each hop. This design makes it extremely difficult for any single observer, such as an ISP, network administrator, or local surveillance system, to link a user’s identity with the sites they visit. Tor also supports onion services (addresses ending in `.onion`), where both the user and the website remain hidden from each other while still communicating securely.

The advantages of using Tor are strongest in areas of privacy, censorship resistance, and anonymity. For users, Tor helps protect against tracking, profiling, and location-based surveillance, and it enables access to information that may be blocked or filtered in certain regions. For website operators, onion services allow content to be published without exposing the server’s IP address, reducing the risk of targeted attacks and enabling access even when the public internet is restricted. Because Tor onion services provide built-in end-to-end encryption and authentication, they can offer secure communication without relying on traditional certificate authorities. Together, these properties make Tor a valuable tool for journalists, researchers, activists, and anyone who values privacy and open access to information on the internet.

**Note:** This page focuses on technical notes on setting up Tor for different use cases. If you’re looking for examples of how to access Tor websites, please see the [How to Access Websites on the Tor Network](how-to-access-websites-on-the-tor-network.md) page.

## To route everything running in a shell through Tor

```bash
install tor
install torsocks

source torsocks on #everything in this particular shell will be routed through tor
```

## Serve a website on Tor network with a `.onion` URL

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

