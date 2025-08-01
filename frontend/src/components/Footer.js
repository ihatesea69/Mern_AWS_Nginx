import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-light text-dark py-4">
      <Container>
        <Row>
          {/* Contact Section */}
          <Col md={3} sm={6} xs={12} className="mb-3">
            <h6 className="fw-bold mb-3">Contact us:</h6>
            <p className="mb-1">
              <small>Hotline: 1800636516</small>
            </p>
            <p className="mb-1">
              <small>Email: dintrungkien05@gmail.com</small>
            </p>
          </Col>

          {/* Explore Section */}
          <Col md={2} sm={6} xs={12} className="mb-3">
            <h6 className="fw-bold mb-3">Khám phá</h6>
            <ul className="list-unstyled">
              <li>
                <small>
                  <a href="#" className="text-dark text-decoration-none">
                    BST Fast & Furious
                  </a>
                </small>
              </li>
              <li>
                <small>
                  <a href="#" className="text-dark text-decoration-none">
                    BST Summer
                  </a>
                </small>
              </li>
              <li>
                <small>
                  <a href="#" className="text-dark text-decoration-none">
                    BST Minion
                  </a>
                </small>
              </li>
              <li>
                <small>
                  <a href="#" className="text-dark text-decoration-none">
                    Áo Khoác
                  </a>
                </small>
              </li>
              <li>
                <small>
                  <a href="#" className="text-dark text-decoration-none">
                    Áo Thun
                  </a>
                </small>
              </li>
              <li>
                <small>
                  <a href="#" className="text-dark text-decoration-none">
                    Áo Polo
                  </a>
                </small>
              </li>
            </ul>
          </Col>

          {/* About Section */}
          <Col md={2} sm={6} xs={12} className="mb-3">
            <h6 className="fw-bold mb-3">Về LEVENTS</h6>
            <ul className="list-unstyled">
              <li>
                <small>
                  <a href="#" className="text-dark text-decoration-none">
                    Giới Thiệu
                  </a>
                </small>
              </li>
              <li>
                <small>
                  <a href="#" className="text-dark text-decoration-none">
                    Hợp tác sỉ
                  </a>
                </small>
              </li>
              <li>
                <small>
                  <a href="#" className="text-dark text-decoration-none">
                    Công Nghệ Sản Xuất
                  </a>
                </small>
              </li>
              <li>
                <small>
                  <a href="#" className="text-dark text-decoration-none">
                    Cơ Hội Việc Làm
                  </a>
                </small>
              </li>
              <li>
                <small>
                  <a href="#" className="text-dark text-decoration-none">
                    Điều Khoản Sử Dụng
                  </a>
                </small>
              </li>
              <li>
                <small>
                  <a href="#" className="text-dark text-decoration-none">
                    Hệ Thống Cửa Hàng
                  </a>
                </small>
              </li>
              <li>
                <small>
                  <a href="#" className="text-dark text-decoration-none">
                    Tạp Chí Thời Trang
                  </a>
                </small>
              </li>
              <li>
                <small>
                  <a href="#" className="text-dark text-decoration-none">
                    Tin Khuyến Mãi
                  </a>
                </small>
              </li>
              <li>
                <small>
                  <a href="#" className="text-dark text-decoration-none">
                    Chính sách bảo mật
                  </a>
                </small>
              </li>
            </ul>
          </Col>

          {/* Account Section */}
          <Col md={2} sm={6} xs={12} className="mb-3">
            <h6 className="fw-bold mb-3">Tài khoản</h6>
            <ul className="list-unstyled">
              <li>
                <small>
                  <a href="#" className="text-dark text-decoration-none">
                    Đăng nhập/Đăng ký
                  </a>
                </small>
              </li>
              <li>
                <small>
                  <a href="#" className="text-dark text-decoration-none">
                    Lịch sử mua hàng
                  </a>
                </small>
              </li>
              <li>
                <small>
                  <a href="#" className="text-dark text-decoration-none">
                    Danh sách địa chỉ
                  </a>
                </small>
              </li>
            </ul>
          </Col>

          {/* Customer Support Section */}
          <Col md={3} sm={6} xs={12} className="mb-3">
            <h6 className="fw-bold mb-3">Hỗ trợ khách hàng</h6>
            <ul className="list-unstyled">
              <li>
                <small>
                  <a href="#" className="text-dark text-decoration-none">
                    Chính Sách Thành Viên
                  </a>
                </small>
              </li>
              <li>
                <small>
                  <a href="#" className="text-dark text-decoration-none">
                    Chính Sách Đổi Hàng
                  </a>
                </small>
              </li>
              <li>
                <small>
                  <a href="#" className="text-dark text-decoration-none">
                    Chính Sách Bảo Hành
                  </a>
                </small>
              </li>
              <li>
                <small>
                  <a href="#" className="text-dark text-decoration-none">
                    Hướng Dẫn Mua Hàng
                  </a>
                </small>
              </li>
              <li>
                <small>
                  <a href="#" className="text-dark text-decoration-none">
                    Hướng Dẫn Chọn Size
                  </a>
                </small>
              </li>
              <li>
                <small>
                  <a href="#" className="text-dark text-decoration-none">
                    Câu Hỏi Thường Gặp
                  </a>
                </small>
              </li>
            </ul>
          </Col>
        </Row>

        {/* Copyright Row */}
        <Row className="border-top pt-3 mt-3">
          <Col className="text-center">
            <small>Copyright &copy; TrungKien&VietLuan</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
