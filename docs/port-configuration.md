# Port Configuration

## Overview

This document describes the port allocation for all services in the Klarstack-nx monorepo to avoid conflicts.

## Port Assignments

| Service | Port | Command | Description |
|---------|------|---------|-------------|
| **core-svc** (Backend API) | 3000 | `nx serve core-svc` | NestJS backend service |
| **web-app** (B2B Backoffice) | 4200 | `nx serve web-app` | Vite + React app for authenticated users |
| **portal** (Marketing Site) | 4201 | `nx run portal:dev` | Next.js public marketing site |

## Port Ranges

- **3000-3999**: Backend services (API, microservices)
- **4200-4299**: Frontend applications

## Configuration Files

### Backend (core-svc)
**Default port:** 3000 (NestJS default)

**Location:** `apps/core-svc/src/main.ts`
```typescript
await app.listen(process.env.PORT ?? 3000);
```

**Environment variable:** `PORT=3000`

### Frontend - web-app (Vite)
**Port:** 4200

**Location:** `apps/web-app/vite.config.mts`
```typescript
server: {
  port: 4200,
  host: 'localhost',
}
```

**Run:** `nx serve web-app`
**URL:** http://localhost:4200

### Frontend - portal (Next.js)
**Port:** 4201

**Location:** `apps/portal/project.json`
```json
"dev": {
  "command": "next dev --port 4201"
}
```

**Run:** `nx run portal:dev`
**URL:** http://localhost:4201

## Development Workflow

### Start All Services

```bash
# Terminal 1: Start backend
nx serve core-svc

# Terminal 2: Start web-app (backoffice)
nx serve web-app

# Terminal 3: Start portal (marketing)
nx run portal:dev
```

### Using Nx Multiple Targets

```bash
# Start backend and web-app
nx run-many -t serve --projects=core-svc,web-app

# Or start portal separately
nx run portal:dev
```

## API Configuration

The frontend apps connect to the backend API:

### web-app
**Environment variable:** `VITE_API_URL`

**Default:** `http://localhost:3000/api`

**Location:** `apps/web-app/.env` (create if not exists)
```bash
VITE_API_URL=http://localhost:3000/api
```

### portal
The portal is a public marketing site and typically doesn't connect to the backend API in development.

## Port Conflict Resolution

If you encounter port conflicts:

1. **Check for running processes:**
   ```bash
   lsof -i :3000  # Check port 3000
   lsof -i :4200  # Check port 4200
   lsof -i :4201  # Check port 4201
   ```

2. **Kill conflicting processes:**
   ```bash
   kill -9 <PID>
   ```

3. **Change ports:**
   - Backend: Set `PORT` environment variable
   - web-app: Update `vite.config.mts`
   - portal: Update `project.json` dev command

## Production Deployment

In production, these apps typically run behind a reverse proxy (nginx, etc.) with different paths or domains:

- **Backend API:** `api.example.com` or `example.com/api`
- **Web-App:** `app.example.com` or `example.com/app`
- **Portal:** `example.com` or `www.example.com`

## Troubleshooting

### "Port already in use"

**Error:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
1. Check what's using the port: `lsof -i :3000`
2. Stop the conflicting service
3. Or change the port in configuration

### "Cannot connect to backend"

**web-app shows:** "Backend Connection Error"

**Check:**
1. Is core-svc running? `lsof -i :3000`
2. Is VITE_API_URL correct? Check `apps/web-app/.env`
3. Is the backend accessible? `curl http://localhost:3000/api`

### "Mixed content" errors in browser

If running frontend on HTTPS and backend on HTTP, browsers may block requests.

**Solution:** Use same protocol for both (HTTP in dev, HTTPS in prod).

## Notes

- Port 3000 is reserved for the backend API
- Ports 4200-4201 are for frontend development servers
- Production deployments should use standard ports (80/443) with reverse proxy
- Update this document when adding new services
