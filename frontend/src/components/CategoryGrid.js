// components/CategoryGrid.js
import React from "react";
import { Row, Col, Card } from "react-bootstrap";

const CategoryGrid = ({ products = [], onCategorySelect }) => {
  const categories = [
    { key: "male", label: "Nam" },
    { key: "female", label: "Nữ" },
    { key: "jacket", label: "Áo Khoác" },
    { key: "accessory", label: "Phụ Kiện" },
  ];

  // Get random product image from each category
  const getRandomProductImage = (categoryKey) => {
    const categoryProducts = products.filter(
      (product) => product.category === categoryKey && product.isActive
    );

    if (categoryProducts.length > 0) {
      const randomProduct =
        categoryProducts[Math.floor(Math.random() * categoryProducts.length)];
      return randomProduct.image;
    }

    // Fallback images if no products found
    const fallbackImages = {
      male: "/images/male_2.jpg",
      female: "/images/female_1.png",
      jacket: "/images/jacket_1.png",
      accessory: "/images/acc_1.jpg",
    };

    return fallbackImages[categoryKey] || "/images/image_1.png";
  };



  return (
    <div className="my-5">
      <h1 className="fw-bold text-center">ĐA DẠNG BỘ SƯU TẬP</h1>

      <Row className="g-3">
        {categories.map((category) => (
          <Col key={category.key} xs={6} md={3}>
            <Card
              className="category-card h-100 border-0 "
              onClick={() => onCategorySelect && onCategorySelect(category.key)}
              style={{ cursor: "pointer" }}
            >
              <div className="category-image-wrapper">
                <Card.Img
                  variant="top"
                  src={getRandomProductImage(category.key)}
                  alt={category.label}
                  className="category-image"
                />
              </div>

              <Card.Body className="text-center border-0 p-3">
                <Card.Title className="category-name mb-1">
                  {category.label.toUpperCase()}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CategoryGrid;
