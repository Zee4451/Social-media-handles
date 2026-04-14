# Netlify Deployment Guide - S. Factor Dance Crew

## 🚀 Quick Deploy to Netlify

Your project is now fully optimized for Netlify deployment!

---

## Method 1: Drag & Drop (Easiest)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag your entire project folder onto the page
3. Wait for deployment (30-60 seconds)
4. Your site is live! 🎉

**Custom Domain:**
- Go to Site Settings → Domain Management
- Add your custom domain
- Configure DNS records as instructed

---

## Method 2: Git Integration (Recommended)

### GitHub:

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Deploy to Netlify"
   git push origin main
   ```

2. Go to [app.netlify.com](https://app.netlify.com)
3. Click **"New site from Git"**
4. Choose **GitHub**
5. Authorize Netlify
6. Select your repository
7. Build settings (auto-detected from netlify.toml):
   - Build command: (leave blank)
   - Publish directory: `.`
8. Click **"Deploy site"**

### Automatic Deploys:
- Every push to main branch = automatic deploy
- Pull requests = preview deployments
- Rollback to any previous deploy instantly

---

## Method 3: Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Initialize site:
   ```bash
   netlify init
   ```

4. Deploy:
   ```bash
   netlify deploy --prod
   ```

---

## ✅ What's Already Configured

Your project includes these Netlify optimizations:

### 1. **netlify.toml** Configuration
- ✅ Publish directory set to root (`.`)
- ✅ No build command needed (static site)
- ✅ `/login` redirects to `/admin.html`
- ✅ Security headers (XSS, Clickjacking protection)
- ✅ Cache headers for static assets (1 year)
- ✅ CORS headers for Firebase/CDN

### 2. **_redirects** File
- ✅ Clean URL: `/login` → `/admin.html`
- ✅ 200 status (SPA rewrite)

### 3. **Performance Optimizations**
- ✅ Static assets cached for 31,536,000 seconds (1 year)
- ✅ CSS, JS, images, videos all cached
- ✅ Reduced bandwidth costs
- ✅ Faster repeat visits

### 4. **Security Headers**
- ✅ X-Content-Type-Options: nosniff
- ✅ X-Frame-Options: DENY
- ✅ X-XSS-Protection: 1; mode=block
- ✅ Referrer-Policy: strict-origin-when-cross-origin
- ✅ Permissions-Policy: camera/mic/geolocation disabled

---

## 🔧 Netlify Features You Can Use

### 1. **Form Handling** (Future)
Add `netlify` attribute to forms to collect submissions:
```html
<form name="contact" netlify>
  <!-- form fields -->
