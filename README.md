# EcoPulse

A blockchain-powered platform that rewards eco-friendly actions with EcoCoin cryptocurrency, featuring AI-verified tasks, community events, and corporate carbon credit marketplace.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
├──────────────────────────┬──────────────────────────────────────┤
│   Mobile App (React Native)   │   Web App (Next.js + React)    │
│   - iOS & Android              │   - Responsive Design           │
│   - Camera Integration         │   - Admin Dashboard             │
│   - Push Notifications         │   - Event Management            │
└──────────────┬───────────────────────────────┬──────────────────┘
               │                               │
               └───────────────┬───────────────┘
                               │
                    ┌──────────▼──────────┐
                    │    API GATEWAY      │
                    │   (Node.js/Express) │
                    └──────────┬──────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
┌───────▼────────┐  ┌─────────▼─────────┐  ┌────────▼────────┐
│  AI SERVICE    │  │  BLOCKCHAIN NODE  │  │  CORE BACKEND   │
│  (Python/      │  │  (Ethereum/       │  │  (Node.js)      │
│   FastAPI)     │  │   Polygon)        │  │                 │
│                │  │                   │  │                 │
│ - Image Verify │  │ - Smart Contract  │  │ - User Auth     │
│ - Fraud Detect │  │ - EcoCoin Token   │  │ - Task Mgmt     │
│ - ML Models    │  │ - Transactions    │  │ - Event Mgmt    │
└────────┬───────┘  └─────────┬─────────┘  └────────┬────────┘
         │                    │                      │
         └────────────────────┼──────────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │   DATABASE LAYER   │
                    ├────────────────────┤
                    │ PostgreSQL (Main)  │
                    │ Redis (Cache)      │
                    │ MongoDB (Logs)     │
                    │ S3 (Media Storage) │
                    └────────────────────┘
```

## Tech Stack

### Frontend
- Web: Next.js 14, React 18, TypeScript, TailwindCSS, Framer Motion
- Mobile: React Native, Expo, TypeScript, NativeWind

### Backend
- API: Node.js, Express, TypeScript
- AI Service: Python, FastAPI, TensorFlow, OpenCV
- Authentication: JWT, OAuth2, Passport.js

### Blockchain
- Network: Polygon (Layer 2 Ethereum)
- Smart Contracts: Solidity, Hardhat
- Web3: ethers.js, Web3.js

### Database
- Primary: PostgreSQL 15
- Cache: Redis 7
- Logs: MongoDB
- Storage: AWS S3 / MinIO

### DevOps
- Containerization: Docker, Docker Compose
- Orchestration: Kubernetes (Production)
- CI/CD: GitHub Actions
- Monitoring: Prometheus, Grafana

## Project Structure

```
EcoPulse/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── utils/
│   ├── Dockerfile
│   └── package.json
├── ai-service/
│   ├── app/
│   │   ├── models/
│   │   ├── services/
│   │   └── api/
│   ├── Dockerfile
│   └── requirements.txt
├── blockchain/
│   ├── contracts/
│   ├── scripts/
│   ├── test/
│   └── hardhat.config.js
├── web/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── styles/
│   ├── Dockerfile
│   └── package.json
├── mobile/
│   ├── src/
│   │   ├── screens/
│   │   ├── components/
│   │   ├── navigation/
│   │   └── services/
│   └── package.json
├── docker-compose.yml
└── README.md
```

## Prerequisites

- Node.js 18+
- Python 3.10+
- Docker & Docker Compose
- PostgreSQL 15
- Redis 7
- Expo CLI (for mobile)

## Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/EcoPulse.git
cd EcoPulse
```

### 2. Environment Setup
```bash
cp .env.example .env
```

### 3. Start All Services (Docker)
```bash
docker-compose up -d
```

### 4. Deploy Smart Contracts
```bash
cd blockchain
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network polygon-mumbai
```

### 5. Run Backend
```bash
cd backend
npm install
npm run dev
```

### 6. Run AI Service
```bash
cd ai-service
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### 7. Run Web App
```bash
cd web
npm install
npm run dev
```

### 8. Run Mobile App
```bash
cd mobile
npm install
npx expo start
```

## Access Points

- Web App: http://localhost:3000
- API: http://localhost:5000
- AI Service: http://localhost:8000
- Admin Dashboard: http://localhost:3000/admin

## Mobile App Setup

### iOS
```bash
cd mobile
npx expo run:ios
```

### Android
```bash
cd mobile
npx expo run:android
```

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:pass@localhost:5432/ecopulse
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY=your_aws_key
AWS_SECRET_KEY=your_aws_secret
BLOCKCHAIN_RPC_URL=https://polygon-mumbai.g.alchemy.com/v2/your-key
CONTRACT_ADDRESS=0x...
```

### AI Service (.env)
```
MODEL_PATH=./models
CONFIDENCE_THRESHOLD=0.85
MAX_IMAGE_SIZE=10485760
```

## Testing

```bash
npm run test
npm run test:e2e
cd ai-service && pytest
```

## Production Deployment

### Docker Build
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Kubernetes
```bash
kubectl apply -f k8s/
```

## Key Features

### User Features
- AI-verified eco-task completion
- EcoCoin rewards & wallet
- Community event creation/joining
- Real-time leaderboards
- Social sharing & profiles
- Bill payments with EcoCoin

### Corporate Features
- Carbon credit marketplace
- Event sponsorship
- Impact analytics dashboard
- Tax documentation

### Admin Features
- User management
- Task approval system
- Event moderation
- Analytics & reporting
- Token economics control

## AI Verification System

The AI service uses multiple models:
- Image Classification: ResNet50 (Task type detection)
- Object Detection: YOLO v8 (Tree, trash, vehicle detection)
- Fraud Detection: Custom CNN (Fake image detection)
- Face Verification: FaceNet (User identity)
- Geolocation: EXIF data validation

## Smart Contract Functions

```solidity
- mint(address to, uint256 amount)
- transfer(address to, uint256 amount)
- rewardUser(address user, uint256 amount)
- burnForPayment(uint256 amount)
- getCarbonCredits(address company)
```

## Database Schema

### Users
- id, email, password_hash, wallet_address, eco_score, created_at

### Tasks
- id, user_id, type, proof_url, status, coins_earned, verified_at

### Events
- id, creator_id, title, description, date, location, participants, budget

### Transactions
- id, from_wallet, to_wallet, amount, type, timestamp

## Security

- JWT authentication with refresh tokens
- Rate limiting (100 req/min)
- Input validation & sanitization
- SQL injection prevention
- XSS protection
- CORS configuration
- Encrypted wallet storage
- 2FA support

## Monitoring

- Logs: Centralized logging with Winston
- Metrics: Prometheus + Grafana
- Alerts: PagerDuty integration
- APM: New Relic / DataDog

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

## License

MIT License - see LICENSE file

## Team

- Backend: Node.js + PostgreSQL
- AI/ML: Python + TensorFlow
- Blockchain: Solidity + Hardhat
- Frontend: React + Next.js
- Mobile: React Native + Expo

## Support

- Email: support@ecopulse.io
- Discord: discord.gg/ecopulse
- Docs: docs.ecopulse.io

## Roadmap

- [x] Phase 1: Core platform & AI verification
- [x] Phase 2: Mobile app launch
- [ ] Phase 3: Corporate marketplace
- [ ] Phase 4: Multi-chain support
- [ ] Phase 5: DAO governance
