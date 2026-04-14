# 🔐 Setup Guide - Adding Your Credentials

## ⚠️ Important: Credentials Are Now Protected!

Your Firebase and Cloudinary credentials are **no longer on GitHub** for security. You need to set them up locally.

---

## 📋 What Happened?

✅ **Removed from GitHub:**
- `firebase-config.js` (contained Firebase credentials)
- `cloudinary-config.js` (contained Cloudinary credentials)

✅ **Added to GitHub:**
- `firebase-config.template.js` (safe template)
- `cloudinary-config.template.js` (safe template)

✅ **Protected by .gitignore:**
- Real credential files will never be committed to GitHub again

---

## 🛠️ Setup Instructions (Local Development)

### Step 1: Create Firebase Config File

1. Copy the template file:
   ```
   firebase-config.template.js → firebase-config.js
   ```

2. Open `firebase-config.js` and replace placeholders with your Firebase credentials:

   ```javascript
   export const firebaseConfig = {
       apiKey: "YOUR_API_KEY",              // ← Replace
       authDomain: "YOUR_PROJECT.firebaseapp.com",  // ← Replace
       databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",  // ← Replace
       projectId: "YOUR_PROJECT_ID",        // ← Replace
       storageBucket: "YOUR_PROJECT.firebasestorage.app",  // ← Replace
       messagingSenderId: "YOUR_SENDER_ID", // ← Replace
       appId: "YOUR_APP_ID"                 // ← Replace
   };
   
   export const isFirebaseConfigured = true;  // ← Change to true
   ```

3. **Where to find Firebase credentials:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project: `carvoyage-2led3`
   - Click ⚙️ (Settings) → Project settings
   - Scroll to "Your apps" section
   - Click on the web app icon
   - Copy the config object

---

### Step 2: Create Cloudinary Config File

1. Copy the template file:
   ```
   cloudinary-config.template.js → cloudinary-config.js
   ```

2. Open `cloudinary-config.js` and replace placeholders:

   ```javascript
   export const cloudinaryConfig = {
       cloudName: 'dzb4klhd8',           // ← Your cloud name
       apiKey: '322962445971584',        // ← Your API key
       apiSecret: 'YOUR_API_SECRET',     // ← Your API secret
       uploadPreset: 'sfactor_gallery'   // ← Your upload preset
   };
   ```

3. **Where to find Cloudinary credentials:**
   - Go to [Cloudinary Dashboard](https://cloudinary.com/console)
   - Look at the top of the dashboard
   - You'll see:
     - **Cloud Name**: `dzb4klhd8`
     - **API Key**: `322962445971584`
     - **API Secret**: Click "Reveal" to see it
   - For upload preset: Settings → Upload → Upload presets

---

## 🚀 Quick Setup Commands

Run these commands in your terminal:

```bash
# Copy template files
cp firebase-config.template.js firebase-config.js
cp cloudinary-config.template.js cloudinary-config.js

# Now edit the files with your credentials
# Use any text editor (VS Code, Notepad, etc.)
```

**Or on Windows PowerShell:**
```powershell
Copy-Item firebase-config.template.js firebase-config.js
Copy-Item cloudinary-config.template.js cloudinary-config.js
```

---

## ✅ Verification Checklist

After adding credentials:

- [ ] `firebase-config.js` exists in project root
- [ ] `firebase-config.js` has real Firebase credentials (not placeholders)
- [ ] `isFirebaseConfigured` is set to `true`
- [ ] `cloudinary-config.js` exists in project root
- [ ] `cloudinary-config.js` has real Cloudinary credentials
- [ ] Files are NOT showing in `git status` (protected by .gitignore)
- [ ] Local site works: `python -m http.server 8000`
- [ ] Admin panel can login to Firebase
- [ ] File upload to Cloudinary works

---

## 🔒 Security Notes

### ✅ Safe to Commit (No Credentials):
- `firebase-config.template.js`
- `cloudinary-config.template.js`
- All other project files

### ❌ NEVER Commit (Contains Credentials):
- `firebase-config.js`
- `cloudinary-config.js`
- Any `.env` files
- Any files with API keys/secrets

### Protected by .gitignore:
```gitignore
firebase-config.js
cloudinary-config.js
```

---

## 🌐 Deployment (Netlify)

When deploying to Netlify, you have two options:

### Option 1: Upload Files via Netlify Dashboard

1. Build your site locally
2. Go to Netlify dashboard
3. Drag and drop the **entire folder** (includes credential files)
4. Site deploys with credentials

**Note:** Credential files are only on your computer and Netlify servers, NOT on GitHub.

### Option 2: Use Environment Variables (Recommended for Production)

1. In Netlify dashboard: Site settings → Environment variables
2. Add these variables:
   ```
   FIREBASE_API_KEY=your_key
   FIREBASE_AUTH_DOMAIN=your_domain
   FIREBASE_DATABASE_URL=your_url
   FIREBASE_PROJECT_ID=your_id
   FIREBASE_STORAGE_BUCKET=your_bucket
   FIREBASE_MESSAGING_SENDER_ID=your_id
   FIREBASE_APP_ID=your_id
   
   CLOUDINARY_CLOUD_NAME=dzb4klhd8
   CLOUDINARY_API_KEY=322962445971584
   CLOUDINARY_API_SECRET=your_secret
   CLOUDINARY_UPLOAD_PRESET=sfactor_gallery
   ```

3. Update config files to read from environment variables:
   ```javascript
   export const firebaseConfig = {
       apiKey: process.env.FIREBASE_API_KEY,
       authDomain: process.env.FIREBASE_AUTH_DOMAIN,
       // ... etc
   };
   ```

---

## 📁 Final File Structure

```
Social-media-handles/
├── firebase-config.js            ← YOUR CREDENTIALS (local only, NOT on GitHub)
├── firebase-config.template.js   ← Safe template (on GitHub)
├── cloudinary-config.js          ← YOUR CREDENTIALS (local only, NOT on GitHub)
├── cloudinary-config.template.js ← Safe template (on GitHub)
├── index.html
├── script.js
├── style.css
├── admin.html
├── admin.js
└── ... other files
```

---

## 🆘 Troubleshooting

### Issue: "Firebase initialization failed"
**Solution:** Check that `firebase-config.js` exists and has valid credentials.

### Issue: "Cloudinary upload failed"
**Solution:** Verify `cloudinary-config.js` has correct cloud name and upload preset.

### Issue: Files showing in `git status`
**Solution:** Run `git rm --cached firebase-config.js cloudinary-config.js` to remove from tracking.

### Issue: Site works locally but not on Netlify
**Solution:** Make sure you uploaded the folder with credential files, or set environment variables.

---

## 📞 Need Help?

If you need to find your credentials:

**Firebase:**
1. Go to https://console.firebase.google.com/
2. Select project: `carvoyage-2led3`
3. Settings → Project settings → Your apps

**Cloudinary:**
1. Go to https://cloudinary.com/console
2. Dashboard shows cloud name and API key
3. Settings → Upload → Upload presets

---

## ✨ Benefits of This Setup

1. ✅ **Secure** - Credentials never exposed on GitHub
2. ✅ **Clean Repository** - Only template files visible
3. ✅ **Easy Setup** - Copy templates and add credentials
4. ✅ **Team-Friendly** - Others can setup with their own credentials
5. ✅ **Protected** - .gitignore prevents accidental commits
6. ✅ **Professional** - Follows security best practices

---

**Your credentials are now secure! 🔐**
