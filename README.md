
# 99X AI Hub - Enhanced Next.js Dashboard

![99X AI Hub Dashboard](image.png)

A comprehensive, modern dashboard application for AI agent management and observability built with Next.js. Features a beautiful Nordic-inspired UI design with advanced functionality for monitoring, managing, and scaling AI agents in production environments.

## 🚀 Features

### Core Functionality
- **🧠 Agent Management**: Comprehensive AI agent monitoring with real-time status tracking
- **📊 Advanced Metrics**: Interactive dashboards with performance analytics and trend visualization
- **👥 Team Collaboration**: Role-based user management with admin controls
- **⚙️ Advanced Settings**: Complete configuration panel with notifications, API keys, and admin access

### Enhanced Features
- **🎨 Theme Support**: Light, dark, and system theme modes with smooth transitions
- **🔍 Smart Search**: Real-time search across agents, teams, and metrics
- **📋 Sortable Tables**: Click-to-sort functionality on all data tables
- **🔔 Notification System**: Customizable alerts for agent status, performance, and team activity
- **🔐 Admin Controls**: Request and manage administrative access with approval workflows
- **🔑 API Key Management**: Generate and manage secure API keys for metrics integration
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🛡️ Error Boundaries**: Robust error handling with graceful fallbacks

### Technical Features
- **⚡ Next.js 15**: Latest App Router with server components and streaming
- **🔷 TypeScript**: Full type safety throughout the application
- **🎨 Tailwind CSS**: Utility-first styling with custom design system
- **🧩 Radix UI**: Accessible, unstyled UI primitives
- **📈 Recharts**: Interactive data visualization components
- **🎯 Lucide Icons**: Beautiful, consistent iconography

## 🛠️ Tech Stack

- **Framework**: Next.js 15.1.6 (App Router)
- **Language**: TypeScript 5.0.0
- **Styling**: Tailwind CSS 3.4.0
- **UI Components**: Radix UI (30+ components)
- **Charts**: Recharts 2.15.2
- **Icons**: Lucide React 0.487.0
- **Theme Management**: next-themes 0.4.6
- **Forms**: React Hook Form 7.55.0
- **Animations**: Motion 12.23.24

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** or **yarn** or **pnpm** package manager
- **Git** for version control

```bash
node --version  # Should be 18.0+
npm --version   # Latest stable version
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/DisanduP/99X-AI-HUB-Improved.git
cd 99X-AI-HUB-Improved
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

This installs all dependencies including Next.js, React, TypeScript, Tailwind CSS, Radix UI, and other libraries.

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3005](http://localhost:3005) in your browser to see the application.

### 4. Build for Production

```bash
npm run build
npm start
# or
yarn build && yarn start
# or
pnpm build && pnpm start
```

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router directory
│   │   ├── layout.tsx         # Root layout with theme provider
│   │   ├── page.tsx           # Dashboard home page
│   │   ├── globals.css        # Global styles and imports
│   │   ├── agents/            # Agents management
│   │   │   ├── page.tsx       # Agents list with search & sorting
│   │   │   └── [id]/          # Dynamic agent detail pages
│   │   ├── components/        # Reusable UI components
│   │   │   ├── ui/           # 60+ Base UI components (Radix + Tailwind)
│   │   │   ├── Sidebar.tsx    # Navigation with theme toggle
│   │   │   ├── StatusBadge.tsx # Agent status indicators
│   │   │   ├── MetricCard.tsx # Metric display cards
│   │   │   ├── ErrorBoundary.tsx # Error handling component
│   │   │   └── ...
│   │   ├── metrics/           # Analytics dashboard
│   │   │   └── page.tsx       # Interactive charts & KPIs
│   │   ├── team/              # Team management
│   │   │   └── page.tsx       # User roles & permissions
│   │   ├── settings/          # Configuration panel
│   │   │   └── page.tsx       # Theme, notifications, API keys
│   │   ├── data/             # Data layer
│   │   │   └── mockData.ts    # Sample data & utilities
│   │   └── types.ts          # TypeScript definitions
│   ├── styles/               # Styling system
│   │   ├── fonts.css         # Custom font loading
│   │   ├── theme.css         # CSS variables & themes
│   │   ├── tailwind.css      # Tailwind imports
│   │   └── index.css         # Additional styles
├── public/                   # Static assets
├── package.json              # Dependencies & scripts
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
├── next.config.js            # Next.js configuration
└── postcss.config.js         # PostCSS configuration
```

