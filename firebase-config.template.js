/**
 * Firebase Configuration Template
 * 
 * ⚠️ IMPORTANT: This is a TEMPLATE file.
 * You need to create your own firebase-config.js with your Firebase credentials.
 * 
 * Steps:
 * 1. Create Firebase project at https://console.firebase.google.com
 * 2. Enable Realtime Database & Authentication
 * 3. Copy your config from Firebase Console
 * 4. Create firebase-config.js with your actual credentials
 * 5. NEVER commit firebase-config.js to GitHub (it's in .gitignore)
 * 
 * This file provides fallback configuration for demo purposes.
 */

// Template configuration - REPLACE WITH YOUR ACTUAL FIREBASE CONFIG
export const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Warn if using template config
console.warn('%c⚠️ Firebase Template Config Active', 'color: #ff9800; font-size: 16px; font-weight: bold;');
console.warn('Create firebase-config.js with your actual Firebase credentials.');
console.warn('See FIREBASE_SETUP.md for instructions.');
