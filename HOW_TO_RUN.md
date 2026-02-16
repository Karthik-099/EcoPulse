# 🚀 HOW TO RUN ECOPULSE

## ⚡ FASTEST WAY (Docker - 1 Command)

```bash
cd /home/karthik/EcoPulse
docker-compose up -d
```

**That's it!** Access:
- 🌐 Website: http://localhost:3000
- 🔧 API: http://localhost:5000
- 🤖 AI Service: http://localhost:8000

---

## 🛠️ MANUAL WAY (For Development)

### Step 1: Install Dependencies

```bash
cd /home/karthik/EcoPulse

# Backend
cd backend
npm install

# AI Service
cd ../ai-service
pip3 install -r requirements.txt

# Blockchain
cd ../blockchain
npm install

# Web
cd ../web
npm install

# Mobile
cd ../mobile
npm install
```

### Step 2: Setup Database

```bash
# Start PostgreSQL
sudo systemctl start postgresql

# Create database
sudo -u postgres psql -c "CREATE DATABASE ecopulse;"

# Run migrations
cd /home/karthik/EcoPulse/backend
npx prisma generate
npx prisma migrate dev
```

### Step 3: Start Services (Open 4 Terminals)

**Terminal 1 - Backend:**
```bash
cd /home/karthik/EcoPulse/backend
npm run dev
```
✅ Running on http://localhost:5000

**Terminal 2 - AI Service:**
```bash
cd /home/karthik/EcoPulse/ai-service
uvicorn app.main:app --reload
```
✅ Running on http://localhost:8000

**Terminal 3 - Web:**
```bash
cd /home/karthik/EcoPulse/web
npm run dev
```
✅ Running on http://localhost:3000

**Terminal 4 - Mobile (Optional):**
```bash
cd /home/karthik/EcoPulse/mobile
npx expo start
```
✅ Scan QR code with Expo Go app

---

## 📱 MOBILE APP

### iOS
```bash
cd /home/karthik/EcoPulse/mobile
npx expo run:ios
```

### Android
```bash
cd /home/karthik/EcoPulse/mobile
npx expo run:android
```

---

## ⛓️ DEPLOY SMART CONTRACT

```bash
cd /home/karthik/EcoPulse/blockchain
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network hardhat
```

Copy the contract address and update `.env`:
```
CONTRACT_ADDRESS=<your_contract_address>
```

---

## 🧪 TEST THE PLATFORM

### 1. Open Website
```bash
http://localhost:3000
```

### 2. Register User
- Click "Sign Up"
- Enter email, username, password
- Click "Register"

### 3. Submit Task
- Login to dashboard
- Click "Submit Task"
- Upload photo
- Select task type
- Submit

### 4. Check AI Verification
- Task will be automatically verified by AI
- Coins will be added to your balance

---

## 🔧 TROUBLESHOOTING

### Port Already in Use
```bash
# Find process
sudo lsof -i :5000

# Kill process
sudo kill -9 <PID>
```

### Database Connection Error
```bash
# Restart PostgreSQL
sudo systemctl restart postgresql

# Check status
sudo systemctl status postgresql
```

### Docker Issues
```bash
# Stop all containers
docker-compose down

# Remove all containers
docker-compose down -v

# Rebuild and start
docker-compose up --build
```

### Redis Not Running
```bash
# Start Redis
sudo systemctl start redis

# Check status
redis-cli ping
```

---

## 📊 CHECK IF SERVICES ARE RUNNING

```bash
# Backend health
curl http://localhost:5000/health

# AI Service health
curl http://localhost:8000/health

# Check Docker containers
docker-compose ps

# Check logs
docker-compose logs -f backend
```

---

## 🎯 QUICK TEST API

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@ecopulse.com",
    "username": "testuser",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@ecopulse.com",
    "password": "password123"
  }'
```

### Get Leaderboard
```bash
curl http://localhost:5000/api/users/leaderboard
```

---

## 🌟 RECOMMENDED: USE DOCKER

Docker is the easiest way:

```bash
cd /home/karthik/EcoPulse
docker-compose up -d
```

This starts:
- ✅ PostgreSQL database
- ✅ Redis cache
- ✅ MongoDB logs
- ✅ Backend API
- ✅ AI Service
- ✅ Web Application

All configured and connected automatically!

---

## 📚 MORE HELP

- **Setup Issues**: Read `SETUP.md`
- **API Documentation**: Read `API.md`
- **Deployment**: Read `DEPLOYMENT.md`
- **Quick Start**: Read `QUICKSTART.md`

---

## ✅ YOU'RE READY!

Choose your method:
1. **Docker** (Recommended): `docker-compose up -d`
2. **Manual**: Follow Step 1-3 above

Then open http://localhost:3000 and start using EcoPulse! 🌱