## 🎨 Key Features Deep Dive

### Theme System
- **Light Mode**: Clean, bright interface perfect for daytime use
- **Dark Mode**: Easy on the eyes for extended sessions
- **System Mode**: Automatically follows your OS preference
- **Smooth Transitions**: Seamless switching between themes

### Agent Management
- **Real-time Monitoring**: Live status updates for all agents
- **Advanced Filtering**: Search by name, team, environment, model
- **Sortable Columns**: Click headers to sort by any metric
- **Performance Tracking**: Success rates, execution times, error counts

### Settings Panel
- **Appearance**: Theme selection with live preview
- **Notifications**: Granular control over alerts and notifications
- **Admin Access**: Request elevated permissions with approval workflow
- **API Keys**: Generate and manage secure keys for integrations

### Metrics Dashboard
- **Interactive Charts**: Line, bar, and area charts with tooltips
- **Time Range Selection**: 7d, 30d, 90d views
- **Performance KPIs**: Throughput, latency, success rates
- **Trend Analysis**: Historical data visualization

## 🎨 Customization

### Color Theme
The application uses a carefully crafted Nordic-inspired color palette:

```css
/* Light Theme */
--background: #FAFBFC;
--foreground: #1F2937;
--primary: #0891B2;
--card: #FFFFFF;

/* Dark Theme */
--background: #111827;
--foreground: #F9FAFB;
--primary: #06B6D4;
--card: #1F2937;
```

Modify `src/styles/theme.css` to customize colors.

### Adding New Features
1. **New Pages**: Create directory in `src/app/` with `page.tsx`
2. **Navigation**: Add route to `navItems` in `Sidebar.tsx`
3. **Components**: Place in `src/app/components/` following existing patterns
4. **Styling**: Use Tailwind classes or extend the design system

## 📱 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint checks
```

## 🔧 Configuration

### Environment Variables
Create `.env.local` for custom configurations:

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_APP_NAME="99X AI Hub"
```

### Build Optimization
The project includes:
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js built-in optimization
- **CSS Optimization**: Tailwind purging and minification
- **Bundle Analysis**: Optimized chunk sizes

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** changes: `git commit -m 'Add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Development Guidelines
- Use TypeScript for all new code
- Follow existing component patterns
- Add proper error handling
- Test on multiple screen sizes
- Update documentation

## 📄 License

This project is based on the original Figma design available at:
https://www.figma.com/design/HrFcOfHssLG0RwpJT7W0IQ/Design-99x-Agent-Studio

## 🆘 Support & Issues

### Common Issues
- **Port conflicts**: Change port with `npm run dev -- -p 3001`
- **Build errors**: Clear `.next` folder and reinstall dependencies
- **Theme issues**: Check browser support for CSS custom properties

### Getting Help
1. Check existing [Issues](https://github.com/DisanduP/99X-AI-HUB-Improved/issues)
2. Create detailed bug reports with:
   - Node.js and npm versions
   - Browser and OS information
   - Steps to reproduce
   - Error messages and screenshots

## 🚀 Roadmap

### Planned Features
- [ ] Real-time WebSocket connections for live updates
- [ ] Advanced user authentication and authorization
- [ ] API integration with backend services
- [ ] Export functionality for reports and data
- [ ] Advanced filtering and search capabilities
- [ ] Mobile app companion
- [ ] Multi-language support (i18n)

### Performance Improvements
- [ ] Service Worker for offline functionality
- [ ] Advanced caching strategies
- [ ] Code splitting optimizations
- [ ] Image optimization pipeline

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies**

*Happy coding! 🚀*
  
