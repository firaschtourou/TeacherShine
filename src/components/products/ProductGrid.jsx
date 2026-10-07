import ProductCard from "./ProductCard";
import "./ProductGrid.css";

function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="product-grid-empty">
        <div className="empty-icon">🔎</div>

        <h3>Aucun produit trouvé</h3>

        <p>
          Aucun produit ne correspond à votre recherche ou à vos filtres.
        </p>
      </div>
    );
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductGrid;