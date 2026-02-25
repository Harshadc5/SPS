# Authentication Setup Guide

## Overview
Your School Management System now has **Google Authentication** with admin access control. Only authorized Gmail accounts can access the "Add New Student" and "View All Students" features.

## 🔒 How It Works

1. **Protected Features**: 
   - Add New Student
   - View All Students

2. **Authentication Flow**:
   - When users click on protected features, they'll see a Google Sign-In modal
   - Users must sign in with their Google account
   - Only whitelisted email addresses will be granted access
   - Unauthorized emails will be denied access and automatically signed out

## 🛠️ Configuration Steps

### Step 1: Enable Google Authentication in Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `fir-p-s-c76fe`
3. Navigate to **Authentication** → **Sign-in method**
4. Click on **Google** provider
5. Toggle **Enable** to ON
6. Add your **Support email** (required by Google)
7. Click **Save**

### Step 2: Add Authorized Email Addresses

Open the file `firebase-config.js` and update the `ADMIN_EMAILS` array with the Gmail addresses you want to authorize:

```javascript
// Admin whitelist - Add authorized email addresses here
const ADMIN_EMAILS = [
    'principal@gmail.com',        // Replace with actual admin email
    'teacher@gmail.com',          // Add more authorized emails
    'admin@gmail.com',            // Add as many as needed
    // 'another-admin@gmail.com',
];
```

**Important**: 
- Use the exact Gmail addresses (case-insensitive)
- Only these email addresses will have access to protected features
- Changes take effect immediately after reloading the page

### Step 3: Test the Authentication

1. Open your application in the browser
2. Click on "Add New Student" or "View All Students"
3. A modal will appear asking you to sign in with Google
4. Click "Sign in with Google"
5. Choose your Google account
6. If your email is in the whitelist, you'll be granted access
7. If not, you'll see an "Access denied" message

## 🎨 User Interface Elements

### Authentication Modal
- Appears when unauthorized users try to access protected features
- Shows a "Sign in with Google" button with Google branding
- Displays success/error messages
- Automatically closes after successful authentication

### User Status Display
- Located in the top-right corner
- Shows the currently signed-in user's email
- Includes a "Sign Out" button
- Only visible when a user is authenticated

## 🔐 Security Features

1. **Whitelist-Based**: Only pre-approved emails can access protected features
2. **Automatic Sign-Out**: Unauthorized users are automatically signed out
3. **Session Persistence**: Users remain signed in across page refreshes
4. **Firebase Security**: All authentication is handled securely by Firebase

## 📝 Usage Examples

### Adding Multiple Admins

```javascript
const ADMIN_EMAILS = [
    'principal@school.com',
    'vice-principal@school.com',
    'admin-office@school.com',
    'records-manager@school.com',
];
```

### For a Single Admin

```javascript
const ADMIN_EMAILS = [
    'admin@school.com',
];
```

## 🚀 Features

- ✅ Google OAuth 2.0 Authentication
- ✅ Admin whitelist access control
- ✅ Persistent login sessions
- ✅ Automatic redirect after authentication
- ✅ User-friendly error messages
- ✅ Professional UI with Google branding
- ✅ Sign out functionality
- ✅ Real-time authentication state monitoring

## 🔧 Troubleshooting

### Issue: Popup Blocked
**Solution**: Allow popups for your site in browser settings

### Issue: Authentication Error
**Solution**: 
1. Verify Google Sign-In is enabled in Firebase Console
2. Check that support email is configured
3. Clear browser cache and try again

### Issue: Access Denied
**Solution**: 
1. Verify your email is in the `ADMIN_EMAILS` array
2. Check for typos in the email address
3. Ensure the email matches exactly (including domain)

### Issue: User Not Signed Out
**Solution**: Click the "Sign Out" button in the top-right corner

## 📞 Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify Firebase configuration
3. Ensure Google Sign-In is properly enabled
4. Confirm the email is correctly added to the whitelist

## 🎯 Next Steps

1. Enable Google Authentication in Firebase Console
2. Add your authorized email addresses to `firebase-config.js`
3. Test the authentication flow
4. Share access with other authorized users by adding their emails

---

**Note**: Remember to keep your `ADMIN_EMAILS` list updated and never commit sensitive information to public repositories.
