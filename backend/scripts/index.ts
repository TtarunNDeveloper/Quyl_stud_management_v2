import { PrismaClient } from '@prisma/client';
import { format } from 'date-fns';

const prisma = new PrismaClient();

async function main() {
  const course1 = await prisma.course.create({
    data: {
      image: "🔬",
      name: "CBSE 9-Science",
    },
  });

  const course2 = await prisma.course.create({
    data: {
      image: "📐",
      name: "CBSE 9-Math",
    },
  });

  const course3 = await prisma.course.create({
    data: {
      image: "🔬",
      name: "CBSE 10-Science",
    },
  });

  const course4 = await prisma.course.create({
    data: {
      image: "📐",
      name: "CBSE 10-Math",
    },
  });

  const student1 = await prisma.student.create({
    data: {
      name: "John Doe",
      cohort: "AY 2024-25",
      dateJoined: new Date("2024-11-17T00:00:00Z"),
      lastLogin: new Date("2024-11-17T16:16:00Z"),
      status: true,
      courses: {
        connect: [{ id: course1.id }, { id: course2.id }],
      },
    },
  });

  const student2 = await prisma.student.create({
    data: {
      name: "Jane Smith",
      cohort: "AY 2024-25",
      dateJoined: new Date("2024-11-17T00:00:00Z"),
      lastLogin: new Date("2024-11-17T16:16:00Z"),
      status: false,
      courses: {
        connect: [{ id: course3.id }, { id: course4.id }],
      },
    },
  });

  console.log('Created Students:', student1, student2);

  const students = await prisma.student.findMany({
    include: {
      courses: true,
    },
  });

  students.forEach((student: { 
    name: string; 
    cohort: string; 
    dateJoined: Date; 
    lastLogin: Date; 
    status: boolean; 
    courses: { image: string; name: string }[] 
  }) => {
    console.log(`Student: ${student.name}`);
    console.log(`Cohort: ${student.cohort}`);
    console.log(`Courses: ${student.courses.map((course: { 
      image: string; 
      name: string 
    }) => `${course.image} ${course.name}`).join(', ')}`);
    console.log(`Date Joined: ${format(new Date(student.dateJoined), 'dd.MMM.yyyy')}`);
    console.log(`Last Login: ${format(new Date(student.lastLogin), 'dd.MMM.yyyy hh:mm a')}`);
    const statusIcon = student.status ? `✅` : `❌`;
    console.log(`Status: ${statusIcon}`);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
<<<<<<< HEAD
  });
=======
  });
>>>>>>> 33e68cd (commit at 1.27 pm)
