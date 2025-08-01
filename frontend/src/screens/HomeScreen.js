/* Luna: HomeScreen 
Vài components được sử dụng trong đây sử dụng static path
*/
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Row, Col, Container, Button } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Banner, StyledCarousel, FullWidthWrapper } from "../components/Banner";
import NewCollectionBanner from "../components/NewCollectionBanner";
import CategoryBar from "../components/CategoryBar";
import CategoryGrid from "../components/CategoryGrid";
import { listProducts } from "../actions/productActions";
import { saleUtils } from "../utils/saleUtils"; // Import saleUtils
import { Carousel } from "react-bootstrap";
import OnlyOnline from "../components/OnlyOnline";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [activeCategory, setActiveCategory] = useState("male");

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  // Move to all products page
  const handleViewAllProducts = () => {
    history.push("/products");
  };

  const handleCategoryGridSelect = (category) => {
    setActiveCategory(category);
    // Smooth scroll to products section
    const productsSection = document.getElementById("products-section");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  // Filter products based on active category
  const getFilteredProducts = () => {
    if (activeCategory === "all") {
      return products;
    }

    // Handle sale-off category
    if (activeCategory === "sale-off") {
      return products.filter((product) => {
        return product.isActive && saleUtils.isProductOnSale(product);
      });
    }

    // Handle regular categories
    return products.filter((product) => {
      return product.category?.toLowerCase() === activeCategory.toLowerCase();
    });
  };

  // Helper function to get category label for display
  const getCategoryLabel = (category) => {
    const categoryMap = {
      male: "Nam",
      female: "Nữ",
      jacket: "Áo Khoác",
      accessory: "Phụ Kiện",
      "sale-off": "Giảm giá",
    };
    return categoryMap[category] || category;
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const filteredProducts = getFilteredProducts();

  return (
    <Container fluid className="px-0">
      <Banner />

      <Container className="mt-4">
        {/*New Collection Section */}
        <NewCollectionBanner />
        {/* Category Grid Section */}
        {loading ? (
          <div className="text-center py-5">
            <Loader />
          </div>
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <CategoryGrid
            products={products || []}
            onCategorySelect={handleCategoryGridSelect}
          />
        )}

        <CategoryBar
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Row className="mt-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))
              ) : (
                <Col>
                  <Message variant="info">
                    {activeCategory === "sale-off"
                      ? "Hiện tại không có sản phẩm nào đang được giảm giá"
                      : `Không có sản phẩm nào trong danh mục ${getCategoryLabel(
                          activeCategory
                        )}`}
                  </Message>
                </Col>
              )}
            </Row>
          </>
        )}
        <Button
          variant="primary"
          onClick={handleViewAllProducts}
          className="ms-3"
          style={{
            borderRadius: "8px",
            margin: "3rem auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "150px",
            height: "40px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.textDecoration = "underline";
          }}
          onMouseLeave={(e) => {
            e.target.style.textDecoration = "none";
          }}
        >
          Xem thêm
        </Button>
      </Container>
      <FullWidthWrapper>
        <StyledCarousel pause="hover">
          <Carousel.Item>
            <img className="d-block" src="images/banner_16.png" alt="Banner" />
          </Carousel.Item>
        </StyledCarousel>
      </FullWidthWrapper>

      {/* Last part just for looking good */}

      <OnlyOnline></OnlyOnline>
    </Container>
  );
};

export default HomeScreen;
