
-- =========================================
-- Database: employee_management_system
-- =========================================

CREATE DATABASE IF NOT EXISTS employee_management_system;
USE employee_management_system;

-- =========================================
-- Table: departments
-- =========================================
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO departments (id, name, description, created_at) VALUES
(1, 'IT', 'Information Technology', '2026-01-02 15:55:07'),
(2, 'HR', 'Human Resources', '2026-01-02 15:55:07'),
(3, 'Finance', 'Finance and Accounts', '2026-01-02 15:55:07'),
(4, 'Marketing', 'Marketing and Sales', '2026-01-02 15:55:07'),
(5, 'Operations', 'Operations Management', '2026-01-02 15:55:07'),
(6, 'Engineering', 'Engineering Department', '2026-01-02 15:55:07'),
(7, 'Customer Support', 'Customer Service', '2026-01-02 15:55:07'),
(8, 'Legal', 'Legal Department', '2026-01-02 15:55:07'),
(9, 'Social Media', 'Social Media Handler', '2026-01-04 11:49:07');

-- =========================================
-- Table: users
-- =========================================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN','EMPLOYEE') NOT NULL,
    employee_id VARCHAR(20),
    gender VARCHAR(10),
    dob DATE,
    department_id INT,
    marital_status VARCHAR(20),
    profile_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

INSERT INTO users VALUES
(1,'Admin User','admin@gmail.com','$2a$10$ADMINHASH','ADMIN','ADM001','Male','1985-01-15',1,'Married',NULL,'2026-01-02 15:55:07','2026-01-03 22:01:29'),
(2,'John Doe','johndoe@gmail.com','$2a$10$EMP1HASH','EMPLOYEE','EMP001','Male','1990-05-20',2,'Single',NULL,'2026-01-02 15:55:07','2026-01-03 23:40:07'),
(3,'Jane Smith','janesmith@gmail.com','$2a$10$EMP2HASH','EMPLOYEE','EMP002','Female','1992-08-15',1,'Married',NULL,'2026-01-02 15:55:07','2026-01-03 23:40:31'),
(7,'Mike Johnson','mike@gmail.com','$2a$10$EMP3HASH','EMPLOYEE','EMP003','Male','1988-03-10',3,'Single',NULL,'2026-01-05 15:00:47','2026-01-06 11:15:55'),
(9,'Jake Sully','jake@gmail.com','$2a$10$EMP4HASH','EMPLOYEE','EMP004','Male','2000-03-12',5,'Married',NULL,'2026-01-05 15:27:26','2026-01-05 15:27:26');

-- =========================================
-- Table: salary
-- =========================================
CREATE TABLE salary (
    id INT AUTO_INCREMENT PRIMARY KEY,
    basic_salary DECIMAL(10,2),
    allowances DECIMAL(10,2),
    deductions DECIMAL(10,2),
    net_salary DECIMAL(10,2),
    month INT,
    year INT,
    payment_date DATE,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO salary VALUES
(1,25000,2000,500,26500,1,2026,'2026-01-31',2),
(2,40000,5000,200,43000,1,2026,'2026-01-31',1),
(3,500000,10000,50000,460000,1,2026,'2026-01-01',3),
(5,400000,10000,50000,360000,1,2026,'2026-01-01',7),
(6,600000,10000,50000,560000,1,2026,'2026-01-01',9);

-- =========================================
-- Table: leaves
-- =========================================
CREATE TABLE leaves (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    leave_type VARCHAR(50),
    start_date DATE,
    end_date DATE,
    reason VARCHAR(255),
    status ENUM('PENDING','APPROVED','REJECTED'),
    admin_comment VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO leaves VALUES
(1,2,'Sick','2026-01-05','2026-01-07','Flu','REJECTED',NULL,'2026-01-02 15:55:08','2026-01-03 17:24:23'),
(2,3,'Annual','2026-01-10','2026-01-15','Vacation','APPROVED',NULL,'2026-01-02 15:55:08','2026-01-04 11:12:15'),
(6,3,'Casual','2026-01-07','2026-01-08','Personal','REJECTED',NULL,'2026-01-04 10:42:07','2026-01-05 12:21:18'),
(9,7,'Sick','2026-01-07','2026-01-08','Fever','PENDING',NULL,'2026-01-06 05:46:41','2026-01-06 05:46:41');
