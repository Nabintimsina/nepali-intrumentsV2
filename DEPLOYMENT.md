# Deployment Guide

## 🚀 Deploying Traditional Musical Instruments of Nepal Platform

This guide covers various deployment options for the platform.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure:
- [ ] All dependencies are installed (`npm install`)
- [ ] Build succeeds locally (`npm run build`)
- [ ] No console errors
- [ ] Environment variables are configured
- [ ] Assets are optimized
- [ ] Testing is complete

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - Easiest)

**Best for:** Quick deployment, automatic deployments from Git

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow prompts**
   - Link to Git repository
   - Configure project settings
   - Deploy

**Advantages:**
- ✅ Zero configuration
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Free tier available
- ✅ Git integration (auto-deploy on push)

**Configuration:**
Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

---

### Option 2: Netlify

**Best for:** Simple static hosting, form handling

1. **Install Netlify CLI**
   ```bash
   npm i -g netlify-cli
   ```

2. **Build**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

**Configuration:**
Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Option 3: GitHub Pages

**Best for:** Free hosting for open-source projects

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "homepage": "https://username.github.io/repo-name",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.js**
   ```javascript
   export default defineConfig({
     base: '/repo-name/', // Your repo name
     plugins: [react()],
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

---

### Option 4: Traditional Web Server (Apache/Nginx)

**Best for:** Full control, custom domain, own infrastructure

#### Build the Project
```bash
npm run build
```

This creates a `dist/` folder with optimized static files.

#### Apache Configuration

Create `.htaccess` in `dist/`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### Nginx Configuration

```nginx
server {
  listen 80;
  server_name yourdomain.com;
  root /var/www/nepali-instruments/dist;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  # Caching static assets
  location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  # Gzip compression
  gzip on;
  gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

**Deploy steps:**
1. Build locally: `npm run build`
2. Copy `dist/` to server: `scp -r dist/* user@server:/var/www/nepali-instruments/`
3. Configure web server
4. Restart server: `sudo systemctl restart nginx`

---

### Option 5: Docker Deployment

**Best for:** Containerized deployment, scalability

1. **Create Dockerfile**
   ```dockerfile
   # Build stage
   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build

   # Production stage
   FROM nginx:alpine
   COPY --from=builder /app/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/conf.d/default.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Create nginx.conf**
   ```nginx
   server {
     listen 80;
     root /usr/share/nginx/html;
     index index.html;

     location / {
       try_files $uri $uri/ /index.html;
     }
   }
   ```

3. **Build and Run**
   ```bash
   docker build -t nepali-instruments .
   docker run -p 80:80 nepali-instruments
   ```

4. **Docker Compose** (optional)
   ```yaml
   version: '3.8'
   services:
     web:
       build: .
       ports:
         - "80:80"
       restart: unless-stopped
   ```

---

## 🔐 Environment Variables

### For Production

Create `.env.production`:
```bash
VITE_API_URL=https://api.yourdomain.com
VITE_MEDIA_BASE_URL=https://cdn.yourdomain.com
VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X
```

**Important:** Never commit `.env` files with sensitive data!

---

## 🎯 Performance Optimization

### Before Deploying

1. **Optimize Images**
   - Compress images (use ImageOptim, TinyPNG)
   - Convert to WebP format
   - Implement responsive images

2. **Code Splitting**
   - Already handled by Vite
   - Check bundle size: `npm run build -- --report`

3. **Lazy Loading**
   - Images: Use `loading="lazy"`
   - Routes: React.lazy() for code splitting

4. **Caching**
   - Set appropriate cache headers
   - Use CDN for static assets

---

## 📊 Post-Deployment

### 1. DNS Configuration

Point your domain to the deployed site:
```
A Record: @ -> Your server IP
CNAME: www -> yourdomain.com
```

### 2. SSL Certificate

**For Vercel/Netlify:** Automatic HTTPS

**For own server:**
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 3. Set Up Monitoring

- **Uptime monitoring:** UptimeRobot, Pingdom
- **Analytics:** Google Analytics (already configured)
- **Error tracking:** Sentry, LogRocket
- **Performance:** Lighthouse CI, WebPageTest

### 4. Backup Strategy

- Regular backups of media assets
- Database backups (when backend is added)
- Git repository as code backup

---

## 🔄 Continuous Deployment

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## ⚡ Quick Deploy Commands

### Vercel
```bash
vercel --prod
```

### Netlify
```bash
netlify deploy --prod
```

### GitHub Pages
```bash
npm run deploy
```

### Custom Server (via SSH)
```bash
npm run build && rsync -avz dist/ user@server:/var/www/app/
```

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Routing Issues (404 on refresh)
- Ensure server is configured to redirect all routes to index.html
- Check `.htaccess` or nginx config

### Assets Not Loading
- Check base URL in `vite.config.js`
- Verify asset paths (should be relative or absolute from root)

### Slow Performance
- Enable Gzip compression
- Use CDN for media files
- Implement caching headers
- Optimize images

---

## 📱 Mobile Deployment Considerations

- Test on real devices
- Optimize for 3G/4G networks
- Consider offline functionality (PWA)
- Reduce bundle size for faster load

---

## 🌍 CDN for Media Assets

### Cloudinary Setup
```javascript
// In .env
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_BASE_URL=https://res.cloudinary.com/your-cloud-name/
```

### AWS S3 + CloudFront
- Upload media to S3 bucket
- Create CloudFront distribution
- Update media URLs in code

---

## 📝 Deployment Checklist

### Pre-Deploy
- [ ] Code reviewed and tested
- [ ] Build successful locally
- [ ] Environment variables set
- [ ] Assets optimized
- [ ] Error tracking configured
- [ ] Analytics set up

### Deploy
- [ ] Deploy to staging first
- [ ] Test all features
- [ ] Check mobile responsiveness
- [ ] Verify analytics
- [ ] Test forms and interactions

### Post-Deploy
- [ ] Monitor server logs
- [ ] Check performance metrics
- [ ] Verify SSL certificate
- [ ] Test from different locations
- [ ] Set up automated backups

---

## 🎊 Recommended: Vercel Quick Deploy

For fastest deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd nepali-intrumentsV2
vercel

# Follow prompts - done!
```

Your site will be live at `https://your-project.vercel.app`

---

## 📞 Support

For deployment issues:
- Check [Vite deployment docs](https://vitejs.dev/guide/static-deploy.html)
- Platform documentation (Vercel, Netlify, etc.)
- Contact: info@nepaliinstruments.edu.np

---

**Happy Deploying! 🚀**
