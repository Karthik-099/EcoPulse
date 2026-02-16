#!/bin/bash

echo "🌱 EcoPulse Quick Start Script"
echo "================================"

echo "📦 Installing Backend Dependencies..."
cd backend
npm install
npx prisma generate

echo "🐍 Installing AI Service Dependencies..."
cd ../ai-service
pip3 install -r requirements.txt

echo "⛓️ Installing Blockchain Dependencies..."
cd ../blockchain
npm install

echo "🌐 Installing Web Dependencies..."
cd ../web
npm install

echo "📱 Installing Mobile Dependencies..."
cd ../mobile
npm install

echo "✅ All dependencies installed!"
echo ""
echo "🚀 To start the services:"
echo "1. Backend: cd backend && npm run dev"
echo "2. AI Service: cd ai-service && uvicorn app.main:app --reload"
echo "3. Web: cd web && npm run dev"
echo "4. Mobile: cd mobile && npx expo start"
echo ""
echo "Or use Docker: docker-compose up -d"
