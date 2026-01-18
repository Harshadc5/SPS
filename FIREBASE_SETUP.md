# School Management System - Firebase Setup Guide

## Firebase Configuration Instructions

Your School Management System has been integrated with Firebase Realtime Database! Follow these steps to complete the setup:

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" or "Create a Project"
3. Enter your project name (e.g., "School-Management-System")
4. Follow the setup wizard (you can disable Google Analytics if you don't need it)
5. Click "Create Project"

### Step 2: Set Up Realtime Database

1. In your Firebase project, click on "Build" in the left sidebar
2. Click on "Realtime Database"
3. Click "Create Database"
4. Choose a location (closest to your users)
5. Start in **Test Mode** for development (you can secure it later)
6. Click "Enable"

### Step 3: Get Your Firebase Configuration

1. In Firebase Console, click on the gear icon (⚙️) next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps" section
4. Click on the web icon (</>) to add a web app
5. Give your app a nickname (e.g., "School Management Web")
6. Check "Also set up Firebase Hosting" (optional)
7. Click "Register app"
8. Copy the Firebase configuration object

### Step 4: Update firebase-config.js

1. Open `firebase-config.js` in your project
2. Replace the placeholder values with your actual Firebase configuration:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "your-project-id.firebaseapp.com",
    databaseURL: "https://your-project-id-default-rtdb.firebaseio.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### Step 5: Set Up Database Rules (Important for Security)

For development/testing, your rules are already set to test mode. For production:

1. Go to Firebase Console → Realtime Database → Rules
2. Replace with these rules:

```json
{
  "rules": {
    "students": {
      ".read": true,
      ".write": true
    }
  }
}
```

**Note:** For production, you should implement proper authentication and more restrictive rules.

### Step 6: Run Your Application

1. You need to run the app through a local server (not file://)
2. Options:
   - **Live Server** (VS Code extension): Right-click index.html → "Open with Live Server"
   - **Python**: `python -m http.server 8000`
   - **Node.js**: `npx http-server`

3. Open your browser to the local server URL

## Features Now Using Firebase

✅ **Student Admission** - All new students are saved to Firebase Realtime Database
✅ **Student List** - Loaded from Firebase in real-time
✅ **Edit Student** - Updates are synced to Firebase
✅ **Delete Student** - Removes data from Firebase
✅ **Cloud Storage** - Data persists across devices and browsers

## Migration from localStorage

Your existing data in localStorage won't automatically migrate. To migrate:

1. Open browser console (F12)
2. Run: `console.log(JSON.parse(localStorage.getItem('students')))`
3. Copy the data
4. Manually add students through the admission form (recommended for data validation)

Or you can create a migration script if needed.

## Troubleshooting

### CORS Errors
- Make sure you're running the app through a local server (not opening the HTML file directly)
- File:// protocol won't work with Firebase

### Data Not Loading
- Check browser console for errors (F12)
- Verify Firebase configuration is correct
- Ensure Realtime Database is created and rules allow read/write
- Check that databaseURL is correctly set in firebase-config.js

### Module Import Errors
- Ensure you're using a modern browser (Chrome, Firefox, Edge, Safari)
- Make sure the script tag has `type="module"` attribute

## Security Best Practices (For Production)

1. **Enable Firebase Authentication**
2. **Update Database Rules** to require authentication
3. **Environment Variables** - Don't commit your Firebase config to public repositories
4. **API Key Restrictions** - Set up API key restrictions in Google Cloud Console

## Support

For Firebase documentation: https://firebase.google.com/docs/database

Need help? Check the Firebase Console → Realtime Database → Data tab to see if your data is being stored correctly.
