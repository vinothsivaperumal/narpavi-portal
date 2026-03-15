# Tech2High Bootcamp Portal (Narpavi Portal)

A secure learning management platform for the Tech2High Data Analysis Bootcamp. The portal provides two separate portals — **Student Portal** and **Admin Portal** — built with Next.js, NestJS, and PostgreSQL.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, React 18, TailwindCSS |
| Backend | NestJS, TypeORM |
| Database | PostgreSQL |
| Auth | JWT (role-based: admin / student) |
| Payments | Square API (Phase 2) |
| Agreements | BoldSign API (Phase 2) |
| Infrastructure | AWS EC2, AWS S3, AWS Security Groups |

---

## Project Structure

```
narpavi-portal/
├── frontend/          # Next.js App Router frontend
│   ├── app/
│   │   ├── admin/     # Admin portal pages
│   │   ├── student/   # Student portal pages
│   │   ├── login/
│   │   └── register/
│   ├── components/    # Shared UI components
│   ├── context/       # Auth context
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # API client, auth helpers, utils
│   └── types/         # TypeScript interfaces
│
└── backend/           # NestJS REST API
    └── src/
        ├── auth/          # JWT authentication & authorization
        ├── users/         # User management
        ├── students/      # Student profiles
        ├── batches/       # Bootcamp batch management
        ├── lessons/       # Course lesson management
        ├── ip-requests/   # AWS Security Group IP whitelisting
        ├── payments/      # Square payment integration (Phase 2)
        ├── agreements/    # BoldSign agreement signing (Phase 2)
        ├── messages/      # Internal messaging (Phase 2)
        └── database/
            └── migrations/  # PostgreSQL schema migrations
```

---

## Phase 1 Features

### Student Portal
- 🎓 Batch-based lesson access with unlisted YouTube videos
- 🌐 Public IP registration for database lab access
- 🔐 Database credential reveal (after IP approval)
- 💬 Internal messaging

### Admin Portal
- 👥 Student & batch management (CRUD)
- 📚 Lesson management per batch
- ✅ IP request approval (triggers AWS Security Group update)
- 📊 Activity dashboard with key metrics

---

## Phase 2 Features

- 💳 **Payments** — Square invoice generation & payment tracking
- 📝 **Agreements** — BoldSign electronic document signing
- 📨 **Messaging** — Automated onboarding workflows
- ⚖️ **Legal Compliance** — Terms acceptance, consent forms, audit logging

---
# Narpavi Portal (Tech2High Bootcamp Portal)

## About
The Tech2High Bootcamp Portal is a scalable platform for managing Data Analysis Bootcamp operations, tailored for both **students** and **admins**. It includes:
- Student course material access via **web portal** and **iPhone app**.
- Admin capabilities for managing students, lessons, and batches.
- Secure IP-based whitelisting for accessing databases (AWS).
- Legal document agreement signing using **BoldSign**.
- Payment integration via **Square SDK**.
- In-platform messaging system.

## Repository Structure

```
narpavi-portal/
├── backend/          # Node.js/NestJS API (shared by web & mobile)
├── frontend/         # Next.js web portal (TailwindCSS)
├── mobile/           # React Native iPhone app (Expo)
├── database/         # PostgreSQL schema, migrations, seeds
├── infrastructure/   # AWS configurations and scripts
└── docs/             # SRS documents and API documentation
```

## Features

### Phase 1
- JWT-based authentication with role-based access (Student / Admin)
- Student dashboard: lessons, progress tracking, IP management
- Admin dashboard: user management, batch enrollment, IP approvals
- Lesson management with video and material links
- Secure database access via AWS Security Group IP whitelisting

### Phase 2
- Legal document signing via **BoldSign** APIs
- Payment processing via **Square SDK**
- In-platform messaging (student ↔ admin)
- **iPhone (iOS) application** built with React Native (Expo)
- Push notifications for messages and agreement updates

## Tech Stack

| Layer         | Technology                              |
|---------------|-----------------------------------------|
| Web Frontend  | Next.js 15, React, TailwindCSS          |
| Mobile        | React Native (Expo), TypeScript         |
| Backend       | Node.js 20, NestJS 10, TypeScript       |
| Database      | PostgreSQL 15                           |
| Auth          | JWT (passport-jwt), bcryptjs            |
| Payments      | Square Web Payments SDK                 |
| Agreements    | BoldSign API                            |
| Cloud         | AWS EC2, S3, IAM, Security Groups       |

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### 1. Database Setup

```bash
psql -U postgres -c "CREATE DATABASE narpavi_portal;"
psql -U postgres -d narpavi_portal -f backend/src/database/migrations/001_initial_schema.sql
```

### 2. Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your database credentials and JWT secret
npm install
npm run start:dev
```

The API will be available at `http://localhost:3001`.

### 3. Frontend Setup

