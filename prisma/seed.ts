import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
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
  const user2 = await prisma.user.create({
    data: {
      role: "TEACHER",
      name: "Alexander Pestov",
      email: "teacher@edu.fa.ru",
      password: "$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm",
      organization: {
        connect: {
          name: "KIP"
        }
      },
    }
  });

  console.log(user1, user2)
} 

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
