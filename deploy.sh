#!/bin/bash

# Deploy script cho ProShop trên EC2
set -e

echo "🚀 Bắt đầu deploy ProShop..."

# Biến môi trường
PROJECT_DIR="/home/ubuntu/proshop-master"
NGINX_CONFIG="/etc/nginx/sites-available/proshop"
NGINX_ENABLED="/etc/nginx/sites-enabled/proshop"

# 1. Cập nhật code
echo "📥 Cập nhật code..."
cd $PROJECT_DIR
git pull origin main

# 2. Build frontend
echo "🏗️ Build frontend..."
cd $PROJECT_DIR/frontend
npm install
npm run build

# 3. Cài đặt backend dependencies
echo "📦 Cài đặt backend dependencies..."
cd $PROJECT_DIR/backend
npm install

# 4. Cấu hình nginx
echo "⚙️ Cấu hình nginx..."
sudo cp $PROJECT_DIR/nginx-config.conf $NGINX_CONFIG

# Enable site nếu chưa có
if [ ! -L $NGINX_ENABLED ]; then
    sudo ln -s $NGINX_CONFIG $NGINX_ENABLED
fi

# Remove default nginx site
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx config
sudo nginx -t

# 5. Restart services
echo "🔄 Restart services..."
sudo systemctl reload nginx

# Stop existing PM2 processes
pm2 stop all || true
pm2 delete all || true

# Start backend với PM2
cd $PROJECT_DIR/backend
pm2 start server.js --name "proshop-backend"
pm2 save
pm2 startup

echo "✅ Deploy hoàn thành!"
echo "🌐 Website có thể truy cập tại: http://your-domain.com"
echo "📊 Kiểm tra PM2: pm2 status"
echo "📋 Kiểm tra nginx: sudo systemctl status nginx"
