import {
  pgEnum,
  pgTable,
  serial,
  varchar,
  integer,
  text,
  char,
  date,
  real,
  primaryKey,
  foreignKey,
  index,
  unique,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Enums
export const statusEnum = pgEnum("STATUS", [
  "PROVIDED",
  "APPROVED",
  "PENDING",
  "REJECTED",
]);

export const unitsEnum = pgEnum("UNITS", [
  "c/cans",
  "g/grams",
  "kg/kilograms",
  "p/packets",
]);

export const stockLevelEnum = pgEnum("STOCK_LEVEL", [
  "EMPTY",
  "LOW",
  "MEDIUM",
  "HIGH",
]);

// Tables

export const Pantries = pgTable("Pantries", {
  pantry_ID: serial("pantry_ID").primaryKey(),
  pantry_name: varchar("pantry_name", { length: 20 }).notNull(),
  pantry_address: text("pantry_address").notNull(),
  hashed_pantry_key: char("hashed_pantry_key", {length: 20}).notNull(),
  contact_number: varchar("contact_number", {length: 64}).notNull()
});

export const Item = pgTable("Item", {
  item_ID: serial("item_ID").primaryKey(),
  pantry_ID: integer("pantry_ID").references(() => Pantries.pantry_ID, {
    onDelete: "set null",
  }),
  units_used: unitsEnum("units_used").notNull(),
  current_stock: stockLevelEnum("current_stock").notNull(),
  item_name: varchar("item_name", { length: 30 }).notNull(),
});

export const PantryItemBatches = pgTable("PantryItemBatches", {
  batch_ID: serial("batch_ID").primaryKey(),
  item_ID: integer("item_ID").references(() => Item.item_ID, {
    onDelete: "set null",
  }),
  batch_no: integer("batch_no").notNull(),
  expiry_date: date("expiry_date").notNull(),
  quantity: real("quantity").notNull(),
});

export const PantryManager = pgTable("PantryManager", {
  pantrymanager_ID: char("pantrymanager_ID", { length: 36 }).primaryKey(),
  ration_card_number: varchar("ration_card_number", { length: 20 }).notNull(),
  name: varchar("name", { length: 20 }).notNull(),
  phone_number: varchar("phone_number", { length: 20 }).notNull(),
  email_ID: varchar("email_ID", { length: 100 }).notNull(),
  address: text("address").notNull(),
  pantry_ID: integer("pantry_ID").references(() => Pantries.pantry_ID, {
    onDelete: "set null",
  }),
});

export const Recipients = pgTable(
  "Recipients",
  {
    recipient_ID: char("recipient_ID", { length: 36 }).primaryKey(),
    phone_number: char("phone_number", { length: 20 }).notNull(),
    name: varchar("name", { length: 20 }).notNull(),
    ration_card_number: varchar("ration_card_number", { length: 20 }).notNull(),
    email_ID: varchar("email_ID", { length: 100 }).notNull(),
    dietary_needs: text("dietary_needs").notNull(),
    household_size: integer("household_size").notNull(),
    pantry_ID: integer("pantry_ID").references(() => Pantries.pantry_ID, {
      onDelete: "set null",
    }),
    address: text("address").notNull(),
    priority: integer("priority").notNull(),
  },
  (table) => ({
    priorityCheck: sql`CHECK (${table.priority} BETWEEN 1 AND 5)`,
  })
);

export const FoodVouchers = pgTable("FoodVouchers", {
  voucher_ID: serial("voucher_ID").primaryKey(),
  pantry_ID: integer("pantry_ID").references(() => Pantries.pantry_ID, {
    onDelete: "set null",
  }),
  recipient_ID: char("recipient_ID", { length: 36 }).references(() => Recipients.recipient_ID, {
    onDelete: "set null",
  }),
  status: statusEnum("status").notNull(),
});

export const RequestedItem = pgTable("RequestedItem", {
  requested_item_ID: serial("requested_item_ID").primaryKey(),
  item_ID: integer("item_ID").references(() => Item.item_ID, {
    onDelete: "set null",
  }),
  voucher_ID: integer("voucher_ID").references(() => FoodVouchers.voucher_ID, {
    onDelete: "set null",
  }),
  requested_quantity: real("requested_quantity").notNull(),
  provided_quantity: real("provided_quantity").notNull(),
});

