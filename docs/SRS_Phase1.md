# Software Requirements Specification - Phase 1

## Tech2High Bootcamp Portal

### 1. Introduction

**Project**: Tech2High Data Analysis Bootcamp Portal  
**Version**: 1.0  
**Purpose**: A web-based portal to manage bootcamp operations for students and administrators.

---

### 2. Scope

Phase 1 covers:
- User authentication (JWT-based)
- Role-based access control (Student, Admin)
- Student and Admin dashboards
- Lesson management and access
- IP-based database access management (AWS Security Groups)
- Basic user and batch management

---

### 3. Functional Requirements

#### 3.1 Authentication
- FR-1.1: Users shall log in with email and password.
- FR-1.2: JWTs shall be issued on successful login (7-day expiry).
- FR-1.3: New student accounts shall be registered by admins or self-registration.
- FR-1.4: Passwords shall be hashed using bcrypt.

#### 3.2 Role-Based Dashboards
- FR-2.1: Students shall see their enrolled lessons, progress, payment status, and pending IP requests.
- FR-2.2: Admins shall see all students, batch statistics, IP requests, and revenue summaries.

#### 3.3 Lesson Management
- FR-3.1: Admins shall create, update, and deactivate lessons.
- FR-3.2: Lessons shall be ordered and associated with a batch.
- FR-3.3: Students shall view only lessons in their enrolled batch.
- FR-3.4: Each lesson may include a video URL and a materials URL.

#### 3.4 IP Whitelist Management
- FR-4.1: Students shall submit IP whitelist requests (IP + optional description).
- FR-4.2: Admins shall approve or reject IP whitelist requests with notes.
- FR-4.3: Approved IPs shall be added to the AWS EC2 security group via AWS CLI/SDK.
- FR-4.4: Students shall view the status of their IP requests.

#### 3.5 User & Batch Management
- FR-5.1: Admins shall create, update, and deactivate student accounts.
- FR-5.2: Admins shall create and manage batches with start/end dates and enrollment limits.
- FR-5.3: Admins shall assign students to batches.

---

### 4. Non-Functional Requirements

- NFR-1: API response time < 500ms for standard requests.
- NFR-2: All API endpoints shall require authentication except `/auth/login` and `/auth/register`.
- NFR-3: Passwords shall never be returned in API responses.
- NFR-4: All communication shall use HTTPS in production.
- NFR-5: The system shall support at least 100 concurrent users.

---

### 5. Tech Stack

| Layer       | Technology            |
|-------------|-----------------------|
| Frontend    | Next.js 15, TailwindCSS |
| Backend     | Node.js 20, NestJS 10 |
| Database    | PostgreSQL 15         |
| Auth        | JWT, bcryptjs         |
| Cloud       | AWS EC2, Security Groups |
