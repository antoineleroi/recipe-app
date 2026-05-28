# Recipe App - Netlify Deployment Guide (With Functions)

## 📦 What You're Deploying:

**This version includes:**
- ✅ Firebase app with real-time sync
- ✅ Netlify Function (backend proxy for Claude API)
- ✅ Full bookmarklet automation
- ✅ No more CORS errors!

---

## 📁 Folder Structure Required:

Your deployment folder should look like this:

```
recipe-app-deployment/
├── index.html                          (your main app)
├── package.json                        (for Netlify Functions)
└── netlify/
    └── functions/
        └── extract-recipe.js           (backend function)
```

---

## 🚀 Deployment Steps:

### **Method 1: Drag & Drop (Easiest)**

**Step 1: Create the folder structure on your computer**

1. Create a new folder called `recipe-app-deployment`
2. Inside it, create a folder called `netlify`
3. Inside `netlify`, create a folder called `functions`

**Step 2: Add the files**

Download these files from this conversation:
- `index.html` → Put in the main `recipe-app-deployment` folder
- `package.json` → Put in the main `recipe-app-deployment` folder
- `extract-recipe.js` → Put in `netlify/functions/` folder

**Your structure should be:**
```
recipe-app-deployment/
├── index.html
├── package.json
└── netlify/
    └── functions/
        └── extract-recipe.js
```

**Step 3: Deploy to Netlify**

1. Go to https://app.netlify.com
2. Click "Add new site" → "Deploy manually"
3. **Drag the ENTIRE `recipe-app-deployment` folder** onto the upload area
4. Wait ~30 seconds while it builds
5. Done!

---

### **Method 2: GitHub (For Updates)**

If you want to make updates easier in the future:

1. Create a GitHub repository
2. Upload your folder structure to GitHub
3. Connect Netlify to your GitHub repo
4. Every time you push changes → Auto-deploys

---

## ✅ After Deployment:

1. **Test the Function:**
   - Go to your Netlify dashboard
   - Click "Functions" tab
   - You should see `extract-recipe` listed
   - Status should be "Active"

2. **Test the App:**
   - Go to your site URL
   - Sign in
   - Go to Settings → Add your Claude API key
   - Try the bookmarklet!

---

## 🐛 Troubleshooting:

**"Function not found" error:**
- Make sure the `netlify/functions/` folder structure is exactly right
- The function file must be called `extract-recipe.js`
- Check Netlify dashboard → Functions tab to see if it deployed

**"Failed to fetch" error:**
- Check you added your API key in Settings
- Check the API key is valid (test at console.anthropic.com)
- Check Netlify Functions logs for errors

**Build fails:**
- Make sure `package.json` is in the root folder
- Make sure the folder structure matches exactly

---

## 💰 Costs:

**Netlify Functions:**
- Free tier: 125,000 requests/month
- Each recipe extraction = 1 request
- You'd need to extract 4,000+ recipes per month to exceed free tier

**You're still completely free!** ✅

---

## 📝 Notes:

- Your existing Netlify site will be replaced with this new version
- All your Firebase data (recipes, shopping lists, meal plans) will remain intact
- The bookmarklet will now work without CORS errors!

---

## Need Help?

If deployment fails, check:
1. Folder structure is correct
2. All 3 files are present
3. Files are named exactly as shown
4. You're uploading the parent folder (not just the files)
