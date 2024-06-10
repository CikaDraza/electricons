const validateProductData = (data) => {
    
  // Set default values if not provided
  data.rating = data.rating ?? 0;
  data.reviews = data.reviews ?? 0;
  data.inWidget = data.inWidget ?? [];
  
  // Ensure image structures
  if (data.images) {
    data.images = data.images.map(image => ({
      image: image.image ?? {},
      imageUrl: image.imageUrl
    }));
  }

  if (data.heroImage) {
    data.heroImage = data?.heroImage.map(img => ({heroImage: img.imageUrl}));
  }

  // Transform stores data to contain only store names
  if (data.stores) {
    data.stores = data.stores.map(store => ({ store: store.name }));
  }

  // Convert numeric strings to numbers
  data.price = Number(data.price);
  data.oldPrice = Number(data.oldPrice);
  data.inStock = Number(data.inStock);
  data.sku = Number(data.sku);

  // Return the sanitized data
  return data;
};