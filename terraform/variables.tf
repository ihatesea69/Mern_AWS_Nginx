variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "proshop"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.small"
}

variable "public_key" {
  description = "Public key for SSH access"
  type        = string
  # Bạn cần tạo SSH key pair và paste public key vào đây
  # Ví dụ: ssh-keygen -t rsa -b 4096 -f ~/.ssh/proshop-key
  # Sau đó copy nội dung file ~/.ssh/proshop-key.pub
}

variable "git_repo_url" {
  description = "Git repository URL for the ProShop project"
  type        = string
  # Thay đổi thành URL repository của bạn
  default     = "https://github.com/your-username/proshop.git"
}

variable "domain_name" {
  description = "Domain name or IP address for nginx configuration"
  type        = string
  default     = "_"  # Sử dụng _ để accept tất cả domain names
}

variable "mongodb_uri" {
  description = "MongoDB connection URI"
  type        = string
  default     = "mongodb://localhost:27017/proshop"
  sensitive   = true
}

variable "jwt_secret" {
  description = "JWT secret key"
  type        = string
  default     = "your-super-secret-jwt-key-change-this-in-production"
  sensitive   = true
}

variable "paypal_client_id" {
  description = "PayPal Client ID"
  type        = string
  default     = ""
  sensitive   = true
}

variable "node_env" {
  description = "Node environment"
  type        = string
  default     = "production"
}
