# ade-ufc-onsevoitquand [![Netlify Status](https://api.netlify.com/api/v1/badges/2fd7a0b6-ea48-4ed6-b807-9c0a91749db4/deploy-status)](https://app.netlify.com/sites/ade-ufc-onsevoitquand/deploys)

An easy way to find when you can meet your mates in the University of Franche-Comté.

---

Trouver un créneau pour se voir entre étudiants de l'UFC.

> **Warning**
> Le développement sur ce projet est maintenant en pause, car je ne l'utilise plus personnellement. Cependant, si vous ressentez le besoin d'une autre fonctionnalité, ou souhaitez contribuer au code, vous pouvez me contacter via [mon site web](https://nathanaelhoun.fr).

## Local Development

Run `npm install` then `npm start` to launch the development version, powered by [Create React App](https://create-react-app.dev/)

## Deploy

To avoid CORS issues, the ADE API has to be proxied by the app. 
The provided `netlify.toml` config includes this functionnality.  

If you need it, here is the nginx config for reference:
```nginx
    location /api/v1/ {
        rewrite ^/api/v1/(.*)$ /jsp/custom/ufc/$1 break;

        proxy_pass https://sedna.univ-fcomte.fr/;
        access_log /var/log/nginx/api_logging.log upstream_logging;
    }
```
