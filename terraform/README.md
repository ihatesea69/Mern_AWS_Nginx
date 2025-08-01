# ProShop AWS Deployment với Terraform

Bộ file Terraform này sẽ tự động deploy dự án ProShop (React + Node.js) lên AWS EC2 với nginx.

## 🚀 Chuẩn bị

### 1. Cài đặt Terraform
```bash
# macOS
brew install terraform

# Ubuntu/Debian
wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform
```

### 2. Cấu hình AWS CLI
```bash
aws configure
# Nhập AWS Access Key ID, Secret Access Key, Region
```

### 3. Tạo SSH Key Pair
```bash
ssh-keygen -t rsa -b 4096 -f ~/.ssh/proshop-key
```

## 📋 Cách sử dụng

### 1. Clone và chuẩn bị
```bash
git clone <your-proshop-repo>
cd proshop/terraform
```

### 2. Cấu hình biến môi trường
```bash
cp terraform.tfvars.example terraform.tfvars
# Chỉnh sửa terraform.tfvars với thông tin của bạn
```

### 3. Deploy
```bash
# Khởi tạo Terraform
terraform init

# Xem plan
terraform plan

# Deploy
terraform apply
```

### 4. Kiểm tra deployment
Sau khi terraform apply hoàn thành:
- Website sẽ có sẵn tại IP được hiển thị
- SSH vào server để kiểm tra: `ssh -i ~/.ssh/proshop-key ubuntu@<IP>`
- Kiểm tra PM2: `pm2 status`
- Kiểm tra nginx: `sudo systemctl status nginx`

## 🔧 Cấu trúc Infrastructure

- **VPC**: Virtual Private Cloud với CIDR 10.0.0.0/16
- **Subnet**: Public subnet với Internet Gateway
- **Security Group**: Mở port 22 (SSH), 80 (HTTP), 443 (HTTPS)
- **EC2**: Ubuntu 22.04 LTS instance
- **Auto-setup**: Node.js, nginx, PM2, MongoDB

## 📁 Cấu trúc file

```
terraform/
├── main.tf                 # Infrastructure chính
├── variables.tf            # Định nghĩa biến
├── outputs.tf             # Output values
├── user-data.sh           # Script auto-setup
├── terraform.tfvars.example # Template biến môi trường
└── README.md              # Hướng dẫn này
```

## 🛠️ Troubleshooting

### Kiểm tra logs deployment
```bash
ssh -i ~/.ssh/proshop-key ubuntu@<IP>
sudo tail -f /var/log/user-data.log
```

### Restart services
```bash
# Restart nginx
sudo systemctl restart nginx

# Restart backend
pm2 restart proshop-backend
```

### Xem logs ứng dụng
```bash
pm2 logs proshop-backend
```

## 🧹 Cleanup

Để xóa toàn bộ infrastructure:
```bash
terraform destroy
```

## 📝 Notes

- Deployment mất khoảng 5-10 phút để hoàn thành
- MongoDB được cài đặt local trên cùng instance
- SSL/HTTPS có thể được thêm sau với Let's Encrypt
- Để production, nên sử dụng RDS thay vì MongoDB local
