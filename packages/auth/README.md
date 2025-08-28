# @fullstack/auth

Authentication package for tanstack-fullstack using Better Auth and Drizzle ORM.

## Features

- 🔐 **Better Auth Integration**: Modern authentication library with TypeScript support
- 🗄️ **Drizzle ORM**: Type-safe database operations with PostgreSQL
- 🏢 **Condominium Context**: Extended sessions with user's condominium information
- 🔒 **Secure Password Hashing**: Using Node.js crypto with scrypt
- 🌐 **Universal**: Works in both server and client environments
- 📱 **Framework Agnostic**: Can be used with any JavaScript framework

## Installation

```bash
pnpm add @fullstack/auth
```

## Usage

### Server-side (API Routes, Middleware)

```typescript
import { server } from '@fullstack/auth';

// Create auth instance
const auth = server.createAuth({
  DATABASE_URL: process.env.DATABASE_URL,
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
});

// Use in your API routes
export const POST = auth.handler;
export const GET = auth.handler;
```

### Client-side (Frontend, React, etc.)

```typescript
import { client } from '@fullstack/auth';

// Create auth client
const authClient = client.createAuth({
  baseURL: 'http://localhost:3000',
  basePath: '/api/auth', // optional, defaults to '/api/auth'
});

// Use auth methods
const handleSignIn = async () => {
  await authClient.signIn.email({
    email: 'user@example.com',
    password: 'password123',
  });
};

const handleSignOut = async () => {
  await authClient.signOut();
};
```

### React Integration Example

```typescript
import { useEffect, useState } from 'react';
import { client, type ExtendedSession } from '@fullstack/auth';

const authClient = client.createAuth({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
});

export function useAuth() {
  const [session, setSession] = useState<ExtendedSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data } = await authClient.getSession();
        setSession(data);
      } catch (error) {
        console.error('Failed to get session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getSession();
  }, []);

  return {
    user: session?.user || null,
    condominiums: session?.condominiums || [],
    isLoading,
    signIn: authClient.signIn,
    signOut: authClient.signOut,
  };
}
```

## Configuration

### Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Better Auth
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-secret-key-here
CORS_ORIGIN=http://localhost:3000
```

### Auth Config

```typescript
interface AuthConfig {
  DATABASE_URL: string;
  BETTER_AUTH_URL: string;
  BETTER_AUTH_SECRET: string;
  CORS_ORIGIN: string;
}
```

## Extended Session Data

The auth package automatically includes condominium information in the session:

```typescript
interface ExtendedSession {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
  };
  session: {
    id: string;
    expiresAt: Date;
    token: string;
    // ... other session fields
  };
  condominiums: Array<{
    id: string;
    name: string;
    address: string;
  }>;
}
```

## Password Security

The package uses Node.js `crypto` module with `scrypt` for secure password hashing:

- Salt: 16 random bytes
- Key derivation: scrypt with 64-byte output
- Storage format: `${salt}:${hash}`

## Database Schema

The package works with the following Drizzle schemas from `@fullstack/database`:

- `usersTable`: User accounts
- `accountsTable`: OAuth and credential accounts  
- `sessionsTable`: User sessions
- `verificationsTable`: Email verification tokens

## Development

```bash
# Build the package
pnpm build

# Watch mode for development  
pnpm dev

# Type checking
pnpm check-types

# Run tests
pnpm test
```

## Dependencies

- `better-auth`: Modern authentication library
- `drizzle-orm`: Type-safe SQL ORM
- `@fullstack/database`: Database schemas and client
- `@fullstack/application`: Application utilities

## License

MIT 