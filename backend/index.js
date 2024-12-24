const { PrismaClient } = require('@prisma/client');
const express = require('express');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/students', async (req, res) => {
  try {
    const { year, course } = req.query;
    const filters = {};

    if (year) {
      filters.dateJoined = {
        gte: new Date(`${year}-01-01`),
        lt: new Date(`${year}-12-31`),
      };
    }

    if (course) {
      filters.courses = {
        some: {
          name: {
            contains: course,
          },
        },
      };
    }

    const students = await prisma.student.findMany({
      where: filters,
      include: {
        courses: true,
      },
    });
    console.log("Fetched Students with Courses: ", students);

    res.json(students);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/students', async (req, res) => {
  const { name, cohort, dateJoined, lastLogin, courses } = req.body;
  console.log("Request Body:", req.body);
  try {
    const parsedCourses = courses.map((courseId) => ({ id: parseInt(courseId) })).filter(course => !isNaN(course.id));
    console.log("Parsed Courses:", parsedCourses);

    const newStudent = await prisma.student.create({
      data: {
        name,
        cohort,
        dateJoined: new Date(dateJoined),
        lastLogin: new Date(lastLogin),
        status: true,
        courses: {
          connect: parsedCourses,

        },
      },
    });
    res.json(newStudent);
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).send(error.message);
  }
});

app.delete('/students', async (req, res) => {
  const { ids } = req.body;
  try {
    await prisma.student.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    res.json({ message: 'Students deleted successfully' });
  } catch (error) {
    console.error("Error deleting students:", error);
    res.status(500).send(error.message);
  }
});

app.get('/courses', async (req, res) => {
  try {
    const courses = await prisma.course.findMany();
    res.json(courses);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.put('/students/:id', async (req, res) => {
  const { id } = req.params;
  const { name, cohort, dateJoined, lastLogin, courses } = req.body;
  console.log("Request Body:", req.body);
  try {
    const parsedCourses = courses.map((courseId) => ({ id: parseInt(courseId) })).filter(course => !isNaN(course.id));
    console.log("Parsed Courses:", parsedCourses);


    const updatedStudent = await prisma.student.update({
      where: { id: parseInt(id) },
      data: {
        name,
        cohort,
        dateJoined: new Date(dateJoined),
        lastLogin: new Date(lastLogin),
        status: true,
        courses: {
          connect: parsedCourses,

        },
      },
    });
    res.json(updatedStudent);
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).send(error.message);
  }
}
  
);


async function startServer() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
}

startServer();

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
