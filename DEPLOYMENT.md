# 🚀 Deployment Guide - GitHub Pages

This guide will help you deploy your React Mapty app to GitHub Pages.

## 📋 Prerequisites

1. **GitHub Repository**: Make sure your code is pushed to a GitHub repository
2. **Node.js**: Ensure you have Node.js installed locally
3. **GitHub Account**: You need a GitHub account with repository access

## 🔧 Setup Steps

### 1. Repository Configuration

1. **Push your code** to GitHub:

```bash
git add .
git commit -m "Add React Mapty app with tests and deployment config"
git push origin main
```

2. **Enable GitHub Pages** in your repository:
   - Go to your repository on GitHub
   - Click on **Settings** tab
   - Scroll down to **Pages** section
   - Under **Source**, select **GitHub Actions**

### 2. Automatic Deployment (Recommended)

The project is already configured with GitHub Actions for automatic deployment:

- **Workflow file**: `.github/workflows/deploy.yml`
- **Triggers**: Automatically runs on push to `main` branch
- **Process**: Tests → Lint → Build → Deploy

**What happens automatically:**

1. ✅ Runs all tests (must pass to deploy)
2. ✅ Runs ESLint checks
3. ✅ Builds the production version
4. ✅ Deploys to GitHub Pages

### 3. Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# Build and deploy manually
npm run deploy
```

## 🌐 Accessing Your Live App

Once deployed, your app will be available at:

```
https://mindtzijib-mx.github.io/mapty-app/
```

Replace `[your-username]` with your actual GitHub username.

## 🔍 Testing Before Deployment

### Local Testing

```bash
# Test the production build locally
npm run build
npm run preview
```

### Run All Checks

```bash
# Run the same checks as CI/CD
npm test
npm run lint
npm run build
```

## 🐛 Troubleshooting

### Common Issues

1. **404 Error on GitHub Pages**

   - Check that GitHub Pages is enabled in repository settings
   - Ensure the source is set to "GitHub Actions"
   - Verify the base path in `vite.config.ts` matches your repository name

2. **Build Fails**

   - Run `npm run build` locally to check for errors
   - Ensure all tests pass with `npm test`
   - Check for TypeScript errors with `npm run lint`

3. **Assets Not Loading**

   - Verify the `base` path in `vite.config.ts`
   - Check that image paths are correct (use `/` prefix for public assets)

4. **Map Not Loading**
   - Ensure Leaflet CSS is properly imported
   - Check browser console for JavaScript errors
   - Verify geolocation permissions

### Checking Deployment Status

1. **GitHub Actions Tab**: Check the workflow status
2. **Repository Settings > Pages**: Verify the deployment URL
3. **Browser Console**: Check for any runtime errors

## 🔄 Updating Your Deployment

To update your live app:

1. **Make changes** to your code
2. **Test locally**:
   ```bash
   npm test
   npm run build
   ```
3. **Push to main branch**:
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```
4. **Automatic deployment** will trigger within a few minutes

## 📊 Monitoring

- **GitHub Actions**: Monitor deployment status in the Actions tab
- **GitHub Pages**: Check deployment history in Settings > Pages
- **Analytics**: Consider adding Google Analytics for usage tracking

## 🎯 Next Steps

Once deployed, you can:

1. **Share the URL** with others
2. **Add it to your portfolio**
3. **Submit it for code reviews**
4. **Continue adding features**

## 🔗 Useful Links

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

**Happy Deploying! 🚀**
