-- CreateTable
CREATE TABLE "Cupom" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "expiresIn" TEXT NOT NULL,
    "uses" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Cupom_name_key" ON "Cupom"("name");
