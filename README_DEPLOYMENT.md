# Lion TV IPTV Website - Deployment Guide

## Project Overview
This is a modern, SEO-optimized IPTV website built with React, Node.js, and MySQL. It includes a complete checkout system with cash-on-delivery payment method.

## Key Features
- **Modern Homepage**: Dark-themed design with hero section, pricing, FAQ, and device compatibility
- **Checkout System**: Shopping cart with 4 subscription plans (Monthly, Quarterly, 6 Months, Annual)
- **Order Management**: Database-backed order system with email notifications
- **Contact Integration**: WhatsApp and email contact buttons
- **SEO Optimized**: Meta tags, schema markup, robots.txt, and sitemap.xml
- **Responsive Design**: Works on all devices (mobile, tablet, desktop)

## Project Structure
```
lion_tv_website/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components (Home, Checkout)
│   │   ├── components/    # Reusable UI components
│   │   ├── App.tsx        # Main app with routing
│   │   └── index.css      # Global styles
│   └── public/            # Static assets (robots.txt, sitemap.xml)
├── server/                # Node.js backend
│   ├── routers.ts         # tRPC API routes (checkout, auth)
│   ├── db.ts              # Database queries
│   └── _core/             # Core utilities
├── drizzle/               # Database schema and migrations
│   └── schema.ts          # Orders, order items, users tables
└── package.json           # Dependencies
```

## Subscription Plans
1. **Monthly**: $9.99 (1 month)
2. **Quarterly**: $24.99 (3 months, 17% savings)
3. **6 Months**: $44.99 (6 months, 25% savings) - Most Popular
4. **Annual**: $79.99 (12 months, 33% savings)

## Order Flow
1. Customer selects plans and adds to cart on checkout page
2. Customer enters name, email, and phone
3. Order is created and saved to database
4. **You receive email notification** at sales@iptvlion.shop
5. You contact customer with payment link via WhatsApp/Email
6. Customer pays
7. You send activation codes to customer

## Configuration

### Email Configuration
Orders are sent to: **sales@iptvlion.shop**

To change this, update the OWNER_EMAIL environment variable.

### Contact Information
Update these in the code:
- **WhatsApp**: Change `1234567890` to your WhatsApp number in Home.tsx and Checkout.tsx
- **Email**: Change `support@liontv.com` to your email address

### Pricing
To update prices, edit the `plans` array in:
- `client/src/pages/Home.tsx`
- `client/src/pages/Checkout.tsx`

Prices are in cents (e.g., 999 = $9.99)

## Deployment Options

### Option 1: Manus Platform (Recommended)
1. Click **Publish** button in Management UI
2. Website goes live instantly
3. Get automatic SSL, CDN, and backups
4. Custom domain support

### Option 2: Self-Host
1. Download all files from Code panel
2. Install dependencies: `npm install` or `pnpm install`
3. Build: `npm run build`
4. Deploy `dist/` folder to:
   - Vercel (recommended for React)
   - Netlify
   - AWS S3 + CloudFront
   - Traditional hosting (FTP)

## Environment Variables
Required for production:
- `DATABASE_URL`: MySQL connection string
- `JWT_SECRET`: Secret for JWT tokens
- `OWNER_EMAIL`: Email for order notifications
- `OAUTH_SERVER_URL`: OAuth server URL

## Database
- **Type**: MySQL
- **Tables**: 
  - `users`: User accounts
  - `orders`: Customer orders
  - `orderItems`: Items in each order

## Support
For questions about deployment or customization, refer to the Management UI documentation or contact support.

## License
This project is proprietary and created for Lion TV IPTV service.
