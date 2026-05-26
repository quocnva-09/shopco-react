import { useState } from 'react'
import { ProductCard, type ProductCardData } from './components/molecules/ProductCard/ProductCard'
// KHÔNG import './App.css' nữa để tránh bị đè style sạch của hệ thống!

const demoProduct: ProductCardData = {
  id: "p1",
  name: "T-Shirt With Tape Details",
  primaryImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&q=80",
  currentPrice: 120,
  originalPrice: 160,
  discountPercentage: 25,
  rating: 4.5,
};

function App() {
  return (
    <div style={{ padding: '50px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(295px, 1fr))', gap: '20px', backgroundColor: '#fff' }}>
      {/* Test hiển thị ProductCard mới lắp ráp */}
      <ProductCard product={demoProduct} onClick={() => alert('Chuyển hướng trang!')} />
    </div>
  )
}

export default App