```bash
cd frontend
cp .env.example .env.local
# Edit .env.local if needed
npm install
npm run dev
```

The app will be available at `http://localhost:3000`.

---
- Node.js v18+
- PostgreSQL 15+
- AWS CLI configured
- Expo CLI (`npm install -g expo-cli`)

### 1. Database Setup
```bash
psql -h localhost -U user -d narpavi_db -f database/schema.sql
psql -h localhost -U user -d narpavi_db -f database/seeds/seed.sql
```

### 2. Backend
```bash
cd backend
cp .env.example .env       # Fill in your environment variables
npm install
npm run start:dev          # Starts on http://localhost:3000
```

Swagger API docs: http://localhost:3000/api/docs

### 3. Frontend (Web Portal)
```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev                # Starts on http://localhost:3001
```

### 4. Mobile (iPhone App)
```bash
cd mobile
npm install
npx expo start --ios       # Opens iOS Simulator
```

## Environment Variables

### Backend (`backend/.env`)

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_DATABASE=narpavi_portal

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h

# AWS (for IP whitelisting)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1
AWS_SECURITY_GROUP_ID=

# Square (Phase 2)
SQUARE_ACCESS_TOKEN=
SQUARE_ENVIRONMENT=sandbox

# BoldSign (Phase 2)
BOLDSIGN_API_KEY=

PORT=3001
```

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## Docker Compose (Optional)

```bash
docker-compose up -d
```

This starts PostgreSQL, the NestJS backend, and the Next.js frontend.

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login with email/password |
| POST | `/api/auth/register` | Register new account |
| GET | `/api/auth/profile` | Get current user profile |

### Students (Admin)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | List all students |
| POST | `/api/students` | Create student profile |
| GET | `/api/students/:id` | Get student details |
| PATCH | `/api/students/:id` | Update student |
| DELETE | `/api/students/:id` | Delete student |

### Batches (Admin)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/batches` | List all batches |
| POST | `/api/batches` | Create batch |
| PATCH | `/api/batches/:id` | Update batch |
| DELETE | `/api/batches/:id` | Delete batch |

### Lessons
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/lessons` | List lessons (filtered by batch for students) |
| POST | `/api/lessons` | Create lesson (Admin only) |
| PATCH | `/api/lessons/:id` | Update lesson (Admin only) |
| DELETE | `/api/lessons/:id` | Delete lesson (Admin only) |

### IP Requests
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/ip-requests` | List IP requests |
| POST | `/api/ip-requests` | Submit new IP request |
| PATCH | `/api/ip-requests/:id/approve` | Approve request (Admin) |
| PATCH | `/api/ip-requests/:id/reject` | Reject request (Admin) |

### Payments (Phase 2)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/payments` | List payments |
| POST | `/api/payments` | Create invoice (Admin) |
| PATCH | `/api/payments/:id` | Update payment status |

### Agreements (Phase 2)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/agreements` | List agreements |
| POST | `/api/agreements` | Send agreement (Admin) |
| PATCH | `/api/agreements/:id` | Update agreement status |

### Messages (Phase 2)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/messages` | Get inbox messages |
| POST | `/api/messages` | Send message |
| PATCH | `/api/messages/:id/read` | Mark as read |

---

## Security

- All passwords are bcrypt-hashed (never stored or returned in plaintext)
- JWT tokens expire after 24 hours
- Role-based access control: Admin vs Student routes
- Database credentials are masked in the UI until explicitly revealed
- IP whitelisting ensures only approved IPs can access the database lab
- PCI-compliant payment handling via Square
- Encrypted document storage for agreements

---

## License

Proprietary — Tech2High Bootcamp. All rights reserved.
```
NODE_ENV=development
PORT=3000
DATABASE_URL=postgres://user:password@localhost:5432/narpavi_db
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_SECURITY_GROUP_ID=your_sg_id
BOLDSIGN_API_KEY=your_boldsign_key
SQUARE_ACCESS_TOKEN=your_square_token
```

### Frontend (`frontend/.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Database Migrations
```bash
# Apply all migrations in order
psql -h localhost -U user -d narpavi_db -f database/migrations/001_initial_schema.sql
psql -h localhost -U user -d narpavi_db -f database/migrations/002_add_agreements_table.sql
```

## Infrastructure

Manage AWS Security Group IP rules:
```bash
cd infrastructure/aws-security-group
./manage-ip.sh add 203.0.113.42      # Whitelist an IP
./manage-ip.sh remove 203.0.113.42   # Remove an IP
./manage-ip.sh list                   # List all whitelisted IPs
```

## Documentation
- [API Documentation](./docs/API_Documentation.md)
- [Phase 1 SRS](./docs/SRS_Phase1.md)
- [Phase 2 SRS](./docs/SRS_Phase2.md)
- [Infrastructure Guide](./infrastructure/README.md)

## Contribution
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/new-feature
   ```
3. Submit a pull request for review.

## License
MIT
