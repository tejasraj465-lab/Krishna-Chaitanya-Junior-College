# Upload Krishna Chaitanya Junior College to Hostinger

This site is a static React build plus one PHP file for Campus Guide AI. Hostinger does not run Node.js for this app.

## 1. Build on this computer

In PowerShell, from the project folder:

```powershell
$env:VITE_SITE_URL="https://www.yourdomain.com"
npm.cmd run build:hostinger
```

Replace `https://www.yourdomain.com` with the real Hostinger domain (include `https://`, no trailing slash).

The upload folder is **`dist/`**.

## 2. What to put in Hostinger `public_html`

Open **hPanel → Files → File Manager → public_html**.

1. Turn on **Show hidden files** (needed for `.htaccess` and `.user.ini`).
2. Delete Hostinger’s default `index.html` / `default.php` if present.
3. Upload **everything inside `dist/`**, not the `dist` folder itself.

After upload, `public_html` must contain:

| File / folder | Purpose |
|---|---|
| `index.html` | Main website |
| `assets/` | JS, CSS, images |
| `.htaccess` | HTTPS, SPA routes, security headers |
| `.user.ini` | PHP hardening |
| `api/ai-guide.php` | Campus Guide AI endpoint |
| `api/gemini-config.example.php` | Template for the API key |
| `sitemap.xml`, `robots.txt` | SEO |

Do **not** upload `node_modules`, `src`, or `package.json`.

## 3. Code you must add on the server (AI)

In `public_html/api/`, duplicate `gemini-config.example.php` and rename the copy to:

**`gemini-config.php`**

Edit it on Hostinger (File Manager → Edit):

```php
<?php
declare(strict_types=1);

return [
    'gemini_api_key' => 'PASTE_YOUR_GEMINI_API_KEY_HERE',
];
```

Keep `gemini-config.php` only on Hostinger. Do not commit it to Git. `.htaccess` already blocks browsers from downloading this file.

Without this file, the website still works. Campus Guide AI uses on-site answers first; Gemini is only for extra questions.

## 4. Hostinger settings to check

- **SSL:** enable HTTPS (Let’s Encrypt) so `.htaccess` can force `https://`.
- **PHP:** 8.1 or newer.
- **Apache `mod_rewrite`:** on by default on Hostinger. Needed so `/campuses/c8` opens the site instead of a 404.

## 5. Test after upload

- `https://www.yourdomain.com/` — home page
- `https://www.yourdomain.com/campuses` — campus list (rewrite works)
- `https://www.yourdomain.com/gallery` — gallery
- Apply form → WhatsApp
- Campus Guide AI chat

## 6. Google Search Console and Google Tag Manager

After the site is live, in [Google Search Console](https://search.google.com/search-console):

1. Add the Hostinger domain (URL prefix or Domain property).
2. Verify with the HTML tag. Put the `content` value into `VITE_GOOGLE_SITE_VERIFICATION` and rebuild, **or** paste the meta tag in Hostinger File Manager on `index.html` until the next build.
3. Open **Sitemaps** and submit:

   `https://www.yourdomain.com/sitemap.xml`

That single file lists every public page and its images. Do not submit extra XML files.

For [Google Tag Manager](https://tagmanager.google.com):

1. Create a container and copy the ID (`GTM-XXXXXXX`).
2. Set `VITE_GTM_ID=GTM-XXXXXXX` before `npm.cmd run build:hostinger`.
3. Rebuild and re-upload `dist/`.

