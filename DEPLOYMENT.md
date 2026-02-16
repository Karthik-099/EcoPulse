# EcoPulse Deployment Guide

## Quick Start (Development)

### Option 1: Manual Setup
```bash
cd /home/karthik/EcoPulse
./setup.sh
```

Then start each service in separate terminals:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - AI Service:**
```bash
cd ai-service
uvicorn app.main:app --reload
```

**Terminal 3 - Web:**
```bash
cd web
npm run dev
```

**Terminal 4 - Mobile:**
```bash
cd mobile
npx expo start
```

### Option 2: Docker (Recommended)
```bash
cd /home/karthik/EcoPulse
docker-compose up -d
```

Access:
- Web: http://localhost:3000
- API: http://localhost:5000
- AI Service: http://localhost:8000

## Production Deployment

### AWS Deployment

#### 1. Setup EC2 Instance
```bash
aws ec2 run-instances \
  --image-id ami-0c55b159cbfafe1f0 \
  --instance-type t3.medium \
  --key-name your-key \
  --security-groups ecopulse-sg
```

#### 2. Install Docker on EC2
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
sudo apt update
sudo apt install docker.io docker-compose
```

#### 3. Clone and Deploy
```bash
git clone https://github.com/yourusername/EcoPulse.git
cd EcoPulse
cp .env.example .env
nano .env
docker-compose -f docker-compose.prod.yml up -d
```

#### 4. Setup RDS (PostgreSQL)
```bash
aws rds create-db-instance \
  --db-instance-identifier ecopulse-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password yourpassword \
  --allocated-storage 20
```

Update `.env`:
```
DATABASE_URL=postgresql://admin:password@ecopulse-db.xxx.rds.amazonaws.com:5432/ecopulse
```

#### 5. Setup S3 for Media Storage
```bash
aws s3 mb s3://ecopulse-media
aws s3api put-bucket-cors --bucket ecopulse-media --cors-configuration file://cors.json
```

#### 6. Deploy Smart Contract to Polygon
```bash
cd blockchain
npx hardhat run scripts/deploy.js --network polygon
```

### Kubernetes Deployment

#### 1. Create Kubernetes Manifests
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ecopulse-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: ecopulse/backend:latest
        ports:
        - containerPort: 5000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: ecopulse-secrets
              key: database-url
```

#### 2. Deploy to Cluster
```bash
kubectl apply -f k8s/
kubectl get pods
kubectl get services
```

### Vercel Deployment (Web Only)

```bash
cd web
npm install -g vercel
vercel login
vercel --prod
```

### Heroku Deployment

#### Backend
```bash
cd backend
heroku create ecopulse-api
heroku addons:create heroku-postgresql:hobby-dev
heroku addons:create heroku-redis:hobby-dev
git push heroku main
```

#### Web
```bash
cd web
heroku create ecopulse-web
heroku config:set NEXT_PUBLIC_API_URL=https://ecopulse-api.herokuapp.com
git push heroku main
```

## Environment Configuration

### Development
```env
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ecopulse
REDIS_URL=redis://localhost:6379
JWT_SECRET=dev_secret_key
```

### Production
```env
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@prod-db.com:5432/ecopulse
REDIS_URL=redis://prod-redis.com:6379
JWT_SECRET=super_secure_production_key
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
BLOCKCHAIN_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/your-key
CONTRACT_ADDRESS=0x1234567890123456789012345678901234567890
```

## SSL/HTTPS Setup

### Using Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d ecopulse.com -d www.ecopulse.com
sudo certbot renew --dry-run
```

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name ecopulse.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name ecopulse.com;
    
    ssl_certificate /etc/letsencrypt/live/ecopulse.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ecopulse.com/privkey.pem;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    location /api {
        proxy_pass http://localhost:5000;
    }
}
```

## Database Migration

### Run Migrations
```bash
cd backend
npx prisma migrate deploy
```

### Seed Database
```bash
npx prisma db seed
```

## Monitoring Setup

### Prometheus
```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'ecopulse-backend'
    static_configs:
      - targets: ['localhost:5000']
```

### Grafana Dashboard
```bash
docker run -d -p 3001:3000 grafana/grafana
```

## Backup Strategy

### Automated Database Backup
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -U postgres ecopulse > /backups/ecopulse_$DATE.sql
aws s3 cp /backups/ecopulse_$DATE.sql s3://ecopulse-backups/
```

### Cron Job
```bash
crontab -e
0 2 * * * /path/to/backup.sh
```

## Scaling

### Horizontal Scaling
```bash
docker-compose up --scale backend=3 --scale ai-service=2
```

### Load Balancer
```nginx
upstream backend {
    server backend1:5000;
    server backend2:5000;
    server backend3:5000;
}
```

## Security Checklist

- [ ] Change all default passwords
- [ ] Enable HTTPS/SSL
- [ ] Configure firewall rules
- [ ] Set up rate limiting
- [ ] Enable CORS properly
- [ ] Use environment variables for secrets
- [ ] Enable database encryption
- [ ] Set up WAF (Web Application Firewall)
- [ ] Configure security headers
- [ ] Enable audit logging
- [ ] Set up intrusion detection
- [ ] Regular security updates

## Performance Optimization

### Redis Caching
```typescript
import { createClient } from 'redis';
const redis = createClient();

app.get('/api/leaderboard', async (req, res) => {
  const cached = await redis.get('leaderboard');
  if (cached) return res.json(JSON.parse(cached));
  
  const data = await getLeaderboard();
  await redis.setEx('leaderboard', 300, JSON.stringify(data));
  res.json(data);
});
```

### CDN Setup
```bash
aws cloudfront create-distribution \
  --origin-domain-name ecopulse.com \
  --default-root-object index.html
```

## Troubleshooting

### Check Service Status
```bash
docker-compose ps
systemctl status postgresql
systemctl status redis
```

### View Logs
```bash
docker-compose logs -f backend
tail -f backend/combined.log
journalctl -u nginx -f
```

### Database Connection Issues
```bash
psql -U postgres -h localhost -d ecopulse
SELECT * FROM pg_stat_activity;
```

### Memory Issues
```bash
free -h
docker stats
htop
```

## CI/CD Pipeline

### GitHub Actions
```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to production
        run: |
          ssh user@server 'cd /app && git pull && docker-compose up -d --build'
```

## Health Checks

### Backend
```bash
curl http://localhost:5000/health
```

### AI Service
```bash
curl http://localhost:8000/health
```

### Database
```bash
pg_isready -h localhost -p 5432
```

## Rollback Strategy

```bash
docker-compose down
git checkout previous-commit
docker-compose up -d --build
```
