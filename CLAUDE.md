# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PCDomain is an AI-powered PC builder application built with React 18 + Vite that helps users build custom PCs with AI-powered compatibility checking and expert advice. The app uses Clerk for authentication, MongoDB for data storage, and integrates with Google Gemini API for AI features.

## Development Commands

```bash
# Install dependencies
bun install

# Start backend API server (runs on http://localhost:3001)
bun run server

# Start frontend development server (runs on http://localhost:5173)
# Run this in a separate terminal
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Run linter
bun run lint
```

**Important**: You need to run BOTH the backend server (`bun run server`) and the frontend dev server (`bun run dev`) in separate terminals for the app to work properly.

## Environment Setup

1. Copy `env.example` to `.env.local`
2. Add Clerk credentials (required):
   - `VITE_CLERK_PUBLISHABLE_KEY` - Clerk publishable key for authentication
3. Add MongoDB connection string (required):
   - `VITE_MONGODB_URI` - MongoDB connection URI
4. Add `VITE_GEMINI_API_KEY` for AI features (optional but recommended)

## Architecture

### Authentication Flow

- App uses Clerk for authentication via `@clerk/clerk-react`
- `ClerkProvider` wraps the entire app in `main.jsx` with dark theme configuration
- Auth state is accessed via `useUser()` hook throughout the app
- Login/Signup opens as modal overlays using `openSignIn()` and `openSignUp()` from `useClerk()` hook
- No separate routes for auth - modals appear on top of current page
- Unauthenticated users can browse but cannot save builds; attempting to save prompts a login message

### Data Structure

**Component Data** (`src/data/componentData.js`):
- Organized by component type: `cpu`, `motherboard`, `ram`, `storage`, `gpu`, `psu`, `case`
- Each component has specific properties for compatibility checking:
  - CPUs: `socket`, `power`, `core_count`
  - Motherboards: `socket`, `ram_type` (DDR4/DDR5)
  - RAM: `type` (DDR4/DDR5), `speed`, `capacity`
  - GPUs/PSUs: `power`/`wattage` for power calculations

**MongoDB Structure**:
- Database: `pcdomain`
- Collections:
  - `users`: User documents with `clerkId`, `email`, `createdAt`, `savedBuilds` array
  - `builds`: (future) Separate collection for builds if needed
- User documents are keyed by `clerkId` (Clerk user ID)
- Builds are embedded in user documents as an array
- Each build contains: `name`, `totalPrice`, `components`, `createdAt` timestamp, `userId`

### Compatibility Logic

The compatibility checker in `PCBuilder.jsx` validates:
1. CPU socket matches motherboard socket
2. RAM type matches motherboard RAM type
3. PSU wattage covers CPU + GPU power requirements (with buffer)

Issues are categorized as `error` (incompatible) or `success` (compatible) and displayed in real-time.

### Component Organization

```
src/
├── components/
│   ├── pages/          # Full page components (routing)
│   │   ├── LandingPage.jsx
│   │   ├── PCBuilder.jsx      # Main builder interface
│   │   ├── LoginPage.jsx
│   │   ├── SignUpPage.jsx
│   │   └── ProfilePage.jsx
│   └── ui/             # Reusable UI components
│       ├── ComponentSelector.jsx
│       ├── BuildSummary.jsx
│       ├── AiChatAssistant.jsx
│       ├── SuggestBuildModal.jsx
│       └── ... (other UI components)
├── config/
│   ├── mongodb.js            # MongoDB connection and helper functions
│   ├── clerk.js              # Clerk configuration
│   └── componentIcons.js     # Icon mappings
├── data/
│   ├── componentData.js      # PC component database
│   ├── featuredBuilds.js     # Pre-built PC configurations
│   └── faqData.js
└── App.jsx                   # Root component with routing
```

### Routing

- `/` - Landing page with features and featured builds
- `/builder` - PC builder interface (accepts `initialBuild` prop for loading saved builds)
- `/profile` - User profile with saved builds management

Auth is handled via Clerk modals (no separate routes)

## Key Technical Notes

- **Package Manager**: Uses Bun (not npm/yarn)
- **Architecture**: Full-stack app with Express backend API and React frontend
- **Styling**: Tailwind CSS with custom dark theme (bg-gray-950 base)
- **Icons**: Lucide React library
- **State Management**: Local React state (no Redux/Zustand)
- **Authentication**: Clerk with `@clerk/clerk-react` - use `useUser()` and `useClerk()` hooks
- **Database**: MongoDB accessed via Express API server (backend in `server/` directory)
- **API Communication**: Frontend uses `src/config/api.js` helper functions to communicate with backend
- **Build Sharing**: Builds are passed between routes via React Router's `state` prop

## Backend API

The Express server (`server/index.js`) provides REST API endpoints:

- `GET /api/users/:clerkId` - Get user by Clerk ID
- `POST /api/users` - Create or update user
- `POST /api/users/:clerkId/builds` - Save a build
- `DELETE /api/users/:clerkId/builds/:buildIndex` - Delete a build
- `GET /api/health` - Health check endpoint

The backend connects directly to MongoDB and handles all database operations.

## AI Integration Points

1. **SuggestBuildModal**: Generates complete build suggestions via Gemini API
2. **AiChatAssistant**: Provides expert PC building advice
3. **Performance Analysis**: AI-generated performance metrics for complete builds

When working with AI features, ensure `VITE_GEMINI_API_KEY` is configured.
