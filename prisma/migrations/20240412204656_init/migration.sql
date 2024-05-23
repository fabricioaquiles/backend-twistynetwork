-- CreateTable
CREATE TABLE "Payments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "gross" TEXT NOT NULL,
    "reference" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Payments_code_key" ON "Payments"("code");
