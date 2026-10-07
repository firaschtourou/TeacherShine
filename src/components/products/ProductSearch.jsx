import "./ProductSearch.css";

function ProductSearch({ value, onChange }) {
  return (
    <div className="product-search">
      <span className="product-search-icon">⌕</span>

      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Rechercher un produit..."
        aria-label="Rechercher un produit"
      />

      {value && (
        <button
          type="button"
          className="product-search-clear"
          onClick={() => onChange("")}
          aria-label="Effacer la recherche"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default ProductSearch;