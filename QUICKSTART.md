# 🌱 EcoPulse - Complete Production Platform

## What Has Been Built

A complete, production-ready blockchain-powered eco-rewards platform with:

### ✅ Backend API (Node.js + Express + TypeScript)
- User authentication with JWT
- Task management with AI verification
- Event creation and management
- Transaction handling
- Carbon credit marketplace
- Real-time WebSocket support
- PostgreSQL database with Prisma ORM
- Redis caching
- AWS S3 integration

### ✅ AI Verification Service (Python + FastAPI)
- Image verification using YOLO v8
- Fraud detection system
- Task authenticity validation
- Object detection for eco-tasks
- Confidence scoring

### ✅ Smart Contracts (Solidity + Hardhat)
- ERC20 EcoCoin token
- Reward distribution system
- Carbon credit purchasing
- Verified user management
- Pausable functionality

### ✅ Web Application (Next.js 14 + React + TypeScript)
- Modern responsive design
- User dashboard
- Task submission interface
- Event browsing and joining
- Leaderboard
- Transaction history
- Wallet integration

### ✅ Mobile App (React Native + Expo)
- Cross-platform (iOS & Android)
- Camera integration for task proof
- Location services
- Push notifications
- Native performance

## 🚀 How to Run

### Quick Start (Easiest)

```bash
cd /home/karthik/EcoPulse

# Install all dependencies
./setup.sh

# Start with Docker (recommended)
docker-compose up -d

# Access the platform
# Web: http://localhost:3000
# API: http://localhost:5000
# AI: http://localhost:8000
```

### Manual Start (Development)

**Terminal 1 - Backend:**
```bash
cd /home/karthik/EcoPulse/backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```
✅ Backend running on http://localhost:5000

**Terminal 2 - AI Service:**
```bash
cd /home/karthik/EcoPulse/ai-service
pip3 install -r requirements.txt
uvicorn app.main:app --reload
```
✅ AI Service running on http://localhost:8000

**Terminal 3 - Blockchain:**
```bash
cd /home/karthik/EcoPulse/blockchain
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network hardhat
```
✅ Smart contracts deployed

**Terminal 4 - Web:**
```bash
cd /home/karthik/EcoPulse/web
npm install
npm run dev
```
✅ Web app running on http://localhost:3000

**Terminal 5 - Mobile:**
```bash
cd /home/karthik/EcoPulse/mobile
npm install
npx expo start
```
✅ Scan QR code with Expo Go app

## 📱 Testing the Platform

### 1. Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@ecopulse.com",
    "username": "ecowarrior",
    "password": "securepass123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@ecopulse.com",
    "password": "securepass123"
  }'
```

### 3. Submit a Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "proof=@tree.jpg" \
  -F "type=PLANT_TREE" \
  -F "title=Planted Oak Tree" \
  -F "latitude=40.7829" \
  -F "longitude=-73.9654"
```

### 4. View Leaderboard
```bash
curl http://localhost:5000/api/users/leaderboard
```

## 🌐 Web Interface

Open http://localhost:3000 and:

1. **Homepage** - View platform features and stats
2. **Register** - Create new account
3. **Login** - Access your dashboard
4. **Dashboard** - View your coins, score, and tasks
5. **Tasks** - Submit new eco-tasks
6. **Events** - Browse and join community events
7. **Leaderboard** - See top eco-warriors

## 📱 Mobile App

1. Install Expo Go on your phone
2. Run `npx expo start` in mobile directory
3. Scan QR code
4. Use camera to submit tasks
5. Track your rewards

## 🔑 Key Features Implemented

### User Features
- ✅ Registration and authentication
- ✅ Profile management
- ✅ Task submission with photo proof
- ✅ AI-powered verification
- ✅ EcoCoin rewards
- ✅ Event creation and participation
- ✅ Leaderboard rankings
- ✅ Transaction history
- ✅ Wallet integration

### Admin Features
- ✅ Manual task verification
- ✅ Event moderation
- ✅ User management
- ✅ Carbon credit approval
- ✅ Analytics dashboard

### Corporate Features
- ✅ Carbon credit purchase
- ✅ Event sponsorship
- ✅ Impact reporting

