# Deployment Guide - Task Management System Frontend

This guide provides comprehensive instructions for deploying the Task Management System frontend to Vercel.

## Prerequisites

Before deploying, ensure you have:

1. A Vercel account ([Sign up at vercel.com](https://vercel.com/signup))
2. The backend API deployed and accessible (with its URL)
3. Node.js 18+ installed locally (for CLI deployment)
4. Git repository with the latest code

## Deployment Methods

You can deploy the frontend to Vercel using either the **Vercel Dashboard** (recommended for beginners) or the **Vercel CLI** (recommended for advanced users).

---

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Connect Your Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"** or **"Import Project"**
3. Select your Git provider (GitHub, GitLab, or Bitbucket)
4. Authorize Vercel to access your repositories if prompted
5. Find and select the `task-management-system` repository
6. Click **"Import"**

### Step 2: Configure Project Settings

1. **Framework Preset**: Vercel should auto-detect **Next.js** - confirm this is selected
2. **Root Directory**: Set to `frontend` (very important!)
   - Click **"Edit"** next to Root Directory
   - Enter `frontend`
   - Click **"Continue"**
3. **Build Settings**:
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

### Step 3: Configure Environment Variables

Before deploying, add the required environment variables:

1. In the project configuration, find the **"Environment Variables"** section
2. Add the following variable:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: Your deployed backend API URL (e.g., `https://your-backend-api.herokuapp.com`)
   - **Environment**: Production (select the checkbox)
3. Click **"Add"** to save the variable

> **Important**: Make sure your backend API URL does NOT end with a trailing slash

### Step 4: Deploy

1. Review all settings
2. Click **"Deploy"**
3. Wait for the build to complete (typically 1-3 minutes)
4. Once deployed, you'll see a success screen with your deployment URL

### Step 5: Access Your Deployment

1. Click on the deployment URL (e.g., `https://your-app.vercel.app`)
2. Your frontend application should now be live!

---

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate.

### Step 3: Navigate to Frontend Directory

```bash
cd frontend
```

### Step 4: Deploy to Vercel

For the first deployment:

```bash
vercel
```

You'll be prompted with several questions:
- **Set up and deploy**: `Y`
- **Which scope**: Select your account/team
- **Link to existing project**: `N`
- **What's your project's name**: `task-management-system-frontend` (or your preferred name)
- **In which directory is your code located**: `./` (since you're already in the frontend directory)
- **Want to override the settings**: `N` (Vercel will auto-detect Next.js)

For subsequent deployments:

```bash
vercel --prod
```

### Step 5: Set Environment Variables via CLI

```bash
vercel env add NEXT_PUBLIC_API_URL production
```

When prompted, enter your backend API URL (e.g., `https://your-backend-api.herokuapp.com`)

Alternatively, you can set environment variables in the Vercel Dashboard:
1. Go to your project settings
2. Navigate to **"Environment Variables"**
3. Add `NEXT_PUBLIC_API_URL` with your backend URL

---

## Post-Deployment Configuration

### 1. Custom Domain (Optional)

To add a custom domain:

1. Go to your project in Vercel Dashboard
2. Click on **"Settings"** → **"Domains"**
3. Click **"Add"**
4. Enter your domain name (e.g., `taskmanager.yourdomain.com`)
5. Follow the DNS configuration instructions provided by Vercel
6. Wait for DNS propagation (can take up to 48 hours, usually much faster)

### 2. HTTPS Configuration

Vercel automatically provides free SSL certificates for all deployments:
- Default `.vercel.app` domains get instant HTTPS
- Custom domains get automatic SSL certificate provisioning

### 3. CORS Configuration

Ensure your backend API is configured to allow requests from your Vercel deployment URL:

```javascript
// Example backend CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://your-app.vercel.app',
  'https://your-custom-domain.com'
];
```

---

## Testing Your Deployment

After deployment, thoroughly test the application:

### 1. Basic Functionality Test

1. **Access the deployment URL**
   ```
   https://your-app.vercel.app
   ```

2. **Test User Registration**
   - Navigate to `/register`
   - Create a new user account
   - Verify you're redirected to login page
   - Check for success notification

3. **Test User Login**
   - Navigate to `/login`
   - Login with your credentials
   - Verify you're redirected to dashboard
   - Confirm user name is displayed

4. **Test Protected Routes**
   - Open an incognito/private browser window
   - Try accessing `/dashboard` directly
   - Verify redirect to login page

5. **Test Task Management**
   - Create a new task
   - Edit an existing task
   - Toggle task status (PENDING ↔ COMPLETED)
   - Delete a task
   - Test search functionality
   - Test filter by status
   - Test pagination (if you have 10+ tasks)

6. **Test Logout**
   - Click logout button
   - Verify redirect to login page
   - Try accessing dashboard (should redirect to login)

### 2. Integration Test

Verify the frontend communicates correctly with the backend:

1. Open browser Developer Tools (F12)
2. Go to **Network** tab
3. Perform various actions (login, create task, etc.)
4. Verify API calls are being made to the correct backend URL
5. Check for any CORS errors or failed requests

### 3. Performance Test

1. Open browser Developer Tools
2. Go to **Lighthouse** tab (Chrome) or similar performance tool
3. Run performance audit
4. Check for:
   - Performance score > 80
   - Accessibility score > 90
   - Best Practices score > 80
   - SEO score > 80

### 4. Mobile Responsiveness Test

1. Open the deployment on mobile device or use browser responsive mode
2. Test all features on different screen sizes:
   - Mobile (< 640px)
   - Tablet (640px - 1024px)
   - Desktop (> 1024px)

---

## Continuous Deployment

Vercel automatically sets up continuous deployment:

1. **Automatic Deployments**: Every push to your main/master branch triggers a production deployment
2. **Preview Deployments**: Pull requests automatically get preview deployments
3. **Branch Deployments**: Each branch gets its own deployment URL

### Managing Deployments

1. **View Deployment History**
   - Go to Vercel Dashboard → Your Project
   - Click **"Deployments"** tab
   - View all past deployments

2. **Rollback to Previous Deployment**
   - Click on any previous deployment
   - Click **"Promote to Production"**

3. **Cancel a Running Deployment**
   - Go to Deployments tab
   - Click on the running deployment
   - Click **"Cancel Deployment"**

---

## Environment Variables Management

### Adding New Variables

Via Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Click **"Add"**
3. Enter Name and Value
4. Select environments (Production, Preview, Development)
5. Click **"Save"**

Via CLI:
```bash
vercel env add VARIABLE_NAME production
```

### Updating Variables

1. Go to Project Settings → Environment Variables
2. Find the variable
3. Click **"Edit"**
4. Update the value
5. **Redeploy** your application for changes to take effect

### Removing Variables

1. Go to Project Settings → Environment Variables
2. Find the variable
3. Click **"Remove"**
4. Confirm the removal

> **Note**: After changing environment variables, you must redeploy your application:
> ```bash
> vercel --prod
> ```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Build Fails with "Module not found"

**Problem**: Missing dependencies or incorrect paths

**Solution**:
- Ensure all dependencies are listed in `package.json`
- Run `npm install` locally to verify
- Check that the Root Directory is set to `frontend`

#### 2. Environment Variable Not Working

**Problem**: `NEXT_PUBLIC_API_URL` is undefined or using wrong value

**Solution**:
- Ensure variable name starts with `NEXT_PUBLIC_` (required for client-side access)
- Redeploy after adding/updating environment variables
- Check variable is set for "Production" environment
- Clear browser cache and hard reload (Ctrl+Shift+R)

#### 3. CORS Errors

**Problem**: Backend rejects requests from Vercel deployment

**Solution**:
- Update backend CORS configuration to allow your Vercel URL
- Ensure backend allows credentials: `credentials: true`
- Check backend URL is correct (no trailing slash)

#### 4. 404 Not Found on Routes

**Problem**: Direct access to routes like `/dashboard` returns 404

**Solution**:
- This shouldn't happen with Next.js on Vercel (automatic handling)
- If it does, verify `vercel.json` configuration is correct
- Check Next.js version compatibility

#### 5. Infinite Redirect Loop

**Problem**: Application keeps redirecting between login and dashboard

**Solution**:
- Check authentication logic in `ProtectedRoute.tsx`
- Verify tokens are being stored correctly
- Check browser console for errors
- Clear localStorage and cookies

#### 6. Slow Initial Load

**Problem**: First page load takes long time

**Solution**:
- Enable Next.js static optimization
- Check backend API response time
- Use Vercel Analytics to identify bottlenecks
- Consider implementing loading states

#### 7. Deployment Succeeds but App Shows White Screen

**Problem**: Build succeeds but browser shows blank page

**Solution**:
- Check browser console for JavaScript errors
- Verify environment variables are set correctly
- Check if backend API is accessible
- Enable error logging in production

---

## Monitoring and Analytics

### Enable Vercel Analytics

1. Go to your project in Vercel Dashboard
2. Click on **"Analytics"** tab
3. Click **"Enable Analytics"**
4. View real-time performance metrics

### Enable Vercel Logs

1. Go to your project in Vercel Dashboard
2. Click on **"Logs"** tab
3. View function logs and errors in real-time
4. Filter by deployment, function, or time range

### Set Up Alerts

1. Go to Project Settings → Integrations
2. Add integrations for:
   - Slack notifications
   - Email alerts
   - Discord webhooks

---

## Security Best Practices

1. **Never Commit Secrets**
   - Always use environment variables for sensitive data
   - Add `.env` to `.gitignore` (already configured)
   - Use Vercel's encrypted environment variables

2. **Use HTTPS Only**
   - Vercel provides automatic HTTPS
   - Ensure backend also uses HTTPS in production
   - Update `NEXT_PUBLIC_API_URL` to use `https://`

3. **Regular Updates**
   - Keep dependencies updated
   - Monitor security advisories
   - Use `npm audit` to check for vulnerabilities

4. **Access Control**
   - Limit Vercel team access to necessary members
   - Use different environment variables for different environments
   - Implement proper authentication in the application

---

## Performance Optimization

### 1. Enable Caching

Vercel automatically caches static assets. Ensure your `next.config.js` is optimized:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add optimizations
  swcMinify: true,
  compress: true,
};

export default nextConfig;
```

### 2. Image Optimization

Use Next.js Image component for automatic optimization:

```javascript
import Image from 'next/image';
```

### 3. Code Splitting

Next.js automatically code-splits by route. For additional optimization:

```javascript
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('../components/Heavy'));
```

---

## Scaling Considerations

### Concurrent Users

- Vercel's free tier supports reasonable traffic
- For high traffic, consider upgrading to Pro plan
- Monitor usage in Vercel Dashboard

### API Rate Limiting

- Implement rate limiting on backend
- Handle rate limit errors gracefully in frontend
- Show appropriate messages to users

### Database Connections

- Ensure backend manages database connections efficiently
- Use connection pooling
- Monitor database performance

---

## Support and Resources

### Documentation
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)

### Community
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Next.js Discord](https://nextjs.org/discord)

### Getting Help
- Check Vercel Dashboard logs
- Review this troubleshooting guide
- Contact Vercel Support (for paid plans)

---

## Deployment Checklist

Before going live, ensure:

- [ ] Backend API is deployed and accessible
- [ ] `NEXT_PUBLIC_API_URL` environment variable is set correctly
- [ ] All frontend features work on local build (`npm run build` && `npm start`)
- [ ] CORS is configured on backend to allow Vercel domain
- [ ] SSL/HTTPS is working (automatic with Vercel)
- [ ] All routes are accessible (login, register, dashboard)
- [ ] Authentication flow works correctly
- [ ] Task CRUD operations work
- [ ] Search and filter functionality works
- [ ] Mobile responsiveness is tested
- [ ] Error handling is in place
- [ ] Performance is acceptable (Lighthouse score)
- [ ] README is updated with deployment URL
- [ ] Team members have access to Vercel project (if needed)

---

## Next Steps

After successful deployment:

1. **Update Documentation**
   - Add deployment URL to README
   - Document any deployment-specific configurations
   - Update team with deployment details

2. **Set Up Monitoring**
   - Enable Vercel Analytics
   - Set up error tracking (e.g., Sentry)
   - Configure uptime monitoring

3. **Plan for Updates**
   - Establish deployment workflow
   - Set up staging environment (preview deployments)
   - Document rollback procedures

4. **Gather Feedback**
   - Share deployment URL with stakeholders
   - Collect user feedback
   - Monitor for issues

---

## Conclusion

Your Task Management System frontend is now deployed on Vercel! The application benefits from:

- ✅ Automatic HTTPS
- ✅ Global CDN distribution
- ✅ Automatic deployments on git push
- ✅ Preview deployments for pull requests
- ✅ Zero-downtime deployments
- ✅ Automatic scaling

For questions or issues, refer to the troubleshooting section or consult the Vercel documentation.
