# Firebase Setup Guide - S. Factor Dance Crew

## 🚀 Quick Start Guide

This guide will help you set up Firebase for your project in under 10 minutes - completely FREE!

---

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `sfactor-dance-crew` (or any name you prefer)
4. **Disable Google Analytics** (not needed, keeps it simpler)
5. Click **"Create project"**
6. Wait for project creation (30 seconds)

---

## Step 2: Get Firebase Configuration

1. In Firebase Console, click the **⚙️ Settings icon** → **Project settings**
2. Scroll down to **"Your apps"** section
3. Click the **Web icon** `</>` (</> symbol)
4. Register app name: `S. Factor Admin`
5. **DO NOT close this window** - you'll need the config values

---

## Step 3: Enable Firebase Database

1. In left sidebar, click **"Build"** → **"Realtime Database"**
2. Click **"Create database"**
3. Choose location: **United States** (default is fine)
4. **IMPORTANT:** Select **"Start in test mode"** (we'll secure it later)
5. Click **"Enable"**

---

## Step 4: Enable Firebase Authentication

1. In left sidebar, click **"Build"** → **"Authentication"**
2. Click **"Get started"**
3. Click **"Email/Password"** provider
4. Toggle **"Enable"** to ON
5. Click **"Save"**

---

## Step 5: Create Admin User

1. Still in **Authentication** section
2. Click **"Users"** tab
3. Click **"Add user"** button
4. Enter email: `admin@sfactor.com` (or your email)
5. Enter a strong password (min 6 characters)
6. Click **"Add user"**

**⚠️ IMPORTANT:** Save this email and password! You'll need it to login to admin panel.

---

## Step 6: Update Configuration File

1. Open `firebase-config.js` in your project
2. Replace the configuration with YOUR Firebase config:

```javascript
export const firebaseConfig = {
    apiKey: "AIzaSyD-YOUR_ACTUAL_API_KEY",
    authDomain: "your-project-id.firebaseapp.com",
    databaseURL: "https://your-project-id-default-rtdb.firebaseio.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456"
};
```

3. Copy each value from Firebase Console (from Step 2)
4. Save the file

---

## Step 7: Set Database Security Rules

1. Go to **Realtime Database** in Firebase Console
2. Click **"Rules"** tab
3. Replace the rules with these:

```json
{
  "rules": {
    "gallery": {
      ".read": true,
      ".write": "auth != null"
    },
    "socialLinks": {
      ".read": true,
      ".write": "auth != null"
    },
    "contact": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

4. Click **"Publish"**

**What this does:**
- ✅ Anyone can READ data (view website)
- ✅ Only authenticated admins can WRITE data (admin panel)

---

## Step 8: Test Your Setup

1. Open `admin.html` in your browser (via local server)
2. Login with the email/password from Step 5
3. You should see the admin dashboard!
4. Try adding a gallery item
5. Check Firebase Console → Realtime Database to see the data

---

## Step 9: Deploy to Netlify

Your admin panel is already included in the project files. When you deploy to Netlify:

1. **Main site:** `yourdomain.com` (index.html)
2. **Admin panel:** `yourdomain.com/admin.html`

**⚠️ IMPORTANT:** Keep admin.html secure! Only you should know the URL.

---

## 📊 Database Structure

Your Firebase database will look like this:

```
sfactor-dance-crew/
├── gallery/
│   ├── -Nxyz123abc/
│   │   ├── type: "image"
│   │   ├── src: "./gallery/photo.jpg"
│   │   ├── title: "Stage Performance"
│   │   ├── description: "Live Show 2024"
│   │   ├── createdAt: 1234567890
│   │   └── updatedAt: 1234567890
│   └── -Nxyz456def/
│       ├── type: "video"
│       ├── src: "./videos/video.mp4"
│       ├── poster: "./videos/poster.jpg"
│       ├── title: "Award Ceremony"
│       └── ...
├── socialLinks/
│   ├── facebook/
│   │   ├── url: "https://facebook.com/..."
│   │   └── updatedAt: 1234567890
│   ├── instagram/
│   └── ...
└── contact/
    ├── phone: "9340073167"
    ├── email: "sfactorperformingart@gmail.com"
    ├── director: "MAK-E"
    └── updatedAt: 1234567890
```

---

## 🎯 Using the Admin Panel

### Gallery Management
- **Add Item:** Click "Add New Item" button
- **Edit Item:** Click "Edit" on any gallery card
- **Delete Item:** Click "Delete" on any gallery card (confirmation required)
- **Media Types:** Choose between Image or Video
- **Local Files:** Use relative paths like `./gallery/photo.jpg`
- **External URLs:** Use full URLs like `https://example.com/image.jpg`

### Social Links
- Update any social media URL
- Changes apply immediately to main website
- Leave blank to disable a platform

### Contact Information
- Update phone number
- Update email address
- Update director name

---

## 🔒 Security Best Practices

1. **Never share your Firebase config publicly**
2. **Use strong admin password** (12+ characters recommended)
3. **Keep admin.html URL private**
4. **Regularly backup database** (Firebase Console → Export)
5. **Monitor database usage** in Firebase Console

---

## 💰 Pricing (Free Tier Limits)

Firebase Realtime Database Free Tier:
- ✅ 1 GB storage
- ✅ 10 GB/month download
- ✅ 100 simultaneous connections
- ✅ Unlimited read/write operations

**For your use case:** This is MORE than enough! You'll likely use less than 1% of the free tier.

---

## 🐛 Troubleshooting

### "Failed to connect to database"
- Check Firebase config values in `firebase-config.js`
- Verify Realtime Database is enabled
- Check browser console for errors

### "Login failed"
- Verify user exists in Authentication → Users
- Check email/password spelling
- Ensure Email/Password provider is enabled

### "Permission denied" errors
- Check database rules (Step 7)
- Verify you're logged in to admin panel
- Rules should allow authenticated writes

### Changes not appearing on main site
- Refresh the main website (Ctrl+F5)
- Check browser console for errors
- Verify data exists in Firebase Console

---

## 📞 Need Help?

If you encounter issues:
1. Check browser console (F12 → Console tab)
2. Check Firebase Console for errors
3. Verify all setup steps are completed
4. Review this guide again

---

## ✅ Setup Checklist

- [ ] Created Firebase project
- [ ] Got Firebase configuration
- [ ] Enabled Realtime Database
- [ ] Enabled Authentication
- [ ] Created admin user
- [ ] Updated `firebase-config.js`
- [ ] Set database security rules
- [ ] Tested admin panel login
- [ ] Added test gallery item
- [ ] Deployed to Netlify

---

**Congratulations! 🎉** Your project now has full CRUD capabilities with Firebase - completely FREE!