</form>
```

### 2. **Serverless Functions** (Future)
Create `netlify/functions/` directory for backend logic:
```javascript
// netlify/functions/hello.js
exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello!" })
  };
};
```

### 3. **Split Testing**
Test different versions in Site Settings → Split Tests

### 4. **Analytics**
Enable Netlify Analytics in dashboard for visitor insights

### 5. **Password Protection**
Protect admin panel:
- Site Settings → Access Control → Password Protection
- Or use Firebase Auth (already implemented!)

---

## 🌐 Custom Domain Setup

1. Go to **Site Settings** → **Domain Management**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `sfactordancecrew.com`)
4. Configure DNS:
   - **Option A:** Netlify DNS (recommended)
     - Change nameservers to Netlify's
   - **Option B:** External DNS
     - Add CNAME record: `yourdomain.com → your-site.netlify.app`
5. Wait for DNS propagation (up to 48 hours)
6. Free SSL certificate auto-provisioned! 🎉

---

## 📊 Environment Variables (Optional)

If you want to store Firebase config in environment variables:

1. Go to **Site Settings** → **Environment Variables**
2. Add variables:
   ```
   FIREBASE_API_KEY=AIzaSy...
   FIREBASE_AUTH_DOMAIN=carvoyage-2led3.firebaseapp.com
   FIREBASE_DATABASE_URL=https://carvoyage-2led3-default-rtdb.firebaseio.com
   FIREBASE_PROJECT_ID=carvoyage-2led3
   FIREBASE_STORAGE_BUCKET=carvoyage-2led3.firebasestorage.app
   FIREBASE_MESSAGING_SENDER_ID=790960970254
   FIREBASE_APP_ID=1:790960970254:web:b9f92f60ae4e744b40ba5f
   ```

3. Update `firebase-config.js` to use environment variables:
   ```javascript
   export const firebaseConfig = {
       apiKey: process.env.FIREBASE_API_KEY,
       authDomain: process.env.FIREBASE_AUTH_DOMAIN,
       databaseURL: process.env.FIREBASE_DATABASE_URL,
       projectId: process.env.FIREBASE_PROJECT_ID,
       storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
       messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
       appId: process.env.FIREBASE_APP_ID
   };
   ```

**Note:** For static sites, Firebase config is typically public anyway. This is optional.

---

## 🔍 Deployment Checklist

Before going live:

- [ ] Test site on Netlify URL
- [ ] Verify `/login` redirects to `/admin.html`
- [ ] Test Firebase authentication
- [ ] Test admin panel CRUD operations
- [ ] Test file upload feature
- [ ] Verify all social links work
- [ ] Check mobile responsiveness
- [ ] Test gallery carousel
- [ ] Verify video playback
- [ ] Check browser console for errors
- [ ] Set up custom domain (optional)
- [ ] Enable HTTPS (automatic on Netlify)
- [ ] Add to Google Search Console
- [ ] Submit sitemap

---

## 🐛 Troubleshooting

### Issue: Site not loading
**Solution:** Check Netlify deploy log for errors

### Issue: `/login` shows 404
**Solution:** Verify `_redirects` file or `netlify.toml` redirects section

### Issue: Firebase not connecting
**Solution:** 
- Check Firebase config in `firebase-config.js`
- Verify Firebase security rules
- Check browser console for errors

### Issue: Files not caching
**Solution:** 
- Verify `netlify.toml` headers section
- Hard refresh browser (Ctrl+Shift+R)
- Check Network tab in DevTools

### Issue: CORS errors
**Solution:** 
- CORS headers already configured in `netlify.toml`
- Firebase should handle its own CORS

---

## 📈 Performance Tips

1. **Image Optimization:**
   - Use WebP format when possible
   - Compress images with TinyPNG
   - Max 500KB per image

2. **Video Optimization:**
   - Use HandBrake to compress videos
   - Target 5-10MB per video
   - Use poster images for faster loading

3. **CDN:**
   - Netlify provides global CDN automatically
   - Assets served from nearest edge location

4. **Caching:**
   - Static assets cached for 1 year
   - HTML not cached (always fresh)

---

## 🎯 Netlify Free Tier Limits

Your project is well within free tier:

- ✅ 100GB bandwidth/month (you'll use ~1-2GB)
- ✅ 300 build minutes/month (you need 0 - no build)
- ✅ Unlimited sites
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ Form handling (100 submissions/month)
- ✅ Serverless functions (125K invocations/month)

**Expected Cost: $0/month** 🎉

---

## 📱 Deploy from Mobile

You can deploy updates from your phone:

1. Push code to GitHub from mobile (GitHub app)
2. Netlify auto-deploys on push
3. Or use Netlify mobile app

---

## 🔄 Continuous Deployment

Once connected to Git:

- Push to `main` → Production deploy
- Push to other branch → Preview deploy
- Merge PR → Auto-deploy to production
- Rollback → One-click in dashboard

---

## 📞 Support

- Netlify Docs: https://docs.netlify.com
- Netlify Community: https://community.netlify.com
- Firebase Docs: https://firebase.google.com/docs

---

**Last Updated:** 2025-04-15
**Status:** Ready for Netlify Deployment ✅
