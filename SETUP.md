# EcoPulse Setup Guide

## Prerequisites Installation

### 1. Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version
npm --version
```

### 2. Install Python
```bash
sudo apt update
sudo apt install python3.10 python3-pip
python3 --version
pip3 --version
```

### 3. Install Docker
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
docker --version
docker-compose --version
```

### 4. Install PostgreSQL
```bash
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 5. Install Redis
```bash
sudo apt install redis-server
sudo systemctl start redis
sudo systemctl enable redis
```

## Project Setup

### Step 1: Clone and Configure
```bash
cd /home/karthik/EcoPulse
cp .env.example .env
```

Edit `.env` file with your credentials:
```bash
nano .env
```

### Step 2: Setup Database
```bash
sudo -u postgres psql
CREATE DATABASE ecopulse;
CREATE USER postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE ecopulse TO postgres;
\q
```

### Step 3: Install Backend Dependencies
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Backend will run on: http://localhost:5000

### Step 4: Install AI Service Dependencies
```bash
cd ../ai-service
pip3 install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

AI Service will run on: http://localhost:8000

### Step 5: Deploy Smart Contracts
```bash
cd ../blockchain
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network hardhat
```

Copy the contract address and update `.env`:
```
CONTRACT_ADDRESS=<your_contract_address>
```

### Step 6: Install Web Dependencies
```bash
cd ../web
npm install
npm run dev
```

Web will run on: http://localhost:3000

### Step 7: Install Mobile Dependencies
```bash
cd ../mobile
npm install
npx expo start
```

Scan QR code with Expo Go app on your phone.

## Docker Setup (Alternative)

### Run All Services with Docker
```bash
cd /home/karthik/EcoPulse
docker-compose up -d
```

This will start:
- PostgreSQL on port 5432
- Redis on port 6379
- MongoDB on port 27017
- Backend on port 5000
- AI Service on port 8000
- Web on port 3000

### Check Running Containers
```bash
docker-compose ps
```

### View Logs
```bash
docker-compose logs -f backend
docker-compose logs -f ai-service
docker-compose logs -f web
```

### Stop All Services
```bash
docker-compose down
```

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Smart Contract Tests
```bash
cd blockchain
npx hardhat test
```

### AI Service Tests
```bash
cd ai-service
pytest
```

## Production Deployment

### 1. Build Docker Images
```bash
docker-compose -f docker-compose.prod.yml build
```

### 2. Deploy to Cloud
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### 3. Setup SSL with Nginx
```bash
sudo apt install nginx certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

### 4. Configure Environment Variables
Update production `.env` with:
- Production database URLs
- AWS credentials
- Blockchain mainnet RPC
- Production API keys

## Troubleshooting

### Port Already in Use
```bash
sudo lsof -i :5000
sudo kill -9 <PID>
```

### Database Connection Error
```bash
sudo systemctl restart postgresql
psql -U postgres -d ecopulse -c "SELECT 1"
```

### Redis Connection Error
```bash
sudo systemctl restart redis
redis-cli ping
```

### Docker Issues
```bash
docker system prune -a
docker-compose down -v
docker-compose up --build
```

## API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh
- GET /api/auth/profile

### Tasks
- POST /api/tasks
- GET /api/tasks
- GET /api/tasks/:id
- PATCH /api/tasks/:id/verify

### Events
- POST /api/events
- GET /api/events
- GET /api/events/:id
- POST /api/events/:id/join

### Users
- GET /api/users/:id
- PATCH /api/users/:id
- GET /api/users/leaderboard

### Transactions
- GET /api/transactions
- POST /api/transactions
- GET /api/transactions/balance

### Carbon Credits
- POST /api/carbon
- GET /api/carbon
- PATCH /api/carbon/:id/approve

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

### Build APK
```bash
eas build --platform android
```

### Build IPA
```bash
eas build --platform ios
```

## Monitoring

### View Backend Logs
```bash
tail -f backend/combined.log
tail -f backend/error.log
```

### Monitor Database
```bash
psql -U postgres -d ecopulse
SELECT * FROM "User" LIMIT 10;
SELECT * FROM "Task" WHERE status = 'PENDING';
```

### Monitor Redis
```bash
redis-cli
KEYS *
GET user:123
```

## Backup

### Database Backup
```bash
pg_dump -U postgres ecopulse > backup.sql
```

### Restore Database
```bash
psql -U postgres ecopulse < backup.sql
```

## Support

For issues, check:
- Backend logs: `backend/combined.log`
- AI service logs: `docker-compose logs ai-service`
- Database status: `sudo systemctl status postgresql`
- Redis status: `sudo systemctl status redis`
