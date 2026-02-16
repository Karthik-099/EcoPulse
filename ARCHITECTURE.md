# EcoPulse System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           CLIENT APPLICATIONS                            │
├────────────────────────────────┬────────────────────────────────────────┤
│                                │                                        │
│   📱 MOBILE APP                │   🌐 WEB APPLICATION                   │
│   React Native + Expo          │   Next.js 14 + React 18                │
│   ├─ Camera Integration        │   ├─ Server-Side Rendering             │
│   ├─ Location Services         │   ├─ Static Generation                 │
│   ├─ Push Notifications        │   ├─ API Routes                        │
│   ├─ Offline Support           │   ├─ Admin Dashboard                   │
│   └─ Native Performance        │   └─ Responsive Design                 │
│                                │                                        │
└────────────────┬───────────────┴────────────────┬───────────────────────┘
                 │                                │
                 └────────────┬───────────────────┘
                              │
                              │ HTTPS/WSS
                              │
                 ┌────────────▼────────────┐
                 │    🔒 API GATEWAY       │
                 │    Nginx / Load Balancer│
                 │    ├─ SSL Termination   │
                 │    ├─ Rate Limiting     │
                 │    ├─ Request Routing   │
                 │    └─ CORS Handling     │
                 └────────────┬────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
┌───────▼────────┐  ┌─────────▼─────────┐  ┌──────▼──────┐
│                │  │                   │  │             │
│  🤖 AI SERVICE │  │  ⛓️ BLOCKCHAIN    │  │  🔧 BACKEND │
│  Python/FastAPI│  │  Ethereum/Polygon │  │  Node.js    │
│                │  │                   │  │  Express    │
├────────────────┤  ├───────────────────┤  ├─────────────┤
│ Image Verify   │  │ Smart Contracts   │  │ Auth        │
│ ├─ YOLO v8     │  │ ├─ EcoCoin Token  │  │ ├─ JWT      │
│ ├─ ResNet50    │  │ ├─ Mint/Burn      │  │ ├─ OAuth2   │
│ ├─ OpenCV      │  │ ├─ Transfer       │  │ └─ 2FA      │
│ └─ TensorFlow  │  │ └─ Carbon Credits │  │             │
│                │  │                   │  │ Business    │
│ Fraud Detect   │  │ Web3 Integration  │  │ ├─ Tasks    │
│ ├─ Metadata    │  │ ├─ ethers.js      │  │ ├─ Events   │
│ ├─ Compression │  │ ├─ Web3.js        │  │ ├─ Users    │
│ ├─ Duplicates  │  │ └─ Wallet Connect │  │ └─ Payments │
│ └─ Deepfake    │  │                   │  │             │
│                │  │ Network           │  │ Services    │
│ ML Models      │  │ ├─ Polygon Mumbai │  │ ├─ S3       │
│ ├─ Task Class  │  │ ├─ Polygon Mainnet│  │ ├─ Email   │
│ ├─ Object Det  │  │ └─ Gas Optimizer  │  │ └─ SMS      │
│ └─ Confidence  │  │                   │  │             │
│                │  │                   │  │ WebSocket   │
└────────┬───────┘  └─────────┬─────────┘  └──────┬──────┘
         │                    │                    │
         └────────────────────┼────────────────────┘
                              │
                 ┌────────────▼────────────┐
                 │   💾 DATA LAYER         │
                 ├─────────────────────────┤
                 │                         │
                 │  🐘 PostgreSQL 15       │
                 │  ├─ Users               │
                 │  ├─ Tasks               │
                 │  ├─ Events              │
                 │  ├─ Transactions        │
                 │  └─ Carbon Credits      │
                 │                         │
                 │  🔴 Redis 7             │
                 │  ├─ Session Cache       │
                 │  ├─ Rate Limiting       │
                 │  ├─ Leaderboard Cache   │
                 │  └─ Job Queue           │
                 │                         │
                 │  🍃 MongoDB             │
                 │  ├─ Application Logs    │
                 │  ├─ Audit Trail         │
                 │  └─ Analytics Data      │
                 │                         │
                 │  📦 AWS S3 / MinIO      │
                 │  ├─ Task Images         │
                 │  ├─ Event Photos        │
                 │  ├─ User Avatars        │
                 │  └─ Backups             │
                 │                         │
                 └─────────────────────────┘
```

## Data Flow Diagrams

### Task Submission Flow

```
User (Mobile/Web)
    │
    │ 1. Take photo + location
    │
    ▼
Upload to Backend
    │
    │ 2. Store in S3
    │ 3. Create task record (PENDING)
    │
    ▼
