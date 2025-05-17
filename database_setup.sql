-- Create database
CREATE DATABASE IF NOT EXISTS mindbridge_db;
USE mindbridge_db;

-- Create quiz table
CREATE TABLE quiz_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    country VARCHAR(50),
    score INT,
    submission_date DATETIME
);

-- Create demo requests table
CREATE TABLE demo_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    phone VARCHAR(20),
    university VARCHAR(100),
    student_status VARCHAR(50),
    services TEXT,
    message TEXT,
    preferred_time VARCHAR(50),
    submission_date DATETIME
); 