# PCDomain - AI-Powered PC Builder

A modern React application built with Vite that helps users build custom PCs with AI-powered compatibility checking and expert advice.

## Features

- 🎯 **AI Compatibility Checker** - Automatically flags incompatible parts
- 🤖 **Expert AI Assistant** - Get tailored advice and suggestions
- 📦 **Vast Component Library** - Extensive database of CPUs, GPUs, motherboards, and more
- 💰 **Real-Time Price Tracking** - Updated component prices
- 💾 **Save & Load Builds** - Create account to save builds
- 📊 **AI Performance Analytics** - AI-generated performance analysis
- ✨ **AI Build Suggester** - Get complete build suggestions based on budget and use case

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend**: Firebase (Authentication + Firestore)
- **AI**: Google Gemini API
- **Package Manager**: Bun

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Bun package manager
- Firebase project
- Google Gemini API key (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd pcdomain-app
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Start the development server**
   ```bash
   bun run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and Firestore Database
3. Add your web app to the project
4. Copy the configuration values to your `.env.local` file

## Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run lint` - Run ESLint

## Project Structure

```
pcdomain-app/
├── src/
│   ├── App.jsx          # Main application component
│   ├── index.css        # Global styles with Tailwind
│   └── main.jsx         # Application entry point
├── public/              # Static assets
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies and scripts
```

## Features Overview

### Landing Page
- Hero section with animated background
- Feature showcase
- Featured PC builds
- FAQ section
- User testimonials

### PC Builder
- Component selection interface
- Real-time compatibility checking
- AI build suggestions
- Performance analysis
- Save/load builds functionality

### User Authentication
- Email/password authentication
- Anonymous authentication
- User profile management
- Saved builds management

### AI Integration
- Build suggestions based on budget and use case
- Performance analysis
- Expert chat assistant
- Compatibility warnings

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub or contact the development team.