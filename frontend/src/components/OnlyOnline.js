import React from "react";

const OnlyOnline = () => {
  return (
    <div className="container-fluid p-4">
      {/* Main Product Row */}
      <div className="row g-1">
        {/* Main Product Image - Left Side */}
        <div className="col-md-6">
          <div className="card h-100">
            <img
              src="/images/image_18.png"
              alt="Main Product"
              className="card-img-top h-100"
              style={{ objectFit: "cover", minHeight: "400px" }}
            />
          </div>
        </div>

        {/* Right Side - Product Images and Details */}
        <div className="col-md-6">
          <div className="row g-1 h-100">
            {/* Top Row - Two Product Images */}
            <div className="col-6">
              <div className="card h-100">
                <img
                  src="/images/image_17.png"
                  alt="Product Image 1"
                  className="card-img-top h-100"
                  style={{ objectFit: "cover", minHeight: "180px" }}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="card h-100">
                <img
                  src="/images/image_19.png"
                  alt="Product Image 2"
                  className="card-img-top h-100"
                  style={{ objectFit: "cover", minHeight: "180px" }}
                />
              </div>
            </div>
            {/* Bottom Row - Product Details */}
            <div className="col-12">
              <div className="card border-0 h-90">
                <div className="card-body">
                  <h2 className="fw-bold">ONLY ONLINE</h2>
                  <h2 className="text-muted display-8">CHỈ TỪ</h2>
                  <h2 className="fw-bold display-4">99.000 VND</h2>
                  <button className="btn btn-dark btn-lg fs-3 px-4 py-3">
                    MUA NGAY!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlyOnline;
