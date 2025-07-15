# 🚀 GitHub Pages Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Code Quality

- [ ] All tests pass: `npm test`
- [ ] No linting errors: `npm run lint`
- [ ] Build succeeds: `npm run build`
- [ ] Preview works: `npm run preview`

### 2. GitHub Repository Setup

- [ ] Code is pushed to GitHub repository
- [ ] Repository name matches the base path in `vite.config.ts`
- [ ] Main branch exists and is up to date

### 3. GitHub Pages Configuration

- [ ] Go to repository **Settings** → **Pages**
- [ ] Set **Source** to **"GitHub Actions"**
- [ ] Ensure **Branch** is set to **"main"** (if using branch deployment)

### 4. Files Check

- [ ] `.github/workflows/deploy.yml` exists
- [ ] `package.json` has correct homepage URL
- [ ] `vite.config.ts` has correct base path
- [ ] All assets are in the `public/` folder

## 🔧 Deployment Steps

### Automatic Deployment (Recommended)

1. **Push to main branch**:

   ```bash
   git add .
   git commit -m "Deploy React Mapty app"
   git push origin main
   ```

2. **Monitor deployment**:

   - Go to **Actions** tab in GitHub
   - Watch the "Deploy to GitHub Pages" workflow
   - Wait for green checkmark ✅

3. **Access your app**:
   - URL: `https://[username].github.io/mapty-app/`
   - Should be available within 5-10 minutes

### Manual Deployment (Alternative)

```bash
npm run deploy
```

## 🔍 Post-Deployment Verification

### 1. Basic Functionality

- [ ] App loads without errors
- [ ] Map displays correctly
- [ ] Geolocation prompt appears
- [ ] Can click on map to add workout
- [ ] Form appears and works
- [ ] Can submit workouts
- [ ] Workouts appear in sidebar
- [ ] Can click workouts to navigate map
- [ ] Data persists in localStorage

### 2. Technical Checks

- [ ] No console errors
- [ ] All assets load (CSS, JS, images)
- [ ] Leaflet map tiles load
- [ ] Responsive design works on mobile
- [ ] HTTPS is working (GitHub Pages uses HTTPS)

### 3. Performance

- [ ] App loads quickly
- [ ] Map interactions are smooth
- [ ] No memory leaks in browser dev tools

## 🐛 Troubleshooting

### Common Issues & Solutions

| Issue              | Solution                                                       |
| ------------------ | -------------------------------------------------------------- |
| 404 Page Not Found | Check GitHub Pages settings, ensure source is "GitHub Actions" |
| Assets not loading | Verify base path in `vite.config.ts` matches repo name         |
| Map not displaying | Check Leaflet CSS import and console for errors                |
| Build fails        | Run `npm run build` locally to debug                           |
| Tests fail         | Fix failing tests before deployment                            |
| Workflow fails     | Check Actions tab for detailed error logs                      |

### Debug Commands

```bash
# Check build locally
npm run build && npm run preview

# Run all quality checks
npm test && npm run lint && npm run build

# Check GitHub Actions logs
# Go to repository → Actions → Click on failed workflow
```

## 📊 Monitoring Your Deployment

### GitHub Actions

- **Location**: Repository → Actions tab
- **What to watch**: "Deploy to GitHub Pages" workflow
- **Status indicators**: ✅ Success, ❌ Failed, 🟡 In Progress

### GitHub Pages

- **Location**: Repository → Settings → Pages
- **Information**: Deployment URL, last deployment time
- **Custom domain**: Can be configured here if needed

### Browser Developer Tools

- **Console**: Check for JavaScript errors
- **Network**: Verify all resources load correctly
- **Application**: Check localStorage functionality

## 🎯 Success Criteria

Your deployment is successful when:

1. ✅ **GitHub Actions workflow** completes without errors
2. ✅ **App loads** at the GitHub Pages URL
3. ✅ **All functionality works** as expected
4. ✅ **No console errors** in browser
5. ✅ **Mobile responsive** design works
6. ✅ **Map and geolocation** work properly

## 🔄 Updating Your Live App

For future updates:

1. **Make changes** locally
2. **Test thoroughly**: `npm test && npm run build`
3. **Commit and push**:
   ```bash
   git add .
   git commit -m "Update: [describe changes]"
   git push origin main
   ```
4. **Wait for auto-deployment** (5-10 minutes)
5. **Verify changes** on live site

---

**Ready to deploy? Let's make your React Mapty app live! 🚀**
