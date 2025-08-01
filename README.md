# 🛒 ProShop - E-commerce Platform

Một ứng dụng thương mại điện tử hoàn chỉnh được xây dựng với React.js, Node.js, Express và MongoDB.

## 🌟 Tính năng

### 👥 Người dùng
- ✅ Đăng ký và đăng nhập tài khoản
- ✅ Xem danh sách sản phẩm với phân loại
- ✅ Tìm kiếm và lọc sản phẩm
- ✅ Thêm sản phẩm vào giỏ hàng
- ✅ Quản lý giỏ hàng
- ✅ Đặt hàng và thanh toán
- ✅ Xem lịch sử đơn hàng
- ✅ Đánh giá và nhận xét sản phẩm

### 👨‍💼 Quản trị viên
- ✅ Quản lý sản phẩm (CRUD)
- ✅ Quản lý đơn hàng
- ✅ Quản lý người dùng
- ✅ Dashboard thống kê
- ✅ Quản lý danh mục sản phẩm

### 🎯 Tính năng đặc biệt
- ✅ Hệ thống giảm giá và khuyến mãi
- ✅ Responsive design
- ✅ Tích hợp PayPal
- ✅ Upload hình ảnh
- ✅ Phân trang
- ✅ Carousel banner

## 🏗️ Công nghệ sử dụng

### Frontend
- **React.js** - UI Library
- **Redux** - State Management
- **React Router** - Routing
- **React Bootstrap** - UI Components
- **Axios** - HTTP Client

### Backend
- **Node.js** - Runtime Environment
- **Express.js** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Multer** - File Upload
- **bcryptjs** - Password Hashing

### DevOps & Deployment
- **Terraform** - Infrastructure as Code
- **AWS EC2** - Cloud Hosting
- **Nginx** - Web Server
- **PM2** - Process Manager

## 🚀 Cài đặt và Chạy

### Yêu cầu hệ thống
- Node.js 16+ 
- MongoDB
- npm hoặc yarn

### 1. Clone repository
```bash
git clone https://github.com/your-username/proshop.git
cd proshop
```

### 2. Cài đặt Backend
```bash
cd backend
npm install

# Tạo file .env
cp .env.example .env
# Chỉnh sửa các biến môi trường trong .env
```

### 3. Cài đặt Frontend
```bash
cd ../frontend
npm install
```

### 4. Chạy ứng dụng

#### Development mode
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm start
```

#### Production mode
```bash
# Build frontend
cd frontend
npm run build

# Start backend
cd ../backend
npm start
```

## 🌐 Deploy lên AWS

Dự án bao gồm cấu hình Terraform hoàn chỉnh để deploy lên AWS EC2:

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
# Chỉnh sửa terraform.tfvars với thông tin của bạn

terraform init
terraform plan
terraform apply
```

Chi tiết xem [Terraform README](./terraform/README.md)

## 📁 Cấu trúc dự án

```
proshop/
├── frontend/                 # React.js frontend
│   ├── public/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── screens/         # Page components
│   │   ├── actions/         # Redux actions
│   │   ├── reducers/        # Redux reducers
│   │   └── utils/           # Utility functions
│   └── package.json
├── backend/                  # Node.js backend
│   ├── controllers/         # Route controllers
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── utils/               # Utility functions
│   ├── uploads/             # File uploads
│   └── package.json
├── terraform/               # Infrastructure as Code
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── user-data.sh
└── README.md
```

## 🔧 Cấu hình môi trường

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/proshop
JWT_SECRET=your-jwt-secret
PAYPAL_CLIENT_ID=your-paypal-client-id
```

## 📝 API Endpoints

### Authentication
- `POST /api/users/login` - Đăng nhập
- `POST /api/users/register` - Đăng ký
- `GET /api/users/profile` - Lấy thông tin user
- `PUT /api/users/profile` - Cập nhật thông tin user

### Products
- `GET /api/products` - Lấy danh sách sản phẩm
- `GET /api/products/:id` - Lấy chi tiết sản phẩm
- `POST /api/products` - Tạo sản phẩm (Admin)
- `PUT /api/products/:id` - Cập nhật sản phẩm (Admin)
- `DELETE /api/products/:id` - Xóa sản phẩm (Admin)

### Orders
- `POST /api/orders` - Tạo đơn hàng
- `GET /api/orders/:id` - Lấy chi tiết đơn hàng
- `PUT /api/orders/:id/pay` - Cập nhật thanh toán
- `GET /api/orders/myorders` - Lấy đơn hàng của user

## 🤝 Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

Dự án này được phân phối dưới MIT License. Xem `LICENSE` để biết thêm thông tin.

## 👨‍💻 Tác giả

- **Your Name** - [GitHub](https://github.com/your-username)

## 🙏 Acknowledgments

- Inspired by Brad Traversy's MERN Stack course
- React Bootstrap for UI components
- MongoDB for database
- PayPal for payment integration
