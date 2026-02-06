# Quick Start Guide

## 🚀 Get Up and Running in 5 Minutes

### Step 1: Prerequisites Check
Make sure you have:
- ✅ Node.js (v16+) installed → [Download](https://nodejs.org/)
- ✅ npm or yarn package manager
- ✅ Git installed
- ✅ A code editor (VS Code recommended)

### Step 2: Installation

```bash
# Clone the repository (if you haven't already)
git clone <repository-url>

# Navigate to project directory
cd nepali-intrumentsV2

# Install all dependencies
npm install
```

### Step 3: Start Development Server

```bash
npm run dev
```

Your browser should automatically open to `http://localhost:3000`

If not, manually open your browser and navigate to that address.

### Step 4: Explore the Platform

Navigate through these pages:
- **Home** (`/`) - Overview and featured instruments
- **Instruments** (`/instruments`) - Browse all instruments with filters
- **Learn** (`/learn`) - Educational content
- **Experts** (`/experts`) - Meet master musicians
- **About** (`/about`) - Project information
- **Contact** (`/contact`) - Get in touch

## 📁 Key Files to Know

```
src/
├── pages/              ← All page components
├── components/         ← Reusable components
├── data/mockData.js   ← Sample data (replace with API later)
├── index.css          ← Global styles and theme
└── App.jsx            ← Main app with routing
```

## 🎨 Customizing the Theme

Edit `src/index.css` to change colors:

```css
:root {
  --primary-maroon: #800020;      /* Main brand color */
  --accent-gold: #D4AF37;         /* Accent highlights */
  --secondary-beige: #F5F0E8;     /* Backgrounds */
}
```

## 📊 Adding Content

### Add a New Instrument

Edit `src/data/mockData.js`:

```javascript
{
  id: 7,
  name: 'Your Instrument',
  category: 'String/Wind/Percussion',
  region: 'Region Name',
  image: '/images/your-instrument.jpg',
  description: 'Description...',
  // ... more fields
}
```

### Add a New Expert

Edit `src/data/mockData.js` in the `expertsData` array.

## 🛠️ Common Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🐛 Troubleshooting

### Port Already in Use?

Edit `vite.config.js` to change the port:

```javascript
server: {
  port: 3001, // Change this
  open: true
}
```

### Dependencies Issues?

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Styles Not Updating?

- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Clear browser cache
- Restart dev server

## 🚀 Next Steps

1. **Modify a page**: Start with `src/pages/Home.jsx`
2. **Add a component**: Create in `src/components/`
3. **Style changes**: Edit respective `.css` files
4. **Add routing**: Update `src/App.jsx`

## 📖 Learn More

- Read the full [README.md](./README.md)
- Check the [TODO.md](./TODO.md) for roadmap
- See [CONTRIBUTING.md](./CONTRIBUTING.md) to contribute

## 💡 Tips

1. **Hot Reload**: Changes appear automatically - no need to refresh!
2. **React DevTools**: Install browser extension for debugging
3. **Console**: Check browser console for errors
4. **Mobile Testing**: Use browser dev tools (F12) → Toggle device toolbar

## 🎯 Quick Wins to Try

- [ ] Change the hero title on home page
- [ ] Add a new color to the theme
- [ ] Create a new instrument card
- [ ] Customize the footer text
- [ ] Add your own sample data

## ❓ Need Help?

- Check existing [Issues](https://github.com/yourusername/repo/issues)
- Create a new issue
- Email: info@nepaliinstruments.edu.np

---

**Happy Coding! 🎵**
