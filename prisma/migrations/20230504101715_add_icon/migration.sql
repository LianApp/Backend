/*
  Warnings:

  - Added the required column `organization_id` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
TRUNCATE table "Course" CASCADE;
TRUNCATE table "Subject" CASCADE;
ALTER TABLE "Course" ADD COLUMN     "icon" VARCHAR(1) NOT NULL DEFAULT '📕';

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "organization_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
