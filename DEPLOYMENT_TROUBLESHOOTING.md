# Vercel Deployment Troubleshooting Guide

## Common Issues and Solutions

### 1. Blank White Screen

**Possible Causes:**
- JavaScript errors preventing React from rendering
- Missing environment variables
- Build configuration issues
- Service worker conflicts

**Solutions:**

#### Check Browser Console
1. Open your deployed site
2. Press F12 to open Developer Tools
3. Check the Console tab for errors
4. Check the Network tab for failed requests

#### Verify Build Locally
```bash
# Test the production build locally
npm run build
npm run preview
```

#### Check Vercel Build Logs
1. Go to your Vercel dashboard
2. Click on your project
3. Go to the "Functions" or "Deployments" tab
4. Check the build logs for errors

### 2. Environment Variables

Make sure all required environment variables are set in Vercel:

**Required Variables:**
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_INQUIRY_TEMPLATE_ID`
- `VITE_EMAILJS_CONTACT_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

**Optional Variables:**
- `VITE_GA_TRACKING_ID`
- `VITE_ENABLE_ANALYTICS`

### 3. Build Configuration

Ensure your `vercel.json` is properly configured:

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 4. Asset Loading Issues

**Check for:**
- Missing images in the `public` folder
- Incorrect asset paths
- Large bundle sizes causing timeouts

### 5. Service Worker Issues

If you're having service worker problems:

1. Disable service worker temporarily by commenting out the registration in `main.jsx`
2. Clear browser cache and try again
3. Check if the issue persists

### 6. React Router Issues

For SPA routing issues:
- Ensure `vercel.json` has proper rewrites
- Check that all routes are properly defined
- Verify that the base URL is correct

## Debugging Steps

### Step 1: Local Production Build
```bash
npm run build
npm run preview
```
If this fails, fix local issues first.

### Step 2: Check Network Tab
Look for:
- 404 errors for assets
- Failed API calls
- Blocked requests

### Step 3: Simplify the App
Temporarily comment out complex components to isolate the issue:

```jsx
// In App.jsx, temporarily replace with:
function App() {
  return <div>Hello World</div>;
}
```

### Step 4: Check Dependencies
Ensure all dependencies are properly installed:
```bash
npm install
```

### Step 5: Clear Vercel Cache
In Vercel dashboard:
1. Go to Settings
2. Clear build cache
3. Redeploy

## Emergency Fixes

### Quick Fix 1: Minimal App
Replace App.jsx content temporarily:

```jsx
import React from "react";

function App() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Pinch of Luxe Events</h1>
      <p>Website is temporarily under maintenance.</p>
      <p>Please check back soon!</p>
    </div>
  );
}

export default App;
```

### Quick Fix 2: Disable Service Worker
Comment out service worker registration in `main.jsx`.

### Quick Fix 3: Remove Complex Dependencies
Temporarily remove or comment out:
- Analytics initialization
- Performance monitoring
- Complex animations

## Contact Support

If issues persist:
1. Check Vercel documentation
2. Contact Vercel support with build logs
3. Check React/Vite documentation for compatibility issues

## Useful Commands

```bash
# Build with debug info
npm run build:debug

# Check bundle size
npm run build && npx vite-bundle-analyzer dist

# Clear all caches
rm -rf node_modules dist .vite
npm install
npm run build
```
