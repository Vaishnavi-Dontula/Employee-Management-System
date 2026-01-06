# Employee-Management-System
🏢 Employee Management System (EMS)

A Full Stack Employee Management System built using React, Spring Boot, and MySQL.
This project provides role-based dashboards for Admin and Employee, with features like employee management, departments, leave management, salary management, and dashboards with statistics.

🚀 Tech Stack
Frontend

⚛️ React (Vite)

📦 Axios

🧭 React Router DOM

🎨 CSS (Custom UI)

Backend

☕ Spring Boot

🔐 Spring Security + JWT

🗄️ Spring Data JPA

🧩 REST APIs

Database

🐬 MySQL

✨ Features
🔐 Authentication

JWT-based login

Role-based access (ADMIN / EMPLOYEE)

Protected routes

👨‍💼 Admin Features

Dashboard with statistics

Add / Edit / Delete Employees

Department Management

Leave Approval & Rejection

Salary Management (Add / Edit / Delete)

Monthly Payroll Calculation

👩‍💻 Employee Features

View Profile

Apply Leave

View Leave Status

View Salary Details

Employee Dashboard Summary

📁 Project Structure
EMS/
│
├── EMS-Backend/
│   ├── controller/
│   ├── entity/
│   ├── dto/
│   ├── repository/
│   ├── security/
│   └── application.properties
│
├── EMS-Frontend/
│   ├── src/
│   │   ├── admin/
│   │   ├── employee/
│   │   ├── auth/
│   │   ├── components/
│   │   ├── api/
│   │   └── App.jsx
│   └── main.jsx
│
└── README.md

⚙️ Backend Setup (Spring Boot)
1️⃣ Prerequisites

Java 17+

Maven

MySQL

STS / IntelliJ / VS Code

2️⃣ Database Setup

Create database in MySQL:

CREATE DATABASE ems_db;

3️⃣ Configure application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/ems_db
spring.datasource.username=root
spring.datasource.password=your_mysql_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

jwt.secret=ems_secret_key
jwt.expiration=86400000

4️⃣ Run Backend
cd EMS-Backend
mvn spring-boot:run


Backend will run on:

http://localhost:8080

⚛️ Frontend Setup (React)
1️⃣ Prerequisites

Node.js 18+

npm / yarn

VS Code

2️⃣ Install Dependencies
cd EMS-Frontend
npm install

3️⃣ Configure Axios Base URL

src/api/axios.js

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

4️⃣ Run Frontend
npm run dev


Frontend runs on:

http://localhost:5173

🔑 API Endpoints (Sample)
Auth
POST /api/auth/login

Admin
GET    /api/admin/dashboard/stats
GET    /api/admin/employees
POST   /api/admin/employees
PUT    /api/admin/employees/{id}
DELETE /api/admin/employees/{id}

Employee
GET  /api/employee/profile
GET  /api/employee/salary
POST /api/employee/leaves

🧪 Sample Login Credentials
Admin
Email: admin@gmail.com
Password: admin123

Employee
Email: employee@gmail.com
Password: emp123

📊 Dashboard Highlights

Total Employees

Departments Count

Monthly Payroll

Leave Status (Approved / Pending / Rejected)

🛡️ Security

JWT Authentication

Role-based authorization

Protected frontend routes

Secure password hashing (BCrypt)

👩‍💻 Author

Vaishnavi Dontula
🎓 Full Stack Developer
🔧 React • Spring Boot • MySQL

⭐ How to Use This Project

Clone the repo

Setup MySQL

Run backend

Run frontend

Login as Admin / Employee

Explore features 🚀

🤝 Contribution

This project is built for learning & portfolio purposes.
Feel free to fork and enhance it.
