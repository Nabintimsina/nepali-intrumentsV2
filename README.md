# Traditional Musical Instruments of Nepal

An interactive web platform showcasing traditional Nepali musical instruments with 3D models, audio samples, and expert information.

## 🎵 Live Demo

**Website**: [bajanepal.com](https://bajanepal.com)  
**API**: [bajanepal.com/api](https://bajanepal.com/api)

## 🛠️ Technology Stack

### Frontend
- **React** 18.2+ with React Router
- **Vite** 5.0+ (Build tool)
- **Three.js** & React Three Fiber (3D models)
- **Lucide React** (Icons)

### Backend
- **Django** 4.2+ with Django REST Framework
- **Python** 3.9+
- **SQLite** database
- **Simple JWT** authentication

### Hosting
- **Nest Nepal** Cloud Hosting
- **Passenger** WSGI Server
- Free SSL Certificate

## 📁 Project Structure

```
nepali-intrumentsProduction/
├── backend/                    # Django backend
│   ├── nepali_platform/        # Django project settings
│   ├── catalog/                # Main app (instruments, experts)
│   ├── media/                  # User uploads
│   ├── manage.py
│   ├── passenger_wsgi.py       # Production WSGI entry
│   └── requirements.txt
│
├── src/                        # React frontend source
│   ├── components/             # Reusable components
│   ├── pages/                  # Page components
│   ├── api/                    # API client
│   └── main.jsx
│
├── public/                     # Static assets
│   ├── images/                 # Instrument images
│   ├── audio/                  # Audio samples
│   ├── models/                 # 3D models (.glb)
│   └── .htaccess               # Production routing
│
├── dist/                       # Production build (generated)
├── .env.production             # Production environment
└── vite.config.js
```

## 🚀 Quick Start

### Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/Nabintimsina/nepali-intrumentsV2.git
cd nepali-intrumentsV2
```

2. **Backend Setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

3. **Frontend Setup**
```bash
# In project root
npm install
npm run dev
```

4. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api
- Admin Panel: http://localhost:8000/admin

## 📦 Production Deployment

### Prerequisites
- Nest Nepal hosting account with cPanel access
- Domain configured (bajanepal.com)
- Python 3.9+ support

### Deployment Steps

See detailed deployment guide:
- 📄 [DEPLOYMENT_PROCEDURE.md](DEPLOYMENT_PROCEDURE.md) - Complete step-by-step guide
- 📝 [DEPLOYMENT_TODO.txt](DEPLOYMENT_TODO.txt) - Quick checklist

**Quick Overview:**

1. Build frontend: `npm run build`
2. Upload files to server
3. Configure cPanel Python App
4. Run migrations and collect static files
5. Create admin user
6. Test deployment

## 🎯 Features

### For Users
- 🎸 Browse traditional Nepali instruments
- 🔊 Listen to authentic sounds
- 🎨 View 3D models (interactive)
- 👥 Learn from expert musicians
- 📚 Educational resources
- 📧 Contact form

### Admin Features
- ✏️ Manage instruments (CRUD)
- 👤 Manage expert profiles
- 📁 Upload images, audio, 3D models
- 📊 View contact submissions
- 🔐 Secure authentication

## 🔧 Configuration

### Environment Variables

**Frontend (.env.production)**
```env
VITE_API_URL=https://bajanepal.com/api
```

**Backend (settings_production.py)**
```python
DEBUG = False
ALLOWED_HOSTS = ['bajanepal.com', 'www.bajanepal.com']
CORS_ALLOWED_ORIGINS = ['https://bajanepal.com', 'https://www.bajanepal.com']
```

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/instruments/` | GET | List all instruments |
| `/api/instruments/:id/` | GET | Get instrument details |
| `/api/catalog/experts/` | GET | List all experts |
| `/api/catalog/experts/:id/` | GET | Get expert details |
| `/api/contact/` | POST | Submit contact form |
| `/api/admin/` | GET | Django admin panel |

## 🤝 Contributing

This is a production repository. For contributions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project showcases traditional Nepali musical instruments for educational and cultural preservation purposes.

## 👨‍💻 Author

**Nabin Timsina**  
GitHub: [@Nabintimsina](https://github.com/Nabintimsina)

## 🙏 Acknowledgments

- Traditional Nepali musicians and experts
- Nepal's rich cultural heritage
- Nest Nepal for hosting services

## 📞 Support

For issues or questions:
- 📧 Contact via website: [bajanepal.com/contact](https://bajanepal.com/contact)
- 🐛 Report issues: [GitHub Issues](https://github.com/Nabintimsina/nepali-intrumentsV2/issues)

---

**Made with ❤️ to preserve and promote Nepali musical heritage**
