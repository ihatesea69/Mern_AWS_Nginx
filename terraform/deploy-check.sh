#!/bin/bash

# Script kiểm tra trạng thái deployment ProShop
# Sử dụng: ./deploy-check.sh <IP_ADDRESS>

if [ $# -eq 0 ]; then
    echo "❌ Vui lòng cung cấp IP address của EC2 instance"
    echo "Sử dụng: $0 <IP_ADDRESS>"
    exit 1
fi

IP_ADDRESS=$1
SSH_KEY="~/.ssh/proshop-key"

echo "🔍 Kiểm tra trạng thái deployment ProShop tại $IP_ADDRESS"
echo "=================================================="

# Kiểm tra kết nối SSH
echo "1. 🔐 Kiểm tra kết nối SSH..."
if ssh -i $SSH_KEY -o ConnectTimeout=10 -o StrictHostKeyChecking=no ubuntu@$IP_ADDRESS "echo 'SSH OK'" 2>/dev/null; then
    echo "   ✅ SSH connection: OK"
else
    echo "   ❌ SSH connection: FAILED"
    exit 1
fi

# Kiểm tra nginx
echo "2. 🌐 Kiểm tra nginx..."
NGINX_STATUS=$(ssh -i $SSH_KEY ubuntu@$IP_ADDRESS "sudo systemctl is-active nginx" 2>/dev/null)
if [ "$NGINX_STATUS" = "active" ]; then
    echo "   ✅ Nginx status: $NGINX_STATUS"
else
    echo "   ❌ Nginx status: $NGINX_STATUS"
fi

# Kiểm tra PM2
echo "3. ⚙️ Kiểm tra PM2..."
PM2_STATUS=$(ssh -i $SSH_KEY ubuntu@$IP_ADDRESS "pm2 jlist 2>/dev/null | jq -r '.[0].pm2_env.status' 2>/dev/null || echo 'not_found'")
if [ "$PM2_STATUS" = "online" ]; then
    echo "   ✅ PM2 backend status: $PM2_STATUS"
else
    echo "   ❌ PM2 backend status: $PM2_STATUS"
fi

# Kiểm tra MongoDB
echo "4. 🗄️ Kiểm tra MongoDB..."
MONGO_STATUS=$(ssh -i $SSH_KEY ubuntu@$IP_ADDRESS "sudo systemctl is-active mongod" 2>/dev/null)
if [ "$MONGO_STATUS" = "active" ]; then
    echo "   ✅ MongoDB status: $MONGO_STATUS"
else
    echo "   ❌ MongoDB status: $MONGO_STATUS"
fi

# Kiểm tra website
echo "5. 🌍 Kiểm tra website..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://$IP_ADDRESS --connect-timeout 10)
if [ "$HTTP_STATUS" = "200" ]; then
    echo "   ✅ Website HTTP status: $HTTP_STATUS"
else
    echo "   ❌ Website HTTP status: $HTTP_STATUS"
fi

# Kiểm tra API endpoint
echo "6. 🔌 Kiểm tra API endpoint..."
API_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://$IP_ADDRESS/api/products --connect-timeout 10)
if [ "$API_STATUS" = "200" ]; then
    echo "   ✅ API endpoint status: $API_STATUS"
else
    echo "   ❌ API endpoint status: $API_STATUS"
fi

echo ""
echo "=================================================="
echo "🔗 Website URL: http://$IP_ADDRESS"
echo "🔐 SSH Command: ssh -i $SSH_KEY ubuntu@$IP_ADDRESS"
echo ""

# Hiển thị logs nếu có lỗi
if [ "$NGINX_STATUS" != "active" ] || [ "$PM2_STATUS" != "online" ] || [ "$HTTP_STATUS" != "200" ]; then
    echo "❗ Có lỗi xảy ra. Kiểm tra logs:"
    echo "   - Deployment logs: ssh -i $SSH_KEY ubuntu@$IP_ADDRESS 'sudo tail -50 /var/log/user-data.log'"
    echo "   - PM2 logs: ssh -i $SSH_KEY ubuntu@$IP_ADDRESS 'pm2 logs'"
    echo "   - Nginx logs: ssh -i $SSH_KEY ubuntu@$IP_ADDRESS 'sudo tail -50 /var/log/nginx/error.log'"
fi
