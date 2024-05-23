/*
  Warnings:

  - Added the required column `maximumUses` to the `Cupom` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cupom" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "expiresIn" TEXT NOT NULL,
    "uses" INTEGER NOT NULL,
    "maximumUses" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL
);
INSERT INTO "new_Cupom" ("discount", "expiresIn", "id", "name", "uses") SELECT "discount", "expiresIn", "id", "name", "uses" FROM "Cupom";
DROP TABLE "Cupom";
ALTER TABLE "new_Cupom" RENAME TO "Cupom";
CREATE UNIQUE INDEX "Cupom_name_key" ON "Cupom"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
