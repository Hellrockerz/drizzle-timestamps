import { timestamp } from 'drizzle-orm/pg-core';

export const timestampFields = {
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
  deleted_at: timestamp('deleted_at'),
};