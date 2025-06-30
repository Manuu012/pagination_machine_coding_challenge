

export const fetchProducts = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=500");
    const data = await response.json();
    console.log(data.products);
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};