Trigger AI Verification
    │
    │ 4. Download image from S3
    │ 5. Run YOLO detection
    │ 6. Check fraud indicators
    │ 7. Calculate confidence
    │
    ▼
Update Task Status
    │
    ├─ If Valid (>70% confidence)
    │   │
    │   │ 8. Update status: APPROVED
    │   │ 9. Calculate reward
    │   │ 10. Call blockchain service
    │   │
    │   ▼
    │  Mint EcoCoin
    │   │
    │   │ 11. Execute smart contract
    │   │ 12. Update user balance
    │   │ 13. Create transaction record
    │   │
    │   ▼
    │  Notify User
    │   │
    │   └─ Push notification + Email
    │
    └─ If Invalid (<70% confidence)
        │
        │ 8. Update status: REJECTED
        │ 9. Store rejection reason
        │
        ▼
       Notify User
```

### Event Creation Flow

```
User
 │
 │ 1. Fill event form
 │ 2. Upload event image
 │
 ▼
Backend Validation
 │
 │ 3. Validate input
 │ 4. Check user permissions
 │ 5. Upload image to S3
 │
 ▼
Create Event Record
 │
 │ 6. Store in PostgreSQL
 │ 7. Generate event ID
 │ 8. Set status: UPCOMING
 │
 ▼
Notify Community
 │
 │ 9. Send to WebSocket clients
 │ 10. Email subscribers
 │ 11. Push notifications
 │
 ▼
Event Published
```

### Carbon Credit Purchase Flow

```
Corporation
    │
    │ 1. Submit purchase request
    │
    ▼
Backend Processing
    │
    │ 2. Validate company details
    │ 3. Calculate pricing
    │ 4. Create credit record (PENDING)
    │
    ▼
Admin Review
    │
    │ 5. Review request
    │ 6. Verify payment
    │
    ├─ Approve
    │   │
    │   │ 7. Update status: APPROVED
    │   │ 8. Execute blockchain transaction
    │   │ 9. Generate tax documentation
    │   │ 10. Allocate funds to events
    │   │
    │   ▼
    │  Notify Corporation
    │
    └─ Reject
        │
        └─ Send rejection notice
