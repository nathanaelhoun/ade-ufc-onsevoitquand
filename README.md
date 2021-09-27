# ade-ufc-onsevoitquand [![Netlify Status](https://api.netlify.com/api/v1/badges/2fd7a0b6-ea48-4ed6-b807-9c0a91749db4/deploy-status)](https://app.netlify.com/sites/admiring-hamilton-f49fca/deploys)

An easy way to find when you can meet your mates in the University of Franche-Comté.

---

Trouver un créneau pour se voir entre étudiants de l'UFC.

## Deploy

To avoid CORS issues, the ADE API has to be proxied by the app. Nginx config for reference:
```nginx
    location /api/v1/ {
        rewrite ^/api/v1/(.*)$ /jsp/custom/ufc/$1 break;

        proxy_pass https://sedna.univ-fcomte.fr/;
        access_log /var/log/nginx/api_logging.log upstream_logging;
    }
```
