# Netlify Environment Variables Setup Guide

## Overview

Your Firebase and Cloudinary credentials are stored securely as environment variables in Netlify. During deployment, a build script (`build-config.js`) automatically generates the config files from these variables.

## Step-by-Step Setup

### 1. Access Netlify Dashboard

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Log in to your account
3. Select your site: **sfactordancecrew**

### 2. Navigate to Environment Variables

1. Click on **"Site configuration"** (gear icon ⚙️)
2. In the left sidebar, click on **"Environment variables"**
3. Click **"Add a variable"**

### 3. Add Firebase Variables

Add these environment variables one by one:

| Variable Name | Value | Example |
|--------------|-------|---------|
| `FIREBASE_API_KEY` | Your Firebase API key | `AIzaSyBONodpaChaV7StStdfPXqXHvkgUQMIhXY` |
| `FIREBASE_AUTH_DOMAIN` | Firebase auth domain | `carvoyage-2led3.firebaseapp.com` |
| `FIREBASE_DATABASE_URL` | Firebase database URL | `https://carvoyage-2led3-default-rtdb.firebaseio.com` |
| `FIREBASE_PROJECT_ID` | Firebase project ID | `carvoyage-2led3` |
| `FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | `carvoyage-2led3.firebasestorage.app` |
| `FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | `790960970254` |
| `FIREBASE_APP_ID` | Firebase app ID | `1:790960970254:web:b9f92f60ae4e744b40ba5f` |

**To get these values:**
- Open `firebase-config.js` in your local project
- Copy each value from the `firebaseConfig` object
- Paste into the corresponding Netlify environment variable

### 4. Add Cloudinary Variables

Add these environment variables:

| Variable Name | Value | Example |
|--------------|-------|---------|
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name | `dzb4klhd8` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `322962445971584` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `iHCI5HEaJ-TJ3D5zQnZtkhJdNII` |
| `CLOUDINARY_UPLOAD_PRESET` | Cloudinary upload preset | `sfactor_gallery` |

**To get these values:**
- Open `cloudinary-config.js` in your local project
- Copy each value from the `cloudinaryConfig` object
- Paste into the corresponding Netlify environment variable

### 5. Deploy Your Changes

After adding all environment variables:

1. Go to **"Deploys"** in Netlify
2. Click **"Trigger deploy"** → **"Deploy site"**
3. Wait for the build to complete

### 6. Verify Deployment

1. Check the deploy log - you should see:
   ```
   ✅ Generated firebase-config.js
   ✅ Generated cloudinary-config.js
   🎉 Config files generated successfully!
   ```
2. Visit your site: https://sfactordancecrew.netlify.app
3. Open browser console - the 404 errors should be gone!

## How It Works

```
┌─────────────────────────────────────────────────────────┐
│  Netlify Build Process                                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. Detect environment variables                        │
│     ↓                                                   │
│  2. Run: node build-config.js                          │
│     ↓                                                   │
│  3. Generate firebase-config.js from env vars          │
│     ↓                                                   │
│  4. Generate cloudinary-config.js from env vars        │
│     ↓                                                   │
│  5. Deploy site with generated config files            │
│     ↓                                                   │
│  6. Site works with credentials ✅                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Security Benefits

✅ **Credentials not in Git** - Your secrets are never committed to GitHub  
✅ **Environment isolated** - Each environment (production, staging) can have different credentials  
✅ **Easy rotation** - Update credentials in Netlify without code changes  
✅ **Access control** - Only Netlify admins can view/edit environment variables  

## Local Development

For local development, you have two options:

### Option 1: Use Existing Config Files (Current)
Your local `firebase-config.js` and `cloudinary-config.js` files work as-is for development.

### Option 2: Use Environment Variables Locally
1. Create a `.env` file in your project root
2. Add the same variables:
   ```env
   FIREBASE_API_KEY=your_key_here
   FIREBASE_AUTH_DOMAIN=your_domain_here
   # ... etc
   ```
3. Run: `node build-config.js` to generate config files

## Troubleshooting

### Config files not generated?
- Check Netlify deploy logs for errors
- Verify all environment variables are set correctly
- Ensure variable names match exactly (case-sensitive)

### 404 errors still showing?
- Clear your browser cache
- Force refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Check Netlify deploy completed successfully

### Build fails?
- Verify Node.js is available in Netlify build environment
- Check `build-config.js` exists in your repository
- Review deploy logs for specific error messages

## Quick Reference

**Current Environment Variables Needed:**
```
FIREBASE_API_KEY
FIREBASE_AUTH_DOMAIN
FIREBASE_DATABASE_URL
FIREBASE_PROJECT_ID
FIREBASE_STORAGE_BUCKET
FIREBASE_MESSAGING_SENDER_ID
FIREBASE_APP_ID
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
CLOUDINARY_UPLOAD_PRESET
```

Total: **11 environment variables**

---

**Need help?** Check your Netlify deploy logs or review this guide again! 🚀
