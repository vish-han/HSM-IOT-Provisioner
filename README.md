
## Project Overview

**HSM-IoT Provisioner** is a secure, scalable device provisioning system designed to assign unique, cryptographic identities to IoT devices produced in untrusted manufacturing environments. The provisioning process enables each device to prove its ownership and legitimzacy using certificates signed by a Hardware Security Module (HSM). The system consists of three main components:

- **House-Side Provisioning Service**: A secure backend running on-premise, controlling cryptographic operations via HSM and managing the trust root.
- **Client-Side Provisioning Web App**: User-friendly interface for operators at the manufacturing site to provision devices securely.
- **Admin \& Auditing Dashboard**: Internal tool for administrators to monitor provisioning activities, audit trails, and system health.

***

## Key Features

- **Provable Identity**: Generates device certificates signed by the HSM to enable strong, cryptographic identity proof.
- **Concurrency Handling**: Manages multiple concurrent provisioning requests while respecting the sequential processing limitation of the HSM using a queue system.
- **Secure Architecture**: Private keys remain securely on devices. Backend only processes public keys and certificates.
- **Network Constraints Addressed**: Client-initiated communication fits environments without static IP or inbound connections.
- **Modular \& Extensible Design**: Hardware abstraction layer allows seamless swapping between MockHSM (for development) and ProductionHSM.
- **Robust Authentication**: Secure JWT-based authentication with hashed passwords, session management, role-based access control, and audit logging.
- **Comprehensive Audit Trails**: Logs every provisioning and administrative event for accountability and compliance.
- **Modern Tech Stack**: Built with Node.js, TypeScript, React, PostgreSQL, and Redis.

***

## Tech Stack

- **Backend**: Node.js, TypeScript, Express.js, PostgreSQL, Redis (for sessions and queue management)
- **Frontend**: React.js with TypeScript
- **Security**: Bcrypt for password hashing, JWT for authentication, CORS, audit logging
- **Cryptography**: Hardware Security Module (HSM) abstraction with mock and production implementations
- **DevOps \& Tools**: dotenv for configuration, Winston for logging, Jest for testing (optional)

***

## System Architecture

1. **Device generates its own key pair locally** and never shares the private key.
2. **Client app sends device’s public key and serial number** to the House-Side Provisioning Service.
3. **House-side service queues provisioning requests**, serially handling HSM operations without blocking concurrent client requests.
4. **HSM signs device certificates**, creating provable identity tokens.
5. **Provisioning service stores device info and audit logs** securely in PostgreSQL.
6. **Admin dashboard provides visibility** into all provisioning activities with secure login.
7. **All communication is secured and authenticated**, with roles controlling access.

***

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- PostgreSQL 12.x or higher
- Redis 6.x or higher
- `npm` or `yarn` package manager

***

### Setup and Installation

1. **Clone the repository**
```bash
git clone <repository_url>
cd device-provisioning-system
```

2. **Backend setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your environment-specific values (database credentials, JWT secrets etc.)
```

3. **Database**

- Create a PostgreSQL database:

```bash
psql -U postgres
CREATE DATABASE device_provisioning;
\q
```

- Run migrations to create tables:

```bash
npm run migrate
```

4. **Redis**

- Start Redis server locally or configure connection in `.env`

5. **Start Backend Server**
```bash
npm run dev
```

6. **Client Apps**

- Setup and start Client and Admin frontends similarly by installing dependencies and running start commands in their respective folders (`client-app` and `admin-dashboard`).

***

## Usage

- Access the Client-Side Web App to provision new devices.
- Use the Admin Dashboard to login, monitor provisioning requests, and audit device statuses.
- API endpoints documented in `/docs/api.md` provide detailed info for all backend services.

***

## Security Notes

- Private keys never leave the device; certification happens with HSM-signed certificates.
- JWT-based authentication enforces secure and role-based API access.
- All sensitive operations logged for traceability.
- Network design avoids exposing the House-Side service directly to the internet.

***

## Directory Structure Summary

```
backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── services/
│   ├── middleware/
│   ├── routes/
│   ├── config/
│   └── utils/
migrations/
client-app/
admin-dashboard/
docs/
```


***

## Contribution \& Customization

- Easily swap `MockHSM` with real `ProductionHSM` implementation for live HSM hardware.
- Add Redis-backed queue by replacing the in-memory queue for better scalability.
- Extend admin dashboard for enhanced monitoring and management.
- Improve client app UX with real-time updates.

***

## Contact

For questions or support, please reach out via provided project contacts or email addresses associated with your submission.

***

This README provides a comprehensive yet concise overview of your secure device provisioning system project, covering architecture, features, tech stack, setup, and usage. You can adapt and expand it as needed when submitting or sharing your project.

