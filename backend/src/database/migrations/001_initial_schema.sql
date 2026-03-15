-- Tech2High Bootcamp Portal - Initial Schema
-- Migration: 001_initial_schema.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_role_enum AS ENUM ('admin', 'student');
CREATE TYPE student_status_enum AS ENUM ('active', 'graduated', 'dropped', 'on_hold');
CREATE TYPE ip_request_status_enum AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE payment_status_enum AS ENUM ('pending', 'paid', 'failed');
CREATE TYPE agreement_status_enum AS ENUM ('pending', 'signed', 'declined');

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  "firstName" VARCHAR(100) NOT NULL,
  "lastName" VARCHAR(100) NOT NULL,
  role user_role_enum NOT NULL DEFAULT 'student',
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Batches table
CREATE TABLE IF NOT EXISTS batches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  "startDate" DATE,
  "endDate" DATE,
  description TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Students table
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "userId" UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  "batchId" UUID REFERENCES batches(id) ON DELETE SET NULL,
  "enrollmentDate" DATE,
  phone VARCHAR(30),
  status student_status_enum NOT NULL DEFAULT 'active',
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_students_batch ON students("batchId");
CREATE INDEX idx_students_status ON students(status);

-- Lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "batchId" UUID NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  "youtubeUrl" VARCHAR(500),
  "order" INTEGER NOT NULL DEFAULT 0,
  "isPublished" BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_lessons_batch ON lessons("batchId");
CREATE INDEX idx_lessons_published ON lessons("isPublished");

-- IP Requests table
CREATE TABLE IF NOT EXISTS ip_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "studentId" UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "ipAddress" VARCHAR(45) NOT NULL,
  description TEXT,
  status ip_request_status_enum NOT NULL DEFAULT 'pending',
  "awsSecurityGroupId" VARCHAR(255),
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_ip_requests_student ON ip_requests("studentId");
CREATE INDEX idx_ip_requests_status ON ip_requests(status);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "studentId" UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount NUMERIC(10, 2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'USD',
  status payment_status_enum NOT NULL DEFAULT 'pending',
  "squarePaymentId" VARCHAR(255),
  "invoiceNumber" VARCHAR(100),
  "dueDate" DATE,
  "paidAt" TIMESTAMP,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_payments_student ON payments("studentId");
CREATE INDEX idx_payments_status ON payments(status);

-- Agreements table
CREATE TABLE IF NOT EXISTS agreements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "studentId" UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "documentType" VARCHAR(100) NOT NULL,
  "boldSignDocumentId" VARCHAR(255),
  status agreement_status_enum NOT NULL DEFAULT 'pending',
  "signedAt" TIMESTAMP,
  "documentUrl" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_agreements_student ON agreements("studentId");
CREATE INDEX idx_agreements_status ON agreements(status);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "senderId" UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "recipientId" UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  "isRead" BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_messages_recipient ON messages("recipientId");
CREATE INDEX idx_messages_sender ON messages("senderId");
CREATE INDEX idx_messages_read ON messages("isRead");

-- Seed: default admin user
-- IMPORTANT: Replace the password hash below before deploying.
-- Generate with: node -e "const bcrypt=require('bcrypt'); bcrypt.hash('YourPassword', 10).then(console.log)"
INSERT INTO users (id, email, password, "firstName", "lastName", role, "isActive")
VALUES (
  uuid_generate_v4(),
  'admin@tech2high.com',
  '$2b$10$PLACEHOLDER_HASH_REPLACE_BEFORE_USE',
  'Admin',
  'Tech2High',
  'admin',
  TRUE
) ON CONFLICT (email) DO NOTHING;
