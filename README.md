# Narpavi Portal (Tech2High Bootcamp Portal)

## About
The Tech2High Bootcamp Portal is a scalable platform for managing Data Analysis Bootcamp operations, tailored for both **students** and **admins**. It includes:
- Student course material access.
- Admin capabilities for managing students, lessons, and batches.
- Secure IP-based whitelisting for accessing databases.
- Legal document agreements and seamless payment integrations.

## Features
### Phase 1
- Role-based dashboards:
  - **Students**: Access lessons, submit assignments, manage IP whitelisting, and view progress.
  - **Admins**: Manage users, course content, and batch access.
- Secure database access with AWS IP whitelisting.
- Lesson video integrations and database credential handling.

### Phase 2
- Legal document processing using BoldSign.
- Payment integrations for secure settlements (**Square**).
- Messaging system for direct communication and enrollment workflows.

## Tech Stack
- **Frontend**: Next.js, React, TailwindCSS.
- **Backend**: Node.js/NestJS.
- **Database**: PostgreSQL.
- **Infrastructure**: AWS EC2, S3, IAM, Security Groups.

## Installation
### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- AWS CLI configured for security group management

### Backend
1. Navigate to `backend/`:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env`:
   ```
   DATABASE_URL=postgres://user:password@localhost:5432/db_name
   AWS_ACCESS_KEY_ID=your_key
   AWS_SECRET_ACCESS_KEY=your_secret
   ```
4. Run the application:
   ```bash
   npm run start
   ```

### Frontend
1. Navigate to `frontend/`:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Database Migrations
Use the scripts in the `database/` folder to initialize and update the schema:
```bash
psql -h localhost -U user -d db_name -f schema.sql
```

## Contribution
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/new-feature
   ```
3. Submit a pull request for review.

## License
MIT