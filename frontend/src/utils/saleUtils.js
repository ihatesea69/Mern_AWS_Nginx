// utils/saleUtils.js
export const saleUtils = {
  // Check if product is currently on sale
  isProductOnSale: (product) => {
    if (!product.sale || !product.sale.isOnSale) return false;

    const now = new Date();
    const saleStart = new Date(product.sale.saleStartDate);
    const saleEnd = new Date(product.sale.saleEndDate);

    return now >= saleStart && now <= saleEnd;
  },

  // Calculate sale price
  calculateSalePrice: (product) => {
    if (!saleUtils.isProductOnSale(product)) {
      return product.price;
    }

    const { saleType, saleValue } = product.sale;

    if (saleType === "percentage") {
      return parseFloat((product.price * (1 - saleValue / 100)).toFixed(2));
    } else if (saleType === "fixed") {
      return parseFloat(Math.max(0, product.price - saleValue).toFixed(2));
    }

    return product.price;
  },

  // Calculate discount amount
  getDiscountAmount: (product) => {
    const originalPrice = product.price;
    const salePrice = saleUtils.calculateSalePrice(product);
    return parseFloat((originalPrice - salePrice).toFixed(2));
  },

  // Calculate discount percentage
  getDiscountPercentage: (product) => {
    if (!saleUtils.isProductOnSale(product)) return 0;

    const originalPrice = product.price;
    const discountAmount = saleUtils.getDiscountAmount(product);
    return Math.round((discountAmount / originalPrice) * 100);
  },

  // Format price for display
  formatPrice: (price) => {
    return `$${price.toFixed(2)}`;
  },

  // Get all products on sale
  getProductsOnSale: (products) => {
    return products.filter((product) => saleUtils.isProductOnSale(product));
  },

  // Get sale info for display
  getSaleInfo: (product) => {
    if (!saleUtils.isProductOnSale(product)) {
      return {
        isOnSale: false,
        originalPrice: product.price,
        salePrice: product.price,
        discountAmount: 0,
        discountPercentage: 0,
        formattedOriginalPrice: saleUtils.formatPrice(product.price),
        formattedSalePrice: saleUtils.formatPrice(product.price),
      };
    }

    const originalPrice = product.price;
    const salePrice = saleUtils.calculateSalePrice(product);
    const discountAmount = saleUtils.getDiscountAmount(product);
    const discountPercentage = saleUtils.getDiscountPercentage(product);

    return {
      isOnSale: true,
      originalPrice,
      salePrice,
      discountAmount,
      discountPercentage,
      formattedOriginalPrice: saleUtils.formatPrice(originalPrice),
      formattedSalePrice: saleUtils.formatPrice(salePrice),
      saleEndDate: product.sale.saleEndDate,
    };
  },

  // Check if sale is ending soon (within 7 days)
  isSaleEndingSoon: (product) => {
    if (!saleUtils.isProductOnSale(product)) return false;

    const now = new Date();
    const saleEnd = new Date(product.sale.saleEndDate);
    const timeDiff = saleEnd.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return daysDiff <= 7 && daysDiff > 0;
  },

  // Get days remaining for sale
  getDaysRemaining: (product) => {
    if (!saleUtils.isProductOnSale(product)) return 0;

    const now = new Date();
    const saleEnd = new Date(product.sale.saleEndDate);
    const timeDiff = saleEnd.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return Math.max(0, daysDiff);
  },
};

export default saleUtils;
