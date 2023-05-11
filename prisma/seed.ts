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
        create: {
            name: "KIP",
            type: "College"
        }
      },
    }
  });

  const org = await prisma.user.create({
    data: {
      role: "ORGANIZATOR",
      name: "Org",
      email: "org@org.fa.ru",
      password: "$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm",
      organization_id: user2.organization_id
    }
  })

  const subject = await prisma.subject.create({
    data: {
      name: "Математика",
      organization_id: user2.organization_id
    }
  })

  const group = await prisma.group.create({
    data: {
      name: "ИСИП-319",
      organization_id: user2.organization_id
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
        connect: {
          id: group.id
      }}
    }
  });


  const course = await prisma.course.create({
    data: {
      title: "Алгебра",
      teacher_id: user2.id,
      subject_id: subject.id,
      groups: { connect: [{id: group.id}] }
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
