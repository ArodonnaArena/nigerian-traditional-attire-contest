# Vercel Deployment Guide

## Project Structure
This is a React TypeScript application built with Vite, located in the `frontend/` directory.

## Environment Variables
Set these environment variables in your Vercel dashboard:

### Required Variables:
- `REACT_APP_PAYSTACK_PUBLIC_KEY`: Your Paystack public key (pk_test_... for test or pk_live_... for production)
- `REACT_APP_API_URL`: Your backend API URL 
- `REACT_APP_APP_NAME`: "Nigerian Traditional Attire Contest"
- `REACT_APP_APP_URL`: Your deployed Vercel URL (will be provided after deployment)

### Setting Environment Variables in Vercel:
1. Go to your project dashboard on Vercel
2. Click on "Settings" tab
3. Click on "Environment Variables" 
4. Add each variable with its value
5. Select the appropriate environments (Production, Preview, Development)

## Deployment Configuration

### vercel.json
The project includes a `vercel.json` configuration file that:
- Builds the React app from the `frontend/` directory
- Serves the built files from `frontend/dist/`
- Handles client-side routing with proper fallback to `index.html`

### Build Process
- Install command: `npm install` (in frontend directory)
- Build command: `npm run vercel-build` (in frontend directory)
- Output directory: `frontend/dist/`

## Post-Deployment Steps
1. Update `REACT_APP_APP_URL` environment variable with your Vercel deployment URL
2. Update Paystack webhook URLs to point to your deployed API endpoints
3. Test the payment integration in Paystack dashboard
4. Update any CORS settings if you have a separate backend API

## File Structure
```
nigerian-traditional-attire-contest/
├── frontend/                    # React TypeScript app
│   ├── src/                    # Source code
│   ├── public/                 # Static assets
│   ├── dist/                   # Build output (created during build)
│   ├── package.json            # Dependencies and scripts
│   └── vite.config.ts          # Vite configuration
├── vercel.json                 # Vercel deployment config
├── .vercelignore              # Files to ignore during deployment
└── VERCEL_DEPLOYMENT.md       # This file
```

## Troubleshooting
- If build fails: Check that all dependencies are listed in package.json
- If routing doesn't work: Verify the rewrites configuration in vercel.json
- If environment variables aren't working: Ensure they start with `REACT_APP_` for client-side access
- If Paystack integration fails: Check your public key and ensure it matches your environment (test/live)