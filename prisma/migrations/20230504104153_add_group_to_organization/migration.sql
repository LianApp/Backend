/*
  Warnings:

  - Added the required column `organization_id` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
TRUNCATE TABLE "Group" CASCADE;
ALTER TABLE "Group" ADD COLUMN     "organization_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
