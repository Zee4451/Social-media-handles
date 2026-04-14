# ⚡ Cloudinary Upload Preset Setup - REQUIRED

## 🎯 One Last Step - Create Upload Preset

For the code to work, you need to create an **unsigned upload preset** in Cloudinary.

---

## 📋 Step-by-Step (2 Minutes)

### STEP 1: Go to Upload Settings

1. **Login to Cloudinary**: https://console.cloudinary.com/console
2. **Click Settings icon** (⚙️) in top-right corner
3. **Click "Upload"** tab

Or use direct link:
```
https://console.cloudinary.com/console/upload_settings
```

---

### STEP 2: Add Upload Preset

1. **Scroll down** to "Upload presets" section
2. **Click "Add upload preset"** button

You'll see a form:

```
┌─────────────────────────────────────────┐
│                                         │
│   Add an Upload Preset                  │
│                                         │
│   Upload preset name:                   │
│   [sfactor_gallery] ← TYPE THIS!       │
│                                         │
│   Signing Mode:                         │
│   ⚪ Signed                            │
│   🔘 Unsigned ← SELECT THIS!           │
│                                         │
│   Folder:                               │
│   [sfactor] ← TYPE THIS (optional)     │
│                                         │
│   [Save] ← CLICK THIS!                 │
│                                         │
└─────────────────────────────────────────┘
```

---

### STEP 3: Fill in the Form

**Upload preset name:** 
```
sfactor_gallery
```

**Signing Mode:** 
- Select **"Unsigned"** (important!)

**Folder (optional):**
```
sfactor
```

**Other settings:** Leave as default

---

### STEP 4: Save

1. **Click "Save"** button
2. You should see it in the upload presets list

```
┌─────────────────────────────────────────┐
│  Upload Presets                         │
│                                         │
│  ✅ sfactor_gallery (Unsigned)         │
│                                         │
└─────────────────────────────────────────┘
```

---

## ✅ That's It!

Once you create this upload preset, your code will work perfectly!

---

## 🧪 Test After Creating Preset

1. Go to your admin panel: `https://sfactordancecrew.netlify.app/login`
2. Login
3. Add gallery item
4. Choose file
5. Upload file
6. Should work perfectly! ✅

---

## 🔍 What If It Still Doesn't Work?

### Check These:

1. **Preset name is EXACTLY:** `sfactor_gallery`
   - Case sensitive!
   - No spaces
   - Must match code

2. **Signing Mode is:** Unsigned
   - NOT signed
   - MUST be unsigned

3. **Preset is saved:**
   - Check it appears in the list
   - Not in draft mode

---

## 📸 Visual Guide

### Where to Find Upload Settings:

```
Cloudinary Dashboard
  → Settings (⚙️ icon, top-right)
  → Upload tab
  → Scroll to "Upload presets"
  → Click "Add upload preset"
```

### Form Fields:

```
Name: sfactor_gallery
Mode: Unsigned
Folder: sfactor
```

---

## 🎯 Quick Checklist

- [ ] Logged into Cloudinary
- [ ] Opened Upload Settings
- [ ] Clicked "Add upload preset"
- [ ] Name: `sfactor_gallery`
- [ ] Mode: Unsigned
- [ ] Folder: `sfactor` (optional)
- [ ] Clicked Save
- [ ] Preset appears in list
- [ ] Tested file upload in admin panel

---

## ⚡ After Creating Preset

Your upload flow will work like this:

```
1. User selects file in admin panel
2. File uploads to Cloudinary (with progress bar)
3. Cloudinary returns URL
4. URL auto-fills in form
5. User saves gallery item
6. File appears on website! ✅
```

**No more Firebase!**
**No more CORS errors!**
**Just simple, reliable uploads!** 🎉

---

**Time needed:** 2 minutes  
**Difficulty:** Super easy ⭐  

**Create the preset and test your uploads!** 🚀
