import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  
  
  const user2 = await prisma.user.create({
    data: {
      role: "TEACHER",
      name: "Alexander Pestov",
      email: "teacher@edu.fa.ru",
      password: "$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm",
      organization: {
        connectOrCreate: {
          create: {
            name: "KIP",
            type: "College"
          },
          where: {
            name: "KIP"
          }
        }
      },
    }
  });

  const subject = await prisma.subject.create({
    data: {
      name: "Математика"
    }
  })
  
  const course = await prisma.course.create({
    data: {
      title: "Алгебра",
      teacher_id: user2.id,
      subject_id: subject.id
    }
  })

  const user1 = await prisma.user.create({
    data: {
      role: "STUDENT",
      name: "Nikita Tyrkin",
      email: "student@edu.fa.ru",
      password: "$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm",
      organization: {
        create: {
          name: "KIP",
          type: "College"
        }
      },
      group: {
        create: {
          name: "4ИСИП-319",
        }
      }
    }
  });

  const lesson = await prisma.lesson.create({
    data: {
      title: "Сложение",
      course_id: course.id,
      lecture_url: "https://africau.edu/images/default/sample.pdf",
      presentation_url: "https://africau.edu/images/default/sample.pdf"
    }
  })

  console.log(user1, user2)
} 

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
