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
| Web Frontend  | Next.js 14, React, TailwindCSS          |
| Mobile        | React Native (Expo), TypeScript         |
| Backend       | Node.js 20, NestJS 10, TypeScript       |
| Database      | PostgreSQL 15                           |
| Auth          | JWT (passport-jwt), bcryptjs            |
| Payments      | Square Web Payments SDK                 |
| Agreements    | BoldSign API                            |
| Cloud         | AWS EC2, S3, IAM, Security Groups       |

## Getting Started

### Prerequisites
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