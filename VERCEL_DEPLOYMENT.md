# Lion TV Website - Vercel Deployment Guide

## Overview
Your Lion TV website is now fully configured for Vercel deployment. Vercel is the best choice for full-stack applications with Node.js backends and databases.

## Why Vercel?

✅ **Full Backend Support** - Node.js server runs natively
✅ **Database Ready** - MySQL database integration
✅ **API Endpoints** - tRPC API works perfectly
✅ **Automatic Deployments** - Deploy from GitHub with one click
✅ **Free Tier** - Generous free tier for startups
✅ **Fast & Reliable** - CDN-backed deployment
✅ **Easy Scaling** - Scales automatically

## Prerequisites

Before deploying, you need:
1. GitHub account (to push your code)
2. Vercel account (free at vercel.com)
3. MySQL database (local or cloud)

## Step 1: Set Up GitHub Repository

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit - Lion TV website"

# Create repository on GitHub and push
git remote add origin https://github.com/YOUR_USERNAME/lion_tv_website.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### **Option A: Using Vercel Dashboard (Easiest)**

1. Go to **vercel.com** and sign up
2. Click **"New Project"**
3. Click **"Import Git Repository"**
4. Select your GitHub repository
5. Vercel will auto-detect settings
6. Click **"Deploy"**

### **Option B: Using Vercel CLI**

```bash
npm install -g vercel
cd lion_tv_website
vercel
```

Follow the prompts and your site will be deployed!

## Step 3: Configure Environment Variables

After deployment, you need to set up environment variables:

1. Go to your Vercel project dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Add these variables:

```
DATABASE_URL=mysql://user:password@host:3306/lion_tv
JWT_SECRET=your-secret-key-here
OWNER_EMAIL=sales@iptvlion.shop
NODE_ENV=production
```

### Getting a MySQL Database

**Option 1: PlanetScale (Free MySQL Hosting)**
- Go to planetscale.com
- Create free account
- Create new database
- Copy connection string to DATABASE_URL

**Option 2: AWS RDS**
- Create RDS instance
- Use connection string as DATABASE_URL

**Option 3: Local Database**
- If you have MySQL locally, use your local connection string

## Step 4: Set Up Database

After setting environment variables:

```bash
# Run migrations
npm run db:push

# This will create all tables (users, orders, orderItems)
```

## Step 5: Update Contact Information

Before going live, update these files:
- Replace `1234567890` with your WhatsApp number
- Replace `support@liontv.com` with your email
- Verify `sales@iptvlion.shop` is correct

## Step 6: Test Your Site

1. Visit your Vercel deployment URL
2. Test the homepage - should load perfectly
3. Click "Buy Activation Code"
4. Go to checkout
5. Fill form and submit order
6. You should receive email at sales@iptvlion.shop

## Features

✅ **Homepage** - Modern IPTV website
✅ **Checkout System** - Full shopping cart with database
✅ **Order Management** - Orders saved in database
✅ **Email Notifications** - Automatic order emails
✅ **Payment Tracking** - Track payment status
✅ **API Endpoints** - Full tRPC API
✅ **Responsive Design** - Works on all devices
✅ **SEO Optimized** - Optimized for "Lion TV Activation Code"

## Automatic Deployments

Once set up, every time you push to GitHub:
1. Vercel automatically detects the change
2. Builds your project
3. Deploys to production
4. Your site updates instantly!

## Troubleshooting

### Database Connection Error
- Check DATABASE_URL is correct
- Verify MySQL is running
- Test connection string locally first

### Build Fails
- Check build logs in Vercel dashboard
- Ensure `npm run build` works locally
- Verify all dependencies are installed

### Orders Not Saving
- Check database connection
- Verify tables are created (`npm run db:push`)
- Check browser console for errors

### Emails Not Sending
- Verify OWNER_EMAIL environment variable
- Check email configuration
- Look for errors in server logs

## Custom Domain

To add your own domain:
1. Go to Vercel project settings
2. Click "Domains"
3. Add your domain
4. Follow DNS setup instructions
5. Wait 24 hours for propagation

## Performance Tips

- Vercel automatically optimizes your site
- Use CDN for static assets
- Database queries are cached
- API responses are optimized

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **Database Issues**: Check your database provider docs

## Next Steps

1. Push to GitHub
2. Deploy to Vercel
3. Set environment variables
4. Run database migrations
5. Test the site
6. Start accepting orders!

Your Lion TV website is now ready for Vercel! 🚀
