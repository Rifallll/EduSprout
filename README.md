# 🎓 EduSprout

> Platform edukasi Indonesia dengan sistem gamifikasi untuk mahasiswa

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://rifallll.github.io/EduSprout/)
[![GitHub](https://img.shields.io/badge/github-repository-blue)](https://github.com/Rifallll/EduSprout)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

**EduSprout** adalah platform edukasi all-in-one yang dirancang khusus untuk mahasiswa Indonesia. Dengan sistem gamifikasi yang menarik, EduSprout membantu mahasiswa menemukan beasiswa, lowongan kerja, event, dan meningkatkan skill mereka melalui pengalaman yang interaktif dan rewarding.

---

## ✨ Fitur Utama

### 🎮 Sistem Gamifikasi

- **XP & Level System**: Dapatkan XP dari setiap aktivitas dan naik level
- **Daily Quests**: Misi harian dengan reward XP yang menarik
- **Badge System**: Unlock achievement badges untuk pencapaian tertentu
- **Progress Tracking**: Progress bar real-time di navbar
- **Notifikasi Interaktif**: Toast notifications untuk setiap pencapaian

### 📚 Beasiswa

- Database lengkap beasiswa dalam & luar negeri
- Filter berdasarkan negara, kategori, dan deadline
- Pagination untuk navigasi mudah (10 items per halaman)
- Bookmark sistem untuk simpan beasiswa favorit
- Detail lengkap untuk setiap beasiswa

### 💼 Karir & Lowongan Kerja

- Lowongan kerja untuk fresh graduate & internship
- Filter berdasarkan tipe pekerjaan, lokasi, dan gaji
- Job details dengan requirement lengkap
- Apply tracking untuk monitor lamaran
- Company profiles terintegrasi

### 📅 Event & Lomba

- Event nasional & internasional
- Kompetisi, workshop, webinar, dan seminar
- Filter berdasarkan kategori event
- Pagination sistem (6 events per halaman)
- Countdown timer untuk event deadline

### 📝 Resume Builder

- Template CV profesional
- Form wizard untuk input data
- Preview real-time
- Download CV dalam format PDF
- Multiple template designs

### 📰 Berita & Tips

- Artikel edukasi terbaru
- Tips & tricks untuk mahasiswa
- Career guidance
- Study tips & productivity hacks

### 👤 Dashboard Personal

- User profile management
- Application tracking
- Bookmarked items
- Gamification stats (XP, Level, Badges)
- Daily quest progress

---

## 🚀 Tech Stack

### Frontend

- **React 18** - UI Library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool & dev server
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework

### UI Components

- **shadcn/ui** - Re-usable component library
- **Radix UI** - Headless UI primitives
- **Lucide React** - Beautiful icons
- **Canvas Confetti** - Celebration animations
- **Sonner** - Toast notifications

### State Management

- **React Context API** - Global state management
- **LocalStorage** - Persistent data storage

### Deployment

- **GitHub Pages** - Static site hosting
- **gh-pages** - Automated deployment

---

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm atau pnpm

### Clone Repository

```bash
git clone https://github.com/Rifallll/EduSprout.git
cd EduSprout
```

### Install Dependencies

```bash
npm install
# atau
pnpm install
```

### Run Development Server

```bash
npm run dev
```

Server akan berjalan di `http://localhost:8080`

### Build for Production

```bash
npm run build
```

Build output akan ada di folder `dist/`

---

## 🌐 Deployment

### Deploy ke GitHub Pages

1. **Pastikan repository sudah di GitHub**
2. **Run deploy command:**

   ```bash
   npm run deploy
   ```

3. **Website akan live di:**

   ```
   https://[username].github.io/EduSprout/
   ```

### Configuration

Base URL untuk GitHub Pages sudah di-set di `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/EduSprout/',
  // ...
})
```

---

## 📂 Struktur Project

```
EduSprout/
├── src/
│   ├── components/       # Reusable components
│   │   ├── gamification/ # Gamification components
│   │   ├── layout/       # Layout components (Header, Footer)
│   │   └── ui/           # shadcn/ui components
│   ├── context/          # React Context providers
│   │   ├── GamificationContext.tsx
│   │   ├── BookmarkContext.tsx
│   │   ├── ApplicationContext.tsx
│   │   └── UserContext.tsx
│   ├── pages/            # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Events.tsx
│   │   ├── Scholarships.tsx
│   │   ├── Jobs.tsx
│   │   └── ...
│   ├── data/             # Static data (JSON)
│   │   ├── dummyEvents.json
│   │   ├── scrapedScholarships.json
│   │   └── scrapedJobs.json
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── public/               # Static assets
│   ├── 404.html          # SPA routing support
│   └── logo.png
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind configuration
├── package.json
└── README.md
```

---

## 🎯 Gamification System

### XP System

- **Lihat Beasiswa**: +10 XP per detail view
- **Apply Job**: +100 XP
- **Complete Profile**: +200 XP
- **View Community**: +50 XP
- **Daily Quest**: +50-150 XP per quest

### Level Up

- Setiap **1000 XP** = naik 1 level
- Confetti celebration saat level up
- Level badge terlihat di profile

### Badges

- 👋 **Pendatang Baru**: Join EduSprout
- 🚀 **Pemberani**: Apply job pertama kali
- 📋 **Identitas Jelas**: Lengkapi resume
- 📚 **Kutu Buku**: Lihat 5 detail beasiswa
- 💬 **Sosialis**: Buka halaman komunitas

### Daily Quests

- Quest reset setiap hari
- 3-5 quest tersedia per hari
- Reward XP bervariasi (50-150 XP)

---

## 🛠️ Development

### Available Scripts

```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
npm run deploy     # Deploy to GitHub Pages
npm run lint       # Run ESLint
```

### Adding New Features

1. **Create component** di `src/components/`
2. **Add route** di `src/App.tsx`
3. **Update context** jika perlu state global
4. **Test locally** dengan `npm run dev`
5. **Commit & deploy**

---

## 🤝 Contributing

Contributions are welcome! Jika kamu ingin berkontribusi:

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👤 Author

**Rifal Azhar Permana**

- GitHub: [@Rifallll](https://github.com/Rifallll)
- Email: <125524926+Rifallll@users.noreply.github.com>

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Komponen UI yang luar biasa
- [Radix UI](https://www.radix-ui.com/) - Headless UI primitives
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS
- [Lucide Icons](https://lucide.dev/) - Beautiful icon set
- [Vite](https://vitejs.dev/) - Next generation frontend tooling

---

## 📞 Support

Jika kamu menemukan bug atau punya saran:

- Open an issue di [GitHub Issues](https://github.com/Rifallll/EduSprout/issues)
- Contact via email (lihat Author section)

---

## 🔮 Future Roadmap

- [ ] Backend integration dengan database real
- [ ] User authentication & registration
- [ ] Advanced search dengan AI
- [ ] Mobile app (React Native)
- [ ] Leaderboard global
- [ ] Social features (comments, likes, share)
- [ ] Email notifications
- [ ] Premium features

---

<div align="center">

**Made with ❤️ for Indonesian Students**

⭐ Star this repo if you find it helpful!

[Live Demo](https://rifallll.github.io/EduSprout/) • [Report Bug](https://github.com/Rifallll/EduSprout/issues) • [Request Feature](https://github.com/Rifallll/EduSprout/issues)

</div>
