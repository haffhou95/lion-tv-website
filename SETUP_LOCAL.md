# Local Development Setup Guide

## Prerequisites
- Node.js 18+ installed
- npm or pnpm package manager
- MySQL database (local or remote)

## Installation Steps

### 1. Install Dependencies
```bash
cd lion_tv_website
pnpm install
# or
npm install
```

### 2. Setup Environment Variables
Create a `.env.local` file in the root directory:
```
DATABASE_URL=mysql://user:password@localhost:3306/lion_tv
JWT_SECRET=your-secret-key-here
OWNER_EMAIL=sales@iptvlion.shop
```

### 3. Setup Database
```bash
pnpm db:push
# This will create all tables (users, orders, orderItems)
```

### 4. Update Contact Information
Edit these files with your actual contact details:

**File: client/src/pages/Home.tsx**
- Line 83: Replace `1234567890` with your WhatsApp number
- Line 94: Replace `support@liontv.com` with your email

**File: client/src/pages/Checkout.tsx**
- Search for `1234567890` and replace with your WhatsApp number
- Search for `support@liontv.com` and replace with your email

### 5. Start Development Server
```bash
pnpm dev
```

The website will be available at `http://localhost:3000`

## Testing the Checkout

1. Go to http://localhost:3000
2. Click "Buy Activation Code" button
3. Select plans and add to cart
4. Fill in customer information
5. Click "Place Order"
6. You should see an order confirmation

## Building for Production
```bash
pnpm build
```

This creates an optimized build in the `dist/` folder.

## Troubleshooting

**Database Connection Error**
- Check your DATABASE_URL is correct
- Ensure MySQL is running
- Verify user has proper permissions

**Port Already in Use**
- Change port in `vite.config.ts` or `package.json`
- Or kill the process using port 3000

**Missing Dependencies**
- Run `pnpm install` again
- Clear node_modules: `rm -rf node_modules && pnpm install`

## Project Structure
- `client/` - React frontend
- `server/` - Node.js backend with tRPC
- `drizzle/` - Database schema
- `package.json` - Dependencies and scripts

## Available Scripts
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm db:push` - Push database migrations
- `pnpm db:studio` - Open database studio

## Support
For issues or questions, refer to the main README_DEPLOYMENT.md file.
