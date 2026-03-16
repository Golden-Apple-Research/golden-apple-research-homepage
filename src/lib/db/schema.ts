// schema.ts
import {
  pgTable,
  varchar,
  numeric,
  timestamp,
  bigserial,
  text,
  uniqueIndex,
  bigint,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// 1. USER TABLE (Gemerged für Better-Auth)
// Wir nutzen 'id' als PK (Better-Auth Standard) und keycloakId als unique Feld.
export const user = pgTable(
  "user", // Better-Auth erwartet Singular 'user'
  {
    // Internationale ID, die Better-Auth verwaltet
    id: text("id").primaryKey(),

    // Deine Keycloak ID (Sub) - jetzt eindeutiges Feld statt PK
    // Das erlaubt uns, User auch ohne Keycloak anzulegen (falls nötig)
    // keycloakId: text("keycloak_id").unique(),

    // --- Better-Auth Pflichtfelder ---
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").notNull().default(false),
    image: text("image"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),

    // --- Deine Custom Fields ---
    // username: varchar("username", { length: 50 }).notNull(),
    balance: numeric("balance", { precision: 12, scale: 2 })
      .default("0.00")
      .notNull(),
    reservedBalance: numeric("reserved_balance", { precision: 12, scale: 2 })
      .default("0.00")
      .notNull(),
  },
);

// 2. SESSION TABLE (Neu für Better-Auth)
export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  // Referenz auf die neue user.id
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

// 3. ACCOUNT TABLE (Neu für Better-Auth - Hier landet die Keycloak Verknüpfung)
export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(), // Dies ist die Keycloak User ID (Sub)
  providerId: text("provider_id").notNull(), // z.B. "keycloak"
  // Referenz auf die neue user.id

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  scope: text("scope"),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at", {
    withTimezone: true,
  }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// 4. VERIFICATION TABLE (Neu für Better-Auth)
export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// 5. API_REQUESTS TABLE (Referenzen angepasst)
export const apiRequests = pgTable("api_requests", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  // Referenziert jetzt user.id (text) statt keycloakId
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  reservedAmount: numeric("reserved_amount", {
    precision: 12,
    scale: 2,
  }).notNull(),
  settledAmount: numeric("settled_amount", { precision: 12, scale: 2 }),
  status: varchar("status", { length: 20 }).default("PENDING").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  settledAt: timestamp("settled_at", { withTimezone: true }),
});

// 6. TRANSACTIONS TABLE (Referenzen angepasst)
export const transactions = pgTable("transactions", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  // Referenziert jetzt user.id (text) statt keycloakId
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  transactionType: varchar("transaction_type", { length: 50 }).notNull(),
  referenceId: bigint("reference_id", { mode: "number" }),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// 7. RELATIONS (Aktualisiert)
export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  apiRequests: many(apiRequests),
  transactions: many(transactions),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const apiRequestsRelations = relations(apiRequests, ({ one }) => ({
  user: one(user, {
    fields: [apiRequests.userId],
    references: [user.id],
  }),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(user, {
    fields: [transactions.userId],
    references: [user.id],
  }),
}));
