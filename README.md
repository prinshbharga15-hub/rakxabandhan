# 🪔 Raksha Bandhan Festival - 3D Interactive Web Application

A modern, responsive, and animated Raksha Bandhan Festival web application featuring an authentic Indian festive aesthetic, interactive 3D Three.js experiences, real-time customizable 3D Rakhi studio, personalized multi-lingual wishes generator with live community wall, virtual 5-step Rakhi ceremony, and a Node.js/Express backend with MongoDB integration.

---

## ✨ Key Features

### 1. 🌟 Traditional Indian Festive Aesthetic
- **Festive Color Palette**: Sacred Kumkum Red, Saffron Kesari, Royal Temple Gold, Auspicious Haldi, Rose Pink, and Soft Ivory/Cream background.
- **Glassmorphism**: Translucent frosted glass cards with golden borders, glowing diya reflections, and delicate mandala motifs.
- **Atmospheric Animations**: Canvas-based drifting Marigold and Rose petals, floating golden sparkles, glowing diya embers, and ambient classical sitar/chime audio.

### 2. 🧵 3D Three.js / React Three Fiber Experiences
- **Hero 3D Rakhi**: Fullscreen procedural 3D Rakhi rotating smoothly in 3D space with dynamic lighting, floating diyas with flickering flame point-lights, and mouse parallax tracking.
- **3D Rakhi Showcase**: Dedicated 360° orbit inspection with 4 interactive hotspots detailing the Sacred Mauli Thread, Kundan Center Medallion, Auspicious Beads, and Vedic Tassels.
- **"Design Your Rakhi" 3D Studio**: Real-time 3D Rakhi customization (Motifs: Om, Ganesha, Lotus, Peacock, Kundan; Threads: Mauli, Royal Velvet, Emerald Silk; Gemstones: Ruby, Emerald, Sapphire, Topaz; Beads: Rudraksha, Gold Pearls; Custom Text Engraving).
- **Virtual Rakhi Ceremony**: Interactive 5-step ceremonial ritual (Light Diya -> Apply Kumkum Tilak -> Tie 3D Rakhi -> Feed Mithai -> Marigold Confetti Shower & Certificate).

### 3. 💖 Interactive Festival Features
- **Personalized Wishes Generator**: Generates tailored greetings in English and Hindi across Heartfelt, Playful, Poetic/Shayari, and Blessing tones. One-click Copy, WhatsApp Share, and Post to Wall.
- **Live Community Wishes Wall**: Real-time stream of community wishes with live blessing/heart reaction counter.
- **Brother & Sister Memories**: Nostalgic memory cards carousel with user-submitted memory note capability.
- **Festival Countdown & Auspicious Muhurat**: Live animated countdown timer and Vedic Panchang Muhurat timings (Aparahna, Pradosh Kaal, Bhadra).
- **Masonry Gallery & Lightbox**: Filterable festive photo gallery (Sacred Rituals, Sweets, Rakhis, Celebrations) with fullscreen lightbox viewer.

---

## 🛠️ Technology Stack

- **Frontend**: React 18 (Vite), Tailwind CSS, Framer Motion, Lucide React, Canvas-Confetti, Axios
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Audio Synthesizer**: Web Audio API (Authentic Aarti bells, sitar harmonic drone, celebration fanfare)
- **Backend**: Node.js, Express.js, Mongoose (MongoDB), Helmet, CORS, Morgan, Express-Validator
- **Database**: MongoDB (with automatic in-memory fallback for instant zero-config startup)

---

## 📁 Project Structure

```
raksha-bandhan/
├── client/                     # Frontend (React 18 + Vite + Three.js)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── 3d/             # 3D RakhiModel, Hero3DScene, RakhiShowcase3D, Customizer3DCanvas
│   │   │   ├── common/         # FestiveButton, SectionHeader, GlassCard, SoundToggle, Toast
│   │   │   ├── effects/        # FestiveParticles, PetalShower
│   │   │   ├── layout/         # Navbar, MobileDrawer, Footer
│   │   │   └── sections/       # Hero, About, Traditions, Showcase, Customizer, Memories, Wishes, Countdown, Gallery, Contact, VirtualCeremony
│   │   ├── data/               # defaultData.js
│   │   ├── services/           # api.js
│   │   ├── utils/              # soundEffects.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                     # Backend (Node.js + Express + MongoDB)
│   ├── config/db.js            # Resilient MongoDB connection with memory fallback
│   ├── controllers/            # wishController, messageController, galleryController, rakhiController
│   ├── models/                 # Wish, Message, RakhiDesign, GalleryItem
│   ├── routes/                 # wishRoutes, messageRoutes, galleryRoutes, rakhiRoutes
│   ├── middleware/             # errorHandler, validation
│   ├── seeds/seedData.js       # Pre-seeded festive data
│   ├── .env.example
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── start-all.bat               # Windows single-click launcher
└── README.md
```

---

## 🚀 Quick Setup & Run Instructions

### Prerequisites
- Node.js (v18 or higher)
- (Optional) MongoDB local service or MongoDB Atlas URI

### Option 1: Single-Click Launcher (Windows)
Double-click `start-all.bat` in the root folder to start both backend and frontend automatically.

### Option 2: Manual Terminal Commands

#### 1. Start Backend Server
```bash
cd server
npm install
npm start
```
*Server starts at `http://localhost:5000`*

#### 2. Start Frontend Client
```bash
cd client
npm install
npm run dev
```
*Frontend opens at `http://localhost:5173`*

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Server health check & status |
| `GET` | `/api/wishes` | Retrieve wishes (filter by category & sort) |
| `POST` | `/api/wishes` | Save personalized wish to the wall |
| `POST` | `/api/wishes/:id/like` | Send a blessing/heart to a wish |
| `POST` | `/api/messages` | Submit contact inquiry or greeting |
| `GET` | `/api/messages` | Retrieve contact messages |
| `GET` | `/api/gallery` | Retrieve curated festival gallery items |
| `POST` | `/api/gallery/:id/like`| Like a gallery photo |
| `POST` | `/api/rakhis` | Save custom 3D Rakhi design |
| `GET` | `/api/rakhis` | Retrieve user-designed Rakhis |

---

## 🔒 Security & Performance
- **Zero Exposed Secrets**: Configuration managed via `.env`
- **Resilient Fallback**: Operates standalone with instant response even if MongoDB is offline
- **Optimized Rendering**: Three.js DPR scaling, geometry reuse, conditional WebGL canvas, and smooth 2D SVG fallback
- **Cross-Browser & Responsive**: Fully responsive across mobile phones, tablets, and desktop displays