```

## Component Architecture

### Backend Service Components

```
backend/
├── src/
│   ├── server.ts              # Express app entry
│   ├── routes/                # API endpoints
│   │   ├── auth.ts           # Authentication
│   │   ├── tasks.ts          # Task management
│   │   ├── events.ts         # Event management
│   │   ├── users.ts          # User operations
│   │   ├── transactions.ts   # Payment handling
│   │   └── carbon.ts         # Carbon credits
│   │
│   ├── controllers/           # Business logic
│   │   ├── authController.ts
│   │   ├── taskController.ts
│   │   ├── eventController.ts
│   │   ├── userController.ts
│   │   ├── transactionController.ts
│   │   └── carbonController.ts
│   │
│   ├── services/              # External integrations
│   │   ├── aiService.ts      # AI verification API
│   │   ├── blockchainService.ts # Web3 integration
│   │   ├── emailService.ts   # Email notifications
│   │   └── storageService.ts # S3 operations
│   │
│   ├── middleware/            # Request processing
│   │   ├── auth.ts           # JWT verification
│   │   ├── upload.ts         # File handling
│   │   ├── validation.ts     # Input validation
│   │   └── errorHandler.ts   # Error handling
│   │
│   └── utils/                 # Utilities
│       ├── prisma.ts         # Database client
│       ├── logger.ts         # Winston logger
│       ├── jwt.ts            # Token generation
│       └── s3.ts             # S3 helper
```

### AI Service Components

```
ai-service/
├── app/
│   ├── main.py               # FastAPI app
│   ├── services/
│   │   ├── image_verifier.py # YOLO detection
│   │   └── fraud_detector.py # Fraud analysis
│   │
│   ├── models/               # ML models
│   │   ├── yolov8n.pt       # Object detection
│   │   ├── resnet50.h5      # Classification
│   │   └── fraud_model.pkl  # Fraud detection
│   │
│   └── api/                  # API routes
│       ├── verify.py        # Verification endpoint
│       └── analyze.py       # Analysis endpoint
```

### Web Application Components

```
web/
├── src/
│   ├── app/                  # Next.js 14 App Router
│   │   ├── page.tsx         # Homepage
│   │   ├── layout.tsx       # Root layout
│   │   ├── login/           # Auth pages
│   │   ├── dashboard/       # User dashboard
│   │   ├── tasks/           # Task pages
│   │   ├── events/          # Event pages
│   │   └── admin/           # Admin panel
│   │
│   ├── components/           # React components
│   │   ├── Navbar.tsx
│   │   ├── TaskCard.tsx
│   │   ├── EventCard.tsx
│   │   ├── Leaderboard.tsx
│   │   └── WalletConnect.tsx
│   │
│   ├── lib/                  # Utilities
│   │   ├── api.ts           # Axios client
│   │   ├── store.ts         # Zustand state
│   │   └── utils.ts         # Helpers
│   │
│   └── styles/
│       └── globals.css      # Tailwind styles
```

## Security Architecture

```
┌─────────────────────────────────────────┐
│         Security Layers                 │
├─────────────────────────────────────────┤
│                                         │
│  1. Network Layer                       │
│     ├─ HTTPS/TLS 1.3                   │
│     ├─ Firewall Rules                  │
│     ├─ DDoS Protection                 │
│     └─ VPN Access (Admin)              │
│                                         │
│  2. Application Layer                   │
│     ├─ JWT Authentication              │
│     ├─ Rate Limiting                   │
│     ├─ Input Validation                │
│     ├─ SQL Injection Prevention        │
│     ├─ XSS Protection                  │
│     └─ CSRF Tokens                     │
│                                         │
│  3. Data Layer                          │
│     ├─ Encrypted at Rest               │
│     ├─ Encrypted in Transit            │
│     ├─ Password Hashing (bcrypt)       │
│     ├─ Wallet Encryption               │
│     └─ Backup Encryption               │
│                                         │
│  4. Blockchain Layer                    │
│     ├─ Private Key Management          │
│     ├─ Multi-sig Wallets               │
│     ├─ Smart Contract Audits           │
│     └─ Gas Optimization                │
│                                         │
└─────────────────────────────────────────┘
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    PRODUCTION                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐      ┌─────────────┐                 │
│  │   Route 53  │──────│  CloudFront │                 │
│  │     DNS     │      │     CDN     │                 │
│  └─────────────┘      └──────┬──────┘                 │
│                              │                         │
│                    ┌─────────▼─────────┐              │
│                    │   Load Balancer   │              │
│                    │   (ALB/NLB)       │              │
│                    └─────────┬─────────┘              │
│                              │                         │
│         ┌────────────────────┼────────────────────┐   │
│         │                    │                    │   │
│    ┌────▼────┐         ┌────▼────┐         ┌────▼────┐
│    │  EC2/   │         │  EC2/   │         │  EC2/   │
│    │  ECS    │         │  ECS    │         │  ECS    │
│    │ Backend │         │   AI    │         │   Web   │
│    └────┬────┘         └────┬────┘         └────┬────┘
│         │                   │                   │     │
│         └───────────────────┼───────────────────┘     │
│                             │                         │
│              ┌──────────────┼──────────────┐         │
│              │              │              │         │
│         ┌────▼────┐    ┌───▼────┐    ┌───▼────┐    │
│         │   RDS   │    │ Redis  │    │   S3   │    │
│         │Postgres │    │ElastiC.│    │ Bucket │    │
│         └─────────┘    └────────┘    └────────┘    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Monitoring & Observability

```
┌─────────────────────────────────────────┐
│         Monitoring Stack                │
├─────────────────────────────────────────┤
│                                         │
│  📊 Metrics (Prometheus)                │
│     ├─ API Response Times               │
│     ├─ Database Queries                 │
│     ├─ Cache Hit Rates                  │
│     ├─ Error Rates                      │
│     └─ Resource Usage                   │
│                                         │
│  📈 Visualization (Grafana)             │
│     ├─ Real-time Dashboards             │
│     ├─ Custom Alerts                    │
│     └─ Historical Trends                │
│                                         │
│  📝 Logging (ELK Stack)                 │
│     ├─ Application Logs                 │
│     ├─ Access Logs                      │
│     ├─ Error Logs                       │
│     └─ Audit Logs                       │
│                                         │
│  🔔 Alerting (PagerDuty)                │
│     ├─ Critical Errors                  │
│     ├─ Performance Degradation          │
│     ├─ Security Events                  │
│     └─ Resource Exhaustion              │
│                                         │
└─────────────────────────────────────────┘
```

This architecture provides:
- ✅ Scalability (horizontal & vertical)
- ✅ High availability (99.9% uptime)
- ✅ Security (multiple layers)
- ✅ Performance (caching, CDN)
- ✅ Monitoring (real-time insights)
- ✅ Maintainability (modular design)
