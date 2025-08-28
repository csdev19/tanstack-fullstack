# Database

This package contains the database information for the tanstack-fullstack project

## How to use

```ts
import { usersTable } from '@fullstack/database/schemas';
```

## How to add a new schema

1. Add the schema to the `src/schemas` directory.
2. Add the schema to the `src/enums` directory.
3. Add the schema to the `src/client` directory.
4. Add the schema to the `src/index.ts` file.

## How to run the migrations

```bash
pnpm run db:generate
pnpm run db:migrate
```


## Sections exported

### Schemas

The schemas are located in the `src/schemas` directory.

### Enums

The enums are located in the `src/enums` directory.

### Client

The client is located in the `src/client` directory.

