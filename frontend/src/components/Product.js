import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import Rating from "./Rating";
import { saleUtils } from "../utils/saleUtils";

// NOTE: Aware of custom CSS when edit this
const Product = ({ product }) => {
  // Get sale information
  const saleInfo = saleUtils.getSaleInfo(product);
  const isOnSale = saleUtils.isProductOnSale(product);

  // Format price in VND
  const formatVND = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  return (
    <Card className="my-1 mx-0 px-0 py-3 product-card">
      <Link to={`/product/${product._id}`} className="text-decoration-none">
        <div className="product-image-wrapper position-relative">
          <Card.Img
            src={product.image}
            variant="top"
            className="product-image"
          />
        </div>
      </Link>

      <Card.Body className="py-3 px-0">
        <Row className="align-items-center mb-1">
          <Col xs={7}>
            <Link
              to={`/product/${product._id}`}
              className="text-decoration-none"
            >
              <Card.Title as="div" className="product-title-small">
                {product.name}
              </Card.Title>
            </Link>
          </Col>
          <Col xs={5} className="text-end">
            <Rating value={product.rating} text="" size="small" />
          </Col>
        </Row>

        {/* Price Section */}
        <div className="pt-4 product-price">
          {isOnSale ? (
            <div className="price-section">
              <div>
                <span className="fw-bold">
                  Giá: {formatVND(saleInfo.salePrice)} VND
                </span>
                <span
                  className="original-price text-muted"
                  style={{
                    textDecoration: "line-through",
                    fontSize: "0.85em",
                    padding: "0.6rem",
                  }}
                >
                  {formatVND(saleInfo.originalPrice)} VND
                </span>
              </div>
            </div>
          ) : (
            <Card.Text className="regular-price mb-0">
              Giá: {formatVND(product.price)} VND
            </Card.Text>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;
