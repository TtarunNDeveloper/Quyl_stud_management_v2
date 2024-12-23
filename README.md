Quyl Student Management System
Overview:
Quyl Student Management System is a web application designed to manage students' information, including their enrollment details, course information, and login statuses. This application leverages a modern tech stack, including React for the frontend, Express.jsfor the backend, and Prisma for the database ORM.

Features:
*Add Student: Pop-up form to add new students.
*Remove Student: Select and delete student records.
*Update Student: Edit student details within the table.
*Filter Students: Filter student records by academic year and course.

Tech Stack:
*Frontend: React
*Backend: Express.js
*Database: Prisma (Connected to PostgreSQL)

Getting Started--
Prerequisites:
Make sure you have the following installed:
*Node.js
*npm or yarn
*PostgreSQL

Setup--
1.Clone the repository:
git clone https://github.com/TtarunNDeveloper/Quyl_stud_management.git
cd Quyl_stud_management

2.Install dependencies:
npm install
# or
yarn install

3.Setup environment variables:
Create a .env file in the root directory and add your environment variables:
*DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database>?schema=public"

4.Setup Prisma:
npx prisma migrate dev --name init
npx prisma generate

5.Seed the database (optional):
You can add some initial data to your database if needed:
node prisma/seed.js

Running the Application--
1.Start the backend server:
cd backend
npm start
# or
yarn start

2.Start the frontend development server:
cd frontend
npm start
# or
yarn start