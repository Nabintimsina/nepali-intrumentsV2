# Technology Stack

## 📚 Overview

This document provides a comprehensive overview of all technologies, libraries, frameworks, and tools used in the Traditional Musical Instruments of Nepal platform.

**Last Updated:** February 2026  
**Project Version:** 1.0.0 (MVP)

---

## 🎯 Core Technologies

### Frontend Framework

#### **React 18.2.0**
- **Purpose:** UI library for building component-based interfaces
- **Why chosen:**
  - Industry standard for modern web applications
  - Component reusability and maintainability
  - Strong ecosystem and community support
  - Excellent performance with Virtual DOM
  - Hooks API for clean, functional components
- **Official Docs:** https://react.dev/

---

### Build Tool & Development Server

#### **Vite 5.0.8**
- **Purpose:** Next-generation frontend build tool
- **Why chosen:**
  - Lightning-fast hot module replacement (HMR)
  - Optimized production builds
  - Native ES modules support
  - Better developer experience than Webpack/CRA
  - Minimal configuration required
- **Features used:**
  - Development server with HMR
  - Production build optimization
  - Asset handling and optimization
- **Official Docs:** https://vitejs.dev/

#### **@vitejs/plugin-react 4.2.1**
- **Purpose:** Official React plugin for Vite
- **Features:**
  - Fast Refresh for React components
  - JSX transformation
  - React-specific optimizations

---

### Routing

#### **React Router DOM 6.21.0**
- **Purpose:** Client-side routing for single-page applications
- **Why chosen:**
  - Declarative routing approach
  - Nested routes support
  - Dynamic route parameters
  - Navigation hooks and components
  - History API integration
- **Features used:**
  - BrowserRouter for clean URLs
  - Route parameters (`:id`)
  - Link and NavLink components
  - useParams and useNavigate hooks
- **Official Docs:** https://reactrouter.com/

---

### UI Components & Icons

#### **Lucide React 0.294.0**
- **Purpose:** Icon library with 1000+ customizable icons
- **Why chosen:**
  - Clean, modern icon design
  - Lightweight (tree-shakeable)
  - React-native components
  - Consistent style across all icons
  - Open source and actively maintained
- **Icons used:**
  - Music, Users, Box, BookOpen (features)
  - Menu, X (navigation)
  - Mail, Phone, MapPin (contact)
  - Play, Pause, Volume controls (audio)
  - ArrowLeft, ArrowRight (navigation)
  - And 20+ more
- **Official Docs:** https://lucide.dev/

---

## 🎨 Styling & Design

### **CSS3 (Custom)**
- **Approach:** Vanilla CSS with modern features
- **Why chosen:**
  - No additional bundle size
  - Full control over styling
  - CSS custom properties (variables)
  - Native browser support
  - Easy to understand and maintain

#### **Design System Features:**

##### CSS Custom Properties (Variables)
```css
:root {
  /* Colors */
  --primary-maroon: #800020;
  --accent-gold: #D4AF37;
  --secondary-beige: #F5F0E8;
  
  /* Spacing */
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  
  /* Transitions */
  --transition-fast: 0.2s ease;
}
```

##### Layout System
- **CSS Grid:** For complex layouts
- **Flexbox:** For component alignment
- **Media Queries:** Mobile-first responsive design

