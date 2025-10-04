# Deployment Guide for TriNextGen

## Prerequisites
1. Vercel account
2. GitHub account

## Deployment Steps

### 1. Push Code to GitHub
```bash
git init
git add .
git commit -m "Prepare for deployment"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Deploy to Vercel
1. Go to [Vercel](https://vercel.com/)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: "Vite"
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### 3. Redeploy
After setting environment variables, redeploy your application in Vercel.

## Testing
After deployment, verify that:
1. The frontend loads correctly at your Vercel deployment URL
2. All routes work properly (navigation between pages)
3. The application is responsive and functions as expected

## Troubleshooting
If you encounter issues:
1. Check Vercel logs for error messages
2. Verify that the vercel.json configuration is correct
3. Ensure all dependencies are properly installed
4. Confirm that the build completes successfully locally with `npm run build`