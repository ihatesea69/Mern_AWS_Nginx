import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Carousel } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";

const FullWidthWrapper = styled.div`
  width: 100vw;
  margin-left: 50%;
  transform: translateX(-50%);
  position: relative;
`;

const StyledCarousel = styled(Carousel)`
  width: 100%;
  .carousel-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: 768px) {
    .carousel-item img {
      height: 200px;
    }
  }
`;

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/banners");
        setBanners(data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load banners");
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;
  if (banners.length === 0) return null;

  return (
    <FullWidthWrapper>
      <StyledCarousel pause="hover">
        {banners.map((banner) => (
          <Carousel.Item key={banner._id}>
            <img className="d-block" src={banner.image} alt={banner.name} />
          </Carousel.Item>
        ))}
      </StyledCarousel>
    </FullWidthWrapper>
  );
};

export { Banner, StyledCarousel, FullWidthWrapper };
