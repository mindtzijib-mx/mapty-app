# 🔧 GitHub Pages Setup & Troubleshooting

## 🚨 Current Issue: "Not Found" Error

The deployment is failing because GitHub Pages needs to be properly configured in your repository settings.

## ✅ Step-by-Step Fix

### 1. Enable GitHub Pages (CRITICAL STEP)

1. **Go to your repository**: https://github.com/mindtzijib-mx/mapty-app
2. **Click "Settings"** tab (top navigation)
3. **Scroll down** and click **"Pages"** in the left sidebar
4. **Under "Source"**:
   - Select **"GitHub Actions"** (NOT "Deploy from a branch")
   - This is crucial for the workflow to work

### 2. Verify Repository Permissions

Make sure your repository has the correct permissions:

- Repository should be **public** (or you need GitHub Pro for private repos)
- You should have **admin access** to the repository

### 3. Check Workflow Permissions

1. Go to **Settings** → **Actions** → **General**
2. Under **"Workflow permissions"**:
   - Select **"Read and write permissions"**
   - Check **"Allow GitHub Actions to create and approve pull requests"**

## 🔄 Alternative Deployment Methods

### Method 1: Manual Deployment (Quick Fix)

If the GitHub Actions continue to fail, you can deploy manually:

```bash
# From your local machine
npm run build
npm run deploy
```

This will create a `gh-pages` branch and deploy directly.

### Method 2: Use the Backup Workflow

If the main workflow fails, rename the backup file:

```bash
# In your repository
mv .github/workflows/deploy-simple.yml.backup .github/workflows/deploy-simple.yml
```

Then push to trigger the simpler deployment.

### Method 3: Branch-based Deployment

1. **In GitHub**: Settings → Pages → Source → "Deploy from a branch"
2. **Select**: `gh-pages` branch, `/ (root)` folder
3. **Run locally**:
   ```bash
   npm run deploy
   ```

## 🔍 Debugging Steps

### Check Current Status

1. **Repository Settings**: Verify Pages is enabled
2. **Actions Tab**: Check workflow status and logs
3. **Branches**: Look for `gh-pages` branch (if using manual deploy)

### Common Issues & Solutions

| Issue             | Solution                                            |
| ----------------- | --------------------------------------------------- |
| "Not Found" error | Enable GitHub Pages in Settings → Pages             |
| Permission denied | Check workflow permissions in Settings → Actions    |
| Build fails       | Run `npm run build` locally to debug                |
| Tests fail        | Fix failing tests: `npm test`                       |
| Wrong base path   | Verify `vite.config.ts` base path matches repo name |

## 📋 Verification Checklist

Before deployment:

- [ ] Repository is public or you have GitHub Pro
- [ ] GitHub Pages is enabled (Settings → Pages → Source: GitHub Actions)
- [ ] Workflow permissions are set to "Read and write"
- [ ] Tests pass locally: `npm test`
- [ ] Build works locally: `npm run build`
- [ ] Base path in `vite.config.ts` matches repository name

## 🚀 Quick Start Commands

```bash
# Test everything locally first
npm test
npm run lint
npm run build
npm run preview

# If all good, push to trigger deployment
git add .
git commit -m "Fix GitHub Pages deployment"
git push origin main
```

## 📞 If Still Having Issues

### Option 1: Use Manual Deployment

```bash
npm run deploy
```

### Option 2: Check These URLs

- Repository: https://github.com/mindtzijib-mx/mapty-app
- Settings: https://github.com/mindtzijib-mx/mapty-app/settings/pages
- Actions: https://github.com/mindtzijib-mx/mapty-app/actions

### Option 3: Create New Repository

If issues persist, you might need to:

1. Create a new repository
2. Push your code there
3. Enable GitHub Pages from the start

## 🎯 Expected Result

Once fixed, your app should be available at:
**https://mindtzijib-mx.github.io/mapty-app/**

The deployment should take 2-5 minutes after pushing to main branch.

---

**Need help? The most common fix is enabling GitHub Pages in repository settings! 🔧**
