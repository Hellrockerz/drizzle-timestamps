# drizzle-timestamps

A simple `created_at`, `updated_at`, and `deleted_at` timestamps and soft delete plugin-like utility for Drizzle ORM.

## Features

✅ Automatically adds `created_at`, `updated_at`, `deleted_at`  
✅ `insertWithTimestamps()` to auto-set `created_at` and `updated_at`  
✅ `updateWithTimestamps()` to auto-update `updated_at`  
✅ `softDelete()` to set `deleted_at` instead of deleting  
✅ `selectWithoutDeleted()` to filter out soft-deleted records

## Installation

npm install drizzle-timestamps

## Usage

### Step 1: Define Fields in Schema

```ts
import { pgTable, text } from 'drizzle-orm/pg-core';
import { timestampFields } from './drizzle-timestamps';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name'),
  ...timestampFields,
});
```

### Step 1: Define Fields in Schema

```ts
import {
  insertWithTimestamps,
  updateWithTimestamps,
  softDelete,
  selectWithoutDeleted,
} from './drizzle-timestamps';

await insertWithTimestamps(db, users, { id: 'u1', name: 'Mukul' });

await updateWithTimestamps(db, users, eq(users.id, 'u1'), { name: 'Mukul G' });

await softDelete(db, users, eq(users.id, 'u1'));

const activeUsers = await selectWithoutDeleted(db, users);
```