## 🗂️ Project Structure

```
EcoPulse/
├── backend/          # Node.js API (Port 5000)
├── ai-service/       # Python AI (Port 8000)
├── blockchain/       # Smart Contracts
├── web/             # Next.js Web (Port 3000)
├── mobile/          # React Native App
├── README.md        # Main documentation
├── SETUP.md         # Setup instructions
├── API.md           # API documentation
├── DEPLOYMENT.md    # Deployment guide
└── docker-compose.yml
```

## 📊 Database Schema

- **Users** - Authentication, wallet, scores
- **Tasks** - Eco-tasks with AI verification
- **Events** - Community events
- **Transactions** - EcoCoin transfers
- **CarbonCredits** - Corporate purchases

## 🔐 Security Features

- JWT authentication with refresh tokens
- Password hashing with bcrypt
- Rate limiting (100 req/15min)
- Input validation
- SQL injection prevention
- XSS protection
- CORS configuration
- Encrypted wallet storage

## 🤖 AI Verification

The AI service verifies:
- Tree planting (detects trees, plants, person)
- Beach cleanup (detects trash, bags, beach)
- Public transport (detects bus, train)
- Recycling (detects bottles, bins)
- Fraud detection (checks image authenticity)

## ⛓️ Blockchain Integration

- ERC20 EcoCoin token on Polygon
- Automated reward distribution
- Carbon credit tracking
- Transparent transactions
- Low gas fees

## 📈 Monitoring

```bash
# Check service health
curl http://localhost:5000/health
curl http://localhost:8000/health

# View logs
docker-compose logs -f backend
docker-compose logs -f ai-service

# Database status
docker-compose exec postgres psql -U postgres -d ecopulse -c "SELECT COUNT(*) FROM \"User\";"
```

## 🐛 Troubleshooting

### Port already in use
```bash
sudo lsof -i :5000
sudo kill -9 <PID>
```

### Docker issues
```bash
docker-compose down -v
docker system prune -a
docker-compose up --build
```

### Database connection error
```bash
docker-compose restart postgres
```

## 📚 Documentation

- **README.md** - Overview and architecture
- **SETUP.md** - Detailed setup guide
- **API.md** - Complete API documentation
- **DEPLOYMENT.md** - Production deployment

## 🚀 Next Steps

1. **Configure Environment**
   ```bash
   cp .env.example .env
   nano .env
   ```

2. **Start Services**
   ```bash
   docker-compose up -d
   ```

3. **Deploy Smart Contract**
   ```bash
   cd blockchain
   npx hardhat run scripts/deploy.js --network polygon-mumbai
   ```

4. **Access Platform**
   - Web: http://localhost:3000
   - API: http://localhost:5000/api
   - Docs: http://localhost:5000/health

## 💡 Usage Examples

### Submit Tree Planting Task
1. Open mobile app
2. Take photo of planted tree
3. Add location and description
4. Submit for AI verification
5. Receive EcoCoin reward

### Create Community Event
1. Login to web dashboard
2. Click "Create Event"
3. Add details, date, location
4. Set participant limit and rewards
5. Publish event

### Purchase Carbon Credits (Corporate)
1. Visit /corporate page
2. Enter company details
3. Select credit amount
4. Make payment
5. Receive tax documentation

## 🎯 Production Checklist

- [ ] Update .env with production values
- [ ] Deploy smart contract to Polygon mainnet
- [ ] Configure AWS S3 for media storage
- [ ] Setup PostgreSQL on RDS
- [ ] Configure Redis cache
- [ ] Enable SSL/HTTPS
- [ ] Setup monitoring (Prometheus/Grafana)
- [ ] Configure backup strategy
- [ ] Setup CI/CD pipeline
- [ ] Load testing
- [ ] Security audit

## 📞 Support

For issues or questions:
1. Check logs: `docker-compose logs -f`
2. Review API.md for endpoint details
3. Check SETUP.md for configuration
4. Review DEPLOYMENT.md for production

## 🎉 You're Ready!

Your complete EcoPulse platform is ready to run. Start with:

```bash
cd /home/karthik/EcoPulse
docker-compose up -d
```

Then open http://localhost:3000 in your browser!
