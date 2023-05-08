/*
  Warnings:

  - Added the required column `student_id` to the `TestSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestSession" ADD COLUMN     "student_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "SessionResult" (
    "id" SERIAL NOT NULL,
    "session_id" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "correct" INTEGER NOT NULL,
    "percentage" INTEGER NOT NULL,

    CONSTRAINT "SessionResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentAnswer" (
    "id" SERIAL NOT NULL,
    "session_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "answer_id" INTEGER NOT NULL,

    CONSTRAINT "StudentAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TestSession" ADD CONSTRAINT "TestSession_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionResult" ADD CONSTRAINT "SessionResult_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "TestSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAnswer" ADD CONSTRAINT "StudentAnswer_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "TestSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAnswer" ADD CONSTRAINT "StudentAnswer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAnswer" ADD CONSTRAINT "StudentAnswer_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "Answer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
