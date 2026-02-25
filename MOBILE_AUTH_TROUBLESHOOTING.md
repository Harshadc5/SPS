# Mobile Authentication Troubleshooting Guide

## Common Issue: "Authentication failed" on Mobile

If you're seeing "Authentication failed. Please try again." on mobile devices, follow these steps:

### ⚠️ **CRITICAL**: Add Your Domain to Firebase Authorized Domains

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: "fir-p-s-c76fe"
3. **Navigate to**: Authentication → Settings → Authorized domains
4. **Add your deployment domain**:
   - If using Vercel: `your-app-name.vercel.app`
   - If using custom domain: `yourdomain.com`
   - For testing: Make sure `localhost` is in the list

### Step-by-Step Firebase Console Setup:

```
Firebase Console
├── Authentication
│   ├── Sign-in method
│   │   └── Google (should be ENABLED)
│   └── Settings
│       └── Authorized domains
│           ├── localhost (for local testing)
│           ├── schoolmanagement-five-pi.vercel.app (your current domain)
│           └── (add any other domains you'll use)
```

### How to Add Domain:

1. Open Firebase Console
2. Click **"Authentication"** in left sidebar
3. Click **"Settings"** tab at the top
4. Scroll to **"Authorized domains"** section
5. Click **"Add domain"** button
6. Enter your domain: `schoolmanagement-five-pi.vercel.app`
7. Click **"Add"**

### Testing the Fix:

1. After adding the domain, wait 1-2 minutes for changes to propagate
2. Close the browser tab completely on mobile
3. Open the app again
4. Try signing in - it should now redirect to Google properly

### Current Deployment Domain:

Based on the screenshot, your app is deployed at:
- `schoolmanagement-five-pi.vercel.app`

**Make sure this EXACT domain is in Firebase authorized domains list!**

### Additional Troubleshooting:

#### If still not working, check browser console (on mobile):

1. On Android Chrome: 
   - Open `chrome://inspect`
   - Connect your phone via USB
   - Click "inspect" on your page
   - Check Console for error messages

2. On iPhone Safari:
   - Enable Web Inspector on iPhone (Settings → Safari → Advanced)
   - Connect to Mac
   - Open Safari → Develop → [Your iPhone] → [Your Page]
   - Check Console

#### Common Error Codes:

- `auth/unauthorized-domain` → Domain not added to Firebase
- `auth/popup-blocked` → Browser blocking popups (desktop only)
- `auth/operation-not-allowed` → Google sign-in not enabled in Firebase
- `auth/network-request-failed` → Check internet connection

### Verify Google Sign-in is Enabled:

1. Firebase Console → Authentication → Sign-in method
2. Make sure **Google** shows status: **"Enabled"**
3. If not enabled:
   - Click on Google
   - Toggle "Enable" switch
   - Enter support email
   - Save

### Testing Locally vs Production:

- **Local (localhost)**: Should work automatically
- **Production (Vercel/custom domain)**: MUST be added to authorized domains

---

## After Making Changes:

1. ✅ Add domain to Firebase authorized domains
2. ✅ Wait 1-2 minutes
3. ✅ Hard refresh browser (Ctrl+Shift+R)
4. ✅ Clear browser cache/cookies
5. ✅ Try sign-in again

## Need More Help?

Check the browser console logs - the updated code now logs detailed error information to help identify the exact issue.
