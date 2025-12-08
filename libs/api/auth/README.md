## api-auth

JWT-based authentication for the NestJS API.

## Configuration

```bash
# Required in production
JWT_SECRET=your-secret-key-here

# Optional (default: 1h)
JWT_EXPIRES_IN=1h
```

Notes:

- In production, the app fails fast if `JWT_SECRET` is not set.
- For local development, this repo also supports a **dev-only** bypass using `x-dev-auth` (see root `README.md`).

## Usage

Import the module:

```ts
import { AuthModule } from '@klastack-nx/api/auth';
```

Login endpoint:

- **POST** `/api/auth/login`

Example:

```bash
curl -sS -X POST "http://localhost:3000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@local","password":"P@ssw@rd1243"}'
```
