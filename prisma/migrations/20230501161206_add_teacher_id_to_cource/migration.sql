/*
  Warnings:

  - Added the required column `teacher_id` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "teacher_id" INTEGER NOT NULL;
