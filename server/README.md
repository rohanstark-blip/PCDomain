# PCDomain Backend API

Express.js backend server for PCDomain application.

## Starting the Server

```bash
bun run server
```

Server will run on `http://localhost:3001`

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/users/:clerkId` - Get user by Clerk ID
- `POST /api/users` - Create user
- `POST /api/users/:clerkId/builds` - Save a build
- `DELETE /api/users/:clerkId/builds/:buildIndex` - Delete a build

## Environment Variables

The server reads from `.env.local` in the root directory:
- `VITE_MONGODB_URI` - MongoDB connection string
