# Quick Deployment Guide - Vercel

This is a quick reference for deploying the Task Management System frontend to Vercel.

## ⚡ Quick Deploy (5 Minutes)

### Using Vercel Dashboard (Easiest)

1. **Go to Vercel**: https://vercel.com/dashboard
2. **Click**: "Add New Project" → "Import Project"
3. **Select**: Your GitHub repository
4. **Configure**:
   - Root Directory: `frontend`
   - Framework: Next.js (auto-detected)
5. **Add Environment Variable**:
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: Your backend API URL (e.g., `https://api.yourapp.com`)
6. **Click**: "Deploy"

✅ Done! Your app will be live at `https://your-app.vercel.app`

---

## 🔧 Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend
cd frontend

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

## 📝 Required Environment Variable

**Must be set in Vercel dashboard:**

```
NEXT_PUBLIC_API_URL=https://your-backend-api-url.com
```

⚠️ **Important**: 
- Do NOT include trailing slash
- Use `https://` for production
- Must start with `NEXT_PUBLIC_` to work in browser

---

## ✅ Post-Deployment Checklist

After deployment, test:

- [ ] Visit your deployment URL
- [ ] Test registration: `/register`
- [ ] Test login: `/login`
- [ ] Test dashboard: `/dashboard`
- [ ] Create a task
- [ ] Edit a task
- [ ] Delete a task
- [ ] Test search and filter
- [ ] Test logout

---

## 🆘 Common Issues

### Issue: "Environment variable undefined"
**Fix**: Redeploy after adding environment variables

### Issue: "CORS error"
**Fix**: Add your Vercel URL to backend CORS whitelist

### Issue: "404 Not Found"
**Fix**: Verify Root Directory is set to `frontend`

---

## 📚 Need More Details?

See the comprehensive guide: **[DEPLOYMENT.md](./DEPLOYMENT.md)**

---

## 🔗 Useful Links

- Vercel Dashboard: https://vercel.com/dashboard
- Vercel CLI Docs: https://vercel.com/docs/cli
- Next.js Docs: https://nextjs.org/docs

---

**Happy Deploying! 🚀**
