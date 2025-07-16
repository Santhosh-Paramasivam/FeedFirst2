CREATE TYPE "STATUS" AS ENUM (
  'PROVIDED',
  'APPROVED',
  'PENDING',
  'REJECTED'
);

CREATE TYPE "UNITS" AS ENUM (
  'c/cans',
  'g/grams',
  'kg/kilograms',
  'p/packets'
);

CREATE TYPE "STOCK_LEVEL" AS ENUM (
  'EMPTY',
  'LOW',
  'MEDIUM',
  'HIGH'
);

CREATE TABLE "Item" (
  "pantry_ID" INT,
  "item_ID" SERIAL PRIMARY KEY,
  "units_used" "UNITS" NOT NULL,
  "current_stock" "STOCK_LEVEL" NOT NULL,
  "item_name" VARCHAR(30) NOT NULL
);

CREATE TABLE "PantryItemBatches" (
  "item_ID" INT,
  "batch_ID" SERIAL PRIMARY KEY,
  "batch_no" INT NOT NULL,
  "expiry_date" DATE NOT NULL,
  "quantity" FLOAT NOT NULL
);

CREATE TABLE "Pantries" (
  "pantry_ID" SERIAL PRIMARY KEY,
  "pantry_name" VARCHAR(20) NOT NULL,
  "pantry_address" TEXT NOT NULL
);

CREATE TABLE "PantryManager" (
  "pantrymanager_ID" CHAR(36) PRIMARY KEY,
  "ration_card_number" VARCHAR(20) NOT NULL,
  "name" VARCHAR(20) NOT NULL,
  "phone_number" VARCHAR(20) NOT NULL,
  "email_ID" VARCHAR(100) NOT NULL,
  "address" TEXT NOT NULL,
  "pantry_ID" INT
);

CREATE TABLE "Recipients" (
  "recipient_ID" CHAR(36) PRIMARY KEY,
  "phone_number" CHAR(20) NOT NULL,
  "name" VARCHAR(20) NOT NULL,
  "ration_card_number" VARCHAR(20) NOT NULL,
  "email_ID" VARCHAR(100) NOT NULL,
  "dietary_needs" TEXT NOT NULL,
  "household_size" INT NOT NULL,
  "pantry_ID" INT,
  "address" TEXT NOT NULL,
  "priority" INT CHECK("priority" BETWEEN 1 AND 5)
  -- priority = NULL means the recipient is unverified
);

CREATE TABLE "FoodVouchers" (
  "pantry_ID" INT,
  "recipient_ID" CHAR(36),
  "voucher_ID" SERIAL PRIMARY KEY,
  "status" "STATUS" NOT NULL
);

CREATE TABLE "RequestedItem" (
  "requested_item_ID" SERIAL PRIMARY KEY,
  "item_ID" INT,
  "voucher_ID" INT,
  "requested_quantity" FLOAT NOT NULL,
  "provided_quantity" FLOAT NOT NULL
);

ALTER TABLE "Item" ADD FOREIGN KEY ("pantry_ID") REFERENCES "Pantries" ("pantry_ID") ON DELETE SET NULL;

ALTER TABLE "FoodVouchers" ADD FOREIGN KEY ("pantry_ID") REFERENCES "Pantries" ("pantry_ID") ON DELETE SET NULL;

ALTER TABLE "PantryItemBatches" ADD FOREIGN KEY ("item_ID") REFERENCES "Item" ("item_ID") ON DELETE SET NULL;

ALTER TABLE "PantryManager" ADD FOREIGN KEY ("pantry_ID") REFERENCES "Pantries" ("pantry_ID") ON DELETE SET NULL;

ALTER TABLE "Recipients" ADD FOREIGN KEY ("pantry_ID") REFERENCES "Pantries" ("pantry_ID") ON DELETE SET NULL;

ALTER TABLE "FoodVouchers" ADD FOREIGN KEY ("recipient_ID") REFERENCES "Recipients" ("recipient_ID") ON DELETE SET NULL;

ALTER TABLE "RequestedItem" ADD FOREIGN KEY ("item_ID") REFERENCES "Item" ("item_ID") ON DELETE SET NULL;

ALTER TABLE "RequestedItem" ADD FOREIGN KEY ("voucher_ID") REFERENCES "FoodVouchers" ("voucher_ID") ON DELETE SET NULL;