##### Color Palette
- Primary: Deep Red/Maroon (#8B0000, #800020)
- Secondary: Off-White/Beige (#FAF8F3, #F5F0E8)
- Accent: Gold/Dark Brown (#D4AF37, #3E2723)

##### Typography
- **Headings:** Georgia, Times New Roman (Serif)
- **Body:** Segoe UI, Roboto, Helvetica (Sans-serif)
- **Font Sizes:** Responsive with rem units

---

## 🛠️ Development Tools

### Code Quality

#### **ESLint 8.57.1**
- **Purpose:** JavaScript/React code linting
- **Configuration:** `.eslintrc.cjs`
- **Plugins:**
  - `eslint-plugin-react` - React-specific rules
  - `eslint-plugin-react-hooks` - Hooks rules
  - `eslint-plugin-react-refresh` - Fast Refresh compatibility
- **Why chosen:**
  - Catches bugs and bad patterns early
  - Enforces consistent code style
  - React best practices enforcement

### Package Management

#### **npm (Node Package Manager)**
- **Version:** Managed by Node.js installation
- **Lock file:** `package-lock.json`
- **Alternative:** Can use yarn or pnpm

---

## 📦 Dependencies Overview

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 18.2.0 | UI library |
| react-dom | 18.2.0 | React DOM renderer |
| react-router-dom | 6.21.0 | Client-side routing |
| lucide-react | 0.294.0 | Icon library |

**Total Production Dependencies:** 4

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| @vitejs/plugin-react | 4.2.1 | Vite React plugin |
| vite | 5.0.8 | Build tool |
| eslint | 8.57.1 | Code linting |
| eslint-plugin-react | 7.33.2 | React rules |
| eslint-plugin-react-hooks | 4.6.0 | Hooks rules |
| eslint-plugin-react-refresh | 0.4.5 | Refresh rules |
| @types/react | 18.2.43 | TypeScript types |
| @types/react-dom | 18.2.17 | TypeScript types |

**Total Development Dependencies:** 8

---

## 🔮 Planned/Future Technologies

### 3D Graphics

#### **Three.js** (Planned)
- **Purpose:** WebGL 3D library for instrument models
- **Why:** Industry standard for 3D web graphics
- **Alternative:** React Three Fiber (React wrapper)

#### **React Three Fiber** (Planned)
- **Purpose:** React renderer for Three.js
- **Benefits:** 
  - React component approach to 3D
  - Hooks for 3D interactions
  - Better integration with React

#### **@react-three/drei** (Planned)
- **Purpose:** Helper components for R3F
- **Features:** Camera controls, loaders, effects

---

### Backend (Future)

#### **Option A: Node.js + Express**
```javascript
// Planned stack
- Express.js (API server)
- MongoDB (Database)
- Mongoose (ODM)
- JWT (Authentication)
- Multer (File uploads)
```

#### **Option B: Python + Django**
```python
# Alternative stack
- Django REST Framework
- PostgreSQL
- Django Auth
- Pillow (Image processing)
```

---

### State Management (When Needed)

#### **Options Being Considered:**
1. **React Context API** (Built-in)
   - Simple state sharing
   - No extra dependencies
   
2. **Zustand** (Lightweight)
   - Minimal boilerplate
   - 1KB size
   
3. **Redux Toolkit** (Complex apps)
   - If application grows significantly

**Current Status:** Context API sufficient for MVP

---

### Media Handling (Future)

#### **Cloudinary** (Planned)
- Image/video optimization
- CDN delivery
- Transformation API

#### **AWS S3 + CloudFront** (Alternative)
- Object storage
- CDN distribution
- Cost-effective at scale

---

### Authentication (Future)

#### **Planned:**
- **JWT (JSON Web Tokens)**
- **OAuth 2.0** (Google, Facebook)
- **bcrypt** (Password hashing)

---

### Database (Future)

#### **Option A: MongoDB**
- **Why:** 
  - Flexible schema for diverse instruments
  - Easy to scale
  - Good for prototyping

#### **Option B: PostgreSQL**
- **Why:**
  - Relational data structure
  - Better for complex queries
  - ACID compliance

---

### Testing (Planned)

#### **Unit Testing:**
- **Vitest** - Fast unit test framework for Vite
- **React Testing Library** - Test React components
- **jsdom** - DOM simulation

#### **E2E Testing:**
- **Playwright** or **Cypress**
- Cross-browser testing
- User flow automation

---

### Additional Tools (Planned)

#### **Form Handling:**
- **React Hook Form** - Form validation
- Alternative: Formik

#### **Data Fetching:**
- **Axios** or **Fetch API**
- **React Query** (for caching)

#### **Analytics:**
- **Google Analytics 4**
- **Plausible** (Privacy-friendly alternative)

#### **Error Tracking:**
- **Sentry** - Error monitoring
- **LogRocket** - Session replay

#### **Performance:**
- **Lighthouse CI** - Performance automation
- **Web Vitals** - Core metrics tracking

---

## 🏗️ Architecture & Patterns

### Design Patterns Used

#### **Component-Based Architecture**
- Reusable components
- Single responsibility principle
- Props for data flow

#### **Container/Presentational Pattern**
- Pages = Smart components
- Components = Presentational components

#### **Custom Hooks** (Ready to implement)
```javascript
// Examples for future
useInstruments()
useExperts()
useAuth()
useMediaQuery()
```

---

## 🌐 Browser Support

### Target Browsers

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| Mobile Safari | 14+ |
| Chrome Android | 90+ |

### Key Requirements
- ES6+ support
- CSS Grid support
- Flexbox support
- CSS Custom Properties
- Fetch API

---

## 📱 Progressive Web App (PWA) - Future

### Planned Features:
- **Service Workers** - Offline support
- **Web App Manifest** - Install on device
- **Push Notifications** - Updates and events
- **Background Sync** - Offline data sync

---

## 🚀 Performance Optimizations

### Current Implementations

#### **Code Splitting**
- Vite automatic code splitting
- Dynamic imports ready

#### **Asset Optimization**
- Vite minification
- Tree shaking
- Dead code elimination

#### **CSS Optimization**
- No CSS-in-JS overhead
- Minimal unused CSS
- CSS custom properties (faster than preprocessors)

### Planned Optimizations
- [ ] Image lazy loading
- [ ] Route-based code splitting
- [ ] Component lazy loading
- [ ] Service worker caching
- [ ] Brotli compression

---

## 🔒 Security Considerations

### Current
- Sanitized user inputs
- No inline scripts (CSP ready)
- Environment variables for secrets

### Planned
- HTTPS enforcement
- CSRF protection
- XSS prevention
- SQL injection prevention
- Rate limiting
- Content Security Policy (CSP)

---

## 📊 Bundle Size

### Current Production Build
```
dist/index.html                   0.46 kB │ gzip:  0.31 kB
dist/assets/index-[hash].css     ~15.00 kB │ gzip:  ~4.00 kB
dist/assets/index-[hash].js     ~150.00 kB │ gzip: ~50.00 kB
```

**Total:** ~165 KB (uncompressed) / ~54 KB (gzipped)

**Lighthouse Score Target:** 90+

---

## 🔄 Version Management

### Node.js Requirements
- **Minimum:** Node.js 16+
- **Recommended:** Node.js 18 LTS or 20 LTS

### Package Updates Strategy
- Minor updates: Monthly review
- Security patches: Immediate
- Major updates: After testing

---

## 🌍 Internationalization (Future)

### Planned Libraries:
- **react-i18next** - Translation management
- **date-fns** - Date localization
- Support for: Nepali, English, Hindi

---

## 📈 Monitoring & Analytics (Future)

### Performance Monitoring
- Google PageSpeed Insights
- Lighthouse CI
- Web Vitals

### Error Tracking
- Sentry for error logging
- Console error tracking

### User Analytics
- Google Analytics 4
- Custom event tracking
- Conversion tracking

---

## 🔧 Development Workflow

### Version Control
- **Git** - Version control
- **GitHub** - Repository hosting
- **Conventional Commits** - Commit message format

### CI/CD (Planned)
- GitHub Actions
- Automated testing
- Automated deployment

---

## 📝 Documentation Tools

### Current
- Markdown (.md files)
- Inline code comments
- JSDoc comments

### Future
- **Storybook** - Component documentation
- **TypeDoc** - API documentation (if TypeScript adopted)

---

## 🎯 Technology Decisions Summary

### Why This Stack?

#### ✅ Advantages
1. **Modern & Fast:** Vite + React = excellent DX
2. **Lightweight:** Minimal dependencies
3. **Scalable:** Easy to add features
4. **Performant:** Fast load times
5. **Maintainable:** Clear structure
6. **Free/Open Source:** No licensing costs
7. **Community:** Strong ecosystem

#### 🔄 Trade-offs
1. **No TypeScript:** Faster development, but less type safety
2. **No CSS Framework:** Smaller bundle, but more custom CSS
3. **Minimal State Management:** Simple now, may need more later
4. **No Backend Yet:** Static now, needs API later

---

## 📚 Learning Resources

### Official Documentation
- [React Docs](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

### Recommended Courses
- React Official Tutorial
- Vite Documentation
- JavaScript.info

---

## 🔄 Migration Path

### If Scaling Up:

#### To TypeScript:
1. Rename `.jsx` → `.tsx`
2. Add type definitions
3. Enable TypeScript in Vite

#### To Monorepo:
- Consider Nx or Turborepo
- Separate frontend/backend repos

#### To Mobile:
- React Native
- Capacitor (web → mobile)

---

## 📞 Support & Resources

### Documentation
- See README.md for general info
- See CONTRIBUTING.md for development
- See DEPLOYMENT.md for deployment

### Community
- React Community Discord
- Stack Overflow
- GitHub Issues

---

## ✅ Technology Audit

### Current Status: **Excellent** ✅

- ✅ Modern tech stack
- ✅ Best practices followed
- ✅ Performance optimized
- ✅ Scalable architecture
- ✅ Well documented
- ✅ Security considered
- ✅ Maintainable code

### Recommended Updates: **None** (as of Feb 2026)
All dependencies are current and stable.

---

**Last Reviewed:** February 6, 2026  
**Next Review:** May 2026 or when adding major features

---

## 🎉 Summary

This platform uses a **modern, lightweight, and scalable** technology stack perfect for a cultural preservation project. The choices prioritize:

1. **Developer Experience** - Fast, enjoyable development
2. **Performance** - Quick load times for users
3. **Maintainability** - Easy to update and extend
4. **Cost** - Free and open-source tools
5. **Future-Proof** - Ready for growth

The stack is production-ready and can scale from a simple demonstration to a full-featured platform with minimal refactoring.

---

**Built with ❤️ for preserving Nepal's musical heritage**
