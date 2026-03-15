# Software Requirements Specification - Phase 2

## Tech2High Bootcamp Portal

### 1. Introduction

**Project**: Tech2High Data Analysis Bootcamp Portal  
**Version**: 2.0  
**Purpose**: Extends Phase 1 with payments, legal agreements, messaging, and iPhone application.

---

### 2. Scope

Phase 2 adds:
- Payment processing via **Square SDK**
- Legal document signing via **BoldSign APIs**
- In-platform messaging system
- **iPhone (iOS) application** built with React Native (Expo)
- Push notifications for mobile

---

### 3. Functional Requirements

#### 3.1 Payment Integration (Square SDK)
- FR-6.1: Students shall make payments toward course fees via Square.
- FR-6.2: Payment history (amount, date, status) shall be visible to students and admins.
- FR-6.3: Admins shall view total revenue and payment summaries per batch.
- FR-6.4: Payment status values: `pending`, `completed`, `failed`, `refunded`.
- FR-6.5: The system shall store Square payment IDs for reconciliation.

#### 3.2 Legal Document Agreements (BoldSign)
- FR-7.1: Admins shall send legal agreement documents to students via BoldSign API.
- FR-7.2: Students shall receive notifications when a document requires their signature.
- FR-7.3: Students shall sign documents within the portal or mobile app (via BoldSign embedded signing).
- FR-7.4: Signed document status shall be tracked (`pending`, `sent`, `signed`, `declined`).

#### 3.3 Messaging System
- FR-8.1: Students and admins shall send and receive messages within the platform.
- FR-8.2: Each message shall show sender, content, and timestamp.
- FR-8.3: Unread message counts shall be visible on dashboards.
- FR-8.4: Message history shall be persisted in the database.

#### 3.4 iPhone Application (React Native / Expo)
- FR-9.1: The iOS app shall authenticate students using the same JWT backend.
- FR-9.2: Students shall view their lessons and progress from the mobile app.
- FR-9.3: Students shall submit payments via Square SDK in-app.
- FR-9.4: Students shall sign legal documents via BoldSign in-app.
- FR-9.5: Students shall send and receive messages from the mobile app.
- FR-9.6: The app shall send push notifications for new messages and agreement requests.
- FR-9.7: Auth tokens shall be securely stored using `expo-secure-store`.

---

### 4. Non-Functional Requirements

- NFR-6: The iOS app shall be optimized for iPhone screen sizes.
- NFR-7: Push notifications shall be delivered within 30 seconds of the triggering event.
- NFR-8: Payment data shall be handled in compliance with PCI-DSS via Square.
- NFR-9: Legal document storage shall comply with applicable e-signature laws.
- NFR-10: The backend API shall be shared between web and mobile platforms.

---

### 5. Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Mobile       | React Native (Expo), TypeScript     |
| Payments     | Square Web Payments SDK             |
| Agreements   | BoldSign API                        |
| Notifications| Expo Notifications, APNs (iOS)      |
| Secure Store | expo-secure-store                   |
| Backend (shared) | Node.js 20, NestJS 10, PostgreSQL |
