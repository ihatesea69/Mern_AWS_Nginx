import React from "react";

const NewCollectionBanner = () => {
  return (
    <div className="py-3 mb-4 text-center">
      <h1 className="fw-bold">SẢN PHẨM MỚI</h1>
      <img
        src="/images/new-collection.png"
        alt="New Collection"
        className="img-fluid mt-3"
      />
    </div>
  );
};

export default NewCollectionBanner;
