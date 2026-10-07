import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
  const {
    id,
    name,
    price,
    category,
    image,
    badge,
  } = product;

  return (
    <article className="product-card">

      <div className="product-image-container">

        {badge && (
          <span className="product-badge">
            {badge}
          </span>
        )}

        <button
          type="button"
          className="product-favorite"
          aria-label={`Ajouter ${name} aux favoris`}
          onClick={() => {
            console.log(`Favori : ${name}`);
          }}
        >
          ♡
        </button>

        <Link to={`/product/${id}`}>
          <img
            src={image}
            alt={name}
            className="product-image"
            loading="lazy"
          />

          <div className="product-overlay">
            <span>Voir le produit →</span>
          </div>
        </Link>

      </div>

      <div className="product-info">

        <span className="product-category">
          {category}
        </span>

        <Link
          to={`/product/${id}`}
          className="product-name"
        >
          {name}
        </Link>

        <div className="product-bottom">

          <strong className="product-price">
            {price.toFixed(3)} DT
          </strong>

          <button
            type="button"
            className="quick-add"
            aria-label={`Ajouter ${name} au panier`}
          >
            +
          </button>

        </div>

      </div>

    </article>
  );
}

export default ProductCard;