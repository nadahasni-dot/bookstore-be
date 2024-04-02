/*
  Warnings:

  - You are about to drop the column `bookId` on the `Tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_bookId_fkey";

-- DropIndex
DROP INDEX "Order_userId_key";

-- DropIndex
DROP INDEX "OrderItem_bookId_key";

-- DropIndex
DROP INDEX "OrderItem_orderId_key";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "tagId" INTEGER;

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "bookId";

-- CreateTable
CREATE TABLE "BookTag" (
    "id" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookTag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookTag" ADD CONSTRAINT "BookTag_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookTag" ADD CONSTRAINT "BookTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
