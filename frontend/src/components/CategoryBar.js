// For HomeScreen display product by category
import React from "react";
import { Nav } from "react-bootstrap";

const CategoryBar = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { key: "male", label: "Nam" },
    { key: "female", label: "Nữ" },
    { key: "jacket", label: "Áo Khoác" },
    { key: "accessory", label: "Phụ Kiện" },
    { key: "sale-off", label: "Giảm giá" },
  ];

  return (
    <div className="py-3 mb-4">
      <h1 className="fw-bold text-center">KHÁM PHÁ NGAY</h1>
      <div className="container">
        <Nav
          activeKey={activeCategory}
          className="d-flex justify-content-center"
          onSelect={onCategoryChange}
        >
          {categories.map((category) => (
            <Nav.Item key={category.key} className="mx-2">
              <Nav.Link
                eventKey={category.key}
                className="px-4 py-2 text-center"
                style={{
                  backgroundColor:
                    activeCategory === category.key ? "#000000ff" : "#00000004",
                  color: activeCategory === category.key ? "white" : "black",
                  borderRadius: "8px",
                  border: "none",
                  boxShadow:
                    activeCategory === category.key
                      ? "0 4px 8px rgba(0, 0, 0, 0.3)"
                      : "none",
                  fontWeight: "500",
                  minWidth: 60,
                  padding: "1rem",
                  width: 120,
                  textAlign: "center",
                }}
              >
                {category.label}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default CategoryBar;
