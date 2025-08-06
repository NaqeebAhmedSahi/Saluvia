// app/products/[id]/page.jsx
'use client'; // This needs to be a Client Component to use searchParams

export default function ProductPage({ params, searchParams }) {
  const { id } = params;
  
  // Reconstruct the product object from searchParams
  const product = {
    _id: id,
    name: searchParams.name,
    description: searchParams.description,
    image_path: searchParams.image_path
    // Add other fields you passed
  };

  return (
    <div className="product-details-container">
      <div className="product-image">
        <img 
          src={`/${product.image_path.replace(/\\/g, '/')}`} 
          alt={product.name} 
        />
      </div>
      
      <div className="product-info">
        <h1>{product.name}</h1>
        
        <div className="product-description">
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      </div>
    </div>
  );
}