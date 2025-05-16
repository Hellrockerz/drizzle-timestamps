import { sql } from 'drizzle-orm';
import type { PgTableWithColumns } from 'drizzle-orm/pg-core';

export const insertWithTimestamps = <T extends PgTableWithColumns<any>>(
  db: any,
  table: T,
  data: Partial<Record<keyof T['_']['columns'], any>>
) => {
  const now = new Date();
  return db.insert(table).values({
    ...data,
    created_at: now,
    updated_at: now,
  }).returning();
};

export const updateWithTimestamps = <T extends PgTableWithColumns<any>>(
  db: any,
  table: T,
  where: any,
  data: Partial<Record<keyof T['_']['columns'], any>>
) => {
  const now = new Date();
  return db.update(table).set({
    ...data,
    updated_at: now,
  }).where(where).returning();
};

export const softDelete = <T extends PgTableWithColumns<any>>(
  db: any,
  table: T,
  where: any
) => {
  const now = new Date();
  return db.update(table).set({
    deleted_at: now,
    updated_at: now,
  }).where(where).returning();
};

export const selectWithoutDeleted = <T extends PgTableWithColumns<any>>(
  db: any,
  table: T
) => {
  return db.select().from(table).where(sql`${table.deleted_at} IS NULL`);
};
