import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text, color = "#f8e825", size = "normal" }) => {
  const starSize = size === "small" ? "0.6rem" : "0.75rem";

  return (
    <div className="rating d-flex align-items-center justify-content-end">
      <span className="stars" style={{ fontSize: starSize }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} style={{ color }}>
            {value >= star ? (
              <FaStar />
            ) : value >= star - 0.5 ? (
              <FaStarHalfAlt />
            ) : (
              <FaRegStar />
            )}
          </span>
        ))}
      </span>
      {text && (
        <span className="rating-text small text-muted ms-1">{text}</span>
      )}
    </div>
  );
};

export default Rating;
