# Lion TV Website - Netlify Deployment Guide

## Overview
Your Lion TV website has been converted to work with Netlify using Netlify Forms for order submissions. This is a fully static site that deploys instantly on Netlify.

## How It Works Now

### Order Flow
1. **Customer selects plans** and adds to cart
2. **Customer fills checkout form** with name, email, phone
3. **Form submits to Netlify Forms** (not a database)
4. **You receive email** at sales@iptvlion.shop with order details
5. **You contact customer** via WhatsApp/Email with payment link
6. **Customer pays** and you send activation codes

## Deployment Steps

### Step 1: Prepare Your Project
The project is already configured for Netlify. No additional setup needed!

### Step 2: Deploy to Netlify

**Option A: Using Git (Recommended)**
1. Push your project to GitHub
2. Go to netlify.com and sign up
3. Click "New site from Git"
4. Connect your GitHub account
5. Select your repository
6. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
7. Click "Deploy site"

**Option B: Drag & Drop**
1. Build locally: `npm run build`
2. Go to netlify.com
3. Drag and drop the `dist` folder
4. Your site is live!

**Option C: Using Netlify CLI**
```bash
npm install -g netlify-cli
cd lion_tv_website
netlify deploy --prod
```

### Step 3: Configure Netlify Forms

After deployment:
1. Go to your Netlify site dashboard
2. Go to "Forms" section
3. You should see "lion-tv-checkout" form
4. Set up form notifications:
   - Click on the form
   - Go to "Form settings"
   - Add email notification to sales@iptvlion.shop

### Step 4: Update Contact Information

Before deploying, update these placeholders:
- Replace `1234567890` with your WhatsApp number
- Replace `support@liontv.com` with your email
- Replace `sales@iptvlion.shop` with your order notification email

## Features

✅ **Homepage** - Modern IPTV website with pricing, FAQ, device compatibility
✅ **Checkout** - Shopping cart with plan selection
✅ **Netlify Forms** - Order submissions sent to your email
✅ **Email Notifications** - Receive orders automatically
✅ **Responsive Design** - Works on all devices
✅ **SEO Optimized** - Optimized for "Lion TV Activation Code"
✅ **Fast Deployment** - Instant deployment on Netlify

## What Changed

### Removed
- ❌ Node.js backend server
- ❌ MySQL database
- ❌ tRPC API endpoints
- ❌ Order storage in database

### Added
- ✅ Netlify Forms integration
- ✅ Email notifications via Netlify
- ✅ netlify.toml configuration
- ✅ Static site deployment

## Order Management

When customers place orders:

1. **You receive email** with:
   - Customer name, email, phone
   - Plans ordered with quantities
   - Total amount
   - Order timestamp

2. **You can view all orders** in Netlify dashboard:
   - Go to Forms → lion-tv-checkout
   - See all submissions
   - Export as CSV if needed

3. **You send payment link** via:
   - WhatsApp (customer's phone number)
   - Email (customer's email address)

4. **Customer pays** and you send activation codes

## Environment Variables

No environment variables needed! Netlify Forms works out of the box.

## Troubleshooting

### Form not submitting
- Make sure form name is exactly "lion-tv-checkout"
- Check browser console for errors
- Verify Netlify Forms is enabled in dashboard

### Not receiving emails
- Check Netlify Forms settings
- Verify email address in form notifications
- Check spam folder

### Site not deploying
- Check build logs in Netlify dashboard
- Ensure `npm run build` works locally
- Verify all dependencies are installed

## Customization

### Change Order Notification Email
Edit `client/src/pages/Checkout.tsx` and update the email address in the success message.

### Add More Plans
Edit the `plans` array in `client/src/pages/Checkout.tsx`

### Customize Checkout Form
Edit form fields in `client/src/pages/Checkout.tsx`

## Support

For Netlify-specific issues:
- Netlify Docs: https://docs.netlify.com
- Netlify Forms: https://docs.netlify.com/forms/setup/

For your Lion TV website:
- Refer to README_DEPLOYMENT.md for general info
- Check SETUP_LOCAL.md for local development

## Next Steps

1. Deploy to Netlify
2. Test the checkout form
3. Verify you receive order emails
4. Update WhatsApp number and email addresses
5. Start accepting orders!

Your Lion TV website is now Netlify-ready! 🚀
