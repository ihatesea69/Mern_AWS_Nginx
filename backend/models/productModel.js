import mongoose from "mongoose";
import { saleUtils } from "../utils/saleUtils.js";

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const saleSchema = mongoose.Schema(
  {
    isOnSale: {
      type: Boolean,
      default: false,
    },
    saleType: {
      type: String,
      enum: ["percentage", "fixed"],
      default: "percentage",
    },
    saleValue: {
      type: Number,
      min: 0,
      validate: {
        validator: function (value) {
          if (this.isOnSale && (value === undefined || value === null)) {
            return false;
          }
          if (this.saleType === "percentage" && value > 100) {
            return false;
          }
          return true;
        },
        message:
          "Sale value is required when product is on sale, and percentage cannot exceed 100%",
      },
    },
    saleStartDate: {
      type: Date,
      validate: {
        validator: function (value) {
          if (this.isOnSale && !value) {
            return false;
          }
          return true;
        },
        message: "Sale start date is required when product is on sale",
      },
    },
    saleEndDate: {
      type: Date,
      validate: {
        validator: function (value) {
          if (this.isOnSale && !value) {
            return false;
          }
          if (
            this.isOnSale &&
            this.saleStartDate &&
            value <= this.saleStartDate
          ) {
            return false;
          }
          return true;
        },
        message:
          "Sale end date is required when product is on sale and must be after start date",
      },
    },
  },
  {
    _id: false, // Don't create separate _id for sale subdocument
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["female", "male", "jacket", "accessory"],
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    // Add sale schema
    sale: {
      type: saleSchema,
      default: () => ({
        isOnSale: false,
        saleType: "percentage",
        saleValue: 0,
      }),
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for current sale price
productSchema.virtual("currentPrice").get(function () {
  return saleUtils.calculateSalePrice(this);
});

// Virtual for discount amount
productSchema.virtual("discountAmount").get(function () {
  return saleUtils.getDiscountAmount(this);
});

// Virtual for discount percentage
productSchema.virtual("discountPercentage").get(function () {
  return saleUtils.getDiscountPercentage(this);
});

// Virtual for complete sale information
productSchema.virtual("saleInfo").get(function () {
  return saleUtils.getSaleInfo(this);
});

// Instance method to check if product is currently on sale
productSchema.methods.isOnSale = function () {
  return saleUtils.isProductOnSale(this);
};

// Instance method to check if sale is ending soon
productSchema.methods.isSaleEndingSoon = function () {
  return saleUtils.isSaleEndingSoon(this);
};

// Instance method to get days remaining for sale
productSchema.methods.getDaysRemaining = function () {
  return saleUtils.getDaysRemaining(this);
};

// Instance method to start a sale
productSchema.methods.startSale = function (
  saleType,
  saleValue,
  startDate,
  endDate
) {
  this.sale = {
    isOnSale: true,
    saleType: saleType,
    saleValue: saleValue,
    saleStartDate: startDate || new Date(),
    saleEndDate: endDate,
  };
  return this.save();
};

// Instance method to end a sale
productSchema.methods.endSale = function () {
  this.sale = {
    isOnSale: false,
    saleType: "percentage",
    saleValue: 0,
  };
  return this.save();
};

// Static method to find all products on sale
productSchema.statics.findOnSale = function () {
  return this.find({ isActive: true }).then((products) => {
    return products.filter((product) => saleUtils.isProductOnSale(product));
  });
};

// Static method to find products with sales ending soon
productSchema.statics.findSalesEndingSoon = function () {
  return this.find({ isActive: true }).then((products) => {
    return products.filter((product) => saleUtils.isSaleEndingSoon(product));
  });
};

// Pre-save middleware to ensure sale data consistency
productSchema.pre("save", function (next) {
  // If sale is being set to active, ensure required fields are present
  if (this.sale && this.sale.isOnSale) {
    if (
      !this.sale.saleStartDate ||
      !this.sale.saleEndDate ||
      this.sale.saleValue === undefined
    ) {
      return next(
        new Error(
          "Sale start date, end date, and sale value are required when product is on sale"
        )
      );
    }

    // Ensure sale end date is after start date
    if (this.sale.saleEndDate <= this.sale.saleStartDate) {
      return next(new Error("Sale end date must be after sale start date"));
    }

    // Validate percentage doesn't exceed 100%
    if (this.sale.saleType === "percentage" && this.sale.saleValue > 100) {
      return next(new Error("Percentage discount cannot exceed 100%"));
    }

    // Ensure fixed discount doesn't exceed product price
    if (this.sale.saleType === "fixed" && this.sale.saleValue >= this.price) {
      return next(
        new Error("Fixed discount cannot exceed or equal product price")
      );
    }
  }

  next();
});

// Ensure virtual fields are serialized when converting to JSON
productSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret, options) {
    // Remove mongoose-specific fields
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

productSchema.set("toObject", { virtuals: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
