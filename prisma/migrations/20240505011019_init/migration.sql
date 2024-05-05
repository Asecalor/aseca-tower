-- CreateEnum
CREATE TYPE "Category" AS ENUM ('TECHNOLOGY', 'CLOTHES', 'GROCERY', 'BOOKS');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "Category" NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
