import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import { logout } from "../actions/userAction";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar
        bg="light"
        variant="light"
        expand="md"
        collapseOnSelect
        className="custom-navbar"
      >
        <Container>
          {/* Logo */}
          <LinkContainer to="/">
            <Navbar.Brand className="text-dark fw-bold">Levents</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Left side navigation items */}
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link className="text-dark">Sản phẩm mới</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/male">
                <Nav.Link className="text-dark">Nam</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/female">
                <Nav.Link className="text-dark">Nữ</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/jacket">
                <Nav.Link className="text-dark">Áo khoác</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/accessory">
                <Nav.Link className="text-dark">Phụ kiện</Nav.Link>
              </LinkContainer>
            </Nav>

            {/* Right side - Search, Account, Cart */}
            <Nav className="ms-auto d-flex align-items-center">
              {/* Search Bar */}
              <Form className="d-flex me-3">
                <InputGroup>
                  <Form.Control
                    type="search"
                    placeholder="Tìm kiếm..."
                    className="me-2"
                    aria-label="Search"
                    style={{ minWidth: "200px" }}
                  />
                  <Button variant="outline-dark" type="submit">
                    <i className="fas fa-search"></i>
                  </Button>
                </InputGroup>
              </Form>

              {/* Account */}
              {userInfo ? (
                <NavDropdown
                  title={
                    <span className="text-dark">
                      <i className="fas fa-user"></i> {userInfo.name}
                    </span>
                  }
                  id="username"
                  className="me-3"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="text-dark me-3">
                    <i className="fas fa-user"></i>
                  </Nav.Link>
                </LinkContainer>
              )}

              {/* Cart */}
              <LinkContainer to="/cart">
                <Nav.Link className="text-dark">
                  <i className="fas fa-shopping-cart"></i>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Custom CSS */}
      <style jsx>{`
        .custom-navbar {
          background-color: white !important;
          border-bottom: 1px solid #dee2e6;
        }
        .custom-navbar .navbar-nav .nav-link {
          color: black !important;
          font-weight: 500;
          padding: 0.5rem 1rem;
        }
        .custom-navbar .navbar-nav .nav-link:hover {
          color: #495057 !important;
        }
        .custom-navbar .navbar-brand {
          color: black !important;
          font-size: 1.5rem;
        }
        .dropdown-toggle::after {
          display: none;
        }
      `}</style>
    </header>
  );
};

export default Header;
