import { create } from 'zustand';

const useProductStore = create((set) => ({
  products: [],
  fetchProducts: async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    set({ products: data.data });
  },
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: 'Please fill in all fields.' };
    }

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });

    const data = await res.json();

    set((state) => ({ products: { ...state.products, data } }));

    return { success: true, message: 'Product created successfully.' };
  },
  deleteProduct: async (productId) => {
    const res = await fetch(`/api/products/${productId}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    if (!data.success) {
      return { success: false, message: data.message };
    }

    set((state) => ({
      products: state.products.filter((product) => product._id !== productId),
    }));

    return { success: true, message: data.message };
  },
}));

export default useProductStore;
