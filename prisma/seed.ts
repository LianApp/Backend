import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  
  
  const user2 = await prisma.user.create({
    data: {
      role: "TEACHER",
      name: "Александр Пестов",
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
  
  const user3 = await prisma.user.create({
    data: {
      role: "TEACHER",
      name: "Юрченкова Ирина",
      email: "teacher2@edu.fa.ru",
      password: "$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm",
      organization_id: user2.organization_id
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
  
  const subject2 = await prisma.subject.create({
    data: {
      name: "Литература",
      organization_id: user2.organization_id
    }
  })

  const group = await prisma.group.create({
    data: {
      name: "ИСИП-319",
      organization_id: user2.organization_id
    }
  })
  
  const group2 = await prisma.group.create({
    data: {
      name: "ИСИП-419",
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


  const course2 = await prisma.course.create({
    data: {
      title: "Поэзия золотого века",
      teacher_id: user3.id,
      subject_id: subject2.id,
      groups: { connect: [{id: group.id}] }
    }
  });
  
  const lesson = await prisma.lesson.create({
    data: {
      title: "Сложение",
      course_id: course.id,
      lecture_url: "https://nsportal.ru/sites/default/files/2021/01/16/matem._1_klass.docx",
      presentation_url: "https://nsportal.ru/sites/default/files/2012/10/05/m_urok19.pptx"
    }
  })
  
  const lesson2 = await prisma.lesson.create({
    data: {
      title: "Вычитание",
      course_id: course.id,
      lecture_url: "https://nsportal.ru/sites/default/files/2021/01/16/matem._1_klass.docx",
      presentation_url: "https://nsportal.ru/sites/default/files/2012/10/05/m_urok19.pptx"
    }
  })
  
  const lesson3 = await prisma.lesson.create({
    data: {
      title: "Золотой век русской литературы",
      course_id: course2.id,
      lecture_url: "https://nsportal.ru/sites/default/files/2019/05/18/konspekt_uroka_0.docx",
      presentation_url: "https://nsportal.ru/sites/default/files/2012/04/18/zolotoy_vek_russkoy_literatury.pptx"
    }
  })


  console.log(user1, user2)
} 

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
