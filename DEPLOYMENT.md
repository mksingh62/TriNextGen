# Deployment Guide for TriNextGen

## Prerequisites
1. MongoDB Atlas account with database set up
2. Vercel account
3. GitHub account

## Environment Variables
The following environment variables need to be set in Vercel:

```
MONGO_URI=mongodb+srv://Vercel-Admin-TrinextGenDb:N3SBwXIko0ILXmp8@trinextgendb.2poyxo2.mongodb.net/?retryWrites=true&w=majority
FRONTEND_URL=https://tri-next-gen.vercel.app
VITE_API_BASE=https://tri-next-gen.vercel.app
ADMIN_EMAIL=trinextgen@gmail.com
ADMIN_PASSWORD=password123
```

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
   - Framework Preset: "Other"
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### 3. Set Environment Variables in Vercel
In your Vercel project settings, go to "Environment Variables" and add all the variables listed above.

### 4. Configure MongoDB Atlas
In your MongoDB Atlas dashboard:
1. Add `https://tri-next-gen.vercel.app` to your IP whitelist
2. Ensure your database user has proper read/write permissions

### 5. Redeploy
After setting environment variables, redeploy your application in Vercel.

## Testing
After deployment, verify that:
1. The frontend loads correctly at https://tri-next-gen.vercel.app
2. API endpoints are accessible at https://tri-next-gen.vercel.app/api/
3. MongoDB connection is working
4. Admin panel functions properly at https://tri-next-gen.vercel.app/admin

## Troubleshooting
If you encounter issues:
1. Check Vercel logs for error messages
2. Verify all environment variables are set correctly
3. Ensure MongoDB Atlas IP whitelist includes Vercel's IP ranges
4. Check that the database user has proper permissions