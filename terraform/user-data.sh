#!/bin/bash

# ProShop Auto-Deployment Script for EC2
# This script will automatically set up the entire ProShop application

set -e
exec > >(tee /var/log/user-data.log) 2>&1

echo "🚀 Starting ProShop deployment..."

# Update system
echo "📦 Updating system packages..."
apt-get update -y
apt-get upgrade -y

# Install essential packages
echo "🔧 Installing essential packages..."
apt-get install -y curl wget git unzip software-properties-common

# Install Node.js 18.x
echo "📦 Installing Node.js 18.x..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Install nginx
echo "🌐 Installing nginx..."
apt-get install -y nginx

# Install PM2 globally
echo "⚙️ Installing PM2..."
npm install -g pm2

# Install MongoDB (for local development)
echo "🗄️ Installing MongoDB..."
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list
apt-get update -y
apt-get install -y mongodb-org

# Start and enable MongoDB
systemctl start mongod
systemctl enable mongod

# Create application directory
echo "📁 Setting up application directory..."
mkdir -p /home/ubuntu/proshop
cd /home/ubuntu/proshop

# Clone the repository
echo "📥 Cloning ProShop repository..."
git clone ${git_repo_url} .

# Set ownership
chown -R ubuntu:ubuntu /home/ubuntu/proshop

# Switch to ubuntu user for npm operations
sudo -u ubuntu bash << 'EOF'
cd /home/ubuntu/proshop

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Create .env file for backend
echo "⚙️ Creating backend .env file..."
cat > .env << 'ENVEOF'
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb://localhost:27017/proshop
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PAYPAL_CLIENT_ID=
ENVEOF

# Install frontend dependencies and build
echo "🏗️ Building frontend..."
cd ../frontend
npm install
npm run build

EOF

# Configure nginx
echo "🌐 Configuring nginx..."
cat > /etc/nginx/sites-available/proshop << 'NGINXEOF'
server {
    listen 80;
    server_name ${domain_name};

    # Serve static files from React build
    location / {
        root /home/ubuntu/proshop/frontend/build;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Proxy API requests to backend
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }

    # Serve uploaded images
    location /uploads/ {
        root /home/ubuntu/proshop;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
NGINXEOF

# Enable the site
ln -sf /etc/nginx/sites-available/proshop /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
nginx -t

# Start nginx
systemctl enable nginx
systemctl restart nginx

# Start the backend with PM2 as ubuntu user
sudo -u ubuntu bash << 'EOF'
cd /home/ubuntu/proshop/backend

# Start the application with PM2
pm2 start server.js --name "proshop-backend" --env production

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup systemd -u ubuntu --hp /home/ubuntu
EOF

# Execute the PM2 startup command that was generated
env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu

echo "✅ ProShop deployment completed successfully!"
echo "🌐 Application should be accessible at: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"
echo "📊 Check PM2 status: sudo -u ubuntu pm2 status"
echo "📋 Check nginx status: systemctl status nginx"
