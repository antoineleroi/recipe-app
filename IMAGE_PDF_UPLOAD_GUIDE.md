# 📸📄 IMAGE & PDF UPLOAD GUIDE

## 🎉 NEW EXTRACTION METHODS!

You now have **3 ways** to add recipes:

1. **Bookmarklet** - Extract from websites (BBC Good Food, RecipeTin Eats, etc.)
2. **📷 Image Upload** - Extract from cookbook photos, screenshots
3. **📄 PDF Upload** - Extract from downloaded recipe PDFs

---

## 📷 HOW TO USE IMAGE UPLOAD:

### **What You Can Upload:**
- Photos of cookbook pages
- Screenshots of Instagram recipes  
- Screenshots of Pinterest recipes
- Photos of printed recipes
- Phone camera photos of recipe cards

### **Steps:**
1. Go to home screen
2. Click **"📷 Upload Image"** button
3. Select image from your device
4. Wait 5-15 seconds (vision processing takes longer)
5. Preview appears → Review → Approve → Saved!

### **Tips for Best Results:**
- **Good lighting** - Make sure text is readable
- **Clear focus** - Avoid blurry photos
- **Full recipe** - Include all ingredients and steps in frame
- **Straight angle** - Avoid skewed photos
- **High resolution** - Better than low quality

### **Costs:**
- **~$0.05-0.10 per image** (higher than text extraction)
- Vision processing is more expensive than text

---

## 📄 HOW TO USE PDF UPLOAD:

### **What You Can Upload:**
- Downloaded recipe PDFs from websites
- Recipe PDFs from email newsletters
- PDF cookbooks
- PDF recipe cards

### **Steps:**
1. Go to home screen
2. Click **"📄 Upload PDF"** button
3. Select PDF from your device
4. Wait 5-10 seconds (text extraction + processing)
5. Preview appears → Review → Approve → Saved!

### **Tips for Best Results:**
- **Text-based PDFs work best** - Not scanned images
- **If PDF is scanned images**, it may fail (no OCR yet)
- **Single recipe per PDF** - Multi-recipe PDFs will extract all recipes together
- **Clear formatting** - Well-formatted PDFs extract better

### **Costs:**
- **~$0.01-0.05 per PDF** (same as bookmarklet)

---

## ⚠️ IMPORTANT NOTES:

### **Image Upload Limitations:**
- **No OCR on old/faded text** - Needs to be readable
- **Handwritten recipes may fail** - Typed text works best
- **Multiple recipes in one image** - Will try to extract all
- **Complex layouts** - May miss some ingredients/steps

### **PDF Upload Limitations:**
- **Scanned PDFs** - Only works if PDF contains text (not images)
- **Complex layouts** - Tables and columns may confuse extraction
- **Image-only PDFs** - Will fail (needs actual text in PDF)

### **Both Methods:**
- **Require Claude API key** - Set in Settings first
- **Cost more than bookmarklet** - Vision/PDF processing is expensive
- **Take longer** - 5-15 seconds vs 2-5 for bookmarklet
- **Preview/QC required** - Always review before saving

---

## 🎯 WHICH METHOD TO USE:

**Use Bookmarklet when:**
- Recipe is on a website
- You're browsing online
- Fast and cheap

**Use Image Upload when:**
- Physical cookbook/magazine
- Instagram/Pinterest screenshot
- Printed recipe card
- Friend shared photo of recipe

**Use PDF Upload when:**
- Downloaded recipe PDF
- Email newsletter recipe
- PDF from recipe website

---

## 💰 COST COMPARISON:

- **Bookmarklet:** ~$0.01-0.05 per recipe
- **PDF Upload:** ~$0.01-0.05 per recipe
- **Image Upload:** ~$0.05-0.10 per recipe (2-10x more expensive!)

**Recommendation:** Use bookmarklet when possible, save image upload for physical recipes only.

---

## 🐛 TROUBLESHOOTING:

### **"Please add your Claude API key in Settings first"**
- Go to Settings → Add API key → Save
- Make sure you've added credits to your Claude account

### **"Error extracting recipe from image"**
- Image may be too blurry or low quality
- Try taking a clearer photo
- Make sure text is readable
- Check if API key is valid

### **"Error extracting recipe from PDF"**
- PDF may be image-only (no text)
- Try OCR software first to convert to text PDF
- Or manually type the recipe instead

### **Upload button doesn't work**
- Make sure you're signed in
- Check browser console for errors
- Try refreshing the page

### **Extraction takes forever**
- Vision processing takes 10-20 seconds
- PDF processing takes 5-15 seconds
- Be patient!
- If >30 seconds, refresh and try again

---

## ✅ TESTING YOUR UPLOADS:

### **Test Image Upload:**
1. Take a photo of this guide with your phone
2. Upload it via **📷 Upload Image**
3. Should extract this text (won't be a recipe, but will try!)
4. Reject the preview

### **Test PDF Upload:**
1. Download any recipe PDF from internet
2. Upload it via **📄 Upload PDF**
3. Should extract the recipe
4. Review and approve if correct

---

## 🎉 COMPLETE WORKFLOW:

**Example: Physical Cookbook Recipe**

1. Open cookbook to recipe page
2. Take clear photo with phone
3. Transfer photo to computer (or use phone browser)
4. Go to https://antoines-recipes.netlify.app/
5. Click **📷 Upload Image**
6. Select the photo
7. Wait 10-15 seconds
8. Review extracted recipe in preview
9. Fix any errors if needed
10. Click **✓ Approve & Save**
11. Recipe saves to Firebase
12. Appears on all your devices instantly!

**Example: Downloaded PDF**

1. Download recipe PDF from website
2. Go to https://antoines-recipes.netlify.app/
3. Click **📄 Upload PDF**
4. Select the PDF
5. Wait 5-10 seconds
6. Review extracted recipe
7. Click **✓ Approve & Save**
8. Done!

---

## 🚀 READY TO USE!

Both features are now live in your app. Just deploy the updated files and start uploading!

**Remember:** These cost more than the bookmarklet, so use them only when you can't use the bookmarklet (physical recipes, PDFs, etc.)

---

**Questions? Issues? Let me know!**
